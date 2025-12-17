import { AnimatePresence, motion } from "framer-motion";
import { Button } from "../ui/button";
import { ChevronRight, Phone } from "lucide-react";
import React from "react";
import { DATA } from "@/constants/variables.constant";

function useScrollSpyByOffsets(ids: string[], headerOffset = 72) {
  const [active, setActive] = React.useState<string>(ids[0] ?? "");

  React.useEffect(() => {
    const getOffsets = () =>
      ids
        .map((id) => {
          const el = document.getElementById(id);
          return el ? { id, top: el.offsetTop } : null;
        })
        .filter(Boolean) as { id: string; top: number }[];

    let sections = getOffsets();

    const onResize = () => {
      sections = getOffsets();
      onScroll(); // ricalcola subito l'attivo
    };

    const onScroll = () => {
      const y = window.scrollY + headerOffset + 1;
      let current = sections[0]?.id ?? "";
      for (const s of sections) {
        if (s.top <= y) current = s.id;
        else break;
      }
      setActive(current);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, [ids, headerOffset]);

  return active;
}

// Parsing semplice degli orari tipo "08:30–12:30, 14:00–18:30"
function useOpenStatus(opening = DATA.opening) {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const isOpenNow = () => {
      const now = new Date();
      const dow = now.getDay(); // 0=Dom ... 6=Sab
      const todayLabel =
        dow === 0 ? "Domenica" : dow === 6 ? "Sabato" : "Lunedì–Venerdì";
      const row = opening.find((o: any) => o.day === todayLabel);
      if (!row || /chiuso/i.test(row.hours)) return false;

      const toMin = (hhmm: string) => {
        const [h, m] = hhmm.split(":").map(Number);
        return h * 60 + (m || 0);
      };
      const mins = now.getHours() * 60 + now.getMinutes();
      // es. "08:30–12:30, 14:00–18:30"
      const spans = row.hours.split(",").map((s: any) => s.trim());
      for (const span of spans) {
        const [a, b] = span.split("–").map((s: any) => s.trim());
        if (!a || !b) continue;
        const start = toMin(a);
        const end = toMin(b);
        if (mins >= start && mins <= end) return true;
      }
      return false;
    };

    setOpen(isOpenNow());
    const id = setInterval(() => setOpen(isOpenNow()), 60 * 1000);
    return () => clearInterval(id);
  }, [opening]);

  return open;
}

export default function Header() {
  const LINKS = [
    { id: "caratteristiche", label: "Caratteristiche" },
    { id: "chi-siamo", label: "Chi siamo" },
    { id: "servizi", label: "Servizi" },
    { id: "gallery", label: "Gallery" },
    { id: "titolare", label: "Titolare" },
    { id: "consigli", label: "Consigli" },
    { id: "contatti", label: "Contatti" },
  ] as const;

  const active = useScrollSpyByOffsets(
    LINKS.map((l) => l.id),
    72
  );
  const isOpen = useOpenStatus();

  // stato scroll + progress
  const [scrolled, setScrolled] = React.useState(false);
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement;
      const top = doc.scrollTop || document.body.scrollTop;
      const h = doc.scrollHeight - doc.clientHeight;
      setScrolled(top > 8);
      setProgress(h > 0 ? top / h : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // mobile
  const [open, setOpen] = React.useState(false);

  const go = (id: string) => (e?: React.MouseEvent) => {
    e?.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - 72;
    window.scrollTo({ top: y, behavior: "smooth" });
    setOpen(false);
  };

  return (
    <div
      className={[
        "sticky top-0 z-50 transition-shadow",
        "backdrop-blur supports-[backdrop-filter]:bg-background/65",
        scrolled
          ? "shadow-[0_6px_30px_rgba(0,0,0,0.08)] border-b"
          : "border-b/0",
      ].join(" ")}
    >
      {/* progress bar di lettura */}
      <motion.div
        className="h-[2px] bg-gradient-to-r from-primary via-blue-500 to-primary"
        style={{ transformOrigin: "left" }}
        animate={{ scaleX: progress }}
        initial={false}
        transition={{ ease: [0.16, 1, 0.3, 1], duration: 0.2 }}
      />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand + logo micro-anim quando sei in cima */}
        <a
          href="#"
          className="flex items-center gap-3"
          onClick={go("caratteristiche")}
        >
          <motion.div
            className="h-9 w-9 rounded-xl bg-primary/10 flex items-center justify-center overflow-hidden"
            animate={
              scrolled
                ? { scale: 1, boxShadow: "0 0 0 rgba(0,0,0,0)" }
                : { scale: 1.05, boxShadow: "0 0 24px rgba(0,0,0,0.06)" }
            }
            transition={{ type: "spring", stiffness: 320, damping: 22 }}
          >
            <img
              src="./logo_carrozzeria.png"
              alt="Carrozzeria Lingotto"
              className="h-7 w-7 object-contain"
            />
          </motion.div>
          <div className="leading-tight">
            <p className="font-semibold">{DATA.businessName}</p>
            <p className="text-xs text-muted-foreground">di {DATA.owner}</p>
          </div>
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-2">
          <div className="relative flex items-center gap-1 text-sm">
            {LINKS.map((l) => {
              const isActive = active === l.id;
              return (
                <a
                  key={l.id}
                  href={`#${l.id}`}
                  onClick={go(l.id)}
                  className={[
                    "relative px-3 py-2 rounded-lg transition-colors",
                    isActive
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground",
                  ].join(" ")}
                >
                  {l.label}
                  {isActive && (
                    <motion.div
                      layoutId="nav-underline"
                      className="absolute left-2 right-2 -bottom-[2px] h-[2px] rounded-full bg-primary"
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 40,
                      }}
                    />
                  )}
                </a>
              );
            })}
          </div>
        </nav>

        {/* CTA + stato apertura */}
        <div className="hidden md:flex items-center gap-3">
          <div
            className={[
              "hidden lg:inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-xs border",
              isOpen
                ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-700"
                : "border-rose-500/30 bg-rose-500/10 text-rose-700",
            ].join(" ")}
            title={isOpen ? "Siamo aperti" : "Siamo chiusi"}
          >
            <span
              className={[
                "h-2 w-2 rounded-full",
                isOpen ? "bg-emerald-500" : "bg-rose-500",
              ].join(" ")}
            />
            {isOpen ? "Aperti ora" : "Chiusi"}
          </div>

          <Button asChild size="sm">
            <a
              href={`tel:${DATA.phone.replace(/\s/g, "")}`}
              className="inline-flex items-center gap-2"
            >
              <Phone className="h-4 w-4" /> Chiama
            </a>
          </Button>
          <Button asChild size="sm" variant="secondary">
            <a
              href="#preventivo"
              onClick={go("preventivo")}
              className="inline-flex items-center gap-2"
            >
              <ChevronRight className="h-4 w-4" /> Preventivo
            </a>
          </Button>
        </div>

        {/* Burger mobile */}
        <button
          className="md:hidden inline-flex h-10 w-10 items-center justify-center rounded-lg border hover:bg-muted/50"
          onClick={() => setOpen((v) => !v)}
          aria-label="Apri menù"
          aria-expanded={open}
        >
          <svg width="20" height="20" viewBox="0 0 24 24">
            <path
              d={open ? "M6 6 L18 18 M6 18 L18 6" : "M3 6h18M3 12h18M3 18h18"}
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="md:hidden border-t"
          >
            <div className="px-4 sm:px-6 py-3 space-y-1">
              {LINKS.map((l) => {
                const isActive = active === l.id;
                return (
                  <a
                    key={l.id}
                    href={`#${l.id}`}
                    onClick={go(l.id)}
                    className={[
                      "block px-3 py-2 rounded-lg",
                      isActive
                        ? "bg-primary/10 text-foreground"
                        : "text-muted-foreground hover:bg-muted/60",
                    ].join(" ")}
                  >
                    {l.label}
                  </a>
                );
              })}

              <div className="flex gap-2 pt-2">
                <Button asChild className="flex-1">
                  <a href={`tel:${DATA.phone.replace(/\s/g, "")}`}>Chiama</a>
                </Button>
                <Button asChild variant="secondary" className="flex-1">
                  <a href="#preventivo" onClick={go("preventivo")}>
                    Preventivo
                  </a>
                </Button>
              </div>

              {/* stato apertura anche su mobile */}
              <div
                className={[
                  "mt-3 inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-xs border",
                  isOpen
                    ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-700"
                    : "border-rose-500/30 bg-rose-500/10 text-rose-700",
                ].join(" ")}
              >
                <span
                  className={[
                    "h-2 w-2 rounded-full",
                    isOpen ? "bg-emerald-500" : "bg-rose-500",
                  ].join(" ")}
                />
                {isOpen ? "Aperti ora" : "Chiusi"}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
