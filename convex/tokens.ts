import { v } from "convex/values";
import { query } from "./_generated/server";

export const getUserTokens = query({
  args: {
    clerkUserId: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("byClerkUserId", (q) => q.eq("clerkUserId", args.clerkUserId))
      .unique();

    if (!user) {
      throw new Error("User not found");
    }

    return {
      tokens: user.tokens,
    };
  },
});
