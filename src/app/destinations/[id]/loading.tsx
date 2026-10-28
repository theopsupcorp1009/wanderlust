import { Skeleton } from "@/components/ui/skeleton";

export default function DestinationDetailsLoading() {
  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
      {/* Top bar */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Skeleton className="h-8 w-40" />
        <div className="flex items-center gap-3">
          <Skeleton className="h-9 w-24" />
          <Skeleton className="h-9 w-32" />
        </div>
      </div>

      {/* Hero image */}
      <Skeleton className="mt-4 aspect-[16/9] w-full rounded-xl sm:aspect-[21/9]" />

      {/* Content + booking card */}
      <div className="mt-6 grid gap-8 border-t pt-6 sm:mt-8 sm:pt-8 lg:grid-cols-[1fr_320px] lg:gap-10">
        <div className="flex flex-col gap-3">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-10 w-64 max-w-full sm:h-12" />
          <Skeleton className="mt-1 h-4 w-52" />

          <Skeleton className="mt-4 h-5 w-28" />
          <Skeleton className="h-3 w-full max-w-lg" />
          <Skeleton className="h-3 w-full max-w-md" />

          <Skeleton className="mt-4 h-5 w-28" />
          <div className="grid gap-x-8 gap-y-2 sm:grid-cols-2">
            {Array.from({ length: 6 }).map((_, index) => (
              <Skeleton key={index} className="h-3" />
            ))}
          </div>
        </div>

        <Skeleton className="h-fit min-h-72 w-full rounded-xl lg:w-80" />
      </div>
    </div>
  );
}
