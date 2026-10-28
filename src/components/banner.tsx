import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const searchFields = [
  { label: "Location", placeholder: "Address, City Or Zip" },
  { label: "Date/Duration", placeholder: "Anytime/3 Days" },
  { label: "Budget", placeholder: "$0-$3000" },
  { label: "People", placeholder: "5-10" },
];

export function Banner() {
  return (
    <section className="relative isolate flex min-h-[620px] flex-col">
      <Image
        src="/images/Banner.png"
        alt="Aerial view of a turquoise coastal bay surrounded by forest"
        fill
        priority
        sizes="100vw"
        className="-z-10 object-cover"
      />

      <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col items-center justify-center px-6 py-20 text-center">
        <h1 className="text-balance font-[family-name:var(--font-playfair)] text-5xl font-medium text-white md:text-7xl">
          Discover Your Next Adventure
        </h1>

        <p className="mt-6 max-w-xl text-balance text-lg text-white/85">
          Explore breathtaking destinations and create unforgettable memories
          with our curated travel experiences.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Button className="h-12 rounded-md bg-cyan-600 px-8 text-xs font-semibold tracking-widest text-white uppercase hover:bg-cyan-700">
            Explore Now
            <ArrowRight data-icon="inline-end" />
          </Button>

          <Button className="h-12 rounded-md bg-white/70 px-8 text-xs font-semibold tracking-widest text-foreground uppercase hover:bg-white/90">
            View Destination
          </Button>
        </div>
      </div>

      <form className="w-full">
        <div className="flex flex-wrap items-stretch bg-neutral-900/50 backdrop-blur-sm">
          {searchFields.map((field) => (
            <div
              key={field.label}
              className="min-w-[200px] flex-1 border-l border-white/20 px-6 py-4 first:border-l-0"
            >
              <label
                htmlFor={`banner-input-${field.label}`}
                className="block text-base font-semibold text-white"
              >
                {field.label}
              </label>
              <input
                id={`banner-input-${field.label}`}
                type="text"
                placeholder={field.placeholder}
                className="mt-1 w-full bg-transparent text-sm text-white outline-none placeholder:text-white/60"
              />
            </div>
          ))}

          <Button
            type="submit"
            className="h-auto min-w-[200px] flex-[2] self-stretch rounded-none bg-cyan-600 px-12 text-base font-semibold text-white hover:bg-cyan-700"
          >
            Search
          </Button>
        </div>
      </form>
    </section>
  );
}
