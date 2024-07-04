import AppBar from "@mui/material/AppBar";
import { Form4 } from "../Form4";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";

function App() {
  return (
    <>
      <AppBar
        position="static"
        style={{ textAlign: "center", padding: "0.5rem" }}
      >
        <Typography variant="h3" component="h1">
          MUI + Formik + Yup + TS
        </Typography>
      </AppBar>
      <Container sx={{ backgroundColor: "azure", padding: "1rem", my: "1rem" }}>
        <Form4 />
      </Container>
    </>
  );
}

export default App;
