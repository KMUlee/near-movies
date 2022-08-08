import { AppBar } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#1976d2",
    },
  },
});

export default function NavBar() {
  return (
    <ThemeProvider theme={darkTheme}>
      <AppBar position="sticky" color="primary">
        <div className="AppBar">
          <h2>Near Movies</h2>
        </div>
      </AppBar>
      <style jsx>
        {`
          .AppBar h2 {
            text-align: center;
          }
        `}
      </style>
    </ThemeProvider>
  );
}
