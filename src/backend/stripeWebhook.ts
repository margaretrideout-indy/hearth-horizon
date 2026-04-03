import { createClientFromRequest } from "npm:@base44/sdk";

const STRIPE_WEBHOOK_SECRET = Deno.env.get("STRIPE_WEBHOOK_SECRET");
const STRIPE_SECRET_KEY = Deno.env.get("STRIPE_SECRET_KEY");

Deno.serve(async (req) => {
  const base44 = createClientFromRequest(req);
  const body = await req.text();

  // Verify webhook signature if secret is set
  if (STRIPE_WEBHOOK_SECRET) {
    const sig = req.headers.get("stripe-signature");
    if (!sig) {
      return Response.json({ error: "Missing stripe-signature header" }, { status: 400 });
    }

    // Simple HMAC verification
    const encoder = new TextEncoder();
    const parts = sig.split(",");
    const timestamp = parts.find(p => p.startsWith("t="))?.split("=")[1];
    const expectedSig = parts.find(p => p.startsWith("v1="))?.split("=")[1];

    const key = await crypto.subtle.importKey(
      "raw",
      encoder.encode(STRIPE_WEBHOOK_SECRET),
      { name: "HMAC", hash: "SHA-256" },
      false,
      ["sign"]
    );
    const signed = await crypto.subtle.sign("HMAC", key, encoder.encode(`${timestamp}.${body}`));
    const computed = Array.from(new Uint8Array(signed)).map(b => b.toString(16).padStart(2, "0")).join("");

    if (computed !== expectedSig) {
      return Response.json({ error: "Invalid signature" }, { status: 400 });
    }
  }

  const event = JSON.parse(body);

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const userEmail = session.metadata?.user_email || session.customer_email;
    const tier = session.metadata?.tier;

    if (!userEmail || !tier) {
      return Response.json({ received: true, note: "No user email or tier in metadata" });
    }

    // Map tier to subscription level
    const subscriptionTier = tier === "sponsor" ? "Steward" : "Hearthkeeper";

    // Find the user and update their subscription
    const users = await base44.asServiceRole.entities.User.filter({ email: userEmail });
    if (users && users.length > 0) {
      const user = users[0];

      // Check founding member status
      const allUsers = await base44.asServiceRole.entities.User.list();
      const foundingCount = allUsers.filter((u: any) => u.is_founding_member).length;
      const isFoundingMember = foundingCount < 25;

      const update: Record<string, any> = {
        subscription_tier: subscriptionTier,
        seedling_upload_count: 0,
      };
      if (isFoundingMember) {
        update.is_founding_member = true;
        update.founding_member_number = foundingCount + 1;
      }

      await base44.asServiceRole.entities.User.update(user.id, update);

      // If sponsor tier, add a voucher to the pool
      if (tier === "sponsor") {
        await base44.asServiceRole.entities.VoucherPool.create({
          sponsor_email: userEmail,
          amount_paid: 5,
          status: "available",
        });
      }
    }
  }

  return Response.json({ received: true });
});