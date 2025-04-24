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
import { api } from "@/lib/polar";
import Link from "next/link";

export async function PricingCards() {
  const products = await api.products.list({ isArchived: false });
  console.log(products);

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
      {products.result.items.map((plan) => (
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
              <Link href={`/checkout?products=${plan.id}`} key={plan.id}>
                <Button variant={"outline"} className="w-full" size="lg">
                  Get started
                </Button>
              </Link>
            </div>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
