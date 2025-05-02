import { createTheme } from "@mui/material";
import { Roboto_Condensed } from "next/font/google";

const robotoCondensed = Roboto_Condensed({ subsets: ['latin'] });

const myTheme = createTheme({
    typography: {
        fontFamily: robotoCondensed.style.fontFamily,  // Use Roboto Condensed globally
        h1: {
          fontFamily: robotoCondensed.style.fontFamily,
        },
        h2: {
          fontFamily: robotoCondensed.style.fontFamily,
        },
        h3: {
          fontFamily: robotoCondensed.style.fontFamily,
        },
        h4: {
          fontFamily: robotoCondensed.style.fontFamily,
        },
        h5: {
          fontFamily: robotoCondensed.style.fontFamily,
        },
        h6: {
          fontFamily: robotoCondensed.style.fontFamily,
        },
        subtitle1: {
          fontFamily: robotoCondensed.style.fontFamily,
        },
        subtitle2: {
          fontFamily: robotoCondensed.style.fontFamily,
        },
        body1: {
          fontFamily: robotoCondensed.style.fontFamily,
        },
        body2: {
          fontFamily: robotoCondensed.style.fontFamily,
        },
        button: {
          fontFamily: robotoCondensed.style.fontFamily,
        },
        caption: {
          fontFamily: robotoCondensed.style.fontFamily,
        },
        overline: {
          fontFamily: robotoCondensed.style.fontFamily,
        },
      },
  palette: {
    mode: 'light',
    primary: {
      main: '#1b003a',
      contrastText: '#ffffff'
    },
    secondary: {
      main: '#FF9A00',
    },
    background: {
      default: '#f5f5f5',
      paper: '#fff',
    },
  },
})

export default myTheme;