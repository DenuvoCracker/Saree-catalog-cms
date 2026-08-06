import { useEffect } from "react";
import Hero from "../components/home/Hero.jsx";
import FeaturedCollections from "../components/home/FeaturedCollections.jsx";
import WhyChooseUs from "../components/home/WhyChooseUs.jsx";
import Testimonials from "../components/home/Testimonials.jsx";

export default function Home() {
  useEffect(() => {
    document.title = "India Weaves | Handloom & Designer Sarees Boutique";
  }, []);

  return (
    <>
      <Hero />
      <FeaturedCollections />
      <WhyChooseUs />
      <Testimonials />
    </>
  );
}
