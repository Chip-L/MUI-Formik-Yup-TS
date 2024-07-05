import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

declare module "@mui/material/styles" {
  interface TypographyVariants {
    errorMessage: React.CSSProperties;
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    errorMessage?: React.CSSProperties;
  }
}

// Update the Typography's variant prop options
declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    errorMessage: true;
  }
}

// A custom theme for this app
const theme = createTheme({
  palette: {
    primary: {
      main: "#556cd6",
    },
    secondary: {
      main: "#19857b",
    },
    error: {
      main: red.A400,
    },
  },
  typography: {
    errorMessage: {
      color: "error.warn",
      fontWeight: 400,
      fontSize: "0.75rem",
      lineHeight: "1.66",
      letterSpacing: "0.03333em",
      textAlign: "left",
      marginTop: "3px",
      marginRight: "14px",
      marginBottom: 0,
      marginLeft: "14px",
    },
  },
});

export default theme;
