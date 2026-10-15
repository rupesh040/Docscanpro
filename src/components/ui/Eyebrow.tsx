/**
 * Deprecated. The tracked uppercase eyebrow has been replaced by the
 * sentence-case `Kicker` in @/components/ui/SectionHeading.
 *
 * This alias exists so retired components still compile. New code should
 * import `Kicker` directly, and these files are now unused and can be
 * deleted together:
 *   components/sections/FeatureStrip.tsx
 *   components/sections/TemplateDemo.tsx
 *   components/sections/ExportPreview.tsx
 *   components/sections/Control.tsx
 *   components/ui/FAQItem.tsx
 *   components/illustrations/DocumentProcessingDiagram.tsx   (no Eyebrow use)
 *   data/strip.ts
 * Once they are gone, this file can go too.
 */
export { Kicker as Eyebrow } from "@/components/ui/SectionHeading";
