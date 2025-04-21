"use client";

import { Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { pricingPlans } from "@/lib/data";
import { Plan } from "@/lib/definitions";
import { createStripeCheckoutSession } from "@/lib/actions";
import { loadStripe } from "@stripe/stripe-js";

// Test Mode
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY_TEST as string
);

// const stripePromise = loadStripe(
//   process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY as string
// );

export function PricingCards() {
  const plans = pricingPlans;

  async function handleCheckout(plan: Plan) {
    try {
      // Test Mode
      const lineItems = [
        {
          price: plan.testPlanId,
          quantity: 1,
        },
      ];

      // const lineItems = [
      //   {
      //     price: plan.planId,
      //     quantity: 1,
      //   },
      // ];

      const { sessionId, checkoutError } =
        await createStripeCheckoutSession(lineItems);

      if (!sessionId || checkoutError) {
        throw new Error(checkoutError || "Failed to create checkout session!");
      }

      const stripe = await stripePromise;
      if (!stripe) {
        throw new Error("Failed to load Stripe");
      }

      const { error } = await stripe.redirectToCheckout({ sessionId });

      if (error) {
        if (error instanceof Error) throw new Error(error.message);
      } else {
        throw error;
      }
    } catch (error) {
      // Change this to toast or notification later
      console.log("Error during checkout:", error);
    }
  }

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
      {plans.map((plan) => (
        <Card
          key={plan.name}
          className={`flex flex-col ${
            plan.popular
              ? "border-primary shadow-md relative before:absolute before:inset-0 before:rounded-lg before:border-2 before:border-primary before:content-[''] before:pointer-events-none"
              : ""
          }`}
        >
          {plan.popular && (
            <div className="absolute -top-3 left-0 right-0 mx-auto w-fit rounded-full bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
              Most Popular
            </div>
          )}
          <CardHeader>
            <CardTitle>{plan.name}</CardTitle>
            <CardDescription>{plan.description}</CardDescription>
            <div className="mt-4 flex items-baseline text-5xl font-extrabold">
              {plan.price}
              <span className="ml-1 text-2xl font-medium text-muted-foreground">
                /month
              </span>
            </div>
          </CardHeader>
          <CardContent className="flex-1">
            <ul className="space-y-3">
              {plan.features.map((feature) => (
                <li key={feature} className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-primary" />
                  <span className="text-sm">{feature}</span>
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter>
            <div className="w-full">
              <Button
                variant={plan.popular ? "default" : "outline"}
                className="w-full"
                size="lg"
                onClick={() => handleCheckout(plan)}
              >
                {plan.cta}
              </Button>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
