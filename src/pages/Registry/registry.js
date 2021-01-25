import React, { useState } from "react";
import {
  Grid,
  CircularProgress,
  Typography,
  Button,
  TextField,
  Paper,
  Select,
  FormControl,
  InputLabel,
  Input,
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import Collapse from "@material-ui/core/Collapse";
import useStyles from "./style";
import { withRouter } from "react-router-dom";
//Context
//import { useUserDispatch, userRegistrySave, getDependenceByFk } from "../../context/UserContext";
import logo from "../../assets/images/logo.png";
//import { dependence, campus, showDependence } from "../../context/UserContext";

function Registry(props) {
  var classes = useStyles();

  var [isLoading, setIsLoading] = useState(false);
  var [identificationValue, setIdentificationValue] = useState("");
  var [nameValue, setNameValue] = useState("");
  var [lastnameValue, setLastnameValue] = useState("");
  var [emailValue, setEmailValue] = useState("");
  var [passwordValue, setPasswordValue] = useState("");
  var [passwordBValue, setPasswordBValue] = useState("");
  //var [idDependence] = useState("");
  var [answer, setAnswer] = useState(null);
  var [error, setError] = useState(null);
  const [open, setOpen] = React.useState(true);
  // global
  // var userDispatch = useUserDispatch();
  //render() {
  const [dependencia, setDependencia] = React.useState("");
  const [sede, setSede] = React.useState("");
  var prueba = React.useState("");

  const handleChange = (event) => {
    setDependencia(event.target.value);

   // console.log("SUPER DEPENDENCIA",dependence);

  };
  const handleChangev2 = (event) => {
    var iddep = event.target.value;
    setSede(iddep);
    //const result = getDependenceByFk(iddep.id)
    //console.log("SUPER SEDE", result)
    //setDependencia(result)

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
              Registro
            </Typography>
            <div className={classes.logotypeContainer}>
              <img src={logo} alt="logo" className={classes.logotypeImage} />
            </div>
            <TextField
              id="identification"
              InputProps={{
                classes: {
                  underline: classes.textFieldUnderline,
                  input: classes.textField,
                },
              }}
              value={identificationValue}
              onChange={(e) => setIdentificationValue(e.target.value)}
              margin="normal"
              placeholder="Número de identificación"
              label="Número de identificación"
              type="text"
              variant="outlined"
              fullWidth
            />
            <TextField
              id="name"
              InputProps={{
                classes: {
                  underline: classes.textFieldUnderline,
                  input: classes.textField,
                },
              }}
              value={nameValue}
              onChange={(e) => setNameValue(e.target.value)}
              margin="normal"
              placeholder="Nombre"
              label="Nombre"
              type="text"
              variant="outlined"
              fullWidth
            />
            <TextField
              id="lastname"
              InputProps={{
                classes: {
                  underline: classes.textFieldUnderline,
                  input: classes.textField,
                },
              }}
              value={lastnameValue}
              onChange={(e) => setLastnameValue(e.target.value)}
              margin="normal"
              placeholder="Apellidos"
              label="Apellidos"
              type="text"
              variant="outlined"
              fullWidth
            />
            <TextField
              id="email"
              InputProps={{
                classes: {
                  underline: classes.textFieldUnderline,
                  input: classes.textField,
                },
              }}
              value={emailValue}
              onChange={(e) => setEmailValue(e.target.value)}
              margin="normal"
              placeholder="Correo"
              label="Correo"
              type="email"
              variant="outlined"
              fullWidth
            />
            <div className={classes.list}>
              <FormControl className={classes.formControl}>
                <InputLabel
                  id="demo-mutiple-name-label"
                  className={classes.label}
                >
                  Sede
                </InputLabel>
                <Select
                  labelId="demo-mutiple-name-label"
                  id="demo-mutiple-name"
                  value={sede}
                  onChange={handleChangev2}
                  input={<Input />}

                >
{/*                   
                  {campus.map((name) => (                   
                    <MenuItem key={name} value={name}>
                      {name.nombre}   
                                       
                  </MenuItem>   */}
                                      
                  {/* )
                  )} */}
                </Select>
              </FormControl>
            </div>

            <div className={classes.list}>
              <FormControl className={classes.formControl}>
                <InputLabel
                  id="demo-mutiple-name-label"
                  className={classes.label}
                >
                  Dependencia
                </InputLabel>
                <Select
                  labelId="demo-mutiple-name-label"
                  id="demo-mutiple-name"
                  value={dependencia}
                  onChange={handleChange}
                  input={<Input />}

                >

                </Select>
              </FormControl>
            </div>

            <TextField
              id="password"
              InputProps={{
                classes: {
                  underline: classes.textFieldUnderline,
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
            <TextField
              id="repeatpassword"
              InputProps={{
                classes: {
                  underline: classes.textFieldUnderline,
                  input: classes.textField,
                },
              }}
              value={passwordBValue}
              onChange={(e) => setPasswordBValue(e.target.value)}
              margin="normal"
              placeholder="Repetir Contraseña"
              label="Repetir Contraseña"
              type="password"
              variant="outlined"
              fullWidth
            />
            <div className={classes.formButtons}>
              {isLoading ? (
                <CircularProgress size={26} className={classes.loginLoader} />
              ) : (
                <Button
                  disabled={
                    identificationValue === "" ||
                    nameValue === "" ||
                    lastnameValue === "" ||
                    emailValue === "" ||
                    passwordValue === "" ||
                    passwordBValue === ""
                  }
                  // onClick={() => {
                  //   userRegistrySave(
                  //     identificationValue,
                  //     nameValue,
                  //     lastnameValue,
                  //     emailValue,
                  //     passwordValue,
                  //     passwordBValue,
                  //     props.history,
                  //     setIsLoading,
                  //     setError,
                  //     setAnswer
                  //   );
                   // alert("Datos enviados");
                  //}}
                  variant="contained"
                  className={classes.loginButtom}
                  color="primary"
                  size="large"
                >
                  Registrarse
                </Button>
              )}
            </div>
          </div>
        </div>
        {answer ? (
          <Collapse in={open}>
            <Alert
              severity="error"
              action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
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
      </Paper>
    </Grid>
  );
  //}
}

export default withRouter(Registry);
