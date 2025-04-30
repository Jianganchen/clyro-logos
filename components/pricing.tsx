import { api } from "@/lib/polar";
import { PricingCard } from "./pricing-card";

export async function Pricing() {
  const products = await api.products.list({ isArchived: false });
  console.log(products);

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
      {products.result.items.map((plan) => (
        <PricingCard key={plan.id} plan={plan as any} />
      ))}
    </div>
  );
}
