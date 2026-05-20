export const SITE = {
  title: 'DSFILMS',
  description: 'Portugal-based director specializing in documentaries, commercials, and custom filming equipment.',
  brand: 'DSFILMS',
  tagline: 'Portugal Based Director',
  location: 'Portugal',
  social: {
    instagram: 'https://instagram.com/YOUR_HANDLE',
    cinematography: 'https://example.com/cinematography',
  },
  contact: {
    email: 'hello@dsfilms.pt',
  },
};

export const MENU_ROUTES = {
  'About Us': '/about',
  Services: '/services',
  Contacts: '/contacts',
};

export function getBasename() {
  const publicUrl = process.env.PUBLIC_URL || '';
  if (!publicUrl) return '';
  if (publicUrl.startsWith('http')) {
    try {
      return new URL(publicUrl).pathname.replace(/\/$/, '') || '';
    } catch {
      return '';
    }
  }
  return publicUrl.replace(/\/$/, '') || '';
}

export function asset(path) {
  const normalized = path.startsWith('/') ? path : `/${path}`;
  const publicUrl = process.env.PUBLIC_URL || '';
  if (!publicUrl || publicUrl.startsWith('http')) {
    const base = publicUrl.startsWith('http') ? new URL(publicUrl).pathname.replace(/\/$/, '') : '';
    return `${base}${normalized}`;
  }
  return `${publicUrl.replace(/\/$/, '')}${normalized}`;
}
