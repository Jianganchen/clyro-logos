import { Check } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export function PricingCards() {
  const plans = [
    {
      name: "Free",
      description: "Perfect for trying out our service",
      price: "$0",
      features: ["5 images per day", "Standard resolution", "Basic styles", "24-hour support"],
      cta: "Get Started",
      popular: false,
    },
    {
      name: "Pro",
      description: "For professionals and serious creators",
      price: "$19",
      features: [
        "100 images per day",
        "High resolution",
        "All styles",
        "Priority support",
        "Commercial usage",
        "No watermarks",
      ],
      cta: "Start Free Trial",
      popular: true,
    },
    {
      name: "Enterprise",
      description: "For teams and businesses",
      price: "$49",
      features: [
        "Unlimited images",
        "Maximum resolution",
        "Custom styles",
        "Dedicated support",
        "API access",
        "Team collaboration",
        "Custom branding",
      ],
      cta: "Contact Sales",
      popular: false,
    },
  ]

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
              <span className="ml-1 text-2xl font-medium text-muted-foreground">/month</span>
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
            <Link href="/signup" className="w-full">
              <Button variant={plan.popular ? "default" : "outline"} className="w-full" size="lg">
                {plan.cta}
              </Button>
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

