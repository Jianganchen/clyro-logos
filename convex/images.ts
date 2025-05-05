import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

import { userByClerkUserIdHelper as userByClerkUserId } from "./helpers";

export const generateUploadUrl = mutation({
  handler: async (ctx) => {
    return await ctx.storage.generateUploadUrl();
  },
});

export const getUserImages = query({
  args: {
    clerkUserId: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await userByClerkUserId(ctx, args.clerkUserId);

    if (!user) {
      throw new Error("User not found");
    }

    const images = await ctx.db
      .query("images")
      .withIndex("byUser", (q) => q.eq("userId", user._id))
      .collect();

    return Promise.all(
      images.map(async (image) => ({
        ...image,
        imageUrl: await ctx.storage.getUrl(image.storageId),
      }))
    );
  },
});

export const addUserImage = mutation({
  args: {
    clerkUserId: v.string(),
    storageId: v.id("_storage"),
    prompt: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await userByClerkUserId(ctx, args.clerkUserId);

    if (!user) {
      throw new Error("User not found");
    }

    await ctx.db.insert("images", {
      userId: user._id,
      storageId: args.storageId,
      prompt: args.prompt,
      createdAt: Date.now(),
    });
  },
});

export const deleteUserImage = mutation({
  args: {
    imageId: v.id("images"),
  },
  handler: async (ctx, args) => {
    const image = await ctx.db.get(args.imageId);

    if (!image) {
      throw new Error("Image not found");
    }

    await ctx.db.delete(args.imageId);

    return {
      success: true,
    };
  },
});
