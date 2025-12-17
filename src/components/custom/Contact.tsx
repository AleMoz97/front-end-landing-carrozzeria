import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { DATA } from "@/constants/variables.constant";
import { Card } from "../ui/card";
import { Mail, MapPin, Phone } from "lucide-react";
import { Badge } from "../ui/badge";

export function Contact() {
  // easing compatibile con il resto del file
  const EASE = [0.16, 1, 0.3, 1] as const;

  const PLACE_ID = "ChIJl4VVwOoSiEcRQQEX-4h_Yq4";
  const WRITE_REVIEW_URL = `https://search.google.com/local/writereview?placeid=${PLACE_ID}`;

  // evidenzia il giorno corrente negli orari (Sabato/Domenica oppure Lun–Ven)
  const day = new Date().getDay(); // 0=Dom, 6=Sab
  const todayLabel =
    day === 0 ? "Domenica" : day === 6 ? "Sabato" : "Lunedì–Venerdì";

  // utility: copia negli appunti
  const copy = (txt: string) =>
    navigator.clipboard?.writeText(txt).catch(() => {});

  // link google maps
  const mapsHref = `https://www.google.com/maps?q=${encodeURIComponent(
    "Carrozzeria Lingotto, Via Passo Buole, Torino"
  )}`;

  return (
    <motion.section
      id="contatti"
      className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 md:py-20"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.6, ease: EASE }}
    >
      {/* Header */}
      <motion.div
        className="mb-8 flex items-end justify-between gap-6"
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: EASE, delay: 0.05 }}
      >
        <div>
          <Badge>Contatti</Badge>
          <h2 className="mt-3 text-3xl sm:text-4xl font-semibold tracking-tight">
            Vieni a trovarci o scrivici
          </h2>
          <p className="mt-2 text-muted-foreground max-w-2xl">
            Siamo a <strong>Lingotto, Torino</strong>. Preferisci un sopralluogo
            rapido? Passa in officina: ti accoglie direttamente il titolare.
          </p>
        </div>
        <div className="hidden md:flex items-center gap-3">
          <Button asChild variant="outline">
            <a href={WRITE_REVIEW_URL} target="_blank" rel="noreferrer">
              Scrivi una recensione
            </a>
          </Button>
        </div>
      </motion.div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Colonna info */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: EASE, delay: 0.08 }}
          className="relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-primary/10 rounded-3xl blur-2xl -z-10" />
          <Card className="border-2 shadow-2xl overflow-hidden p-0">
            {/* Top border aderente */}
            <div className="h-2 w-full bg-gradient-to-r from-primary via-blue-500 to-primary" />
            <div className="p-6 md:p-8 space-y-6">
              {/* Info rows */}
              <div className="space-y-3 text-sm">
                {/* indirizzo */}
                <div className="flex items-center justify-between gap-3 rounded-xl border p-3">
                  <div className="flex items-center gap-3">
                    <span className="h-9 w-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                      <MapPin className="h-4 w-4" />
                    </span>
                    <div>
                      <p className="font-medium leading-tight">Indirizzo</p>
                      <p className="text-muted-foreground leading-tight">
                        {DATA.addressLine}
                      </p>
                    </div>
                  </div>
                </div>

                {/* telefono */}
                <div className="flex items-center justify-between gap-3 rounded-xl border p-3">
                  <div className="flex items-center gap-3">
                    <span className="h-9 w-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                      <Phone className="h-4 w-4" />
                    </span>
                    <div>
                      <p className="font-medium leading-tight">Telefono</p>
                      <a
                        className="text-muted-foreground hover:underline leading-tight"
                        href={`tel:${DATA.phone.replace(/\s/g, "")}`}
                      >
                        {DATA.phone}
                      </a>
                    </div>
                  </div>
                  <div className="hidden sm:flex items-center gap-2">
                    <Button asChild variant="ghost" size="sm">
                      <a href={`tel:${DATA.phone.replace(/\s/g, "")}`}>
                        Chiama
                      </a>
                    </Button>
                  </div>
                </div>

                {/* email */}
                <div className="flex items-center justify-between gap-3 rounded-xl border p-3">
                  <div className="flex items-center gap-3">
                    <span className="h-9 w-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                      <Mail className="h-4 w-4" />
                    </span>
                    <div>
                      <p className="font-medium leading-tight">Email</p>
                      <a
                        className="text-muted-foreground hover:underline leading-tight"
                        href={`mailto:${DATA.email}`}
                      >
                        {DATA.email}
                      </a>
                    </div>
                  </div>
                  <div className="hidden sm:flex items-center gap-2">
                    <Button asChild variant="ghost" size="sm">
                      <a href={`mailto:${DATA.email}`}>Scrivi</a>
                    </Button>
                  </div>
                </div>
              </div>

              {/* Orari */}
              <div>
                <p className="font-medium mb-3">Orari</p>
                <div className="overflow-hidden rounded-xl border">
                  <ul className="divide-y">
                    {DATA.opening.map((o, i) => {
                      const isToday = o.day === todayLabel;
                      return (
                        <li
                          key={i}
                          className={[
                            "grid grid-cols-2 gap-3 px-4 py-2.5 text-sm",
                            isToday ? "bg-primary/5" : "",
                          ].join(" ")}
                        >
                          <span
                            className={
                              isToday
                                ? "font-medium text-primary"
                                : "text-muted-foreground"
                            }
                          >
                            {o.day}
                          </span>
                          <span className="text-right font-medium">
                            {o.hours}
                          </span>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>

              {/* CTA */}
              <div className="flex flex-wrap gap-3 pt-1">
                <Button asChild>
                  <a
                    href={`https://wa.me/${DATA.whatsapp.replace(/\D/g, "")}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2"
                  >
                    WhatsApp veloce
                  </a>
                </Button>
                <Button asChild variant="secondary">
                  <a
                    href={`tel:${DATA.phone.replace(/\s/g, "")}`}
                    className="inline-flex items-center gap-2"
                  >
                    Chiama
                  </a>
                </Button>
                <Button asChild variant="ghost">
                  <a href={mapsHref} target="_blank" rel="noreferrer">
                    Indicazioni
                  </a>
                </Button>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Colonna mappa */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: EASE, delay: 0.12 }}
          className="relative rounded-2xl overflow-hidden border"
          id="mappa"
        >
          <iframe
            title="Mappa – Carrozzeria Lingotto"
            src={`${mapsHref}&output=embed`}
            width="100%"
            height="100%"
            style={{ minHeight: 360, border: 0 }}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </motion.div>
      </div>
    </motion.section>
  );
}
