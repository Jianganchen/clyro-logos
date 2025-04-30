import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { auth } from "@clerk/nextjs/server";
import { fetchQuery } from "convex/nextjs";
import Link from "next/link";

export default async function SuccessPage() {
  const { userId, redirectToSignIn } = await auth();
  console.log("current user:", userId);

  if (!userId) return redirectToSignIn();

  const subscriptionStatus = await fetchQuery(
    api.subscriptions.getUserSubscriptionStatus,
    { clerkUserId: userId }
  );
  const hasActiveSubscription =
    subscriptionStatus?.hasActiveSubscription ?? false;

  return (
    <main className="flex min-w-screen flex-col items-center justify-between">
      {hasActiveSubscription ? (
        <h1 className="mt-[35vh] mb-3 scroll-m-20  text-5xl font-semibold tracking-tight transition-colors first:mt-0">
          Subscription Successful 🎉
        </h1>
      ) : (
        <h1 className="mt-[35vh] mb-3 scroll-m-20  text-5xl font-semibold tracking-tight transition-colors first:mt-0">
          You Can Subscribe Now
        </h1>
      )}
      <Link
        href={hasActiveSubscription ? "/dashboard" : "/pricing"}
        className="mt-4"
      >
        <Button>
          {hasActiveSubscription ? "Access Dashboard" : "View Pricing"}
        </Button>
      </Link>
    </main>
  );
}
