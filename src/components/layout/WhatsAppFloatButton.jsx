import { MessageCircle } from "lucide-react";
import { buildWhatsAppLink } from "../../utils/whatsapp.js";

// Persistent floating action button so an enquiry is always one tap away
export default function WhatsAppFloatButton() {
  return (
    <a
      href={buildWhatsAppLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full bg-[#25D366] text-white shadow-lg flex items-center justify-center
      transition-transform duration-300 hover:-translate-y-1 hover:shadow-2xl animate-fadeUp"
    >
      <MessageCircle size={26} fill="white" />
    </a>
  );
}
