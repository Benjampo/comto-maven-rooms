import '../styles/globals.css'
import type { AppProps } from 'next/app'
import {UserProvider} from "../lib/UserContext";
import Navbar from "../components/Navbar";
import {MeetingsProvider} from "../lib/MeetingsContext";


function MyApp({ Component, pageProps }: AppProps) {

    return(
      <UserProvider>
          <MeetingsProvider>
          <div className="min-h-full">
              <Navbar />
              <div className="py-10">
                  <main>
                      <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                          <Component {...pageProps} />
                      </div>
                  </main>
              </div>
          </div>
      </MeetingsProvider>
    </UserProvider>
    )
}

export default MyApp
