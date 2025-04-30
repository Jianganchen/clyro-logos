import { Polar } from "@polar-sh/sdk";
import { action } from "./_generated/server";
import { v } from "convex/values";

export const getCheckoutUrl = action({
  args: {
    priceId: v.any(),
    userId: v.string(),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }

    const metadata = {
      clerkUserId: args.userId,
      userEmail: identity.email,
      tokenIdentifier: identity.subject,
    };

    const checkout = await createCheckout({
      customerEmail: identity.email!,
      priceId: args.priceId,
      successUrl: `${process.env.FRONTEND_URL}/success`,
      metadata: metadata as Record<string, string>,
    });

    return checkout.url;
  },
});

const createCheckout = async ({
  customerEmail,
  priceId,
  successUrl,
  metadata,
}: {
  customerEmail: string;
  priceId: string;
  successUrl: string;
  metadata?: Record<string, string>;
}) => {
  if (!process.env.POLAR_ACCESS_TOKEN) {
    throw new Error("POLAR_ACCESS_TOKEN is not configured");
  }

  const polar = new Polar({
    server: "sandbox",
    accessToken: process.env.POLAR_ACCESS_TOKEN,
  });

  const result = await polar.checkouts.create({
    products: [priceId],
    successUrl,
    customerEmail,
    metadata,
  });

  return result;
};
