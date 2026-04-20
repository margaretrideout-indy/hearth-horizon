import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

Deno.serve(async (req) => {
  const base44 = createClientFromRequest(req);

  const body = await req.json();
  const { phrase, resumeContext, ethics } = body || {};

  if (!phrase || phrase.length < 3) {
    return Response.json({ identities: [] });
  }

  const ethicsContext = ethics
    ? `User's ethics profile: Reciprocity ${ethics.reciprocity}%, Transparency ${ethics.transparency}%, Agency ${ethics.agency}%.`
    : '';

  const resumeSnippet = resumeContext
    ? `Resume context: "${resumeContext.substring(0, 300)}"`
    : '';

  const prompt = `You are a career translation specialist helping a public-sector professional reframe their experience for the private sector.

Input phrase: "${phrase}"
${resumeSnippet}
${ethicsContext}

Generate three powerful professional identity statements that reframe this experience:

1. STEWARD identity: Focus on ownership, custodianship, and sustainable stewardship of outcomes
2. ARCHITECT identity: Focus on designing systems, frameworks, and scalable structures  
3. CULTIVATOR identity: Focus on nurturing relationships, growth, and human-centred development

Each identity should:
- Be 5-10 words, punchy and corporate-resonant
- Start with an action verb (Stewarding, Architecting, Cultivating, Orchestrating, etc.)
- Replace bureaucratic language with outcome-focused language
- Feel authentic to someone transitioning from public service

Return as JSON.`;

  const result = await base44.asServiceRole.integrations.Core.InvokeLLM({
    prompt,
    response_json_schema: {
      type: "object",
      properties: {
        identities: {
          type: "array",
          items: {
            type: "object",
            properties: {
              type: { type: "string" },
              hearth: { type: "string" },
              context: { type: "string" }
            }
          }
        }
      }
    }
  });

  return Response.json({ identities: result.identities || [] });
});