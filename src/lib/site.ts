export const SITE_URL = 'https://www.yourdentistdentalclinic.com';

export function absoluteUrl(path: string): string {
  return new URL(path, `${SITE_URL}/`).href;
}
