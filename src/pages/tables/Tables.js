import React from "react";
import { Grid,  Typography} from "@material-ui/core";
import MUIDataTable from "mui-datatables";
import useStyles from "./style";
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { red } from "@material-ui/core/colors";


const datatableData = [
  ["0", "AFGTDEXX", "DZQYCXXX", "DZQYCXXX"],
  ["1", "AFGTDEXX", "IXQWBTXX", "GFJCCXXX"],

];

const theme = createMuiTheme({
  palette: {
    type: "dark",
  primary: { main: '#C3C004' },
  secondary: { main: '#A239CA' },
  error: { main: '#B82601' }
  },
  typography: { useNextVariants: true },
  title:{
    fontSize: "40"
  },
  columns: {
    color: "#ffff",
    borderRadius: 35,
    }
  });

export default function Tables() {

  var classes= useStyles();
  
  return (
    <>
      <Grid container spacing={0} className={classes.table}>
        <Grid item xs={9}>
        <MuiThemeProvider theme={theme}>
          <MUIDataTable 
            title="Explorer de transacciones"
            data={datatableData}
            className={classes.table}
            columns={["ID Tx Blockchain", "Dependencia", "Procedimiento", "Documento IPFS"]}
            options={{
              filterType: 'textField'
            }}
          />
          </MuiThemeProvider>
        </Grid>
      </Grid>
    </>
  );
}
