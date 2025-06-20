import { Images, Settings2, SquareTerminal } from "lucide-react";
import { Plan } from "./definitions";

export const iconMap = {
  "icon-square-terminal": SquareTerminal,
  "icon-images": Images,
  "icon-settings2": Settings2,
} as const;

export const logos = [
  {
    src: "/sample-logos/logo1.png",
    alt: "Logo 1",
    prompt: "Flowing Wave; A smooth, flowing wave with gradient blue color",
  },
  {
    src: "/sample-logos/logo2.png",
    alt: "Logo 2",
    prompt:
      "a logo that is similar to starbucks, but with a cute cat's face in the middle",
  },
  {
    src: "/sample-logos/logo3.png",
    alt: "Logo 3",
    prompt:
      "An abstract, flowing, and colorful logo with smooth, ribbon-like shapes forming a dynamic and symmetrical design. The logo uses overlapping gradients of purple, pink, and blue tones, creating a vibrant and modern feel. The style is sleek, glossy, and organic, resembling a wave or a petal, with a soft shadow and a white background. High-end, futuristic branding.",
  },
  {
    src: "/sample-logos/logo4.png",
    alt: "Logo 4",
    prompt:
      "A minimalistic, abstract logo featuring three interlocking, curved black shapes arranged in a circular, rotational pattern. The design is bold, simple, and geometric, giving a sense of motion and connection. Flat vector style, modern and tech-oriented branding, using clean lines and strong negative space.",
  },
  {
    src: "/sample-logos/logo5.png",
    alt: "Logo 5",
    prompt:
      "A minimalistic and adorable fox logo in a flat, cartoon style. The fox is bright orange with simple shapes and bold outlines, featuring a white face mask and tail tip. The fox is standing upright and holding an open book, giving it a playful, educational, and approachable feel. Flat vector design, clean and modern aesthetic.",
  },
  {
    src: "/sample-logos/logo6.png",
    alt: "Logo 6",
    prompt:
      "An abstract, minimalistic deer logo in a flat vector style. The deer is designed with bold, geometric, and sharp shapes, featuring stylized antlers and a dynamic pose. The logo uses a strong earthy orange color as the background and a white silhouette for the deer, enclosed within a rounded rectangle. The overall style feels elegant, timeless, and sophisticated, with influences from ancient art and modern minimalism.",
  },
];

export const ImageGenPrice = 10;

export const pricingPlans: Plan[] = [
  {
    name: "Free",
    planId: "price_1RGOZXGuc4UupVSmURXx7k1A",
    testPlanId: "price_1REYgUGuc4UupVSm894dgCZj",
    description: "Perfect for trying out our service",
    price: "$0",
    features: [
      "5 images per day",
      "Standard resolution",
      "Basic styles",
      "24-hour support",
    ],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Pro",
    // Change planId later
    planId: "price_1RGOZXGuc4UupVSmURXx7k1A",
    testPlanId: "price_1REYgUGuc4UupVSm894dgCZj",
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
    cta: "Get Started",
    popular: true,
  },
  {
    name: "Enterprise",
    // Change planId later
    planId: "price_1RGOZXGuc4UupVSmURXx7k1A",
    testPlanId: "price_1REYgUGuc4UupVSm894dgCZj",
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
    cta: "Get Started",
    popular: false,
  },
];
