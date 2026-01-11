'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';
import React, { JSX, useEffect, useMemo, useState } from 'react';

import useAppStore from '@/stores/app/useAppStore';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material/styles';


/**
 * MUIThemeProvider Component (Internal).
 * * Bridges `next-themes` with Material UI. It listens to the theme resolved by
 * the browser and generates a matching MUI theme object.
 * * @important
 * Uses a `mounted` state with `setTimeout` to defer rendering until the client is ready.
 * This prevents "Hydration Mismatch" and "Cascading Render" errors by ensuring the
 * server-rendered HTML matches the initial client state.
 * * @param {Object} props - Component props.
 * @param {React.ReactNode} props.children - The application components to be wrapped.
 * @returns {JSX.Element} The MUI ThemeProvider and CssBaseline.
 */
const MUIThemeProvider = ({ children }: { children: React.ReactNode }): JSX.Element => {
  const [mounted, setMounted] = useState(false);
  const mode = useAppStore((state) => state.mode);

  /**
   * Effect to handle the mounting state.
   * A timeout of 0 is used to push the `setMounted` call to the end of the
   * browser's task queue, avoiding React's synchronous cascading render warning.
   */
  useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  /**
   * Memoized MUI Theme object.
   * Updates dynamically whenever the system or user changes the theme mode.
   * Defaults to 'light' during the hydration phase to maintain SSR consistency.
   */
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: mounted ? mode : 'light',
        },
      }),
    [mounted, mode]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div style={{ opacity: mounted ? 1 : 0 }}>{children}</div>
    </ThemeProvider>
  );
};

/**
 * ThemeRegistry Component.
 * * @param {Object} props - Component props.
 * @param {React.ReactNode} props.children - The application components to be wrapped.
 * @returns {JSX.Element} The combined NextThemes and MUI providers.
 */
export default function ThemeRegistry({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <NextThemesProvider attribute='class' defaultTheme='system' enableSystem>
      <MUIThemeProvider>{children}</MUIThemeProvider>
    </NextThemesProvider>
  );
}
