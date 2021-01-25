import { makeStyles } from "@material-ui/styles";

export default makeStyles(theme => ({
  list:{
    borderRadius: 35,
    backgroundColor: "GrayText",
    width: "15%",
    marginTop:"1%"

  },
  addButton:{
    borderRadius:35,
    width: "1%",
    paddingInline: 1
  },
  iconC: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  title: {
    marginTop: "1%"
  },
  textField:{
    width: "%5",
    borderRadius: 35
  },
  textFieldUnderline:{
    margin: "1%",
    borderRadius: 30,
    width:"%5"
  },
  principalContainer:{
    variant: "outlined",
    justifyContent: "center",
    minheight: "5%",
    padding: "4%",
    backgroundColor: "#fff",
    opacity: 1,
    borderRadius: 40
  },

}));
