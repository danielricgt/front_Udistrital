import { makeStyles } from "@material-ui/styles";

export default makeStyles((theme) => ({
  overrides:{
    MuiButton: {
      // Name of the rule
      text: {
        // Some CSS
        color: 'white',
      },
    },
  },
  bg: {
    backgroundColor: "#000"
  },
  container: {
    alignItems: "center",
    justifyContent: "center",
    marginLeft: "30%",
    width: "40%",
    marginTop: "10%",
    direction: "row",
    borderRadius: 35,
  },
  errorMessage: {
    alignItems: "center",
    direction: "row",

  },
  title: {
    color: "#6C5F5B",
    fontSize: 25,
    textAlign: "center",
    fontWeight: "bold",
    fontColor: "#ffff",
    
  },
  textFieldUnderline: {
    borderColor: "#753022",
    borderRadius: 25,
    "&:before": {
      borderBottomColor: "#fff",
    },
    "&:after": {
      borderBottomColor: "#753022",
    },
    "&:hover:before": {
      borderBottomColor: "#753022 !important",
    },
  },
  inputs:{
    [`& fieldset`]:{
      borderRadius:30
    }
  },
  textField: {
    borderColor: "#753022",
    borderBottomColor: "#fff",
  },
  formButtons: {
    width: "100%",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  loginButtom: {
    borderRadius: 25,
    background: "#4F4A45",
    backgroundColor: "#4F4A45",
    marginLeft: "40%",
  },

  registryButtom: {
    marginTop: "2%",
    borderColor: '#753022',
    borderRadius: 25,
    backgroundColor: "#fff",
    marginLeft: "38%",
    
  },
  forgetButton: {
    textTransform: "none",
    color: "#000",
    fontWeight: 400,
    margin: "auto",
    textAlign: "center",
    borderRadius: 15,
  },
  logotypeImage: {
    marginTop: "4%",
    marginLeft: "37%",
    width: "25%",
    height: "20%"
  },
  loginBackground: {
    variant: "outlined",
    justifyContent: "center",
    minheight: "5%",
    padding: "15%",
    backgroundColor: "#fff",
    opacity: 0.8,
    borderRadius: 40
  },
  formContainer: {
    opacity: 1
  }
}));
