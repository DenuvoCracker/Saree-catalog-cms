import { Link } from "react-router-dom";
import { Instagram, Facebook, Youtube } from "lucide-react";
import { SITE } from "../../constants/site.js";

export default function Footer() {
  return (
    <footer className="bg-maroon-dark text-cream/80 font-body">
      <div className="container-boutique px-6 sm:px-10 lg:px-20 py-14 grid gap-10 sm:grid-cols-3">
        <div>
          <h3 className="font-display text-2xl text-cream mb-2">{SITE.name}</h3>
          <p className="text-sm leading-relaxed">{SITE.tagline}</p>
        </div>

        <div>
          <h4 className="text-gold uppercase text-xs tracking-[0.2em] mb-4">Quick Links</h4>
          <ul className="space-y-2 text-sm">
            <li><Link to="/catalog" className="hover:text-gold transition-colors">Catalog</Link></li>
            <li><Link to="/about" className="hover:text-gold transition-colors">About Us</Link></li>
            <li><Link to="/gallery" className="hover:text-gold transition-colors">Gallery</Link></li>
            <li><Link to="/contact" className="hover:text-gold transition-colors">Contact</Link></li>
            <li><Link to="/admin/login" className="hover:text-gold transition-colors">Admin</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="text-gold uppercase text-xs tracking-[0.2em] mb-4">Follow Us</h4>
          <div className="flex gap-4">
            <a href={SITE.social.instagram} aria-label="Instagram" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors"><Instagram size={20} /></a>
            <a href={SITE.social.facebook} aria-label="Facebook" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors"><Facebook size={20} /></a>
            <a href={SITE.social.youtube} aria-label="YouTube" target="_blank" rel="noopener noreferrer" className="hover:text-gold transition-colors"><Youtube size={20} /></a>
          </div>
        </div>
      </div>

      <div className="border-t border-cream/10 py-5 text-center text-xs text-cream/50">
        © {new Date().getFullYear()} {SITE.name}. All rights reserved.
      </div>
    </footer>
  );
}
