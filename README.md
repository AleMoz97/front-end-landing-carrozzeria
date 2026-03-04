# Carrozzeria Lingotto — Sito vetrina (Next.js + Tailwind + shadcn/ui + Framer Motion)

Sito vetrina “one-page” con sezioni (Hero, Highlights, About, Services + Preventivo, Gallery, Owner, Contact, Footer) e animazioni (Framer Motion). Include: form preventivo con `mailto:` e WhatsApp precompilati, carosello gallery, header sticky con anchor alle sezioni, schema.org.

## Requisiti

- Node.js 18+ (consigliato 20+)
- pnpm / npm / yarn (uno a scelta)

## Avvio in locale

1. Installa dipendenze

```bash
pnpm install
# oppure npm install / yarn
```

2. Avvia dev server

```bash
pnpm dev
# oppure npm run dev / yarn dev
```

3. Apri

- `http://localhost:3000`

## Dove mettere mano (config rapida)

### 1) Dati principali (contatti, servizi, gallery)

- Modifica `DATA` (o `@/constants/variables.constant` se lo hai già estratto lì):

  - `businessName`, `owner`, `tagline`
  - `phone`, `whatsapp`, `email`, `addressLine`
  - `opening` (orari)
  - `services` (titolo/descrizione + icone)
  - `gallery` (URL immagini reali)

### 2) Logo / favicon

- Logo: assicurati che il file esista e il path sia corretto (es. `public/logo_carrozzeria.png`).
- Favicon: inserisci le icone in `public/` (es. `favicon.ico`, `apple-touch-icon.png`, `icon-192.png`, `icon-512.png`) e referenziale in `app/layout.tsx` o `pages/_document.tsx` a seconda del router.

### 3) Google Reviews (NON implementate)

Se vuoi mostrare recensioni Google “in pagina” ti serve una strategia (API Places/serivizi terzi/scraping vietato). Per ora è presente solo il link “Scrivi una recensione” tramite `placeid`.

## Cose ancora da sistemare / TODO

- **Foto reali**:

  - Hero (sfondo)
  - Gallery (immagini)
  - Owner (foto titolare)
  - About (foto officina)

- **Social link** nel footer (Instagram/Facebook sono placeholder `href="#"`).
- **P.IVA**: attualmente placeholder.
- **Email dominio**: passare da `@gmail.com` a `@carrozzerialingotto.it` (config su Aruba e aggiornamento costante).
- **SEO**:

  - title/description definitivi
  - OpenGraph/Twitter meta
  - sitemap + robots

- **Analytics / GDPR**: cookie banner (se aggiungi analytics/marketing).
- **Accessibilità**: controllare focus states e aria-label (già presenti in varie parti, ma va completato).
- (Opzionale) **AI chat** sotto preventivo: attualmente è solo bozza/commentata. Richiede backend + policy + rate limiting.

## Deploy su Vercel (flusso consigliato)

### A) Preparazione repo

1. Metti il progetto su GitHub/GitLab/Bitbucket.
2. Assicurati che:

   - `package.json` abbia gli script `dev`, `build`, `start`
   - la build in locale funzioni (`pnpm build`)

### B) Deploy su Vercel

1. Vai su Vercel → **Add New Project**
2. Seleziona il repository
3. Framework: Vercel riconosce Next.js automaticamente
4. Build Command (default):

   - `pnpm build` (o `npm run build`)

5. Output: automatico (Next.js)
6. Premi **Deploy**

### C) Dominio

1. Vercel → Project → **Settings → Domains**
2. Aggiungi `carrozzerialingotto.it`
3. Segui i record DNS richiesti:

   - spesso: `A` record o `CNAME` (dipende se root/apex o www)

4. Consiglio pratico:

   - `www.carrozzerialingotto.it` → CNAME verso Vercel
   - redirect da root a www o viceversa (decidi uno “canonico”)

### D) Env vars (se in futuro servono)

Attualmente non sono necessarie se non integri API.
Se aggiungi funzionalità (es. AI chat, Google Places API, form server-side):

- Vercel → Project → **Settings → Environment Variables**
- aggiungi chiavi (es. `OPENAI_API_KEY`, `GOOGLE_MAPS_API_KEY`, ecc.)

### E) Post-deploy checklist

- Verifica anchor header (scroll e highlight sezione)
- Verifica `mailto:` e WhatsApp con testo compilato
- Verifica responsive (mobile/tablet/desktop)
- Verifica performance immagini (meglio passare a immagini ottimizzate / `next/image` se vuoi)

## Struttura (indicativa)

- `components/` (Header, Hero, Highlights, About, Services, Gallery, Owner, Contact, Footer, SchemaOrg)
- `constants/variables.constant.ts` (DATA)
- `public/` (logo, favicon, immagini)
- `app/` o `pages/` (a seconda della versione Next)

## Note importanti

- Il “preventivo” via Email usa `mailto:`: apre il client email dell’utente. Non è un invio “server-side”.
- WhatsApp usa `wa.me` con testo precompilato.
- Per un form “vero” (con invio e-mail automatico) serve:

  - endpoint API (Next API route) + provider email (Resend, Sendgrid, etc.) + anti-spam.
