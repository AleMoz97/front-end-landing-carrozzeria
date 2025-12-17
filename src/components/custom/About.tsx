import { EASE } from "@/constants/variables.constant";
import { motion, useInView } from "framer-motion";
import { BadgeCheck } from "lucide-react";
import { Badge } from "../ui/badge";
import React, { useEffect } from "react";

export function About() {
  // Varianti per i testi a sinistra
  const parent = {
    hidden: {},
    show: { transition: { staggerChildren: 0.15 } },
  };
  const itemUp = {
    hidden: { opacity: 0, y: -18 },
    show: { opacity: 1, y: 0, transition: { duration: 0.45 } },
  };

  // Varianti destra (srotolamento)
  const listParent = {
    hidden: {},
    show: { transition: { staggerChildren: 0.18 } },
  } as const;

  const revealDown = {
    hidden: { opacity: 0, clipPath: "inset(0 0 100% 0)" },
    show: {
      opacity: 1,
      clipPath: "inset(0 0 0% 0)",
      transition: { duration: 0.55, ease: EASE },
    },
  } as const;

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.1 } },
  };

  // re-trigger animazioni su viewport
  const rightRef = React.useRef<HTMLDivElement | null>(null);
  const inView = useInView(rightRef, { amount: 0.4 });
  const [cycle, setCycle] = React.useState(0);
  useEffect(() => {
    if (inView) setCycle((c) => c + 1);
  }, [inView]);

  return (
    <section
      id="chi-siamo"
      className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-28 overflow-hidden"
    >
      {/* Elementi decorativi di sfondo eleganti */}
      <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-primary/[0.03] rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] bg-foreground/[0.02] rounded-full blur-3xl pointer-events-none" />

      <div className="gap-12 lg:gap-16 items-start">
        {/* RIGA 1: Titolo (2 colonne) */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="md:col-span-2 space-y-5"
        >
          <Badge>Chi siamo</Badge>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1]">
            Una storia di mani esperte
            <br />
            <span className="text-muted-foreground">e fiducia guadagnata</span>
          </h2>
        </motion.div>

        {/* RIGA 2: Sinistra testo */}
        <motion.div
          variants={parent}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
          className="space-y-6 mt-12 mb-12"
        >
          <motion.p
            variants={itemUp}
            className="text-base lg:text-lg text-muted-foreground leading-relaxed"
          >
            Fondata nel cuore del quartiere Lingotto, la nostra carrozzeria
            nasce come piccola bottega di famiglia e cresce mantenendo intatta
            la stessa filosofia:
            <strong className="text-foreground font-semibold">
              {" "}
              ogni riparazione deve sembrare un'opera finita a regola d'arte
            </strong>
            . Oggi come allora, ci distinguiamo per la precisione dei dettagli e
            per la presenza diretta del titolare in ogni fase del lavoro.
          </motion.p>

          <motion.p
            variants={itemUp}
            className="text-base lg:text-lg text-muted-foreground leading-relaxed"
          >
            Non siamo un grande centro dove un'auto entra da una porta e ne esce
            da un'altra: siamo un laboratorio artigiano dove{" "}
            <strong className="text-foreground font-semibold">
              ogni veicolo viene seguito dall'inizio alla fine dalla stessa
              persona
            </strong>
            . È questo contatto umano — tra cliente e artigiano — che rende il
            risultato più curato, più sicuro e, soprattutto, più onesto.
          </motion.p>
        </motion.div>

        {/* RIGA 2: Destra timeline + valori */}
        <motion.div
          key={cycle}
          ref={rightRef}
          variants={listParent}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, margin: "-60px" }}
          onFocus={() => setCycle((c) => c + 1)}
          tabIndex={0}
          className="relative overflow-hidden rounded-3xl border-2 border-border/50 bg-gradient-to-br from-muted/30 via-background to-background p-8 lg:p-10 space-y-8 shadow-xl focus-visible:ring-2 focus-visible:ring-primary/30 focus-visible:outline-none"
          aria-label="Timeline storica e valori"
        >
          {/* Decorazione angolo */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full" />

          {/* Rail verticale minimalista */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-8 top-8 bottom-8 w-[2px]"
          >
            <motion.div
              className="h-full w-full bg-gradient-to-b from-primary/40 via-primary/20 to-transparent rounded-full"
              initial={{ scaleY: 0, originY: 0 }}
              animate={{ scaleY: 1, originY: 0 }}
              transition={{ duration: 0.8, ease: EASE }}
            />
          </div>

          {/* Timeline */}
          <div className="pl-8 space-y-7 relative">
            <motion.div variants={revealDown} className="relative">
              <span className="absolute -left-[33px] top-2 h-2.5 w-2.5 rounded-full bg-primary/80 ring-4 ring-background shadow-sm" />
              <div className="font-semibold text-foreground mb-2">
                1940s — Le origini
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Il nonno del titolare riparava carrozze e telai in legno nel
                quartiere San Salvario, tramandando il mestiere ai figli.
              </p>
            </motion.div>

            <motion.div variants={revealDown} className="relative">
              <span className="absolute -left-[33px] top-2 h-2.5 w-2.5 rounded-full bg-primary/80 ring-4 ring-background shadow-sm" />
              <div className="font-semibold text-foreground mb-2">
                1960s–1990s — L'evoluzione
              </div>
              <p className="text-sm leading-relaxed text-muted-foreground">
                Nasce la carrozzeria Lingotto: arrivano le prime cabine
                pressurizzate, l'esperienza si consolida, i clienti diventano
                parte della comunità.
              </p>
            </motion.div>

            <motion.div variants={revealDown} className="relative">
              {/* Dot attivo con pulse */}
              <span className="absolute -left-[33px] top-2 h-2.5 w-2.5 rounded-full bg-primary ring-4 ring-background shadow-lg">
                <span className="absolute inset-0 rounded-full animate-ping bg-primary/60" />
              </span>

              <div className="relative rounded-2xl border-2 border-primary/20 bg-gradient-to-br from-primary/[0.08] to-transparent p-5 shadow-sm">
                <div className="absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl bg-primary" />
                <div className="font-bold text-foreground mb-2.5 flex items-center gap-2">
                  Oggi — L'artigiano moderno
                  <span className="inline-flex h-2 w-2 rounded-full bg-primary animate-pulse" />
                </div>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Orlando continua la tradizione con le stesse mani esperte di
                  famiglia, ma con strumenti di precisione, colorimetria
                  digitale e processi controllati.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Divider elegante */}
          <div className="relative h-px bg-gradient-to-r from-transparent via-border to-transparent" />

          {/* Valori */}
          <motion.div variants={listParent} className="space-y-1 relative">
            <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4 pl-8">
              I nostri valori
            </div>
            {[
              "Cura artigianale e attenzione a ogni dettaglio",
              "Rapporto diretto, chiaro e continuativo con il cliente",
              "Tradizione familiare unita a strumenti moderni di verniciatura",
            ].map((t, i) => (
              <motion.div
                key={i}
                variants={revealDown}
                className="flex items-start gap-3 pl-8 py-2 rounded-lg hover:bg-muted/30 transition-colors"
              >
                <BadgeCheck className="mt-0.5 h-4 w-4 text-primary flex-shrink-0" />
                <span className="text-sm leading-relaxed text-muted-foreground">
                  {t}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* RIGA 3: Immagine su 2 colonne */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.7, ease: EASE }}
          className="md:col-span-2 mt-8"
        >
          <div className="relative rounded-3xl overflow-hidden shadow-2xl group">
            {/* Bordo decorativo */}
            <div className="absolute -inset-[1px] bg-gradient-to-br from-primary/20 via-transparent to-primary/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative rounded-3xl overflow-hidden">
              <img
                src="https://media.youdriver.com/media/workshops/publicphotos/83/14/8314d146-d004-4e3f-aa07-18a34541a809.jpg.300x0_q85.jpg"
                alt="Carrozzeria Lingotto – officina storica"
                className="w-full h-auto object-cover transform group-hover:scale-[1.02] transition-transform duration-700"
              />
              {/* Overlay gradient elegante */}
              <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-black/40 via-black/0 to-black/0" />

              {/* Label opzionale */}
              <div className="absolute bottom-6 left-6 right-6">
                <div className="inline-flex items-center gap-2 bg-background/90 backdrop-blur-md px-4 py-2.5 rounded-xl border border-border/50 shadow-lg">
                  <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                  <span className="text-sm font-medium">
                    La nostra officina nel cuore di Torino
                  </span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
