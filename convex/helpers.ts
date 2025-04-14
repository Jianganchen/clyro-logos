import { QueryCtx } from "./_generated/server";

export async function userByClerkUserIdHelper(
  ctx: QueryCtx,
  clerkUserId: string
) {
  return await ctx.db
    .query("users")
    .withIndex("byClerkUserId", (q) => q.eq("clerkUserId", clerkUserId))
    .unique();
}
