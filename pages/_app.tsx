import { useRouter } from 'next/router'
import { useEffect } from 'react';
import Footer from '../components/global/footer';
import Sidenav from '../components/global/sidenav'
import DbProvider from '../context/DbProvider';
import '../styles/globals.scss'

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  return (
    <>
      <DbProvider>
        <section className={router.pathname != '/' ? 'flex min-h-screen ml-64' : 'flex min-h-screen ml-64 '}>
          <Sidenav/>
          <div className="bg-background w-full text-white">
            <Component {...pageProps} />
            {router.pathname != '/' ? <Footer/> : ''}
          </div>
        </section>
      </DbProvider>
    </>
  )
}

export default MyApp
