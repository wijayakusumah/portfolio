import '@mantine/core/styles.css';
import '@mantine/code-highlight/styles.css';
import '@mantine/notifications/styles.css';

import type { AppProps } from 'next/app';
import Head from 'next/head';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { theme } from '../theme';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider theme={theme}>
      <Head>
        <title>A.K Wijaya Kusumah</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
        <link rel="shortcut icon" href="/favicon.svg" />
        {/* Open Graph Meta Tags */}
        <meta property="og:title" content="A.K Wijaya Kusumah" />
        <meta
          property="og:description"
          content="A professional portfolio website showcasing projects that deliver real-world impact."
        />
        <meta property="og:image" content="https://wijaya.vercel.app/oggraph.png" />
        <meta property="og:url" content="https://wijaya.vercel.app" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="A.K Wijaya Kusumah" />

        {/* Optional: Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="A.K Wijaya Kusumah" />
        <meta
          name="twitter:description"
          content="A professional portfolio website showcasing projects that deliver real-world impact."
        />
        <meta name="twitter:image" content="https://wijaya.vercel.app/oggraph.png" />
      </Head>
      <Component {...pageProps} />
      <Analytics />
      <SpeedInsights />
      <Notifications />
    </MantineProvider>
  );
}
