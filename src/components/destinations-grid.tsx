"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Calendar, MapPin, Star } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Destination } from "@/lib/types";

const PRICE_RANGES = [
  { label: "Under $1,500", value: "under-1500" },
  { label: "$1,500 – $2,500", value: "1500-2500" },
  { label: "Above $2,500", value: "above-2500" },
];

const SORT_OPTIONS = [
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
];

/** "city-break" → "City Break" */
function formatCategory(category: string) {
  return category
    .replace(/-+/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function isWithinPriceRange(destination: Destination, range: string | null) {
  if (!range) return true;
  const price = Number(destination.price) || 0;
  if (range === "under-1500") return price < 1500;
  if (range === "1500-2500") return price >= 1500 && price <= 2500;
  if (range === "above-2500") return price > 2500;
  return true;
}

function sortDestinations(destinations: Destination[], sort: string | null) {
  if (sort === "price-asc") {
    return [...destinations].sort((a, b) => Number(a.price) - Number(b.price));
  }
  if (sort === "price-desc") {
    return [...destinations].sort((a, b) => Number(b.price) - Number(a.price));
  }
  return destinations;
}

function DestinationCard({ destination }: { destination: Destination }) {
  return (
    <article className="group flex flex-col">
      <div className="relative overflow-hidden rounded-md border border-border/60 bg-muted">
        <img
          src={destination.imageUrl || "/images/placeholder.svg"}
          alt={destination.name}
          loading="lazy"
          className="aspect-[3/2] w-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        {/* Rating is not part of the API yet — decorative default */}
        <span className="absolute right-2.5 top-2.5 inline-flex items-center gap-1 rounded-md bg-black/75 px-2 py-1 text-xs font-medium text-white">
          4.5
          <Star className="size-3 fill-current" />
        </span>
      </div>

      <div className="mt-3 flex flex-1 flex-col gap-1.5">
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <MapPin className="size-3.5 shrink-0" />
          {destination.country}
        </div>

        <div className="flex flex-wrap items-end justify-between gap-x-3 gap-y-1">
          <h3 className="text-base font-semibold">{destination.name}</h3>
          <p className="text-lg font-bold leading-none whitespace-nowrap">
            ${Number(destination.price).toLocaleString("en-US")}
            <span className="text-[10px] font-normal text-muted-foreground">
              /Person
            </span>
          </p>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Calendar className="size-3.5 shrink-0" />
          {destination.duration}
        </div>

        <Link
          href={`/destinations/${destination._id}`}
          className="mt-auto inline-flex w-fit items-center gap-1 pt-1 text-xs font-semibold tracking-widest text-cyan-700 underline underline-offset-4 transition-colors hover:text-cyan-800"
        >
          BOOK NOW
          <ArrowUpRight className="size-3.5" />
        </Link>
      </div>
    </article>
  );
}

const filterTriggerStyles =
  "h-11 w-full justify-between rounded-md border-input px-4 text-xs font-medium uppercase tracking-widest";

export function DestinationsGrid({
  destinations,
}: {
  destinations: Destination[];
}) {
  const [category, setCategory] = useState<string | null>(null);
  const [priceRange, setPriceRange] = useState<string | null>(null);
  const [sort, setSort] = useState<string | null>(null);

  const categoryOptions = Array.from(
    new Set(destinations.map((destination) => destination.category))
  ).map((value) => ({ label: formatCategory(value), value }));

  const filtered = sortDestinations(
    destinations.filter(
      (destination) =>
        (!category || destination.category === category) &&
        isWithinPriceRange(destination, priceRange)
    ),
    sort
  );

  return (
    <section className="mt-8">
      <div className="grid gap-3 sm:grid-cols-3">
        <Select
          items={categoryOptions}
          value={category}
          onValueChange={(value) => setCategory(value as string | null)}
        >
          <SelectTrigger className={filterTriggerStyles}>
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            {categoryOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
            <SelectItem value={null}>All Categories</SelectItem>
          </SelectContent>
        </Select>

        <Select
          items={PRICE_RANGES}
          value={priceRange}
          onValueChange={(value) => setPriceRange(value as string | null)}
        >
          <SelectTrigger className={filterTriggerStyles}>
            <SelectValue placeholder="Price Range" />
          </SelectTrigger>
          <SelectContent>
            {PRICE_RANGES.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
            <SelectItem value={null}>Any Price</SelectItem>
          </SelectContent>
        </Select>

        <Select
          items={SORT_OPTIONS}
          value={sort}
          onValueChange={(value) => setSort(value as string | null)}
        >
          <SelectTrigger className={filterTriggerStyles}>
            <SelectValue placeholder="Sort By" />
          </SelectTrigger>
          <SelectContent>
            {SORT_OPTIONS.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
            <SelectItem value={null}>Recommended</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <p className="mt-4 text-sm text-foreground/80">
        Showing {filtered.length} destination{filtered.length === 1 ? "" : "s"}
      </p>

      {filtered.length === 0 ? (
        <p className="mt-6 text-sm text-muted-foreground">
          No destinations match your filters. Try clearing a filter.
        </p>
      ) : (
        <div className="mt-4 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((destination) => (
            <DestinationCard
              key={destination._id}
              destination={destination}
            />
          ))}
        </div>
      )}
    </section>
  );
}
