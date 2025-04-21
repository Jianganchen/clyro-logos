import Stripe from "stripe";

// Test mode:
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY_TEST as string);

// export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);
