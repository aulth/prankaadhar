import '@/styles/globals.css'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
export default function App({ Component, pageProps }) {
  return <LocalizationProvider dateAdapter={AdapterDayjs}>
    <Component {...pageProps} />
  </LocalizationProvider>
}
