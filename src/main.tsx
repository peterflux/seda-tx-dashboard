import React from 'react'
import ReactDOM from 'react-dom/client'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import App from './App'

// Import Inter font from Google Fonts
const link = document.createElement('link')
link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;900&display=swap'
link.rel = 'stylesheet'
document.head.appendChild(link)

const theme = extendTheme({
  fonts: {
    heading: 'Inter, sans-serif',
    body: 'Inter, sans-serif',
    mono: 'Inter, monospace',
  },
  colors: {
    gray: {
      900: '#181A20',
      800: '#23242B',
      700: '#2D2F36',
    },
  },
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </React.StrictMode>,
) 