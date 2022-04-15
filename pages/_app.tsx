import { useRouter } from 'next/router'
import { useEffect } from 'react';
import Footer from '../components/global/footer';
import Sidenav from '../components/global/sidenav'
import '../styles/globals.scss'

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    console.log(router.pathname);
    console.log(router.pathname != '/');
  })

  return (
    <>
      <section className={router.pathname != '/' ? 'flex min-h-screen ml-64 mb-16' : 'flex min-h-screen ml-64 '}>
        <Sidenav/>
        <div className="bg-background w-full text-white">
          <Component {...pageProps} />
          {router.pathname != '/' ? <Footer/> : ''}
        </div>
      </section>
    </>
  )
}

export default MyApp
