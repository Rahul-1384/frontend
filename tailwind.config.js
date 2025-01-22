module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx,html}'],
  theme: {
    screens: {
      xxxsm: '426px',
      xxsm: '498px',
      xsm: '568px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      xxl: '1536px',
    },
    extend: {
      backgroundImage: {
        'section-bg': "url('./images/section-bg.png')",
        'rebook-logo': "url('./images/rebook-logo.png')",
        'contact-bg': "url('./images/contact-bg.webp')"
      },
      mixBlendMode: {
        'color-burn': 'color-burn',
      },
    },
  },
  plugins: [],
}
