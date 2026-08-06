import { SITE } from "../constants/site.js";

// Builds a wa.me deep link pre-filled with a product enquiry message.
// Used by both the product detail page and the floating WhatsApp button.
export function buildWhatsAppLink(productName) {
  const baseMessage = productName
    ? `Hi, I'm interested in the ${productName}. Is it still available?`
    : `Hi, I'd like to know more about your sarees.`;
  const encoded = encodeURIComponent(baseMessage);
  return `https://wa.me/${SITE.whatsappNumber}?text=${encoded}`;
}
