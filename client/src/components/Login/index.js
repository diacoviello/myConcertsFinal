import React from "react";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

export default function Login() {
  const classes = useStyles();
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const handleChange = (event) => {
    setName(event.target.value);
    setEmail(event.target.value);
  };

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <div>
        <TextField
          id="outlined-name"
          label="Name"
          value={name}
          onChange={handleChange}
          variant="outlined"
        />
        <TextField
          id="outlined-email"
          label="Email"
          value={email}
          onChange={handleChange}
          variant="outlined"
        />
      </div>
    </form>
  );
}
