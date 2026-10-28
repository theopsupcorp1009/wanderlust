"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Calendar,
  MapPin,
  Star,
} from "lucide-react";
import type { Destination } from "@/lib/types";

type Metrics = {
  page: number;
  total: number;
  /** Distance between the left edges of two consecutive cards, in px. */
  step: number;
  /** Cards fully visible in the viewport at once. */
  perView: number;
};

const SINGLE_PAGE: Metrics = { page: 0, total: 1, step: 0, perView: 1 };

function clamp(value: number, min: number, max: number) {
  return Math.min(Math.max(value, min), max);
}

/** Measurement happens against the rendered DOM — the working data for the scroll positions and the page count. */
function readMetrics(track: HTMLUListElement | null): Metrics {
  if (!track) return SINGLE_PAGE;

  const items = Array.from(track.children) as HTMLElement[];
  if (items.length === 0) return SINGLE_PAGE;

  const step =
    items.length > 1 ? items[1].offsetLeft - items[0].offsetLeft : 0;
  if (step <= 0) return SINGLE_PAGE;

  const perView = Math.max(1, Math.round(track.clientWidth / step));
  const total = Math.max(1, Math.ceil(items.length / perView));
  const page = clamp(
    Math.round(track.scrollLeft / step / perView),
    0,
    total - 1
  );

  return { page, total, step, perView };
}

function FeaturedCard({ destination }: { destination: Destination }) {
  return (
    <article className="flex h-full flex-col">
      <div className="relative overflow-hidden rounded-md bg-muted">
        <img
          src={destination.imageUrl || "/images/placeholder.svg"}
          alt={destination.name}
          loading="lazy"
          className="aspect-[3/2] w-full object-cover"
        />
        {/* Rating is not part of the API yet — decorative default */}
        <span className="absolute right-3 top-3 inline-flex items-center gap-1.5 rounded-md bg-black/75 px-2.5 py-1 text-xs font-medium text-white">
          4.5
          <Star className="size-3 fill-current" />
        </span>
      </div>

      <div className="mt-4 flex flex-1 flex-col gap-2">
        <p className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
          <MapPin className="size-4 shrink-0" />
          {destination.country}
        </p>

        <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
          <h3 className="font-[family-name:var(--font-playfair)] text-2xl font-medium">
            {destination.name}
          </h3>
          <p className="text-2xl font-bold leading-none whitespace-nowrap">
            ${Number(destination.price).toLocaleString("en-US")}
            <span className="text-xs font-normal text-muted-foreground">
              /Person
            </span>
          </p>
        </div>

        <p className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
          <Calendar className="size-4 shrink-0" />
          {destination.duration}
        </p>

        <Link
          href={`/destinations/${destination._id}`}
          className="mt-auto inline-flex w-fit items-center gap-1.5 pt-4 text-xs font-semibold tracking-widest text-cyan-700 underline underline-offset-4 transition-colors hover:text-cyan-800"
        >
          BOOK NOW
          <ArrowUpRight className="size-3.5" />
        </Link>
      </div>
    </article>
  );
}

export function FeaturedCarousel({ destinations }: { destinations: Destination[] }) {
  const trackRef = useRef<HTMLUListElement>(null);
  const [metrics, setMetrics] = useState<Metrics>(SINGLE_PAGE);

  // Align the first card with the max-w-7xl container edge, with the row
  // bleeding off the opposite side of the viewport.
  const insetBase = "ps-[calc(max(100vw-80rem,0rem)/2+1rem)] pe-[calc(max(100vw-80rem,0rem)/2+1rem)] scroll-ps-[calc(max(100vw-80rem,0rem)/2+1rem)]";
  const insetSm = "sm:ps-[calc(max(100vw-80rem,0rem)/2+1.5rem)] sm:pe-[calc(max(100vw-80rem,0rem)/2+1.5rem)] sm:scroll-ps-[calc(max(100vw-80rem,0rem)/2+1.5rem)]";
  const insetLg = "lg:ps-[calc(max(100vw-80rem,0rem)/2+2rem)] lg:pe-[calc(max(100vw-80rem,0rem)/2+2rem)] lg:scroll-ps-[calc(max(100vw-80rem,0rem)/2+2rem)]";

  const goToPage = (page: number) => {
    const next = readMetrics(trackRef.current);
    const target = clamp(page, 0, next.total - 1);
    setMetrics(next);

    trackRef.current?.scrollTo({
      left: target * next.perView * next.step,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const update = () => setMetrics(readMetrics(trackRef.current));

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [destinations]);

  if (destinations.length === 0) {
    return (
      <p className="mx-auto mt-10 w-full max-w-7xl px-4 text-sm text-muted-foreground sm:px-6 lg:px-8">
        Destinations are unavailable right now. Please check back later.
      </p>
    );
  }

  const progress = ((metrics.page + 1) / metrics.total) * 100;
  const singlePage = metrics.total <= 1;

  const handleScroll = () => {
    const next = readMetrics(trackRef.current);
    if (next.page !== metrics.page || next.total !== metrics.total) {
      setMetrics(next);
    }
  };

  return (
    <>
      <ul
        ref={trackRef}
        onScroll={handleScroll}
        className={`${insetBase} ${insetSm} ${insetLg} mt-12 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden`}
      >
        {destinations.map((destination) => (
          <li
            key={destination._id}
            className="w-[85%] flex-none snap-start snap-always sm:w-[calc((100%-1.5rem)/2)]"
          >
            <FeaturedCard destination={destination} />
          </li>
        ))}
      </ul>

      <div className="mx-auto mt-8 flex w-full max-w-7xl items-center gap-6 px-4 sm:px-6 lg:px-8">
        <p className="shrink-0 text-lg font-medium" aria-live="polite">
          {metrics.page + 1}/{metrics.total}
        </p>

        <div
          className="h-px flex-1 bg-border"
          role="progressbar"
          aria-valuemin={1}
          aria-valuemax={metrics.total}
          aria-valuenow={metrics.page + 1}
        >
          <div className="h-full bg-foreground" style={{ width: `${progress}%` }} />
        </div>

        <div className="flex shrink-0 items-center gap-3">
          <button
            type="button"
            aria-label="Previous destinations"
            disabled={singlePage || metrics.page === 0}
            onClick={() => goToPage(metrics.page - 1)}
            className="inline-flex size-11 cursor-pointer items-center justify-center rounded-full border border-border transition-colors hover:bg-muted disabled:cursor-default disabled:opacity-40 disabled:hover:bg-transparent"
          >
            <ArrowLeft className="size-4" />
          </button>
          <button
            type="button"
            aria-label="Next destinations"
            disabled={singlePage || metrics.page >= metrics.total - 1}
            onClick={() => goToPage(metrics.page + 1)}
            className="inline-flex size-11 cursor-pointer items-center justify-center rounded-full border border-border transition-colors hover:bg-muted disabled:cursor-default disabled:opacity-40 disabled:hover:bg-transparent"
          >
            <ArrowRight className="size-4" />
          </button>
        </div>
      </div>
    </>
  );
}
