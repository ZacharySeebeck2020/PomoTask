import Sidenav from '../components/global/sidenav'
import '../styles/globals.scss'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <section className="columns is-fullheight">
        <Sidenav/>
        <div className="main-content section container column is-10">
          <Component {...pageProps} />
        </div>
      </section>
    </>
  )
}

export default MyApp
