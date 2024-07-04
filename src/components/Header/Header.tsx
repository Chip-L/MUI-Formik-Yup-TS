import AppBar from "@mui/material/AppBar";
import Typography from "@mui/material/Typography";

const Header = () => {
  return (
    <AppBar
      position="static"
      style={{ textAlign: "center", padding: "0.5rem" }}
    >
      <Typography variant="h3" component="h1">
        MUI + Formik + Yup + TS
      </Typography>
    </AppBar>
  );
};

export default Header;
