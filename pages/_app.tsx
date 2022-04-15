import Sidenav from '../components/global/sidenav'
import '../styles/globals.scss'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <section className="flex h-screen">
        <Sidenav/>
        <div className="bg-background w-full text-white">
          <Component {...pageProps} />
        </div>
      </section>
    </>
  )
}

export default MyApp
