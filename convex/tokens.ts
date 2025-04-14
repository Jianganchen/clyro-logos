import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

import { userByClerkUserIdHelper as userByClerkUserId } from "./helpers";

export const getUserTokens = query({
  args: {
    clerkUserId: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await userByClerkUserId(ctx, args.clerkUserId);

    if (!user) {
      throw new Error("User not found");
    }

    return {
      tokens: user.tokens,
    };
  },
});

export const subtractUserTokens = mutation({
  args: {
    clerkUserId: v.string(),
    amount: v.number(),
  },
  handler: async (ctx, args) => {
    const user = await userByClerkUserId(ctx, args.clerkUserId);

    if (!user) {
      throw new Error("User not found");
    }

    if (user.tokens < args.amount) {
      throw new Error("Not enough tokens");
    }

    await ctx.db.patch(user._id, {
      tokens: user.tokens - args.amount,
    });

    return {
      success: true,
    };
  },
});
