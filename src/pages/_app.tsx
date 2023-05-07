import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'

import { AuthenticationProvider } from '../context/AuthenticationContext'
import { QueryClient, QueryClientProvider } from 'react-query'
import { useEffect } from 'react'
import nProgress from 'nprogress'

import '../styles/loadingBar.css';
import "../styles/toast.scss";

import { Router } from 'next/router'
import { ToastContainer } from 'react-toastify'
const queryClient = new QueryClient()

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const handleRouteStart = () => nProgress.start();
    const handleRouteDone = () => nProgress.done();

    Router.events.on('routeChangeStart', handleRouteStart);
    Router.events.on('routeChangeComplete', handleRouteDone);
    Router.events.on('routeChangeError', handleRouteDone);

    return () => {
      // Make sure to remove the event handler on unmount!
      Router.events.off('routeChangeStart', handleRouteStart);
      Router.events.off('routeChangeComplete', handleRouteDone);
      Router.events.off('routeChangeError', handleRouteDone);
    };
  }, []);
  return (
      <AuthenticationProvider>
      <QueryClientProvider client={queryClient}>
        <Header />
        <Component {...pageProps} />  
        <Footer />
        <ToastContainer 
          position="bottom-right"
          autoClose={3000}
          hideProgressBar={true}
          closeOnClick={false}
          pauseOnHover={true}
          // draggable={false}
          closeButton={false}
          theme='dark'
          draggable={false}

        />
      </QueryClientProvider>
      </AuthenticationProvider>
  )
}

export default MyApp
