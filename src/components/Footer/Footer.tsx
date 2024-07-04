import Box from "@mui/material/Box";
import Link from "@mui/material/Link";

const Footer = () => {
  return (
    <footer style={{ marginTop: "auto", backgroundColor: "white" }}>
      <Box display="flex" flexDirection="row" justifyContent="center" mx={2}>
        <Link
          href="https://github.com/Chip-L/MUI-Formik-Yup-TS"
          rel="noopener"
          target="_blank"
        >
          See the Code! https://github.com/Chip-L/MUI-Formik-Yup-TS
        </Link>
      </Box>
    </footer>
  );
};

export default Footer;
