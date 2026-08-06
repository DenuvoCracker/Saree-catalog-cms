import { Link } from "react-router-dom";
import { SITE } from "../../constants/site.js";

export default function Hero() {
  return (
    <section className="relative h-[85vh] min-h-[560px] flex items-center overflow-hidden">
      <img
        src="https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=1600&auto=format&fit=crop"
        alt="Model draped in an elegant handwoven silk saree"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-ink/80 via-ink/50 to-transparent" />

      <div className="relative container-boutique px-6 sm:px-10 lg:px-20">
        <p className="zari-rule mb-6" />
        <h1 className="text-4xl sm:text-5xl lg:text-6xl text-cream max-w-2xl leading-tight">
          {SITE.tagline}
        </h1>
        <p className="text-cream/80 font-body mt-5 max-w-lg text-base sm:text-lg">
          Explore our curated collection of handloom, silk and designer sarees — each piece enquired
          about directly, no checkout carts, just a conversation with our boutique.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Link to="/catalog" className="btn-gold">Explore Collection</Link>
          <Link to="/contact" className="btn-outline !border-cream !text-cream hover:!bg-cream hover:!text-maroon">
            Visit the Boutique
          </Link>
        </div>
      </div>
    </section>
  );
}
