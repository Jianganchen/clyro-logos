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

  subscriptionPlans: defineTable({
    name: v.union(v.literal("free"), v.literal("starter"), v.literal("pro")),
    monthlyQuota: v.number(),
    price: v.number(),
  }),
});
