import { Gem, Sparkles, Wallet, ShieldCheck } from "lucide-react";
import { SITE } from "../../constants/site.js";

const FEATURES = [
  { icon: Gem, title: "Premium Quality", desc: "Every saree is hand-checked for weave, drape and finish before it reaches the floor." },
  { icon: Sparkles, title: "Authentic Handloom", desc: "Sourced directly from weaver cooperatives across India — no mass-produced imitations." },
  { icon: Wallet, title: "Affordable Prices", desc: "Boutique quality without boutique markups, priced fairly for every occasion." },
  { icon: ShieldCheck, title: "Founded by " + SITE.founderName, desc: "Generations of Chennai families have trusted us for weddings and festivals alike." },
];

export default function WhyChooseUs() {
  return (
    <section className="section bg-white">
      <div className="container-boutique">
        <p className="zari-rule mb-4 mx-auto" />
        <h2 className="text-3xl sm:text-4xl text-center">Why Choose Us</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
          {FEATURES.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="card-boutique p-6 text-center animate-fadeUp">
              <div className="w-12 h-12 mx-auto rounded-full bg-maroon/5 flex items-center justify-center mb-4">
                <Icon className="text-gold-dark" size={22} />
              </div>
              <h3 className="text-xl mb-2">{title}</h3>
              <p className="text-sm text-ink/60 font-body leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
