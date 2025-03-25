import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { PricingCards } from "@/components/pricing-cards";
import { Features } from "@/components/features";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from "@clerk/nextjs";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">ImageAI</span>
          </div>
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="#features"
              className="text-sm font-medium hover:underline"
            >
              Features
            </Link>
            <Link
              href="#pricing"
              className="text-sm font-medium hover:underline"
            >
              Pricing
            </Link>
            <Link href="#faq" className="text-sm font-medium hover:underline">
              FAQ
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <SignedOut>
              <SignInButton>
                <Button variant="ghost" size="sm">
                  Log in
                </Button>
              </SignInButton>
              <SignUpButton>
                <Button size="sm">Sign up</Button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </div>
      </header>
      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-20 md:py-28">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center gap-4 text-center">
              <div className="space-y-2">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl">
                  Generate stunning images with AI
                </h1>
                <p className="mx-auto max-w-[700px] text-gray-500 md:text-xl dark:text-gray-400">
                  Create beautiful, unique images in seconds with our advanced
                  AI image generator.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <SignInButton>
                  <Button size="lg" className="gap-1.5">
                    Get started
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </SignInButton>
                <Link href="#examples">
                  <Button size="lg" variant="outline">
                    View examples
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Example Images */}
        <section id="examples" className="py-12 md:py-16 bg-muted/50">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter text-center mb-8">
              Examples of what you can create
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="overflow-hidden rounded-lg bg-background shadow"
                >
                  <div className="aspect-square w-full bg-muted">
                    <img
                      src={`/placeholder.svg?height=400&width=400`}
                      alt={`Example generated image ${i}`}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <p className="text-sm text-muted-foreground">
                      {`"A ${
                        i % 2 === 0
                          ? "futuristic cityscape"
                          : "serene landscape"
                      } with ${
                        i % 3 === 0 ? "vibrant colors" : "subtle lighting"
                      }"`}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-12 md:py-16">
          <div className="container px-4 md:px-6">
            <Features />
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-12 md:py-16 bg-muted/50">
          <div className="container px-4 md:px-6">
            <div className="mb-10 text-center">
              <h2 className="text-3xl font-bold tracking-tighter">
                Simple, transparent pricing
              </h2>
              <p className="mx-auto mt-4 max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
                Choose the plan that&apos;s right for you and start creating
                amazing images today.
              </p>
            </div>
            <PricingCards />
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="py-12 md:py-16">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter text-center mb-8">
              Frequently Asked Questions
            </h2>
            <div className="mx-auto max-w-[800px] space-y-4">
              {[
                {
                  question: "How does the AI image generator work?",
                  answer:
                    "Our AI image generator uses advanced machine learning models to create images based on your text prompts. Simply describe what you want to see, and our AI will generate a unique image for you.",
                },
                {
                  question: "Can I use the generated images commercially?",
                  answer:
                    "Yes, all images generated on our platform are royalty-free and can be used for both personal and commercial purposes.",
                },
                {
                  question: "How many images can I generate?",
                  answer:
                    "The number of images you can generate depends on your subscription plan. Free users can generate up to 5 images per day, while paid plans offer higher limits.",
                },
                {
                  question: "Can I edit the generated images?",
                  answer:
                    "Yes, you can download the generated images and edit them using your preferred image editing software.",
                },
              ].map((faq, i) => (
                <div key={i} className="rounded-lg border p-4">
                  <h3 className="font-medium">{faq.question}</h3>
                  <p className="mt-2 text-muted-foreground">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t py-6 md:py-8">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <span className="font-semibold">ImageAI</span>
          </div>
          <p className="text-center text-sm text-muted-foreground md:text-left">
            &copy; {new Date().getFullYear()} ImageAI. All rights reserved.
          </p>
          <div className="flex gap-4">
            <Link
              href="#"
              className="text-sm text-muted-foreground hover:underline"
            >
              Terms
            </Link>
            <Link
              href="#"
              className="text-sm text-muted-foreground hover:underline"
            >
              Privacy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
