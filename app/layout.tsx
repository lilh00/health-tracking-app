import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import '@/app/globals.css';

export const metadata: Metadata = {
  title: 'HealthTrack - Your Personal Health Dashboard',
  description: 'Track todos, weight, calories, and get AI health advice',
  viewport: 'width=device-width, initial-scale=1, maximum-scale=5',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
  },
  icons: {
    icon: [{ url: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 180"><text x="90" y="140" font-size="90" text-anchor="middle" dominant-baseline="middle">💪</text></svg>' }],
    apple: [{ url: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 180 180"><text x="90" y="140" font-size="90" text-anchor="middle" dominant-baseline="middle">💪</text></svg>' }],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#3b82f6" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body>
        <Navbar />
        <main className="min-h-screen bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}
