import { Skeleton } from "@/components/ui/skeleton";

export default function DestinationsLoading() {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 sm:py-10 lg:px-8">
      <Skeleton className="h-10 w-72 sm:h-12 md:w-96" />
      <Skeleton className="mt-3 h-4 w-64 max-w-full" />

      {/* Filter bar */}
      <div className="mt-8 grid gap-3 sm:grid-cols-3">
        <Skeleton className="h-11" />
        <Skeleton className="h-11" />
        <Skeleton className="h-11" />
      </div>

      <Skeleton className="mt-4 h-4 w-40" />

      {/* Destination cards */}
      <div className="mt-4 grid gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="flex flex-col">
            <div className="relative overflow-hidden rounded-md border border-border/60 bg-muted">
              <Skeleton className="aspect-[3/2] w-full rounded-none" />
            </div>
            <div className="mt-3 flex flex-col gap-2">
              <Skeleton className="h-3 w-20" />
              <div className="flex items-end justify-between gap-3">
                <Skeleton className="h-5 w-32" />
                <Skeleton className="h-5 w-20" />
              </div>
              <Skeleton className="h-3 w-24" />
              <Skeleton className="mt-1 h-3 w-20" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
