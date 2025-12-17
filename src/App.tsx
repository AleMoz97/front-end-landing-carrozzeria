import ExpertTips from "./components/custom/ExpertTips";
import Header from "./components/custom/Header";
import { Footer, SchemaOrg } from "./components/custom/Footer";
import { Contact } from "./components/custom/Contact";
import { Gallery } from "./components/custom/Gallery";
import { Services } from "./components/custom/Services";
import { Owner } from "./components/custom/Owner";
import { About } from "./components/custom/About";
import { Highlights } from "./components/custom/Highlights";
import { Hero } from "./components/custom/Hero";

export default function SiteCarrozzeriaLingotto() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background via-muted/40 to-background text-foreground">
      <Header />
      <main className="overflow-x-hidden">
        <Hero />
        <Highlights />
        <About />
        <Services />
        <Gallery />
        <Owner />
        <ExpertTips />
        <Contact />
      </main>
      <Footer />
      <SchemaOrg />
    </div>
  );
}
