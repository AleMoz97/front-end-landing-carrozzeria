import { motion } from "framer-motion";
import { Phone, Star, Wrench } from "lucide-react";
import { Button } from "../ui/button";
import { DATA } from "@/constants/variables.constant";
import { Badge } from "../ui/badge";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 z-0 pointer-events-none" aria-hidden>
        <img
          src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=2400&auto=format&fit=crop"
          alt="Hero background"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Overlay per aumentare il contrasto del testo (regola /20–/40 a gusto) */}
      <div className="absolute inset-0 z-10 bg-black/80" aria-hidden />

      {/* Contenuto sopra immagine + overlay */}
      <div className="relative z-20 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 md:py-36">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl"
        >
          <Badge className="mb-4">Torino · Lingotto</Badge>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white drop-shadow-[0_3px_12px_rgba(0,0,0,0.8)]">
            {DATA.businessName}
          </h1>
          <p className="mt-4 text-lg md:text-xl text-white/95 drop-shadow-[0_2px_8px_rgba(0,0,0,0.7)]">
            {DATA.tagline} Presente da quasi 80 anni al servizio degli
            automobilisti.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <a
                href={`https://wa.me/${DATA.whatsapp.replace(/\D/g, "")}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2"
              >
                <Phone className="h-5 w-5" /> WhatsApp
              </a>
            </Button>
            <Button asChild size="lg" variant="secondary">
              <a href="#servizi" className="inline-flex items-center gap-2">
                <Wrench className="h-5 w-5" /> Scopri i servizi
              </a>
            </Button>
          </div>
        </motion.div>
      </div>

      {/* Ribbon recensioni */}
      <div className="relative z-30 bg-gray-300 border-t border-white/10 bg-gradient-to-r from-black/40 via-black/30 to-black/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4 flex items-center gap-6 text-white/90">
          <Star className="h-5 w-5" />
          <p className="text-sm">
            Assistenza attenta e lavori eseguiti con cura artigiana. — Clienti
            soddisfatti a Torino Lingotto.
          </p>
        </div>
      </div>
    </section>
  );
}
