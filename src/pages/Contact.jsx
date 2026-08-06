import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Phone, Mail, MapPin, MessageCircle } from "lucide-react";
import { SITE } from "../constants/site.js";
import { buildWhatsAppLink } from "../utils/whatsapp.js";

export default function Contact() {
  const [submitting, setSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    document.title = "Contact Us | India Weaves";
  }, []);

  // No backend endpoint required by the brief — this simulates a submit and
  // gives the shop owner's real contact channels as the actual point of contact.
  async function onSubmit(data) {
    setSubmitting(true);
    try {
      await new Promise((res) => setTimeout(res, 600));
      toast.success("Thanks! We'll get back to you shortly.");
      reset();
    } catch {
      toast.error("Something went wrong sending your message. Please try WhatsApp instead.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section className="section">
      <div className="container-boutique">
        <p className="zari-rule mb-4" />
        <h1 className="text-3xl sm:text-4xl mb-10">Get In Touch</h1>

        <div className="grid lg:grid-cols-2 gap-12">
          <div>
            <ul className="space-y-5 mb-10 font-body">
              <li className="flex items-start gap-3">
                <Phone className="text-gold-dark shrink-0 mt-1" size={20} />
                <span>{SITE.phone}</span>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="text-gold-dark shrink-0 mt-1" size={20} />
                <span>{SITE.email}</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="text-gold-dark shrink-0 mt-1" size={20} />
                <span>{SITE.address}</span>
              </li>
            </ul>

            <a
              href={buildWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 bg-[#25D366] text-white px-6 py-3 rounded-sm font-body font-semibold mb-10
              transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5"
            >
              <MessageCircle size={20} fill="white" />
              Chat on WhatsApp
            </a>

            <div className="rounded-sm overflow-hidden border border-gold/20 h-72">
              <iframe
                title="Boutique location map"
                src={SITE.mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
            <div>
              <label htmlFor="name" className="block text-sm font-body mb-1.5">Name</label>
              <input
                id="name"
                {...register("name", { required: "Please enter your name" })}
                className="w-full border border-gold/30 rounded-sm px-4 py-3 font-body text-sm focus:outline-none focus:ring-2 focus:ring-gold"
              />
              {errors.name && <p className="text-red-600 text-xs mt-1">{errors.name.message}</p>}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-body mb-1.5">Email</label>
              <input
                id="email"
                type="email"
                {...register("email", {
                  required: "Please enter your email",
                  pattern: { value: /^\S+@\S+\.\S+$/, message: "Enter a valid email" },
                })}
                className="w-full border border-gold/30 rounded-sm px-4 py-3 font-body text-sm focus:outline-none focus:ring-2 focus:ring-gold"
              />
              {errors.email && <p className="text-red-600 text-xs mt-1">{errors.email.message}</p>}
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-body mb-1.5">Message</label>
              <textarea
                id="message"
                rows={5}
                {...register("message", { required: "Please enter a message" })}
                className="w-full border border-gold/30 rounded-sm px-4 py-3 font-body text-sm focus:outline-none focus:ring-2 focus:ring-gold"
              />
              {errors.message && <p className="text-red-600 text-xs mt-1">{errors.message.message}</p>}
            </div>

            <button type="submit" disabled={submitting} className="btn-primary w-full sm:w-auto disabled:opacity-60">
              {submitting ? "Sending…" : "Send Message"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
