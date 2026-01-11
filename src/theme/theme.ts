'use client';
import { Roboto } from 'next/font/google';

import { createTheme, Theme } from '@mui/material/styles';


/**
 * Next.js Google Font configuration for Roboto.
 * * Configures the Roboto font with specific weights and subsets.
 * Using `display: 'swap'` ensures that the text remains visible
 * during font loading, improving Core Web Vitals (CLS).
 * * @constant
 */
const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
});

/**
 * Material UI Theme Configuration.
 * * This constant defines the global visual style of the application,
 * including color palettes, typography, and component overrides.
 * * By default, this is initialized in 'light' mode. In a dynamic setup,
 * this serves as the base configuration for the ThemeProvider.
 * * @type {Theme}
 */
const theme: Theme = createTheme({
  palette: {
    mode: 'light',
  },
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
});

export default theme;
