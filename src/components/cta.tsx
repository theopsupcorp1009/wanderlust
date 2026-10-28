import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CTA() {
  return (
    <section className="relative isolate flex min-h-[440px] items-center justify-center">
      <Image
        src="/images/CTA.png"
        alt="Aerial top-down view of a plane flying over a tropical coastline"
        fill
        sizes="100vw"
        className="-z-10 object-cover"
      />

      <div className="flex flex-col items-center px-6 text-center">
        <h2 className="text-balance font-[family-name:var(--font-playfair)] text-5xl font-medium text-white">
          Ready To Start Your Journey?
        </h2>
        <p className="mt-3 text-lg text-white/85">
          Join thousands of travelers who have discovered the world with us
        </p>

        <Button className="mt-14 h-14 rounded-md bg-white px-8 text-xs font-semibold tracking-widest text-neutral-900 uppercase hover:bg-slate-100">
          Book Your Trip Today
          <ArrowRight data-icon="inline-end" />
        </Button>
      </div>
    </section>
  );
}
