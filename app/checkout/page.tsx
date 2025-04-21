"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CheckCircle2, ArrowRight, ImageIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Logo } from "@/components/logo";
// import { toast } from "sonner";
// import { useEffect } from "react";
// import { useClerk } from "@clerk/nextjs";
// import { useSearchParams } from "next/navigation";
// import { retrieveStripeCheckoutSession } from '@/lib/actions'

export default function PaymentSuccessPage() {
  const router = useRouter();
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      router.push("/dashboard");
    }
  }, [countdown, router]);

  // const { session } = useClerk();
  // const searchParams = useSearchParams();
  // const sessionId = searchParams.get("sessionId");

  // useEffect(() => {
  //   if (!sessionId || !session) return

  //   retrieveStripeCheckoutSession(sessionId).then(({ success, error }) => {
  //     if (success) {
  //       session?.reload()
  //     }

  //     if (error) {
  //       toast.error('Failed to retrieve checkout session!')
  //     }
  //   })
  // }, [sessionId, session])

  return (
    <div className="flex min-h-screen flex-col bg-muted/50">
      <header className="border-b bg-background">
        <div className="container flex h-16 items-center">
          <Link href="/" className="flex items-center gap-2">
            <Logo className="w-9 h-9" />
            <span className="text-xl font-bold">ClyroLogo</span>
          </Link>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-4">
        <div className="container max-w-md">
          <Card className="border-2 border-primary/20">
            <CardHeader className="pb-4 text-center">
              <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
                <CheckCircle2 className="h-10 w-10 text-primary" />
              </div>
              <CardTitle className="text-2xl">Payment Successful!</CardTitle>
            </CardHeader>

            <CardContent className="text-center space-y-4">
              <p>Thank you for your purchase!</p>

              <div className="rounded-lg bg-muted p-4 flex items-center gap-3">
                <div className="bg-background rounded-full p-2">
                  <ImageIcon className="h-6 w-6 text-primary" />
                </div>
                <div className="text-left">
                  <p className="font-medium">Start creating now</p>
                  <p className="text-sm text-muted-foreground">
                    Your AI image generation journey begins!
                  </p>
                </div>
              </div>
            </CardContent>

            <CardFooter className="flex flex-col gap-4 pt-2">
              <Button asChild className="w-full">
                <Link href="/dashboard">
                  Go to Dashboard <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <p className="text-center text-sm text-muted-foreground">
                Auto-redirecting in {countdown} seconds...
              </p>
            </CardFooter>
          </Card>

          <div className="mt-8 text-center">
            <p className="text-sm text-muted-foreground">
              Having trouble?{" "}
              <Link
                href="/support"
                className="text-primary underline-offset-4 hover:underline"
              >
                Contact support
              </Link>
            </p>
          </div>
        </div>
      </main>

      <footer className="border-t py-6">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex items-center gap-2">
            <Logo className="w-9 h-9" />
            <span className="text-xl font-bold">ClyroLogo</span>
          </div>
          <p className="text-center text-sm text-muted-foreground md:text-left">
            &copy; {new Date().getFullYear()} ClyroLogo. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
