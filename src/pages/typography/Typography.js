import React from "react";
import { Grid } from "@material-ui/core";
import {
  List,
  ListItem,
  ListItemText,
  Paper,
  TextField,
  Button,
  Avatar,
} from "@material-ui/core";
// styles
import useStyles from "./styles";


// components
import { Typography } from "../../components/Wrappers";
import { showIdentification, showName } from "../../context/UserContext";
import { FixedSizeList } from "react-window";

function renderRow(props) {
  const { index, style } = props;

  return (
    <ListItem button style={style} key={index}>
      <ListItemText primary={`Item ${index + 1}`} />
    </ListItem>
  );
}

export default function TypographyPage() {
  var classes = useStyles();
  const [dense, setDense] = React.useState(false);
  const [secondary] = React.useState(false);
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
            <Typography variant="h1" className={classes.title}>
              Búsqueda
            </Typography>
            <TextField
              id="name"
              className={classes.inputs}
              InputProps={{
                classes: {
                  input: classes.textField,
                },
              }}
              disabled="true"
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
              disabled="true"
              margin="normal"
              placeholder="Número de identificación"
              label={showIdentification}
              variant="outlined"
            />
            <TextField
              id="dependece"
              className={classes.inputs}
              InputProps={{
                classes: {
                  input: classes.textField,
                },
              }}
              disabled="true"
              margin="normal"
              placeholder="Sistemas"
              label="Dependencia"
              variant="outlined"
            />

            <div className={classes.list}>
              <FixedSizeList
                height={200}
                width={200}
                itemSize={30}
                itemCount={50}
              >
                {renderRow}
              </FixedSizeList>
            </div>
            <Typography variant="h2" className={classes.title}>
              Bienes a registrar
            </Typography>
            <TextField
              id="descripcion"
              InputProps={{
                classes: {
                  underline: classes.textFieldUnderline,
                  input: classes.textField,
                },
              }}
              label="Descripción"
              placeholder="Descripción"
              variant="outlined"
            />
            <TextField
              id="placa"
              InputProps={{
                classes: {
                  underline: classes.textFieldUnderline,
                  input: classes.textField,
                },
              }}
              label="Placa"
              placeholder="Placa"
              variant="outlined"
            />
            <TextField
              id="Sede"
              InputProps={{
                classes: {
                  underline: classes.textFieldUnderline,
                  input: classes.textField,
                },
              }}
              label="Sede"
              placeholder="Sede"
              variant="outlined"
            />
            <TextField
              id="Espacio"
              InputProps={{
                classes: {
                  underline: classes.textFieldUnderline,
                  input: classes.textField,
                },
              }}
              label="Espacio Físico"
              placeholder="Espacio Físico"
              variant="outlined"
            />
            <TextField
              id="Marca"
              InputProps={{
                classes: {
                  underline: classes.textFieldUnderline,
                  input: classes.textField,
                },
              }}
              label="Marca y Serie"
              placeholder="Marca y Serie"
              variant="outlined"
            />
            <TextField
              id="Estado"
              InputProps={{
                classes: {
                  underline: classes.textFieldUnderline,
                  input: classes.textField,
                },
              }}
              label="Estado"
              placeholder="Estado"
              variant="outlined"
            />
            <TextField
              id="Motivo"
              InputProps={{
                classes: {
                  underline: classes.textFieldUnderline,
                  input: classes.textField,
                },
              }}
              label="Motivo Ingreso"
              placeholder="Motivo Ingreso"
              variant="outlined"
            />
            <Button
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
          </div>
        </div>
      </Paper>
    </>
  );
}
