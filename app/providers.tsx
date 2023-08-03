// app/providers.tsx
'use client'

import { CacheProvider } from '@chakra-ui/next-js'
import AppContext from '../contexts/app'
import { CssBaseline } from '@mui/material'
import { ChakraProvider, extendTheme as chakraExtendTheme } from '@chakra-ui/react';
import {
  ThemeProvider as MaterialThemeProvider,
  createTheme as muiCreateTheme,
  THEME_ID,
} from '@mui/material/styles';

const chakraTheme = chakraExtendTheme();
const materialTheme = muiCreateTheme();

export function Providers({ 
    children 
  }: { 
  children: React.ReactNode 
  }) {
  return (
    <CacheProvider>
      <ChakraProvider theme={chakraTheme} resetCSS>
        <MaterialThemeProvider theme={{ [THEME_ID]: materialTheme }}>
          <CssBaseline />
          <AppContext >
              {children}
          </AppContext>
        </MaterialThemeProvider>
      </ChakraProvider>
    </CacheProvider>
  )
}