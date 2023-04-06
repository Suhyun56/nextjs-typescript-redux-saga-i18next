import { createTheme } from "@mui/material/styles";

const muiTheme = createTheme({
  palette: {
    primary: {
      main: "#5138E5",
      light: "#EEEBFC",
    },
    secondary: {
      main: "#3282B7",
      light: "#E7F0F7",
    },
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          width: "100%",
          height: "68px",
          borderRadius: "8px",
        },
      },
    },
  },
});

export default muiTheme;
