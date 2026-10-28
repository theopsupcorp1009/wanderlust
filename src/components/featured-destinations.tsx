import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { FeaturedCarousel } from "@/components/featured-carousel";
import type { Destination } from "@/lib/types";

export async function FeaturedDestinations() {
  let destinations: Destination[] = [];

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/featured-destinations`);

    if (res.ok) {
      const data = await res.json();
      destinations = Array.isArray(data) ? data : [];
    }
  } catch {
    // Backend unreachable — fall through to the empty state
  }

  return (
    <section className="py-16 sm:py-20 lg:py-24">
      <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-between gap-x-8 gap-y-6 px-4 sm:px-6 lg:px-8">
        <div>
          <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">
            Featured Destinations
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Handpicked travel experiences for the adventure seekers
          </p>
        </div>

        <Link
          href="/destinations"
          className="inline-flex h-11 items-center gap-2 rounded-md border border-border px-6 text-xs font-semibold tracking-widest text-foreground uppercase transition-colors hover:bg-muted"
        >
          All Destinations
          <ArrowRight data-icon="inline-end" />
        </Link>
      </div>

      <FeaturedCarousel destinations={destinations} />
    </section>
  );
}
