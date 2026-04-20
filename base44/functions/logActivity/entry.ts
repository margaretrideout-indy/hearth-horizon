import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { action_type, metadata } = await req.json();

    if (!action_type) {
      return Response.json({ error: 'action_type is required' }, { status: 400 });
    }

    await base44.asServiceRole.entities.SystemLog.create({
      user_id: user.id,
      user_email: user.email,
      action_type,
      tier: user.tier || 'unknown',
      metadata: metadata || {}
    });

    return Response.json({ ok: true });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});