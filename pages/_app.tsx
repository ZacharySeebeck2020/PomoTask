import { useRouter } from 'next/router'
import { useEffect } from 'react';
import Footer from '../components/global/footer';
import Sidenav from '../components/global/sidenav'
import DbProvider, { useDb } from '../context/DbProvider';
import '../styles/globals.scss'

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  return (
    <>
      <DbProvider>
        <section className={router.pathname != '/' ? 'flex min-h-screen ml-16' : 'flex min-h-screen ml-16 '}>
          <Sidenav/>
          <div className="z-30 bg-background w-full text-white">
            <Component {...pageProps} />
            {router.pathname != '/' ? <Footer/> : ''}
          </div>
        </section>
      </DbProvider>
    </>
  )
}

export default MyApp
