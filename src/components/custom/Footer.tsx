import { DATA } from "@/constants/variables.constant";
import { Button } from "../ui/button";
import { Facebook, Instagram } from "lucide-react";

export function SchemaOrg() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AutoBodyShop",
    name: `${DATA.businessName} di ${DATA.owner}`,
    address: {
      "@type": "PostalAddress",
      streetAddress: DATA.addressLine,
      addressLocality: "Torino",
      addressCountry: "IT",
    },
    telephone: DATA.phone,
    email: DATA.email,
    areaServed: "Torino e provincia",
    openingHours: DATA.opening.map((o) => `${o.day} ${o.hours}`).join("; "),
    url: "https://www.carrozzerialingotto.it",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}

export function Footer() {
  return (
    <footer className="border-t">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8 md:py-10 text-sm">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div>
            <p className="font-medium">{DATA.businessName}</p>
            <p className="text-muted-foreground">
              di {DATA.owner} · {DATA.addressLine}
            </p>
            <p className="text-muted-foreground">{DATA.piva}</p>
          </div>
          <div className="flex items-center gap-3">
            <Button
              asChild
              variant="ghost"
              size="icon"
              className="rounded-full"
              title="Instagram"
            >
              <a href="#" aria-label="Instagram">
                <Instagram className="h-5 w-5" />
              </a>
            </Button>
            <Button
              asChild
              variant="ghost"
              size="icon"
              className="rounded-full"
              title="Facebook"
            >
              <a href="#" aria-label="Facebook">
                <Facebook className="h-5 w-5" />
              </a>
            </Button>
          </div>
        </div>
        <p className="mt-6 text-xs text-muted-foreground">
          © {new Date().getFullYear()} {DATA.businessName}. Tutti i diritti
          riservati.
        </p>
      </div>
    </footer>
  );
}
