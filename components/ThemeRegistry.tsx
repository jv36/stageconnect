'use client'

import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import React from 'react'
import myTheme from '@/utils/theme'

export default function ThemeRegistry({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider theme={myTheme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  )
}
