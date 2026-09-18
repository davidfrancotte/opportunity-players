import type { Metadata } from 'next';
import { DM_Sans } from 'next/font/google';
import './globals.css';
import './arena.css';
import './athlete-images.css';
import './supporters-app.css';
import { Header, Footer } from '@/components/arena';

const arenaSans = DM_Sans({
  variable: '--font-arena',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    'https://opportunity-players-arena.espace-de-tr-1383.chatgpt.site',
  ),
  title: 'Opportunity Players — Le réseau des acteurs du sport',
  description:
    'Sportifs, professionnels et organisations : présentez votre parcours et développez votre réseau dans le sport. Découvrez la nouvelle expérience Arena.',
  robots: { index: false, follow: false },
  icons: { icon: '/favicon.svg' },
  openGraph: {
    type: 'website',
    locale: 'fr_BE',
    siteName: 'Opportunity Players',
    title: 'Opportunity Players — Le réseau des acteurs du sport',
    description:
      'Sportifs, professionnels et organisations : les bonnes rencontres changent la suite de votre parcours.',
    images: [
      {
        url: 'https://opportunity-players-arena.espace-de-tr-1383.chatgpt.site/og.png',
        width: 1536,
        height: 1024,
        alt: 'Opportunity Players — Le réseau des acteurs du sport',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Opportunity Players — Le réseau des acteurs du sport',
    description:
      'Sportifs, professionnels et organisations : les bonnes rencontres changent la suite de votre parcours.',
    images: [
      'https://opportunity-players-arena.espace-de-tr-1383.chatgpt.site/og.png',
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="dark">
      <body className={`${arenaSans.variable} antialiased`}>
        <a href="#main" className="skip-link">
          Aller au contenu
        </a>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
