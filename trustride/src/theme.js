import React, { createContext, useContext, useEffect } from 'react';

// PUBLIC_INTERFACE
export const ThemeContext = createContext();

/**
 * PUBLIC_INTERFACE
 * ThemeProvider: Applies global TrustRide theme using CSS variables.
 * Allows for future extension (dark mode, etc.).
 */
export function ThemeProvider({ children }) {
  // Set up CSS variables on mount (future: allow toggling)
  useEffect(() => {
    // TrustRide brand theme: blue, accent green, white, modern light
    document.body.style.setProperty('--color-primary', '#0077B6');
    document.body.style.setProperty('--color-accent', '#00A896');
    document.body.style.setProperty('--color-secondary', '#FFFFFF');
    document.body.style.setProperty('--color-navbar', '#FFFFFF');
    document.body.style.setProperty('--color-text-primary', '#062942');
    document.body.style.setProperty('--color-text-secondary', '#45566E');
    document.body.style.setProperty('--color-muted', '#9fb3c8');
    document.body.style.setProperty('--color-border', '#eaf0f6');
  }, []);

  return (
    <ThemeContext.Provider value={{}}>
      {children}
    </ThemeContext.Provider>
  );
}

/**
 * PUBLIC_INTERFACE
 * useTheme: Hook (placeholder) for consuming theme context.
 */
export function useTheme() {
  return useContext(ThemeContext);
}
