import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import { Header } from '../components/Header'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Footer } from '../components/Footer'

const queryClient = new QueryClient()

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <Header />
      <Component {...pageProps} />  
      <Footer />
    </QueryClientProvider>
  )
}

export default MyApp
