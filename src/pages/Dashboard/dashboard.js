import React, { useState, useEffect } from "react";
import {
  Paper,
  TextField,
  Button,
  Avatar,
  CircularProgress,
  InputLabel,
  Select,
  Input,
  FormControl,
  MenuItem
} from "@material-ui/core";
import Alert from "@material-ui/lab/Alert";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import Collapse from "@material-ui/core/Collapse";
// styles
import useStyles from "./styles";

// components
import { Typography } from "../../components/Wrappers";
import { goods } from "../../context/UserContext";
import {
  showIdentification,
  showName,
  showDependence,
  showDependenceName,
  getDependenceByFk,
  getDependences,
  saveGood,
  dependence,
  campus
} from "../../context/UserContext";


export default function Dashboard(props) {
  var classes = useStyles();
  var [isLoading, setIsLoading] = useState(false);
  var [namegoodValue, setNamegoodValue] = useState("");
  var [descriptionValue, setDescriptionValue] = useState("");
  var [plateValue, setPlateValue] = useState("");
  var [placeValue, setPlaceValue] = useState("");
  var [physicalspaceValue, setPhysicalspaceValue] = useState("");
  var [brandValue, setBrandValue] = useState("");
  var [stateValue, setStateValue] = useState("");
  var [observationValue, setObservationValue] = useState("");
  var [goodTypeValue, setGoodTypeValue] = useState("");
  var [reasonValue, setReasonValue] = useState("");
  var [spaceValue, setSpaceValue] = useState("");
  var [answer, setAnswer] = useState(null);
  var [error, setError] = useState(null);
  var [open, setOpen] = useState(true);
  var [dependencia, setDependencia] = useState("");
  var [sede, setSede] = useState("");
  var [type, setType] = useState("");

  // if (typeof goods == undefined) {
  //   listItems =   <li>Sin registros</li>
  // } else {
  //   listItems = goods.map((number) => <li>{number.name}</li>);
  // }

  // useEffect(() => {
  //   console.log("variables updating")
  // }, [namegoodValue,descriptionValue,plateValue,placeValue])


  // const getDependencesList = () =>{

  //   getDependences(setIsLoading)
    
  // }

  useEffect(() => {
    console.log("HOLAAAAA")
    updateDependence();
    return () => console.log("Updating dependence")
  }, [])


  const updateDependence = () =>{
    console.log("calling something")
      getDependenceByFk(setIsLoading);

  }

  // useEffect(() => {
  //   getDependencesList();
  //   return () => console.log("getting dependences");
  // }, [])


  const handleChangev2 = (event) => {
    var iddep = event.target.value;
    setDependencia(iddep);
    //const result = getDependenceByFk(iddep.id)
    //console.log("SUPER SEDE", result)
    //setDependencia(result)
  };

  const handleChangev3 = (event) => {
    setSede(event.target.value);
  }

  const handleChange = (event) => {
    setType(event.target.value);
  };

  return (
    <>
      <Paper
        variant="elevation"
        elevation={5}
        className={classes.principalContainer}
        square={false}
      >
        <div className={classes.formContainer}>
          <div className={classes.form}>
            <Typography variant="h2" className={classes.title}>
             Ingreso de bien
            </Typography>

            <TextField
              id="name"
              className={classes.inputs}
              InputProps={{
                classes: {
                  input: classes.textField,
                },
              }}
              disabled={true}
              margin="normal"
              placeholder={showName}
              label={showName}
              variant="outlined"
            />
            <TextField
              id="identification"
              className={classes.inputs}
              InputProps={{
                classes: {
                  input: classes.textField,
                },
              }}
              disabled={true}
              margin="normal"
              placeholder="Número de identificación"
              label={showIdentification}
              variant="outlined"
            />
            <div className={classes.list}>
              <FormControl className={classes.formControl} variant="outlined">
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
                  onChange={handleChangev2}
                  input={<Input />}

                >
                  {dependence.map((name) => (
                    <MenuItem key={name.id} value={name}>
                      {name.nombre_dependencia}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl className={classes.formControl} variant="standard">
                <InputLabel
                  id="demo-mutiple-name-label"
                  className={classes.label}
                >
                  Tipo de comprobante
                </InputLabel>
                <Select
                  labelId="demo-mutiple-name-label"
                  id="demo-mutiple-name"
                  value={type}
                  onChange={handleChange}
                  input={<Input />}

                >
                <MenuItem value={10}>Entrada</MenuItem>
                <MenuItem value={20}>Salida</MenuItem>
                </Select>
              </FormControl>
            </div>           
            <Typography variant="h2" className={classes.title}>
              Bienes a registrar
            </Typography>
            <TextField
              id="nameGood"
              className={classes.inputs}
              InputProps={{
                classes: {
                  input: classes.textField,
                },
              }}
              value={namegoodValue}
              onChange={(e) => setNamegoodValue(e.target.value)}
              label="Nombre del bien"
              placeholder="Nombre del bien"
              variant="outlined"
            />
            <TextField
              id="s"
              className={classes.inputs}
              InputProps={{
                classes: {
                  input: classes.textField,
                },
              }}
              value={descriptionValue}
              onChange={(e) => setDescriptionValue(e.target.value)}
              label="Descripción"
              placeholder="Descripción"
              variant="outlined"
            />
            <TextField
              id="placa"
              className={classes.inputs}
              InputProps={{
                classes: {
                  input: classes.textField,
                },
              }}
              value={plateValue}
              onChange={(e) => setPlateValue(e.target.value)}
              label="Placa"
              placeholder="Placa"
              variant="outlined"
            />
            <TextField
              id="Sede"
              className={classes.inputs}
              InputProps={{
                classes: {
                  input: classes.textField,
                },
              }}
              value={sede}
              onChange={(e) => setSede(e.target.value)}
              label="Sede"
              placeholder="Sede"
              variant="outlined"
            />
            <TextField
              id="Espacio"
              className={classes.inputs}
              InputProps={{
                classes: {
                  input: classes.textField,
                },
              }}
              value={spaceValue}
              onChange={(e) => setSpaceValue(e.target.value)}
              label="Espacio Físico"
              placeholder="Espacio Físico"
              variant="outlined"
            />
            <TextField
              id="EstadoFisico"
              className={classes.inputs}
              InputProps={{
                classes: {
                  input: classes.textField,
                },
              }}
              value={physicalspaceValue}
              onChange={(e) => setPhysicalspaceValue(e.target.value)}
              label="Estado Físico"
              placeholder="Espacio Físico"
              variant="outlined"
            />
            <TextField
              id="Marca"
              className={classes.inputs}
              InputProps={{
                classes: {
                  input: classes.textField,
                },
              }}
              value={brandValue}
              onChange={(e) => setBrandValue(e.target.value)}
              label="Marca y Serie"
              placeholder="Marca y Serie"
              variant="outlined"
            />
            <TextField
              id="Estado"
              className={classes.inputs}
              InputProps={{
                classes: {
                  input: classes.textField,
                },
              }}
              value={stateValue}
              onChange={(e) => setStateValue(e.target.value)}
              label="Estado"
              placeholder="Estado"
              variant="outlined"
            />
            <TextField
              id="Motivo"
              className={classes.inputs}
              InputProps={{
                classes: {
                  input: classes.textField,
                },
              }}
              value={reasonValue}
              onChange={(e) => setReasonValue(e.target.value)}
              label="Motivo Ingreso"
              placeholder="Motivo Ingreso"
              variant="outlined"
            />
            <TextField
              id="TipoBien"
              className={classes.inputs}
              InputProps={{
                classes: {
                  input: classes.textField,
                },
              }}
              value={goodTypeValue}
              onChange={(e) => setGoodTypeValue(e.target.value)}
              label="Tipo de bien"
              placeholder="Tipo de bien"
              variant="outlined"
            />   


<TextField
              id="Observacion"
              className={classes.inputs}
              InputProps={{
                classes: {
                  input: classes.textField,
                },
              }}
              value={observationValue}
              onChange={(e) => setObservationValue(e.target.value)}
              label="Observación"
              placeholder="Observación"
              variant="outlined"
            />   

            {isLoading ? (
              <CircularProgress size={26} className={classes.loginLoader} />
            ) : (
              <Button
                disabled={
                  namegoodValue === "" ||
                  descriptionValue === "" ||
                  sede === "" ||
                  physicalspaceValue === "" ||
                  stateValue === "" ||
                  reasonValue === ""
                }
                onClick={() => { 
                  saveGood(
                    namegoodValue,
                    descriptionValue,
                    plateValue,
                    sede,
                    physicalspaceValue,
                    brandValue,
                    stateValue,
                    reasonValue,
                    observationValue,
                    goodTypeValue,
                    props.history,
                    setIsLoading,
                    setError,
                    setAnswer
                  );
                  alert("Datos enviados");
                }}
                variant="contained"
                color="secondary"
                className={classes.addButton}
                startIcon={
                  <Avatar
                    src="https://www.freeiconspng.com/thumbs/check-tick-icon/tick-icon-30.png"
                    className={classes.iconC}
                  />
                }
              ></Button>
            )}
            <label>
              Nota:
            </label>
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
    </>
  );
}
