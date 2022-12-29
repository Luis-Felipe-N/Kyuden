import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import { Header } from '../components/Header'
import { Footer } from '../components/Footer'

import { AuthenticationProvider } from '../context/AuthenticationContext'
import { QueryClient, QueryClientProvider } from 'react-query'
const queryClient = new QueryClient()

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthenticationProvider>
    <QueryClientProvider client={queryClient}>
      <Header />
      <Component {...pageProps} />  
      <Footer />
    </QueryClientProvider>
    </AuthenticationProvider>
  )
}

export default MyApp
