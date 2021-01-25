import React, { useState } from "react";
import {
  Grid,
  CircularProgress,
  Typography,
  Button,
  TextField,
  Paper,
  InputAdornment
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import Collapse from "@material-ui/core/Collapse";
import { borders } from '@material-ui/system';  
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import useStyles from "./style";
import { withRouter } from "react-router-dom";
//Context
import {
  useUserDispatch,
  navigate,
  userLogin,
  userRegistry,
} from "../../context/UserContext";
import logo from "../../assets/images/logo.png";

function Login(props) {
  var classes = useStyles();

  var [isLoading, setIsLoading] = useState(false);
  var [loginValue, setLoginValue] = useState("");
  var [passwordValue, setPasswordValue] = useState("");
  var [answer, setAnswer] = useState(null);
  var [error, setError] = useState(null);
  const [open, setOpen] = React.useState(true);

  // global
  var userDispatch = useUserDispatch();

  const handleChange = (prop) => (event) => {
    setPasswordValue({ ...passwordValue, [prop]: event.target.value });
  };

  const handleClickShowPassword = () => {
    setPasswordValue({ ...passwordValue, showPassword: !passwordValue.showPassword });
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  return (
    <Grid container className={classes.container}>
      <Paper
        variant="elevation"
        elevation={5}
        className={classes.loginBackground}
        square={false}
      >
        <div className={classes.formContainer}>
          <div className={classes.form}>
            <Typography variant="h1" className={classes.title}>
              Gestión de inventarios
            </Typography>
            <div className={classes.logotypeContainer}>
              <img src={logo} alt="logo" className={classes.logotypeImage} />
            </div>
            <TextField
              id="email"
              className={classes.inputs}
              InputProps={{
                classes: {
                  input: classes.textField,
                },
              }}
              value={loginValue}
              onChange={(e) => setLoginValue(e.target.value)}
              margin="normal"
              placeholder="Correo"
              label="Correo"
              type="email"
              variant="outlined"
              fullWidth
            />

            <TextField
              id="password"
              className={classes.inputs}
              InputProps={{
                classes: {
                  input: classes.textField,
                },
              }}
              value={passwordValue}
              onChange={(e) => setPasswordValue(e.target.value)}
              margin="normal"
              placeholder="Contraseña"
              label="Contraseña"
              type="password"
              variant="outlined"
              fullWidth
            />
            <div className={classes.formButtons}>
              {isLoading ? (
                <CircularProgress size={26} className={classes.loginLoader} />
              ) : (
                <Button
                  disabled={loginValue === "" || passwordValue === ""}
                  onClick={() =>
                    userLogin(
                      {
                        "userDispatch": userDispatch,
                        "loginValue":  loginValue,
                        "passwordValue":  passwordValue,
                        "history":  props.history,
                        "operation": "login",
                        "setError":  setError,
                        "setIsLoading": setIsLoading,
                        "setAnswer": setAnswer,
                        "step": 1   
                      }
                    )

                  }
                  variant="contained"
                  className={classes.loginButtom}
                  color="primary"
                  size="large"
                >
                  Iniciar
                </Button>
              )}
            </div>
          </div>
        </div>
        {isLoading ? (
          <CircularProgress size={26} className={classes.loginLoader} />
        ) : (
          <Button
            onClick={() => userRegistry(setIsLoading, props.history)}
            className={classes.registryButtom}
            color="primary"
          >
            Registrarse
          </Button>
        )}
      </Paper>
      {answer ? (
        <Collapse in={open}>
          <Alert
            severity="error"
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="medium"
                onClick={() => {
                  setOpen(false);
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
          >
            Algó pasó verifica los datos
          </Alert>
        </Collapse>
      ) : (
        <Typography
          color="secondary"
          className={classes.errorMessage}
        ></Typography>
      )}
    </Grid>
  );
  //}
}

export default withRouter(Login);
