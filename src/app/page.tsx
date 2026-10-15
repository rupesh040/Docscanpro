import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScanRail } from "@/components/layout/ScanRail";
import { StickyDownload } from "@/components/layout/StickyDownload";
import { Hero } from "@/components/sections/Hero";
import { Workflow } from "@/components/sections/Workflow";
import { DocumentTypes } from "@/components/sections/DocumentTypes";
import { Features } from "@/components/sections/Features";
import { LocalFirst } from "@/components/sections/LocalFirst";
import { Output } from "@/components/sections/Output";
import { FAQ } from "@/components/sections/FAQ";
import { FinalCTA } from "@/components/sections/FinalCTA";

/**
 * The page alternates graphite "machine" bands, where the software speaks,
 * with warm "paper" bands, where the document's own content lives — so it
 * reads like a sheet travelling under a scan head.
 *
 *   bench      machine   hero + the working extraction bench
 *   workflow   machine   the four steps
 *   sheets     paper     sheet families, as paper thumbnails
 *   controls   machine   what the operator can change
 *   local      paper     local versus cloud, as a register
 *   output     machine   the exported table and formats
 *   questions  paper     FAQ, as a ruled register
 *   download   machine   the one centred moment
 */
export default function Home() {
  return (
    <>
      <ScanRail />
      <Navbar />
      {/* tabIndex -1 so the skip link moves focus, not just the scroll. */}
      <main id="main-content" tabIndex={-1} className="flex-1">
        <Hero />
        <Workflow />
        <DocumentTypes />
        <Features />
        <LocalFirst />
        <Output />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
      <StickyDownload />
    </>
  );
}
