import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    email: v.string(),
    clerkUserId: v.string(),
    username: v.optional(v.string()),
    subscription: v.union(
      v.literal("free"),
      v.literal("starter"),
      v.literal("pro")
    ),
    tokens: v.number(),
  }).index("byClerkUserId", ["clerkUserId"]),

  images: defineTable({
    userId: v.id("users"),
    imageUrl: v.string(),
    prompt: v.string(),
    createdAt: v.number(),
  }).index("byUser", ["userId"]),

  subscriptions: defineTable({
    clerkUserId: v.string(),
    polarId: v.string(),
    polarPriceId: v.string(),
    status: v.string(),
    currentPeriodStart: v.optional(v.number()),
    currentPeriodEnd: v.optional(v.number()),
    cancelAtPeriodEnd: v.optional(v.boolean()),
    startedAt: v.optional(v.number()),
    endsAt: v.optional(v.number()),
    endedAt: v.optional(v.number()),
    canceledAt: v.optional(v.number()),
    customerCancellationReason: v.optional(v.string()),
    customerCancellationComment: v.optional(v.string()),
    metadata: v.optional(v.any()),
  })
    .index("byClerkUserId", ["clerkUserId"])
    .index("byPolarId", ["polarId"]),
});
