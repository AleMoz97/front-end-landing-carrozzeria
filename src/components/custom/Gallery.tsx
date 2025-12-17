import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { Badge } from "../ui/badge";
import { useEffect } from "react";
import React from "react";
import { DATA } from "@/constants/variables.constant";

export function Gallery() {
  const items = DATA.gallery.length
    ? DATA.gallery
    : [
        "https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?q=80&w=1600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1542362567-b07e54358753?q=80&w=1600&auto=format&fit=crop",
        "https://images.unsplash.com/photo-1519641471654-76ce0107ad1b?q=80&w=1600&auto=format&fit=crop",
      ];

  const [index, setIndex] = React.useState<number>(0);
  const [paused, setPaused] = React.useState<boolean>(false);

  // Lightbox
  const [isOpen, setIsOpen] = React.useState(false);
  const [lightIndex, setLightIndex] = React.useState(0);

  const N = items.length;
  const prevIndex = (index - 1 + N) % N;
  const nextIndex = (index + 1) % N;

  // auto-advance ogni 4.5s se non in pausa o modale aperta
  useEffect(() => {
    if (paused || N <= 1 || isOpen) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % N), 4500);
    return () => clearInterval(id);
  }, [paused, N, isOpen]);

  // handler carosello inline
  const goPrev = () => setIndex((i) => (i - 1 + N) % N);
  const goNext = () => setIndex((i) => (i + 1) % N);

  // open/close lightbox
  const openLightbox = (i: number) => {
    setLightIndex(i);
    setIsOpen(true);
    setPaused(true);
  };
  const closeLightbox = () => {
    setIsOpen(false);
    setPaused(false);
  };
  const lightPrev = () => setLightIndex((i) => (i - 1 + N) % N);
  const lightNext = () => setLightIndex((i) => (i + 1) % N);

  // keyboard nella modale
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowLeft") lightPrev();
      if (e.key === "ArrowRight") lightNext();
    };
    window.addEventListener("keydown", onKey);
    // lock scroll body
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  // Card (prev | active | next)
  const Card = ({
    src,
    role,
    onClick,
  }: {
    src: string;
    role: "prev" | "active" | "next";
    onClick?: () => void;
  }) => {
    const isActive = role === "active";
    const dim = isActive ? "md:w-[520px] w-[85vw]" : "md:w-[360px] w-[70vw]";
    const opacity = isActive ? 1 : 0.75;

    return (
      <motion.div
        layout
        className={[
          "relative overflow-hidden rounded-2xl border bg-background/60 backdrop-blur-sm",
          "shadow-xl cursor-pointer",
          dim,
        ].join(" ")}
        initial={false}
        animate={{
          scale: isActive ? 1.04 : 0.92,
          opacity,
          filter: isActive ? "none" : "grayscale(8%)",
          boxShadow: isActive ? "0 18px 60px rgba(0,0,0,0.22)" : undefined,
        }}
        whileHover={
          isActive
            ? {
                scale: 1.08,
                translateZ: 0,
                boxShadow: "0 28px 90px rgba(0,0,0,0.28)",
                rotateX: 0.5,
                rotateY: -0.5,
                transition: { type: "spring", stiffness: 220, damping: 22 },
              }
            : {}
        }
        transition={{ type: "spring", stiffness: 300, damping: 26 }}
        onClick={onClick}
      >
        <img
          src={src}
          alt="Lavoro di carrozzeria"
          className="aspect-[16/9] w-full h-full object-cover select-none"
          draggable={false}
        />
        {isActive && (
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black/35 to-transparent" />
        )}
      </motion.div>
    );
  };

  return (
    <section
      id="gallery"
      className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 md:py-16"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => !isOpen && setPaused(false)}
    >
      <Badge>Gallery</Badge>
      <h2 className="text-4xl sm:text-5xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent mt-4">
        Lavori e laboratorio
      </h2>
      <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed mt-4 mb-8">
        Scorri alcuni interventi: ordine in cabina, precisione nei dettagli e
        finitura controllata dal titolare prima della consegna.
      </p>

      {/* Carousel wrapper */}
      <div className="relative mt-8">
        {/* Bottoni */}
        <button
          type="button"
          aria-label="Immagine precedente"
          onClick={goPrev}
          className="group absolute left-0 top-1/2 -translate-y-1/2 z-20 rounded-full border bg-background/80 backdrop-blur px-2 py-2 hover:bg-background"
        >
          <ChevronRight className="-scale-x-100 h-5 w-5 opacity-70 group-hover:opacity-100" />
        </button>
        <button
          type="button"
          aria-label="Immagine successiva"
          onClick={goNext}
          className="group absolute right-0 top-1/2 -translate-y-1/2 z-20 rounded-full border bg-background/80 backdrop-blur px-2 py-2 hover:bg-background"
        >
          <ChevronRight className="h-5 w-5 opacity-70 group-hover:opacity-100" />
        </button>

        {/* Tris visibile: prev | active | next */}
        <div className="mt-16">
          <motion.div
            key={index}
            initial={{ x: 80, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -80, opacity: 0 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="flex items-center justify-center gap-4 md:gap-6"
          >
            <Card
              src={items[prevIndex]}
              role="prev"
              onClick={() => openLightbox(prevIndex)}
            />
            <Card
              src={items[index]}
              role="active"
              onClick={() => openLightbox(index)}
            />
            <Card
              src={items[nextIndex]}
              role="next"
              onClick={() => openLightbox(nextIndex)}
            />
          </motion.div>
        </div>

        {/* Indicatori/pallini */}
        <div className="mt-5 flex justify-center gap-2">
          {items.map((_: any, i: any) => {
            const isActive = i === index;
            return (
              <button
                key={i}
                aria-label={`Vai alla foto ${i + 1}`}
                onClick={() => setIndex(i)}
                className={[
                  "h-2.5 rounded-full transition-all",
                  isActive ? "w-8 bg-primary" : "w-2.5 bg-muted",
                ].join(" ")}
              />
            );
          })}
        </div>
      </div>

      {/* LIGHTBOX */}
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-black/80 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={(e) => {
            // chiudi se clicchi sul backdrop (non sull'immagine)
            if (e.currentTarget === e.target) closeLightbox();
          }}
        >
          {/* Controlli */}
          <button
            aria-label="Chiudi"
            onClick={closeLightbox}
            className="absolute top-5 right-5 rounded-full border border-white/20 text-white/90 hover:text-white px-3 py-1.5 text-sm"
          >
            Chiudi
          </button>

          <button
            aria-label="Precedente"
            onClick={lightPrev}
            className="group absolute left-4 md:left-8 top-1/2 -translate-y-1/2 rounded-full border border-white/20 text-white/90 hover:text-white bg-white/10 hover:bg-white/20 px-2 py-2"
          >
            <ChevronRight className="-scale-x-100 h-6 w-6" />
          </button>
          <button
            aria-label="Successiva"
            onClick={lightNext}
            className="group absolute right-4 md:right-8 top-1/2 -translate-y-1/2 rounded-full border border-white/20 text-white/90 hover:text-white bg-white/10 hover:bg-white/20 px-2 py-2"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          {/* Immagine grande */}
          <motion.img
            key={lightIndex}
            src={items[lightIndex]}
            alt={`Foto ${lightIndex + 1} di ${N}`}
            className="max-h-[80vh] max-w-[92vw] rounded-xl shadow-2xl object-contain"
            initial={{ scale: 0.94, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", stiffness: 220, damping: 22 }}
            draggable={false}
          />
        </motion.div>
      )}
    </section>
  );
}
