import { ChevronRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import React from "react";

// Importa i tuoi dati
import { DATA } from "@/constants/variables.constant";

export function Services() {
  const [pf, setPf] = React.useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  // stato flip per ogni card (indice=>boolean)
  const [flipped, setFlipped] = React.useState<Record<number, boolean>>({});

  const toggleFlip = (i: number) => setFlipped((s) => ({ ...s, [i]: !s[i] }));

  const onKeyFlip = (i: number) => (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      toggleFlip(i);
    }
  };

  const update =
    (k: keyof typeof pf) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setPf((s) => ({ ...s, [k]: e.target.value }));

  function buildEmailHref() {
    const subject = `Richiesta preventivo – ${DATA.businessName}`;
    const body = [
      `Nome: ${pf.name}`,
      `Telefono: ${pf.phone}`,
      `Email: ${pf.email}`,
      "",
      "Descrizione:",
      pf.message,
    ].join("\n");
    return `mailto:${DATA.email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  }

  function buildWhatsappHref() {
    const text = [
      `Ciao ${DATA.businessName}, vorrei un preventivo.`,
      `Nome: ${pf.name}`,
      `Telefono: ${pf.phone}`,
      `Email: ${pf.email}`,
      "",
      "Descrizione:",
      pf.message,
    ].join("\n");
    return `https://wa.me/${DATA.whatsapp.replace(
      /\D/g,
      ""
    )}?text=${encodeURIComponent(text)}`;
  }

  return (
    <section
      id="servizi"
      className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24 overflow-hidden"
    >
      {/* Elementi decorativi di sfondo */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl -z-10" />

      {/* Header sezione */}
      <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-6 mb-12">
        <div className="space-y-4">
          <Badge className="bg-primary/10 text-primary hover:bg-primary/20 border-0 px-4 py-1.5">
            ✨ I Nostri Servizi
          </Badge>
          <h2 className="text-4xl sm:text-5xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Cosa facciamo
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
            Dalla piccola ammaccatura al ripristino completo: lavorazioni curate
            e garantite con oltre 20 anni di esperienza.
          </p>
        </div>
        <Button
          asChild
          size="lg"
          className="hidden md:inline-flex group shadow-lg hover:shadow-xl transition-all"
        >
          <a href="#preventivo" className="inline-flex items-center gap-2">
            Richiedi preventivo
            <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </Button>
      </div>

      {/* Griglia servizi con flip cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
        {DATA.services.map((s, i) => {
          const isFlipped = !!flipped[i];

          return (
            <div key={i} className="relative h-[320px] ">
              {/* Wrapper con perspective */}
              <div
                className="relative w-full h-full cursor-pointer [perspective:1200px]"
                role="button"
                tabIndex={0}
                onClick={() => toggleFlip(i)}
                onKeyDown={onKeyFlip(i)}
                aria-pressed={isFlipped}
                aria-label={`${s.title} – ${
                  isFlipped ? "mostra fronte" : "mostra dettagli"
                }`}
              >
                {/* Container che ruota */}
                <motion.div
                  className="relative w-full h-full [transform-style:preserve-3d]"
                  animate={{ rotateY: isFlipped ? 180 : 0 }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                  {/* FRONTE */}
                  <div
                    className="absolute inset-0 w-full h-full [backface-visibility:hidden] [-webkit-backface-visibility:hidden]"
                    style={{
                      WebkitBackfaceVisibility: "hidden",
                      backfaceVisibility: "hidden",
                    }}
                  >
                    <Card className="h-full border-2 hover:border-primary/50 transition-all duration-300 hover:shadow-2xl bg-gradient-to-br from-card to-card/50 backdrop-blur overflow-hidden group">
                      {/* Decorazione angolo */}
                      <div className="absolute top-0 right-0 w-20 h-20 bg-primary/5 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity" />

                      {/* Effetto gradiente al hover */}
                      <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/0 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                      <CardHeader className="relative">
                        <div className="h-14 w-14 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center text-primary mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg">
                          {s.icon}
                        </div>
                        <CardTitle className="text-xl font-bold group-hover:text-primary transition-colors">
                          {s.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="relative">
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {s.desc}
                        </p>
                        <div className="mt-4 pt-4 border-t border-border/50">
                          <span className="inline-flex items-center gap-2 text-xs text-muted-foreground font-medium">
                            Clicca per altre info
                            <ChevronRight className="h-3.5 w-3.5" />
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* RETRO */}
                  <div
                    className="absolute inset-0 w-full h-full [backface-visibility:hidden] [-webkit-backface-visibility:hidden] [transform:rotateY(180deg)]"
                    style={{
                      WebkitBackfaceVisibility: "hidden",
                      backfaceVisibility: "hidden",
                      transform: "rotateY(180deg)",
                    }}
                  >
                    <Card className="h-full border-2 border-primary/30 bg-gradient-to-br from-primary/5 to-card shadow-2xl">
                      <img src="./logo_carrozzeria.png" />
                    </Card>
                  </div>
                </motion.div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Preventivo rapido */}
      <div id="preventivo" className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-transparent to-primary/10 rounded-3xl blur-2xl -z-10" />

        <Card className="border-2 shadow-2xl overflow-hidden p-0">
          {/* Header colorato */}
          <div className="h-2 bg-gradient-to-r from-primary via-blue-500 to-primary" />

          <CardHeader className="space-y-2 pb-6">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Sparkles className="h-5 w-5 text-primary" />
              </div>
              <CardTitle className="text-2xl font-bold">
                Richiedi un Preventivo Gratuito
              </CardTitle>
            </div>
            <p className="text-muted-foreground">
              Compila il form e ti risponderemo entro 24 ore con un preventivo
              dettagliato
            </p>
          </CardHeader>

          <CardContent className="pb-8">
            <div className="grid md:grid-cols-3 gap-5">
              <div className="space-y-2">
                <Input
                  placeholder="Nome e Cognome"
                  value={pf.name}
                  onChange={update("name")}
                  required
                  className="h-12 border-2 focus:border-primary transition-colors"
                />
              </div>
              <div className="space-y-2">
                <Input
                  type="tel"
                  placeholder="Telefono"
                  value={pf.phone}
                  onChange={update("phone")}
                  required
                  className="h-12 border-2 focus:border-primary transition-colors"
                />
              </div>
              <div className="space-y-2">
                <Input
                  type="email"
                  placeholder="Email"
                  value={pf.email}
                  onChange={update("email")}
                  required
                  className="h-12 border-2 focus:border-primary transition-colors"
                />
              </div>

              <div className="md:col-span-3 space-y-2">
                <Textarea
                  placeholder="Descrivi il danno o l'intervento richiesto (es. ammaccatura portiera anteriore sinistra, graffi su cofano, ecc.)"
                  rows={5}
                  value={pf.message}
                  onChange={update("message")}
                  className="border-2 focus:border-primary transition-colors resize-none"
                />
              </div>

              <div className="md:col-span-3 flex flex-wrap gap-4 pt-2">
                <Button
                  asChild
                  size="lg"
                  className="shadow-lg hover:shadow-xl transition-all"
                >
                  <a
                    href={buildEmailHref()}
                    className="inline-flex items-center gap-2"
                  >
                    <svg
                      className="h-5 w-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                    Invia via Email
                  </a>
                </Button>
                <Button
                  asChild
                  variant="secondary"
                  size="lg"
                  className="shadow-lg hover:shadow-xl transition-all bg-green-500 hover:bg-green-600 text-white border-0"
                >
                  <a
                    href={buildWhatsappHref()}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2"
                  >
                    <svg
                      className="h-5 w-5"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                    </svg>
                    Invia su WhatsApp
                  </a>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
