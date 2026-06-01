import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();

    if (!user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { experience, ethics } = await req.json();

    if (!experience || experience.trim().length < 10) {
      return Response.json({ error: 'Please provide more detail about your experience.' }, { status: 400 });
    }

    const ethicsContext = ethics
      ? `Reciprocity weight: ${ethics.Reciprocity}%, Transparency weight: ${ethics.Transparency}%, Agency weight: ${ethics.Agency}%.`
      : '';

    const result = await base44.integrations.Core.InvokeLLM({
      model: 'gpt_5_mini',
      prompt: `You are a career translation engine for public-sector professionals transitioning to private-sector roles. 
      
The user has provided their professional background:
"${experience}"

Their ethics calibration (what they value most in a new role):
${ethicsContext}

Using this information, generate a complete private-sector career translation. Be specific, compelling, and grounded in their actual background. Do not be generic.

Return a JSON object with exactly these fields:
- headline: A powerful, private-sector-ready professional headline (ALL CAPS, max 8 words)
- summary: A 2-sentence core narrative reframing their public-sector identity for private-sector hiring managers
- cultureFit: A 2-sentence insight about which company cultures and environments will align with their ethics calibration scores
- growthGaps: A 2-sentence note on specific terminology or framing to shift to close translation gaps
- bullets: An array of exactly 3 strong accomplishment-style bullet points reframing their experience with impact metrics implied`,
      response_json_schema: {
        type: 'object',
        properties: {
          headline: { type: 'string' },
          summary: { type: 'string' },
          cultureFit: { type: 'string' },
          growthGaps: { type: 'string' },
          bullets: { type: 'array', items: { type: 'string' } }
        }
      }
    });

    // Log the action (fire-and-forget)
    base44.asServiceRole.entities.SystemLog.create({
      user_id: user.id,
      user_email: user.email,
      action_type: 'Hearth Alchemized',
      tier: user.tier || 'unknown',
      metadata: { ethics }
    }).catch(() => {});

    return Response.json({ ok: true, data: result });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});