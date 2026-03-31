const STRIPE_SECRET_KEY = Deno.env.get("STRIPE_SECRET_KEY");

Deno.serve(async (req) => {
  const { tier, userEmail, successUrl, cancelUrl } = await req.json();

  // Tier config: supporter=$3/month, sponsor=$5/month
  const tiers: Record<string, { amount: number; name: string; description: string }> = {
    supporter: {
      amount: 300,
      name: "The Supporter — Pivot Path",
      description: "A $3/month contribution that keeps Pivot Path accessible for public-sector professionals.",
    },
    sponsor: {
      amount: 500,
      name: "The Sponsor — Pivot Path",
      description: "A $5/month subscription that sponsors a seat for an educator who can't afford access.",
    },
  };

  const config = tiers[tier];
  if (!config) {
    return Response.json({ error: "Invalid tier. Use 'supporter' or 'sponsor'." }, { status: 400 });
  }

  const params: Record<string, string> = {
    "payment_method_types[]": "card",
    "line_items[0][price_data][currency]": "usd",
    "line_items[0][price_data][unit_amount]": String(config.amount),
    "line_items[0][price_data][recurring][interval]": "month",
    "line_items[0][price_data][product_data][name]": config.name,
    "line_items[0][price_data][product_data][description]": config.description,
    "line_items[0][quantity]": "1",
    "mode": "subscription",
    "success_url": successUrl,
    "cancel_url": cancelUrl,
  };

  if (userEmail) {
    params["customer_email"] = userEmail;
    params["metadata[user_email]"] = userEmail;
    params["metadata[tier]"] = tier;
  }

  const response = await fetch("https://api.stripe.com/v1/checkout/sessions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${STRIPE_SECRET_KEY}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams(params),
  });

  const session = await response.json();

  if (!session.url) {
    return Response.json({ error: session.error?.message || "Failed to create checkout session" }, { status: 400 });
  }

  return Response.json({ url: session.url, session_id: session.id });
});