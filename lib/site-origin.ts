// Deployment configuration only; never derive social URLs from request headers.
const configuredOrigin =
  process.env.SITE_URL ||
  (process.env.CONTEXT === 'deploy-preview' || process.env.CONTEXT === 'branch-deploy'
    ? process.env.DEPLOY_PRIME_URL
    : process.env.URL) ||
  'https://opportunity-players.netlify.app';

const parsedOrigin = new URL(configuredOrigin);
if (!['http:', 'https:'].includes(parsedOrigin.protocol)) {
  throw new Error('SITE_URL must be an absolute HTTP(S) URL.');
}

export const siteOrigin = parsedOrigin.origin;
