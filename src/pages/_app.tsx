import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'

import { AuthenticationProvider } from '../context/AuthenticationContext'
import { QueryClient, QueryClientProvider } from 'react-query'
import { ToastProvider } from '../components/Toast'
import { useEffect } from 'react'
import nProgress from 'nprogress'
import '../styles/loadingBar.css';
import { Router } from 'next/router'
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
    <ToastProvider>
      <AuthenticationProvider>
      <QueryClientProvider client={queryClient}>
        <Header />
        <Component {...pageProps} />  
        <Footer />
      </QueryClientProvider>
      </AuthenticationProvider>
    </ToastProvider>
  )
}

export default MyApp
