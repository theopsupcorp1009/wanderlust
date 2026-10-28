import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Calendar,
  Check,
  MapPin,
  Star,
} from "lucide-react";
import { DeleteDestinationDialog } from "@/components/delete-destination-dialog";
import { UpdateDestinationDialog } from "@/components/update-destination-dialog";
import type { Destination } from "@/lib/types";
import BookingCard from "@/components/booking/BookingCard";
import { getTokenFromServer } from './../../../lib/getTokenFromServer';

// Rating and reviews are not returned by the API yet — decorative placeholders
const RATING = "4.9";
const REVIEWS = 1234;

// The API has no highlights field — placeholder checklist
const HIGHLIGHTS = [
  "Luxury accommodation",
  "Spa & wellness experience",
  "Guided sunrise trek",
  "Temple visit at sunset",
  "Private beach dinner",
  "Local cultural tour",
];

/** "2600" → "2,600" */
function formatPrice(price: string) {
  const value = Number(price);
  if (price === "" || !Number.isFinite(value)) return price;
  return value.toLocaleString("en-US");
}


const DestinationDetailsPage = async ({
  params,
}: PageProps<"/destinations/[id]">) => {
  const { id } = await params;

  let destination: Destination | null = null;

  const token = await getTokenFromServer();

  try {

    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/destinations/${id}`, {
      headers: {
        authorization: `Bearer ${token}`,
      }
    });

    if (!res.ok) notFound();

    destination = await res.json();
  } catch {
    notFound();
  }

  if (!destination) notFound();

  const { name, country, price, duration, departureDate, imageUrl, description } =
    destination;

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Link
          href="/destinations"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-4" />
          Back to Destinations
        </Link>

        <div className="flex items-center gap-3">
          <UpdateDestinationDialog destination={destination} />
          <DeleteDestinationDialog destination={destination} />
        </div>
      </div>

      <div className="mt-4 overflow-hidden rounded-xl border border-border/60 bg-muted">
        <img
          src={imageUrl}
          alt={name}
          className="aspect-[16/9] w-full object-cover sm:aspect-[21/9]"
        />
      </div>

      <div className="mt-6 grid gap-8 border-t pt-6 sm:mt-8 sm:pt-8 lg:grid-cols-[1fr_320px] lg:gap-10">
        <div>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <MapPin className="size-3.5 shrink-0" />
            {country}
          </div>

          <h1 className="mt-2 text-3xl font-medium sm:text-4xl lg:text-5xl">
            {name}
          </h1>

          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1">
            <div className="flex items-center gap-1.5 text-sm">
              <Star className="size-4 fill-current text-green-600" />
              <span className="font-semibold">{RATING}</span>
              <span className="text-muted-foreground">({REVIEWS} reviews)</span>
            </div>
            <div className="flex items-center gap-1.5 text-sm">
              <Calendar className="size-4 text-muted-foreground" />
              {duration}
            </div>
          </div>

          <h2 className="mt-6 text-xl font-semibold">Overview</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            {description}
          </p>

          <h2 className="mt-6 text-xl font-semibold">Highlights</h2>
          <ul className="mt-3 grid gap-x-8 gap-y-2 sm:grid-cols-2">
            {HIGHLIGHTS.map((highlight) => (
              <li
                key={highlight}
                className="flex items-center gap-2 text-sm text-muted-foreground"
              >
                <Check className="size-4 shrink-0 text-green-600" />
                {highlight}
              </li>
            ))}
          </ul>
        </div>

        <BookingCard destination={destination}/>
      </div>
    </div>
  );
};

export default DestinationDetailsPage;
