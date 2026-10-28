import { DestinationsGrid } from "@/components/destinations-grid";
import { getTokenFromServer } from "@/lib/getTokenFromServer";
import type { Destination } from "@/lib/types";

const AllDestinations = async () => {
  let destinations: Destination[] = [];

  const token = await getTokenFromServer();

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_URL}/destinations`, {
      headers: {
        authorization: `Bearer ${token}`,
      }
    });

    if (res.ok) {
      const data = await res.json();
      destinations = Array.isArray(data) ? data : [];
    }
  } catch {
    // Backend unreachable — fall through to the empty state
  }

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 sm:py-10 lg:px-8">
      <h1 className="font-[family-name:var(--font-playfair)] text-3xl font-medium sm:text-4xl md:text-5xl">
        Explore All Destinations
      </h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Find your perfect travel experience from our curated collection
      </p>

      <DestinationsGrid destinations={destinations} />
    </div>
  );
};

export default AllDestinations;
