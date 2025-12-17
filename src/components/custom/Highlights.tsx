import { animate, motion, useInView, useMotionValue } from "framer-motion";
import {
  Award,
  BadgeCheck,
  MapPin,
  Shield,
  Sparkles,
  Wrench,
} from "lucide-react";
import React, { useEffect, useRef } from "react";
import { Badge } from "@/components/ui/badge";

interface MagneticCardProps {
  children: React.ReactNode;
}
function MagneticCard({ children }: MagneticCardProps): React.ReactElement {
  const ref = useRef<HTMLDivElement>(null);
  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / rect.width;
    const y = (e.clientY - rect.top - rect.height / 2) / rect.height;
    el.style.transform = `translate(${x * 8}px, ${y * 8}px)`;
  };
  const onLeave = () => {
    const el = ref.current;
    if (el) el.style.transform = "translate(0,0)";
  };
  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="transition-transform will-change-transform"
    >
      {children}
    </div>
  );
}

interface CounterProps {
  from?: number;
  to?: number;
  duration?: number;
  suffix?: string;
}
function Counter({
  from = 0,
  to = 80,
  duration = 1.2,
  suffix = "",
}: CounterProps): React.ReactElement {
  const mv = useMotionValue<number>(from);
  const [val, setVal] = React.useState<number>(from);
  const ref = useRef<HTMLSpanElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!inView) return;
    const controls = animate(mv, to, { duration, ease: "easeOut" });
    const unsub = mv.on("change", (v) => setVal(Math.round(v)));
    return () => {
      unsub();
      controls.stop();
    };
  }, [inView, to, duration, mv]);

  return (
    <span ref={ref}>
      {val}
      {suffix}
    </span>
  );
}

export function Highlights() {
  const [active, setActive] = React.useState<number>(0);
  const [paused, setPaused] = React.useState<boolean>(false);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setActive((i) => (i + 1) % 4), 7000);
    return () => clearInterval(id);
  }, [paused]);

  const CARDS = [
    {
      key: "artigiano",
      bgImage:
        "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?q=80&w=2000",
      icon: <Wrench className="h-7 w-7" />,
      title: "Parli con chi fa il lavoro",
      subtitle: "Unico referente: Orlando",
      teaser:
        "Niente filtri né passaggi di mano: parli e lavori con la stessa persona, dall'ingresso in officina alla consegna.",
      details: (
        <div className="space-y-3 text-[0.95rem] leading-relaxed">
          <p className="text-foreground/90">
            La differenza non è solo nel risultato, ma nel percorso:{" "}
            <span className="font-medium text-foreground">
              un dialogo diretto
            </span>{" "}
            con chi toccherà la tua auto significa decisioni più rapide,
            informazioni chiare e responsabilità ben definita. Se serve un
            aggiustamento, lo vedi e lo approvi insieme a chi lo esegue.
          </p>
          <ul className="space-y-1">
            <li className="flex gap-2 text-foreground/90">
              <BadgeCheck className="h-4 w-4 text-primary" /> Preventivo,
              lavorazione e consegna seguiti da Orlando
            </li>
            <li className="flex gap-2 text-foreground/90">
              <BadgeCheck className="h-4 w-4 text-primary" /> Aggiornamenti
              reali sullo stato lavori (non promesse vaghe)
            </li>
            <li className="flex gap-2 text-foreground/90">
              <BadgeCheck className="h-4 w-4 text-primary" /> Controllo qualità
              finale fatto di persona
            </li>
          </ul>
        </div>
      ),
    },
    {
      key: "tradizione",
      bgImage:
        "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=2000",
      icon: <Award className="h-7 w-7" />,
      title: "Ottant'anni di mestiere",
      subtitle: "Dal nonno che riparava le carrozze",
      teaser:
        "Una storia che nasce prima dell'auto moderna: sapere antico, strumenti di oggi, risultati che durano.",
      details: (
        <div className="space-y-3 text-[0.95rem] leading-relaxed">
          <p className="text-foreground/90">
            La nostra famiglia ha iniziato riparando le carrozze: questo
            significa{" "}
            <span className="font-medium text-foreground">
              occhio per le linee
            </span>
            , rispetto dei materiali e una cultura della finitura che non si
            improvvisa. Oggi uniamo colorimetria digitale, cabine pressurizzate
            e procedure di controllo: tradizione + metodo.
          </p>
          <p className="text-2xl font-bold leading-none text-foreground">
            <Counter to={80} suffix="+" /> anni di lavoro vero in officina
          </p>
        </div>
      ),
    },
    {
      key: "qualita",
      bgImage:
        "https://images.unsplash.com/photo-1625047509168-a7026f36de04?q=80&w=2000",
      icon: <Shield className="h-7 w-7" />,
      title: "Qualità su misura, non numeri",
      subtitle: "Zero catena di montaggio",
      teaser:
        "Tempi realistici, materiali premium e finiture controllate: qui conta il risultato, non la velocità del nastro.",
      details: (
        <div className="space-y-3 text-[0.95rem] leading-relaxed">
          <p className="text-foreground/90">
            Le lavorazioni sono{" "}
            <span className="font-medium text-foreground">
              sequenziate e verificate
            </span>
            : preparazione, verniciatura, lucidatura e protezione hanno ognuna
            il suo tempo tecnico. Preferiamo dire un "no" a un giorno in meno
            piuttosto che consegnare un'auto non perfetta.
          </p>
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="rounded-lg border border-foreground/20 bg-background/60 backdrop-blur-sm p-3">
              <p className="font-medium text-foreground">Noi</p>
              <ul className="mt-2 space-y-1 text-foreground/80">
                <li>Referente unico</li>
                <li>Tempi realistici</li>
                <li>Finiture controllate</li>
              </ul>
            </div>
            <div className="rounded-lg border border-foreground/20 bg-background/60 backdrop-blur-sm p-3">
              <p className="font-medium text-foreground">Grandi centri</p>
              <ul className="mt-2 space-y-1 text-foreground/80">
                <li>Più passaggi</li>
                <li>Focus sui volumi</li>
                <li>Esiti altalenanti</li>
              </ul>
            </div>
          </div>
        </div>
      ),
    },
    {
      key: "territorio",
      bgImage:
        "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=2000",
      icon: <MapPin className="h-7 w-7" />,
      title: "Lingotto · Torino",
      subtitle: "Un riferimento di quartiere",
      teaser:
        "Vicini, disponibili e comodi da raggiungere: il passaparola locale è la nostra migliore pubblicità.",
      details: (
        <div className="space-y-3 text-[0.95rem] leading-relaxed">
          <p className="text-foreground/90">
            Lavoriamo per chi vive e lavora in zona: fermarsi per un
            sopralluogo, rivedere insieme un dettaglio, concordare la consegna è
            più semplice quando il rapporto è diretto e vicino. La fiducia si
            costruisce così.
          </p>
          <div className="inline-flex items-center gap-2 rounded-full border border-foreground/20 bg-background/60 backdrop-blur-sm px-3 py-1 text-xs">
            <Sparkles className="h-3.5 w-3.5" /> Passa in officina per un
            controllo visivo gratuito
          </div>
        </div>
      ),
    },
  ] as const;

  return (
    <section
      id="caratteristiche"
      className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16"
    >
      <div className="mb-8">
        <Badge>Perché sceglierci</Badge>
        <h2 className="mt-3 text-3xl sm:text-4xl font-semibold tracking-tight">
          L'artigiano di fiducia a Lingotto
        </h2>
        <p className="mt-2 text-muted-foreground max-w-3xl">
          Qui non ti perdi tra reparti e centralini: parli con{" "}
          <span className="font-medium">chi mette le mani sulla tua auto</span>.
          La nostra è una carrozzeria familiare: radici profonde, metodo moderno
          e una promessa semplice —{" "}
          <span className="font-medium">
            curare ogni vettura come se fosse la nostra
          </span>
          .
        </p>
      </div>

      <div
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        {CARDS.map((c, i) => {
          const isActive = i === active;
          return (
            <MagneticCard key={c.key}>
              <motion.div
                role="button"
                tabIndex={0}
                onFocus={() => {
                  setActive(i);
                  setPaused(true);
                }}
                onBlur={() => setPaused(false)}
                onMouseEnter={() => {
                  setActive(i);
                  setPaused(true);
                }}
                className="relative overflow-hidden rounded-2xl border h-full min-h-[340px] outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
                animate={{
                  scale: isActive ? 1.02 : 1,
                  boxShadow: isActive
                    ? "0 16px 48px rgba(0,0,0,0.14)"
                    : "0 0 0 rgba(0,0,0,0)",
                  borderColor: isActive
                    ? "rgba(0,0,0,0.10)"
                    : "rgba(0,0,0,0.06)",
                }}
                transition={{ type: "spring", stiffness: 260, damping: 22 }}
              >
                {/* Immagine di sfondo */}
                <div
                  className="absolute inset-0 bg-cover bg-center"
                  style={{ backgroundImage: `url(${c.bgImage})` }}
                />

                {/* Overlay per garantire leggibilità - gradiente più forte */}
                <div className="absolute inset-0 bg-gradient-to-br from-background/80 via-background/75 to-background/70 backdrop-blur-[2px]" />

                {/* Contenuto della card */}
                <div className="relative p-7 h-full flex flex-col">
                  {/* Header */}
                  <div className="flex items-start gap-4">
                    <div className="h-12 w-12 rounded-2xl bg-primary/10 backdrop-blur-md flex items-center justify-center text-primary shrink-0 shadow-lg">
                      {c.icon}
                    </div>
                    <div>
                      <p className="text-lg font-semibold text-foreground">
                        {c.title}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {c.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Teaser sempre visibile */}
                  <p className="mt-4 text-sm text-muted-foreground">
                    {c.teaser}
                  </p>

                  {/* Dettagli espansi */}
                  <motion.div
                    aria-hidden={!isActive}
                    animate={{
                      opacity: isActive ? 1 : 0,
                      height: isActive ? "auto" : 0,
                      marginTop: isActive ? 14 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    {c.details}
                  </motion.div>
                </div>
              </motion.div>
            </MagneticCard>
          );
        })}
      </div>
    </section>
  );
}
