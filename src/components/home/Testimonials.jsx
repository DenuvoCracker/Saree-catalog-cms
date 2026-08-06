import { Star } from "lucide-react";

const REVIEWS = [
  { name: "Priya R.", text: "The Kanjivaram I bought for my daughter's wedding was stunning — the zari work is unmatched.", rating: 5 },
  { name: "Lakshmi N.", text: "Sent a WhatsApp enquiry and got a reply within minutes. Felt like shopping with family.", rating: 5 },
  { name: "Divya S.", text: "Beautiful cotton sarees for everyday wear, and the pricing is honest for the quality.", rating: 4 },
];

export default function Testimonials() {
  return (
    <section className="section bg-maroon-dark">
      <div className="container-boutique">
        <p className="zari-rule mb-4 mx-auto" />
        <h2 className="text-3xl sm:text-4xl text-cream text-center">What Our Customers Say</h2>
        <div className="grid md:grid-cols-3 gap-6 mt-12">
          {REVIEWS.map((r) => (
            <blockquote key={r.name} className="bg-cream/5 border border-cream/10 rounded-sm p-6 animate-fadeUp">
              <div className="flex gap-1 mb-3" aria-label={`${r.rating} out of 5 stars`}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} size={16} className={i < r.rating ? "fill-gold text-gold" : "text-cream/20"} />
                ))}
              </div>
              <p className="text-cream/80 font-body text-sm leading-relaxed mb-4">"{r.text}"</p>
              <cite className="text-gold not-italic font-body text-sm">{r.name}</cite>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  );
}
