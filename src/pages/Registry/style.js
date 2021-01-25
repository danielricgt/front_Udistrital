import { makeStyles } from "@material-ui/styles";

export default makeStyles((theme) => ({
  bg: {
    backgroundColor: "#000"
  },
  formControl: {
    margin: theme.spacing(1),
    width: "100%",
  },
  label:{
    borderRadius:35
  },
  container: {
    alignItems: "center",
    justifyContent: "center",
    marginLeft: "30%",
    width: "40%",
    marginTop: "3%",
    direction: "row",
    borderRadius: 35,
  },
  errorMessage: {
    alignItems: "center",
    direction: "row",

  },
  title: {
    color: "#753022",
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
    backgroundColor: "#753022",
    marginLeft: "35%",
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
    padding: "9%",
    backgroundColor: "#fff",
    opacity: 0.8,
    borderRadius: 40
  },
  formContainer: {
    opacity: 1,
  }
}));
