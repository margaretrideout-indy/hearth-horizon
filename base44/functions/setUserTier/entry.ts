import { createClientFromRequest } from 'npm:@base44/sdk@0.8.25';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();

    if (user?.role !== 'admin') {
      return Response.json({ error: 'Forbidden' }, { status: 403 });
    }

    const { target_user_id, tier } = await req.json();

    if (!target_user_id || !tier) {
      return Response.json({ error: 'target_user_id and tier are required' }, { status: 400 });
    }

    await base44.asServiceRole.entities.User.update(target_user_id, { tier });

    // Log the admin action
    await base44.asServiceRole.entities.SystemLog.create({
      user_id: user.id,
      user_email: user.email,
      action_type: 'Admin: Tier Adjusted',
      tier: user.tier || 'admin',
      metadata: { target_user_id, new_tier: tier }
    });

    return Response.json({ ok: true });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});