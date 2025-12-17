import React from "react";
import { Badge } from "../ui/badge";
import { motion } from "framer-motion";
import { ChevronRight, Sparkles } from "lucide-react";

export default function ExpertTips() {
  const EASE = [0.16, 1, 0.3, 1] as const;

  // Domande e risposte (stesso contenuto che avevamo)
  const faqs: { q: string; a: React.ReactNode }[] = [
    {
      q: "Quando conviene riverniciare anziché riparare?",
      a: (
        <>
          <p className="leading-relaxed text-muted-foreground">
            Dipende da <strong>profondità ed estensione</strong> del difetto. Se
            il graffio è nel solo trasparente, spesso basta{" "}
            <em>correzione e lucidatura</em>. Quando si vede il colore di fondo
            o la lamiera, serve{" "}
            <strong>stuccatura + primer + base + trasparente</strong>.
          </p>
          <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
            <li>• Micro-segni → lucidatura.</li>
            <li>
              • Graffi profondi/scheggiature → riverniciatura parziale pannello.
            </li>
            <li>
              • Ammaccature con vernice saltata → ripristino lamiera +
              verniciatura.
            </li>
          </ul>
        </>
      ),
    },
    {
      q: "Come capire se la grandine ha danneggiato la vernice?",
      a: (
        <>
          <p className="leading-relaxed text-muted-foreground">
            Le “bolette” spesso <strong>non rompono la vernice</strong>.
            Verifichiamo con luce radente e riflessi: se non ci sono
            micro-crepe, si usa il <strong>PDR (tirabolli a freddo)</strong>{" "}
            senza pittura.
          </p>
          <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
            <li>• Vernice integra → PDR.</li>
            <li>
              • Vernice lesionata/spigoli colpiti → riparazione + verniciatura.
            </li>
            <li>
              • Tetto/cofano molto colpiti → valutazione combinata e tempi
              realistici.
            </li>
          </ul>
        </>
      ),
    },
    {
      q: "Differenza tra vernice pastello e metallizzata (e perlata)?",
      a: (
        <>
          <p className="leading-relaxed text-muted-foreground">
            La <strong>pastello</strong> usa pigmenti piatti; la{" "}
            <strong>metallizzata/perlata</strong> include scaglie che danno
            profondità. In riparazione le tinte effetto richiedono{" "}
            <em>sfumature</em> e test colore.
          </p>
          <ul className="mt-3 space-y-1 text-sm text-muted-foreground">
            <li>
              • Pastello → match più semplice, costi leggermente inferiori.
            </li>
            <li>
              • Metallizzata/perlata → tempi/costi maggiori, ma invisibile a
              lavoro finito.
            </li>
          </ul>
          <p className="mt-3 text-sm text-muted-foreground">
            Usiamo <strong>colorimetria digitale</strong> e spruzzi prova per
            “far sparire” la riparazione.
          </p>
        </>
      ),
    },
    {
      q: "Riparare un paraurti in plastica o sostituirlo?",
      a: (
        <>
          <p className="leading-relaxed text-muted-foreground">
            Se la plastica è <strong>crepata o mancano pezzi</strong>, spesso
            conviene sostituire. Per graffi/strisciate o piccole deformazioni si
            può <strong>riparare e riverniciare</strong>.
          </p>
          <p className="mt-3 text-sm text-muted-foreground">
            Valutiamo ancoraggi e sensori (parcheggio, radar) per garantire
            funzionalità originali.
          </p>
        </>
      ),
    },
    {
      q: "Quanto tempo serve per una verniciatura di pannello?",
      a: (
        <>
          <p className="leading-relaxed text-muted-foreground">
            In media <strong>1–2 giorni lavorativi</strong> tra preparazione,
            verniciatura e asciugatura. Se servono ricambi/lattoneria, il tempo
            può salire a <strong>2–4 giorni</strong>.
          </p>
          <p className="mt-3 text-sm text-muted-foreground">
            Preferiamo tempi <em>realistici</em> e finiture controllate a
            consegne affrettate.
          </p>
        </>
      ),
    },
    {
      q: "Gestite i sinistri con l’assicurazione?",
      a: (
        <>
          <p className="leading-relaxed text-muted-foreground">
            Sì: <strong>perizia fotografica</strong>, preventivo, pratiche e
            gestione iter con la compagnia. Hai diritto alla{" "}
            <strong>libera scelta del riparatore</strong>.
          </p>
        </>
      ),
    },
    {
      q: "Ricambi originali (OEM) o equivalenti?",
      a: (
        <>
          <p className="leading-relaxed text-muted-foreground">
            Valutiamo <strong>sicurezza, disponibilità e costo</strong>. Dove
            conta la geometria privilegiamo OEM; per coperture estetiche si può
            considerare equivalente di qualità. Sempre{" "}
            <strong>trasparenza</strong> in preventivo.
          </p>
        </>
      ),
    },
    {
      q: "Colori vecchi e vernice “stanca”: match possibile?",
      a: (
        <>
          <p className="leading-relaxed text-muted-foreground">
            Sì: oltre al codice tinta usiamo <strong>spettrofotometro</strong> e
            campioni, poi <em>sfumiamo</em>
            nel pannello adiacente per compensare l’
            <strong>invecchiamento</strong> del colore.
          </p>
        </>
      ),
    },
    {
      q: "Ruggine: si può fermare davvero?",
      a: (
        <>
          <p className="leading-relaxed text-muted-foreground">
            Va <strong>rimossa meccanicamente</strong> fino a metallo sano,
            quindi <strong>primer epossidico</strong>, cicli anti-corrosione e
            sigillatura. La prevenzione fa la differenza.
          </p>
        </>
      ),
    },
    {
      q: "Vernici ad acqua o a solvente?",
      a: (
        <>
          <p className="leading-relaxed text-muted-foreground">
            Preferiamo <strong>basi all’acqua</strong> (ridotte emissioni,
            ottimo match). Il trasparente è poliuretanico ad alte prestazioni.
            Seguiamo le schede tecniche del produttore.
          </p>
        </>
      ),
    },
    {
      q: "Quando posso lavare l’auto dopo la verniciatura?",
      a: (
        <>
          <p className="leading-relaxed text-muted-foreground">
            In genere dopo <strong>7–10 giorni</strong> per detergenti e rulli;
            puoi bagnarla dopo ~72h. Evita cere/sigillanti per{" "}
            <strong>15–20 giorni</strong>.
          </p>
        </>
      ),
    },
    {
      q: "PPF o nanotecnologia: cosa scegliere dopo la riparazione?",
      a: (
        <>
          <p className="leading-relaxed text-muted-foreground">
            <strong>PPF</strong> protegge da impatti/scheggiature;{" "}
            <strong>coating nano</strong> migliora gloss e resistenza chimica.
            Spesso ottimo mix: PPF zone esposte, nano sul resto.
          </p>
        </>
      ),
    },
    {
      q: "Rigature leggere: lucidatura o riverniciatura?",
      a: (
        <>
          <p className="leading-relaxed text-muted-foreground">
            Se il difetto è nel <strong>trasparente</strong>, si recupera con{" "}
            <em>compound, polish, protezione</em>. Se attraversa il colore →
            riverniciatura. Facciamo un <strong>spot-test</strong> prima di
            scegliere.
          </p>
        </>
      ),
    },
    {
      q: "Riconsegna auto in leasing/noleggio: come evitare penali?",
      a: (
        <>
          <p className="leading-relaxed text-muted-foreground">
            Facciamo un <strong>check pre-riconsegna</strong> (graffi, cerchi,
            fari, micro-ammaccature). Ripariamo solo ciò che genera penali:
            spesso <strong>spendi meno</strong> del listino noleggiatore.
          </p>
        </>
      ),
    },
    {
      q: "Garanzia e pagamenti",
      a: (
        <>
          <p className="leading-relaxed text-muted-foreground">
            Garanzia su verniciatura e manodopera secondo ciclo applicato.
            Pagamenti: contanti, carte, bonifico. Per sinistri, possibile{" "}
            <strong>cessione del credito</strong>.
          </p>
        </>
      ),
    },
  ];

  // filtro e stato aperto
  const [query, setQuery] = React.useState("");
  const [open, setOpen] = React.useState<number | null>(0);

  const filtered = faqs.filter(
    (f) =>
      f.q.toLowerCase().includes(query.toLowerCase()) ||
      (typeof f.a === "string"
        ? f.a.toLowerCase().includes(query.toLowerCase())
        : true)
  );

  return (
    <section
      id="consigli"
      className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 md:py-24"
    >
      {/* Header pulito + search */}
      <div className="mb-8 flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <Badge>Consigli dell’esperto</Badge>
          <h2 className="mt-3 text-3xl sm:text-4xl font-semibold tracking-tight">
            Dubbi comuni, risposte sincere
          </h2>
          <p className="mt-2 text-muted-foreground max-w-2xl">
            Guida pratica scritta da chi ripara davvero le auto tutti i giorni.
            Se hai foto, inviacele su WhatsApp.
          </p>
        </div>

        {/* Search semplice, coerente con il sito */}
        <div className="md:min-w-[360px]">
          <div className="flex items-center gap-2 rounded-xl border bg-background px-3 py-2">
            <span className="text-xs text-muted-foreground">Cerca</span>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="grandine, paraurti, pastello…"
              className="flex-1 bg-transparent outline-none text-sm"
            />
          </div>
        </div>
      </div>

      {/* Griglia ordinata: 2 colonne, card omogenee */}
      <div className="grid md:grid-cols-2 gap-4">
        {filtered.map((f, _) => {
          const idx = faqs.indexOf(f); // mantiene indice assoluto per 'open'
          const isOpen = open === idx;

          return (
            <motion.article
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, ease: EASE }}
              className={[
                "relative rounded-2xl border bg-card",
                "hover:shadow-md transition-shadow",
                isOpen ? "ring-1 ring-primary/20" : "",
              ].join(" ")}
            >
              {/* header accordion */}
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : idx)}
                aria-expanded={isOpen}
                className="w-full text-left px-4 sm:px-5 py-4 flex items-start gap-3"
              >
                {/* rail attivo minimal */}
                <span
                  aria-hidden
                  className={[
                    "absolute left-0 top-0 bottom-0 w-1 rounded-l-2xl",
                    isOpen ? "bg-primary" : "bg-transparent",
                  ].join(" ")}
                />
                <div className="flex-1 pr-6">
                  <h3 className="font-medium leading-snug">{f.q}</h3>
                </div>
                <motion.span
                  className="text-muted-foreground"
                  animate={{ rotate: isOpen ? 90 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <ChevronRight className="h-5 w-5" />
                </motion.span>
              </button>

              {/* body */}
              <motion.div
                initial={false}
                animate={{
                  height: isOpen ? "auto" : 0,
                  opacity: isOpen ? 1 : 0,
                }}
                transition={{ duration: 0.28 }}
                className="overflow-hidden"
              >
                <div className="px-4 sm:px-5 pb-4 text-sm">{f.a}</div>
              </motion.div>
            </motion.article>
          );
        })}
      </div>

      {/* micro-cta finale pulita */}
      <div className="mt-8 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs">
        <Sparkles className="h-3.5 w-3.5" />
        Hai un dubbio? Inviaci 2–3 foto su WhatsApp: risposta in giornata.
      </div>
    </section>
  );
}
