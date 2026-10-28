import Image from "next/image";

const features = [
  {
    icon: "/images/ShieldCheck.png",
    title: "Safe & Secure",
    body: "Your safety is our priority with comprehensive travel insurance and 24/7 support.",
  },
  {
    icon: "/images/MapTrifold.png",
    title: "Expert Guides",
    body: "Local experts who bring destinations to life with authentic cultural insights.",
  },
  {
    icon: "/images/Headset.png",
    title: "24/7 Support",
    body: "Round-the-clock customer service to assist you wherever your journey takes you.",
  },
];

export function WhyChooseUs() {
  return (
    <section className="bg-[#e8f9fa] py-24">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="text-balance text-center font-[family-name:var(--font-playfair)] text-5xl font-medium text-foreground">
          Why Choose Wanderlust
        </h2>
        <p className="mt-3 text-center text-lg text-muted-foreground">
          Your trusted partner for exceptional travel experiences
        </p>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {features.map((feature) => (
            <div key={feature.title} className="bg-[#fbfaf8] p-8">
              <Image src={feature.icon} alt="" width={40} height={40} />
              <h3 className="mt-6 font-[family-name:var(--font-playfair)] text-3xl text-foreground">
                {feature.title}
              </h3>
              <p className="mt-4 text-muted-foreground">{feature.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
