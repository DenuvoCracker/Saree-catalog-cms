import { useState } from "react";

// Main image + thumbnail strip, with a simple hover-zoom on the main image (bonus: image zoom)
export default function ProductGallery({ images = [], name }) {
  const [active, setActive] = useState(0);
  const [zoomed, setZoomed] = useState(false);

  if (!images.length) {
    return <div className="aspect-square bg-maroon/5 rounded-sm" />;
  }

  return (
    <div>
      <div
        className="relative aspect-square overflow-hidden rounded-sm bg-maroon/5 cursor-zoom-in"
        onMouseEnter={() => setZoomed(true)}
        onMouseLeave={() => setZoomed(false)}
      >
        <img
          src={images[active]}
          alt={`${name} — view ${active + 1}`}
          className={`w-full h-full object-cover transition-transform duration-500 ${zoomed ? "scale-125" : "scale-100"}`}
        />
      </div>

      {images.length > 1 && (
        <div className="flex gap-3 mt-4 overflow-x-auto pb-1">
          {images.map((src, i) => (
            <button
              key={src + i}
              onClick={() => setActive(i)}
              aria-label={`Show image ${i + 1}`}
              className={`w-16 h-16 shrink-0 rounded-sm overflow-hidden border-2 transition-colors ${
                active === i ? "border-gold" : "border-transparent"
              }`}
            >
              <img src={src} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
