import Container from "@mui/material/Container";
import Footer from "../Footer";
import { Form4 } from "../Form4";
import Header from "../Header";

function App() {
  return (
    <>
      <Header />
      <Container sx={{ backgroundColor: "azure", padding: "1rem", my: "1rem" }}>
        <Form4 />
      </Container>
      <Footer />
    </>
  );
}

export default App;
