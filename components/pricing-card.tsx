"use client";

import { Check } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import { Product } from "@polar-sh/sdk/models/components/product.js";
import { useUser } from "@clerk/clerk-react";
import { useRouter } from "next/navigation";
import { useAction } from "convex/react";
import { api } from "@/convex/_generated/api";

export function PricingCard({ plan }: { plan: Product }) {
  const { user } = useUser();
  const router = useRouter();
  const getCheckoutUrl = useAction(api.checkout.getCheckoutUrl);

  const handleCheckout = async (planId: string, userId: string) => {
    if (!planId) return;

    try {
      const checkout = await getCheckoutUrl({
        priceId: planId,
        userId: userId,
      });
      window.location.href = checkout;
    } catch (error) {
      console.error("Failed to get checkout URL:", error);
    }
  };

  const handleButtonClick = (planId: string, userId: string | undefined) => {
    if (!userId) {
      router.push("/sign-in");
      return;
    }
    handleCheckout(planId, userId);
  };

  return (
    <Card key={plan.name} className="flex flex-col">
      <CardHeader>
        <CardTitle>{plan.name}</CardTitle>
        <CardDescription>{plan.description}</CardDescription>
        <div className="mt-4 flex items-baseline text-5xl font-extrabold">
          {"priceAmount" in plan.prices[0]
            ? plan.prices[0].priceAmount / 100
            : "Free"}
          <span className="ml-1 text-2xl font-medium text-muted-foreground">
            /month
          </span>
        </div>
      </CardHeader>
      <CardContent className="flex-1">
        <ul className="space-y-3">
          {plan.benefits.map((benefit) => (
            <li key={benefit.id} className="flex items-center gap-2">
              <Check className="h-4 w-4 text-primary" />
              <span className="text-sm">{benefit.description}</span>
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <div className="w-full">
          <Button
            variant={"outline"}
            className="w-full"
            size="lg"
            onClick={() => handleButtonClick(plan.id, user?.id)}
          >
            Get started
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
