import { useRouter } from 'next/router'
import { useEffect } from 'react';
import Footer from '../components/global/footer';
import Sidenav from '../components/global/sidenav'
import DbProvider, { useDb } from '../context/DbProvider';
import '../styles/globals.scss'
import Head from 'next/head';
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
import { SessionProvider } from 'next-auth/react';
config.autoAddCss = false

function MyApp({ Component, pageProps: { session, ...pageProps} }) {
  const router = useRouter();

  return (
    <SessionProvider session={session}>
      <Head>
        <meta name='application-name' content='PomoTask' />
        <meta name='apple-mobile-web-app-capable' content='yes' />
        <meta name='apple-mobile-web-app-status-bar-style' content='default' />
        <meta name='apple-mobile-web-app-title' content='PomoTask' />
        <meta name='description' content='Pomodoro timer and task tracker.' />
        <meta name='format-detection' content='telephone=no' />
        <meta name='mobile-web-app-capable' content='yes' />
        <meta name='theme-color' content='#111827' />

        <link rel='apple-touch-icon' href='/icons/touch-icon-iphone.png' />
        <link rel='apple-touch-icon' sizes='152x152' href='/icons/icon-152x152.png' />
        <link rel='apple-touch-icon' sizes='180x180' href='/icons/icon-192x192.png' />
        <link rel='apple-touch-icon' sizes='167x167' href='/icons/icon-192x192.png' />

        <link rel='manifest' href='/manifest.json' />

        <meta name='twitter:card' content='summary' />
        <meta name='twitter:url' content='https://pomo.zacharyseebeck.com' />
        <meta name='twitter:title' content='PomoTask' />
        <meta name='twitter:description' content='Pomodoro timer and task tracker.' />
        <meta name='twitter:image' content='https://pomo.zacharyseebeck.com/icons/icon-192x192.png' />
        <meta name='twitter:creator' content='@Xeinix' />
        <meta property='og:type' content='website' />
        <meta property='og:title' content='PomoTask' />
        <meta property='og:description' content='Pomodoro timer and task tracker.' />
        <meta property='og:site_name' content='PomoTask' />
        <meta property='og:url' content='https://pomo.zacharyseebeck.com' />
        <meta property='og:image' content='https://pomo.zacharyseebeck.com/icons/icon-192x192.png' />
      </Head>
      <DbProvider>
        <section className={'flex min-h-screen md:ml-16'}>
          <Sidenav />
          <div className="z-30 bg-background w-full text-white mt-16 md:mt-0">
            <Component {...pageProps} />
            {router.pathname != '/' ? <Footer /> : ''}
          </div>
        </section>
      </DbProvider>
    </SessionProvider>
  )
}

export default MyApp
