import { motion } from "framer-motion";
import { Card } from "../ui/card";
import { Badge } from "../ui/badge";
import { BadgeCheck, Heart } from "lucide-react";

export function Owner() {
  const EASE = [0.16, 1, 0.3, 1] as const;

  return (
    <section
      id="titolare"
      className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 md:py-20"
    >
      {/* Header sezione */}
      <div className="mb-8">
        <Badge>Titolare</Badge>
        <h2 className="mt-3 text-3xl sm:text-4xl font-semibold tracking-tight">
          Mozzato Orlando
        </h2>
        <p className="mt-2 text-muted-foreground">
          Maestro carrozziere · Fondatore
        </p>
      </div>

      {/* BLOCCO FULL-BLEED con rettangolo piatto dietro */}
      <div className="relative py-8 md:py-12">
        {/* Rettangolo che “esce” dal container: prende tutta la larghezza viewport */}
        <div
          aria-hidden
          className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-screen bg-primary/5 dark:bg-primary/15"
        />

        {/* Contenuto allineato al container */}
        <div className="relative">
          <div className="grid md:grid-cols-2 gap-10 lg:gap-14 items-center">
            {/* FOTO — entra da sinistra, va in rilievo al hover */}
            <motion.div
              className="group relative"
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, ease: EASE }}
            >
              {/* hover: rilievo + leggero tilt */}
              <motion.div
                className="relative will-change-transform"
                whileHover={{
                  y: -6,
                  scale: 1.02,
                  rotate: -0.3,
                  boxShadow:
                    "0 30px 80px rgba(0,0,0,0.25), 0 10px 24px rgba(0,0,0,0.12)",
                }}
                transition={{ type: "spring", stiffness: 260, damping: 22 }}
              >
                <img
                  src="https://www.didatticagenzialighieri.it/wp-content/uploads/2025/07/corso-di-carrozziere.jpg"
                  alt="Mozzato Orlando"
                  className="w-full h-auto object-cover rounded-2xl"
                />
                {/* Badge sovrapposto (opzionale) */}
                <div className="absolute bottom-5 left-5 right-5">
                  <div className="bg-background/95 backdrop-blur-md rounded-xl p-4 border border-border/50 shadow-xl">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center">
                        <Heart className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-sm">
                          Oltre 60 anni di passione
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Attivo dagli anni ’60
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* BIO — entra da destra */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.05 }}
              className="flex flex-col"
            >
              {/* numeri + USP compatti, senza bordi, integrati nello sfondo */}
              <div className="grid sm:grid-cols-3 gap-4">
                <div className="sm:col-span-1 p-0">
                  <p className="text-sm text-muted-foreground">
                    In attività dagli anni ’60
                  </p>
                  <p className="text-2xl font-semibold mt-1">
                    Oltre 50.000 interventi
                  </p>
                </div>
                <ul className="sm:col-span-2 space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <BadgeCheck className="h-4 w-4 text-primary" />
                    Specialista verniciatura e lattoneria
                  </li>
                  <li className="flex items-start gap-2">
                    <BadgeCheck className="h-4 w-4 text-primary" />
                    Formatore giovani apprendisti
                  </li>
                  <li className="flex items-start gap-2">
                    <BadgeCheck className="h-4 w-4 text-primary" />
                    Relazione diretta con i clienti
                  </li>
                </ul>
              </div>

              {/* testo bio */}
              <div className="mt-6 space-y-4">
                <p className="text-sm text-muted-foreground">
                  <span className="font-medium text-foreground">BIO · </span>
                  Una vita in officina, con lo sguardo al dettaglio
                </p>
                <p className="text-muted-foreground">
                  Orlando avvia l’attività nel cuore del Lingotto, trasformando
                  una piccola bottega in una carrozzeria di riferimento a
                  Torino. Nel tempo ha introdotto cabine pressurizzate,
                  strumenti di colorimetria e procedure di controllo qualità,
                  mantenendo vivo l’approccio artigianale.
                </p>
                <p className="text-muted-foreground">
                  Conosciuto per la pazienza e l’onestà, segue personalmente i
                  lavori più delicati e affianca i clienti nella gestione dei
                  sinistri. Ancora oggi è in officina ogni giorno, occupandosi
                  di finiture e consegna veicoli.
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  <Badge variant="secondary">Cabina pressurizzata</Badge>
                  <Badge variant="secondary">Color match</Badge>
                  <Badge variant="secondary">Dettagli interni</Badge>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Citazione decorativa (fuori dal blocco full-bleed) */}
      <div className="mt-12 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 via-transparent to-amber-500/5 rounded-2xl blur-xl" />
        <Card className="relative border-2 border-amber-500/20 bg-gradient-to-br from-amber-500/5 to-transparent p-8">
          <div className="flex items-start gap-4">
            <div className="text-6xl text-amber-500/30 font-serif leading-none">
              "
            </div>
            <div className="flex-1 pt-2">
              <p className="text-lg italic text-muted-foreground leading-relaxed">
                Ogni auto ha la sua storia. Il mio lavoro è ridarle dignità,
                rispettando chi l'ha costruita e chi la guida.
              </p>
              <p className="mt-4 text-sm font-semibold text-foreground">
                — Orlando Mozzato
              </p>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
}
