import { useEffect } from "react";
import { SITE } from "../constants/site.js";

export default function About() {
  useEffect(() => {
    document.title = "About Us | India Weaves";
  }, []);

  return (
    <section className="section">
      <div className="container-boutique grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <p className="zari-rule mb-4" />
          <h1 className="text-3xl sm:text-4xl mb-6">Our Story</h1>
          <p className="text-ink/70 font-body leading-relaxed mb-4">
            At {SITE.name} by {SITE.founderName}, we bring you thoughtfully curated sarees and ethnic wear 
            that celebrate the beauty of Indian handlooms and traditional craftsmanship.
          </p>
          <p className="text-ink/70 font-body leading-relaxed mb-4">
            Our collection features Banarasi, Maheshwari, Chanderi, Organza, Cotton, Silk & more, selected
            with a focus on quality, elegance and timeless style.
            <br />
            Our speciality: We offer customised Banarasi, Maheshwari & Chanderi sarees, along with 
            customised suits, created according to your choice of colour, design and fabric.
          </p>
          <p className="text-ink/70 font-body leading-relaxed mb-4">
            Today, we've brought the boutique experience online — not as a marketplace, but
            as a catalog you can browse at your own pace, with a real conversation on WhatsApp
            whenever you're ready.
          </p>
          <p className="text-ink/70 font-body leading-relaxed">
            India Weaves by Shikha
            <br />
            Traditional weaves. Personalised beautifully.
          </p>
        </div>
        <img
          src="https://images.unsplash.com/photo-1776000680547-8f301e8d07b3?q=80&w=1200&auto=format&fit=crop"
          alt="Rows of folded silk sarees displayed in the boutique"
          className="rounded-sm shadow-xl w-full h-full object-cover max-h-[520px]"
        />
      </div>
    </section>
  );
}
