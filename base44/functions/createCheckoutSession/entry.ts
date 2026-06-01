import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();

    if (!user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { plan } = await req.json(); // 'monthly' or 'yearly'

    const STRIPE_SECRET_KEY = Deno.env.get('STRIPE_SECRET_KEY');
    if (!STRIPE_SECRET_KEY) {
      return Response.json({ error: 'Stripe not configured' }, { status: 500 });
    }

    const PAYMENT_LINKS = {
      monthly: 'https://buy.stripe.com/28E7sLalOdqndqI6pQdAk07',
      yearly:  'https://buy.stripe.com/bJe3cvdy09a772kdSidAk08',
    };

    const url = PAYMENT_LINKS[plan];
    if (!url) {
      return Response.json({ error: 'Invalid plan' }, { status: 400 });
    }

    // Append prefilled email to the payment link
    const paymentUrl = `${url}?prefilled_email=${encodeURIComponent(user.email)}`;

    return Response.json({ url: paymentUrl });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});