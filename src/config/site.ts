/**
 * Site configuration – all external URLs are read from NEXT_PUBLIC_* env vars.
 * If a var is not set the value defaults to null; any component that receives
 * null should render the control as visibly disabled (aria-disabled) or hidden.
 *
 * To enable a URL, add it to .env.local:
 *   NEXT_PUBLIC_DOWNLOAD_URL=https://...
 *   NEXT_PUBLIC_DOCS_URL=https://...
 *   NEXT_PUBLIC_GITHUB_URL=https://...
 *   NEXT_PUBLIC_DEMO_VIDEO_URL=https://...
 */

export interface SiteConfig {
  downloadUrl: string | null;
  docsUrl: string | null;
  githubUrl: string | null;
  demoVideoUrl: string | null;
}

const site: SiteConfig = {
  downloadUrl: process.env.NEXT_PUBLIC_DOWNLOAD_URL ?? null,
  docsUrl: process.env.NEXT_PUBLIC_DOCS_URL ?? null,
  githubUrl: process.env.NEXT_PUBLIC_GITHUB_URL ?? null,
  demoVideoUrl: process.env.NEXT_PUBLIC_DEMO_VIDEO_URL ?? null,
};

export default site;
