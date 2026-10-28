
import { Banner } from "@/components/banner";
import { FeaturedDestinations } from "@/components/featured-destinations";
import { WhyChooseUs } from "@/components/why-choose-us";
import { Testimonials } from "@/components/testimonials";
import { CTA } from "@/components/cta";


export default function Home() {
  return (
    <div className="flex flex-col">
    
      <Banner />
      <FeaturedDestinations />
      <WhyChooseUs />
      <Testimonials />
      <CTA />
      
    </div>
  );
}
