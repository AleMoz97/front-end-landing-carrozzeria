import { BadgeCheck, Car, SprayCan, Wrench } from "lucide-react";

export const DATA = {
  businessName: "Carrozzeria Lingotto",
  owner: "Mozzato Orlando",
  tagline:
    "Carrozzeria storica a Torino – qualità artigianale, tecnologie moderne.",
  addressLine: " Via Passo Buole 17, Torino",
  phone: "+39 011 664 7726",
  whatsapp: "+39 338 264 0274",
  email: "carrozzerialingotto@gmail.com", // TODO questa mail deve diventare con dominio @carrozzerialingotto.it -> Aruba per dominio e gestione mail
  piva: "P.IVA 00000000000", // TODO
  opening: [
    { day: "Lunedì–Venerdì", hours: "08:30–12:30, 14:00–18:30" },
    { day: "Sabato", hours: "Chiuso" },
    { day: "Domenica", hours: "Chiuso" },
  ],
  services: [
    {
      icon: <SprayCan className="h-6 w-6" />,
      title: "Verniciatura e finiture",
      desc: "Cabina pressurizzata, vernici a basso impatto, finiture con standard da primo impianto.",
    },
    {
      icon: <Wrench className="h-6 w-6" />,
      title: "Riparazioni e lattoneria",
      desc: "Raddrizzatura scocche, sostituzione pannelli, ripristino plastiche e fari.",
    },
    {
      icon: <Car className="h-6 w-6" />,
      title: "Gestione sinistri",
      desc: "Supporto completo con assicurazioni, perizia fotografica e auto sostitutiva su richiesta.",
    },
    {
      icon: <BadgeCheck className="h-6 w-6" />,
      title: "Lucidatura e detailing",
      desc: "Correzione difetti, protezione vernice, rivestimenti protettivi e cura interni.",
    },
  ],
  gallery: [
    // Sostituisci con foto reali del laboratorio/lavori
    "https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?q=80&w=1600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1542362567-b07e54358753?q=80&w=1600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?q=80&w=1600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1600&auto=format&fit=crop",
  ],
};

export const EASE = [0.16, 1, 0.3, 1] as const;
