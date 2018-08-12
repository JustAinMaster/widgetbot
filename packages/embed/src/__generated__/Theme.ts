/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Theme
// ====================================================

export interface Theme_guild_theme_colors {
  __typename: 'ThemeColors'
  /**
   * Primary theme color (font color)
   */
  primary: string
  /**
   * Accent color (buttons)
   */
  accent: string
  /**
   * Background color
   */
  background: string
}

export interface Theme_guild_theme {
  __typename: 'Theme'
  /**
   * Custom CSS for the server
   */
  css: string
  /**
   * Custom colors for the server
   */
  colors: Theme_guild_theme_colors
}

export interface Theme_guild {
  __typename: 'Guild'
  /**
   * Theme for the server
   */
  theme: Theme_guild_theme
}

export interface Theme {
  guild: Theme_guild | null
}

export interface ThemeVariables {
  guild: any
}
