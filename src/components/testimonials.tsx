import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const testimonials = [
  {
    quote:
      "The Bali Trip Was Absolutely Magical! Every Detail Was Perfectly Planned. The Resorts Were Luxurious And The Cultural Experiences Were Unforgettable.",
    name: "Michael Chen",
    location: "Singapore",
    photo: "/images/person2.png",
  },
  {
    quote:
      "Swiss Alps Adventure Exceeded All Expectations. The Mountain Views Were Breathtaking And Our Guide Was Incredibly Knowledgeable. Highly Recommend!",
    name: "Sarah Johnson",
    location: "New York, USA",
    photo: "/images/person1.png",
  },
];

export function Testimonials() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">
        <Carousel opts={{ align: "start" }} className="mt-12">
          <div className="flex items-start justify-between gap-6">
            <div>
              <h2 className="text-balance font-[family-name:var(--font-playfair)] text-5xl font-medium text-foreground">
                What Travelers Say
              </h2>
              <p className="mt-3 text-lg text-muted-foreground">
                Real experiences from our happy travelers
              </p>
            </div>

            <div className="flex shrink-0 gap-3">
              <CarouselPrevious className="static size-12" />
              <CarouselNext className="static size-12" />
            </div>
          </div>

          <CarouselContent>
            {testimonials.map((testimonial) => (
              <CarouselItem key={testimonial.name} className="md:basis-1/2">
                <figure className="grid min-h-[330px] grid-cols-[3fr_2fr] border border-border bg-white">
                  <div className="flex flex-col justify-between p-7">
                    <blockquote className="text-balance font-[family-name:var(--font-playfair)] text-[21px] leading-snug text-foreground">
                      &quot;{testimonial.quote}&quot;
                    </blockquote>

                    <figcaption className="mt-8">
                      <span className="flex items-center gap-2.5">
                        <span
                          aria-hidden
                          className="h-px w-6 shrink-0 bg-cyan-600"
                        />
                        <span className="text-lg text-cyan-600">
                          {testimonial.name}
                        </span>
                      </span>
                      <span className="mt-1 block pl-[34px] text-sm text-muted-foreground">
                        {testimonial.location}
                      </span>
                    </figcaption>
                  </div>

                  <div className="relative">
                    <Image
                      src={testimonial.photo}
                      alt={`Portrait of ${testimonial.name}`}
                      fill
                      sizes="(min-width: 768px) 45vw, 90vw"
                      className="object-cover"
                    />
                  </div>
                </figure>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
}
