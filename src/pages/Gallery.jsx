import { useEffect } from "react";

const IMAGES = [
  "https://images.unsplash.com/photo-1610030469983-98e550d6193c?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1610030469978-6bb537f3b982?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1610189026297-df356264479c?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1610030469839-f909584b43f1?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1609748341932-f0206c09412b?q=80&w=800&auto=format&fit=crop",
];

export default function Gallery() {
  useEffect(() => {
    document.title = "Gallery | India Weaves";
  }, []);

  return (
    <section className="section">
      <div className="container-boutique">
        <p className="zari-rule mb-4" />
        <h1 className="text-3xl sm:text-4xl mb-2">Gallery</h1>
        <p className="text-ink/60 font-body mb-10">A closer look at our weaves, drapes and details.</p>
        <div className="columns-2 md:columns-3 gap-4 space-y-4">
          {IMAGES.map((src, i) => (
            <img
              key={i}
              src={src}
              alt={`Saree boutique gallery image ${i + 1}`}
              loading="lazy"
              className="w-full rounded-sm shadow-sm hover:shadow-xl transition-shadow duration-300 break-inside-avoid"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
