import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';
import Stripe from 'npm:stripe@14';

Deno.serve(async (req) => {
  const stripeSecret = Deno.env.get("STRIPE_SECRET_KEY");
  const webhookSecret = Deno.env.get("STRIPE_WEBHOOK_SECRET");

  if (!stripeSecret) {
    return Response.json({ error: "Stripe secret key not configured" }, { status: 500 });
  }

  const stripe = new Stripe(stripeSecret, { httpClient: Stripe.createFetchHttpClient() });

  let event;
  try {
    const body = await req.text();
    const signature = req.headers.get("stripe-signature");

    if (webhookSecret && signature) {
      // Must use async version — Deno uses Web Crypto API (SubtleCrypto) which is asynchronous
      event = await stripe.webhooks.constructEventAsync(body, signature, webhookSecret);
    } else {
      event = JSON.parse(body);
    }
  } catch (err) {
    return Response.json({ error: `Webhook error: ${err.message}` }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const base44 = createClientFromRequest(req);
    const session = event.data.object;
    const userEmail = (session.metadata?.user_email || session.customer_email || '').toLowerCase().trim();
    const tier = session.metadata?.tier;

    if (userEmail) {
      const subscriptionTier = tier === "sponsor" ? "Steward" : "Hearthkeeper";

      const users = await base44.asServiceRole.entities.User.filter({ email: userEmail });
      if (users && users.length > 0) {
        const user = users[0];

        const allUsers = await base44.asServiceRole.entities.User.list();
        const foundingCount = allUsers.filter((u) => u.is_founding_member).length;
        const isFoundingMember = foundingCount < 25;

        const updateData = {
          tier: 'hearthkeeper',
          subscription_tier: subscriptionTier,
        };

        if (isFoundingMember && !user.is_founding_member) {
          updateData.is_founding_member = true;
          updateData.founding_member_number = foundingCount + 1;
        }

        await base44.asServiceRole.entities.User.update(user.id, updateData);

        await base44.asServiceRole.entities.SystemLog.create({
          user_id: user.id,
          user_email: userEmail,
          action_type: "Hearthkeeper Status Activated",
          tier: subscriptionTier,
          description: `Assigned ${subscriptionTier} membership via Stripe checkout. Founding member: ${!!updateData.is_founding_member}`,
        });

        if (tier === "sponsor") {
          await base44.asServiceRole.entities.VoucherPool.create({
            sponsor_email: userEmail,
            amount_paid: 5,
            status: "available",
          });
        }
      }
    }
  }

  return Response.json({ received: true });
});