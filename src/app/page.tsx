import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { FeatureStrip } from "@/components/sections/FeatureStrip";
import { Features } from "@/components/sections/Features";
import { Workflow } from "@/components/sections/Workflow";
import { DocumentTypes } from "@/components/sections/DocumentTypes";
import { TemplateDemo } from "@/components/sections/TemplateDemo";
import { ExportPreview } from "@/components/sections/ExportPreview";
import { Control } from "@/components/sections/Control";
import { FAQ } from "@/components/sections/FAQ";
import { FinalCTA } from "@/components/sections/FinalCTA";

export default function Home() {
  return (
    <>
      <Navbar />

      <main id="main-content" className="flex-1">
        <Hero />
        <FeatureStrip />
        <Features />
        <Workflow />
        <DocumentTypes />
        <TemplateDemo />
        <ExportPreview />
        <Control />
        <FAQ />
        <FinalCTA />
      </main>

      <Footer />
    </>
  );
}
