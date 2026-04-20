import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

Deno.serve(async (req) => {
  const base44 = createClientFromRequest(req);

  const body = await req.json();
  const { vault } = body || {};

  const hasProfile = vault && (
    (vault.lexicon && vault.lexicon.length > 0) ||
    (vault.ethics && Object.values(vault.ethics).some(v => v !== 50)) ||
    vault.resume
  );

  let prompt;

  if (hasProfile) {
    const lexiconSummary = vault.lexicon?.slice(0, 5).join(', ') || 'purpose-led outcomes';
    const ethicsSummary = vault.ethics
      ? `Reciprocity: ${vault.ethics.reciprocity}%, Transparency: ${vault.ethics.transparency}%, Agency: ${vault.ethics.agency}%`
      : 'balanced ethics';
    const targetRole = vault.dream_role || vault.archetype || 'mission-driven professional role';

    prompt = `You are a career alignment specialist helping a public-sector professional (educator/healthcare/government) transition to the private sector in Canada in 2026.

User Profile:
- Target Role: ${targetRole}
- Core Lexicon: ${lexiconSummary}
- Ethics Profile: ${ethicsSummary}
- Standing: ${vault.standing || 'Seedling'}

Find 5 real, high-alignment job openings that would suit this person in 2026. Focus on roles in ethical tech, B-corps, mission-driven startups, social enterprises, or purpose-led organizations.

For each job return:
- title: specific job title
- company: real company name known for ethical practices
- match_percent: a number 70-98 based on alignment
- location: city/remote status (prefer Canadian or remote)
- hearth_insight: ONE sentence explaining the specific value alignment (mention reciprocity, transparency, or agency)
- link: a plausible job board URL (LinkedIn, Indeed, or company careers page)

Return as JSON.`;
  } else {
    prompt = `Find 5 compelling job openings in 2026 for professionals interested in Ethical Tech, Systems Architecture, or Digital Stewardship roles. Focus on Canadian market or remote-friendly positions.

For each job return:
- title: specific job title
- company: real company name known for ethical practices  
- match_percent: a number 75-95
- location: city/remote status
- hearth_insight: ONE sentence about why this role matters for mission-driven professionals
- link: a plausible job board URL

Return as JSON.`;
  }

  const result = await base44.asServiceRole.integrations.Core.InvokeLLM({
    prompt,
    add_context_from_internet: true,
    response_json_schema: {
      type: "object",
      properties: {
        jobs: {
          type: "array",
          items: {
            type: "object",
            properties: {
              title: { type: "string" },
              company: { type: "string" },
              match_percent: { type: "number" },
              location: { type: "string" },
              hearth_insight: { type: "string" },
              link: { type: "string" }
            }
          }
        },
        mode: { type: "string" }
      }
    }
  });

  return Response.json({
    jobs: result.jobs || [],
    mode: hasProfile ? 'personalized' : 'standalone'
  });
});