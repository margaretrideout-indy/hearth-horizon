import { createClient } from "npm:@base44/sdk";

// Scheduled automation: runs on the 1st of every month at 00:00 UTC
// Resets seedling_upload_count to 0 for all Seedling-tier users

Deno.serve(async (req) => {
  const base44 = createClient({ serviceRoleKey: Deno.env.get("SERVICE_ROLE_KEY") });

  // Reset seedling_upload_count for all Seedling users
  const result = await base44.asServiceRole.entities.User.updateMany(
    { subscription_tier: "Seedling" },
    { $set: { seedling_upload_count: 0 } }
  );

  console.log("Monthly Seedling upload count reset complete.", result);

  return Response.json({ success: true, result });
});