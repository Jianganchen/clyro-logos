import { Cpu, Image, Zap, Lock, Palette, Repeat } from "lucide-react"

export function Features() {
  const features = [
    {
      icon: <Cpu className="h-6 w-6" />,
      title: "Advanced AI",
      description: "Powered by state-of-the-art machine learning models for high-quality image generation.",
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Fast Generation",
      description:
        "Create beautiful images in seconds, not minutes. Our optimized infrastructure ensures quick results.",
    },
    {
      icon: <Palette className="h-6 w-6" />,
      title: "Style Control",
      description: "Choose from various artistic styles or create your own unique aesthetic with detailed prompts.",
    },
    {
      icon: <Image className="h-6 w-6" />,
      title: "High Resolution",
      description: "Generate images in high resolution suitable for printing, social media, or professional use.",
    },
    {
      icon: <Repeat className="h-6 w-6" />,
      title: "Unlimited Variations",
      description: "Create multiple variations of your images to find the perfect one for your needs.",
    },
    {
      icon: <Lock className="h-6 w-6" />,
      title: "Private & Secure",
      description:
        "Your prompts and generated images are kept private and secure. We respect your intellectual property.",
    },
  ]

  return (
    <div className="mx-auto max-w-5xl">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold tracking-tighter">Powerful features for creative minds</h2>
        <p className="mx-auto mt-4 max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400">
          Everything you need to bring your imagination to life with AI-generated images.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature, i) => (
          <div key={i} className="flex flex-col gap-2 rounded-lg border p-6 shadow-sm transition-all hover:shadow-md">
            <div className="text-primary">{feature.icon}</div>
            <h3 className="font-semibold">{feature.title}</h3>
            <p className="text-sm text-muted-foreground">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

