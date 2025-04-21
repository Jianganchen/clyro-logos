"use server";

import { currentUser } from "@clerk/nextjs/server";
import { headers } from "next/headers";
import Stripe from "stripe";
import { stripe } from "@/lib/stripe";

type LineItem = Stripe.Checkout.SessionCreateParams.LineItem;

export async function createStripeCheckoutSession(lineItems: LineItem[]) {
  const headersList = await headers();
  const origin = headersList.get("origin");

  const user = await currentUser();
  if (!user) {
    return { sessionId: null, checkoutError: "Unauthorized" };
  }

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    line_items: lineItems,
    success_url: `${origin}/checkout?sessionId={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/?canceled=true`,
    customer_email: user.emailAddresses[0].emailAddress,
  });

  return { sessionId: session.id, checkoutError: null };
}

// export async function retrieveStripeCheckoutSession(sessionId: string) {
//     if (!sessionId) {
//         return { success: false, error: "No session ID provided"}
//     }

//     const user = await currentUser();
//     if (!user) {
//         return { success: false, error: "Unauthorized"}
//     }

//     const previousCheckoutSessionIds = Array.isArray(user.publicMetadata.checkoutSessionIds) ? user.publicMetadata.check
// }
