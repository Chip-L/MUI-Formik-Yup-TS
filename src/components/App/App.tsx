import Footer from "@components/Footer";
import Header from "@components/Header";
import { Form4 } from "@components/SignUpForm";
import Container from "@mui/material/Container";

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
