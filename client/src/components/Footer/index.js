import React from "react";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";

function Footer() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" target="_blank">
        DSD Designs
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default Footer;
