import {
  createTheme,
  PaletteOptions,
  responsiveFontSizes,
  ThemeOptions,
} from "@material-ui/core/styles";

const darkPalette: PaletteOptions = {
  mode: "dark",
  primary: {
    main: "#90caf9",
  },
  secondary: {
    main: "#ce93d8",
  },
  background: {
    default: "#141c26",
    paper: "#1f2834",
  },
};
const lightPalette: PaletteOptions = {
  mode: "light",
  primary: {
    main: "#30a2ff",
  },
  secondary: {
    main: "#ce93d8",
  },
  background: {
    default: "#fafafa",
    paper: "#fff",
  },
};

const themeOptions: ThemeOptions = {
  typography: {
    fontSize: 16,
    fontFamily: "Inter, sans-serif",
    h1: {
      fontSize: "3rem",
      fontWeight: 700,
    },
    h2: {
      fontSize: "2.25rem",
      fontWeight: 700,
    },
    h3: {
      fontSize: "1.875rem",
      fontWeight: 700,
    },
    h4: {
      fontSize: "1.5rem",
      fontWeight: 700,
    },
    h5: {
      fontSize: "1.25rem",
      fontWeight: 700,
    },
    h6: {
      fontSize: "1.25rem",
      fontWeight: 700,
    },
    button: {
      textTransform: "none",
      fontWeight: 700,
    },
  },
  components: {
    // Name of the component ⚛️
    MuiButtonBase: {
      defaultProps: {
        // The props to apply
        disableRipple: true, // No more ripple, on the whole application 💣!
      },
    },
  },
};

export const darkTheme = responsiveFontSizes(
  createTheme({
    palette: darkPalette,
    ...themeOptions,
  })
);
export const lightTheme = responsiveFontSizes(
  createTheme({
    palette: lightPalette,
    ...themeOptions,
  })
);
