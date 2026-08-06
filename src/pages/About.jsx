import { useEffect } from "react";
import { SITE } from "../constants/site.js";

export default function About() {
  useEffect(() => {
    document.title = "About Us | Meera Silks";
  }, []);

  return (
    <section className="section">
      <div className="container-boutique grid lg:grid-cols-2 gap-12 items-center">
        <div>
          <p className="zari-rule mb-4" />
          <h1 className="text-3xl sm:text-4xl mb-6">Our Story</h1>
          <p className="text-ink/70 font-body leading-relaxed mb-4">
            Since {SITE.foundedYear}, {SITE.name} has been a quiet fixture of Chennai's silk
            bazaar — a family boutique built on relationships with weaver cooperatives across
            Kanchipuram, Varanasi and beyond.
          </p>
          <p className="text-ink/70 font-body leading-relaxed mb-4">
            We don't chase trends. Every saree in our collection is chosen by hand, for its weave,
            its drape and the story behind the loom it came from. What started as a single shopfront
            has grown into a name three generations of families return to for weddings, festivals
            and everyday elegance.
          </p>
          <p className="text-ink/70 font-body leading-relaxed">
            Today, we've brought that same boutique experience online — not as a marketplace, but
            as a catalog you can browse at your own pace, with a real conversation on WhatsApp
            whenever you're ready.
          </p>
        </div>
        <img
          src="https://images.unsplash.com/photo-1610030181087-540e4d0a4a20?q=80&w=1200&auto=format&fit=crop"
          alt="Rows of folded silk sarees displayed in the boutique"
          className="rounded-sm shadow-xl w-full h-full object-cover max-h-[520px]"
        />
      </div>
    </section>
  );
}
