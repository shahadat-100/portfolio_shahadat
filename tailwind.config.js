/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./main.js",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "background": "#f9f9f9",
        "on-surface": "#1a1c1c",
        "primary": "#bc0100",
        "secondary": "#5e5e5e",
        "surface-container": "#eeeeee",
        "surface-dim": "#dadada",
        "on-primary": "#ffffff",
      },
      borderRadius: {
        "DEFAULT": "0px", "lg": "0px", "xl": "0px", "full": "9999px"
      },
      spacing: {
        "unit-xs": "4px", "unit-sm": "8px", "unit-md": "16px",
        "unit-lg": "32px", "unit-xl": "64px", "unit-xxl": "128px",
        "grid-margin": "64px", "grid-gutter": "32px"
      },
      fontFamily: {
        "sans": ["Inter"], "mono": ["DM Mono"]
      },
      fontSize: {
        "display-xl": ["120px", { "lineHeight": "110px", "letterSpacing": "-0.04em", "fontWeight": "800" }],
        "display-lg": ["80px", { "lineHeight": "80px", "letterSpacing": "-0.03em", "fontWeight": "800" }],
        "headline-lg": ["48px", { "lineHeight": "56px", "letterSpacing": "-0.02em", "fontWeight": "700" }],
        "headline-md": ["24px", { "lineHeight": "32px", "letterSpacing": "-0.01em", "fontWeight": "700" }],
        "body-lg": ["18px", { "lineHeight": "28px", "fontWeight": "400" }],
        "body-md": ["16px", { "lineHeight": "24px", "fontWeight": "400" }],
        "label-bold": ["14px", { "lineHeight": "16px", "letterSpacing": "0.05em", "fontWeight": "700" }],
        "label-sm": ["12px", { "lineHeight": "16px", "fontWeight": "500" }],
        "mono-sm": ["13px", { "lineHeight": "20px", "fontWeight": "400" }],
      }
    }
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/container-queries'),
  ],
}
