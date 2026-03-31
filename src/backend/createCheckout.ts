const STRIPE_SECRET_KEY = Deno.env.get("STRIPE_SECRET_KEY");

Deno.serve(async (req) => {
  const { amount, mode, successUrl, cancelUrl, userEmail } = await req.json();

  const origin = req.headers.get("origin") || "http://localhost:5173";
  const amountCents = Math.round(amount * 100);

  const params: Record<string, string> = {
    "payment_method_types[]": "card",
    "line_items[0][price_data][currency]": "usd",
    "line_items[0][price_data][unit_amount]": String(amountCents),
    "line_items[0][price_data][product_data][name]": mode === "sponsor" ? "Sponsor a Seat — Pivot Path" : "Pivot Path Access",
    "line_items[0][price_data][product_data][description]": mode === "sponsor"
      ? "Your generosity funds access for a public-sector professional in need."
      : "Support your own career transition journey.",
    "line_items[0][quantity]": "1",
    "mode": "payment",
    "success_url": successUrl || `${origin}/support?success=true&mode=${mode}`,
    "cancel_url": cancelUrl || `${origin}/support?canceled=true`,
  };

  if (userEmail) {
    params["customer_email"] = userEmail;
    params["metadata[user_email]"] = userEmail;
    params["metadata[mode]"] = mode;
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