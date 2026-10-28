import Link from "next/link";
import { ArrowLeft, Compass, MapPin } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center px-6 py-24 text-center">
      <span className="flex size-16 items-center justify-center rounded-full bg-cyan-50">
        <Compass className="size-8 text-cyan-700" />
      </span>

      <p className="mt-8 font-[family-name:var(--font-playfair)] text-7xl font-medium text-cyan-700 sm:text-8xl">
        404
      </p>

      <h1 className="mt-4 font-[family-name:var(--font-playfair)] text-3xl font-medium sm:text-4xl">
        This destination doesn&apos;t exist
      </h1>

      <p className="mt-3 flex items-center gap-1.5 text-sm text-muted-foreground">
        <MapPin className="size-3.5 shrink-0" />
        The page you are looking for has wandered off the map.
      </p>

      <div className="mt-8 flex flex-col-reverse items-stretch gap-3 sm:flex-row sm:items-center sm:justify-center">
        <Link
          href="/destinations"
          className={cn(
            buttonVariants({
              variant: "outline",
              size: "lg",
              className:
                "w-full border-cyan-600 text-cyan-700 hover:bg-cyan-50 hover:text-cyan-700 sm:w-auto",
            })
          )}
        >
          Explore Destinations
        </Link>
        <Link
          href="/"
          className={cn(
            buttonVariants({
              size: "lg",
              className:
                "w-full bg-cyan-600 text-white hover:bg-cyan-700 sm:w-auto",
            })
          )}
        >
          <ArrowLeft data-icon="inline-start" />
          Back to Home
        </Link>
      </div>
    </div>
  );
}
