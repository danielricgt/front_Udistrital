import { makeStyles } from "@material-ui/styles";

export default makeStyles(theme => ({
  body:{
    backgroundColor: "#ffff"
  },
  addButton:{
    borderRadius:35,
    width: "1%",
    paddingInline: 1,
    marginRight: 0
  },
  inputs:{
    borderRadius: 25
  },
  formControl: {
    margin: theme.spacing(1),
    width: "20%"
  },
  iconC: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  title: {
    marginTop: "3%",
    marginBottom: "2%"
  },
  textField:{
    width: "%5",
    borderRadius: 25,
    marginRight: "1%"
    },
    inputs:{
      marginRight: "1%",
      marginBottom: "1%",
      [`& fieldset`]:{
        borderRadius:30
      }
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
  card: {
    minHeight: "100%",
    display: "flex",
    flexDirection: "column",
  },
  visitsNumberContainer: {
    display: "flex",
    alignItems: "center",
    flexGrow: 1,
   // paddingBottom: theme.spacing(1),
  },
  progressSection: {
    //marginBottom: theme.spacing(1),
  },
  progressTitle: {
    //marginBottom: theme.spacing(2),
  },
  progress: {
    //marginBottom: theme.spacing(1),
   // backgroundColor: theme.palette.primary.main,
  },
  pieChartLegendWrapper: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "flex-end",
    //marginRight: theme.spacing(1),
  },
  legendItemContainer: {
    display: "flex",
    alignItems: "center",
    //marginBottom: theme.spacing(1),
  },
  fullHeightBody: {
    display: "flex",
    flexGrow: 1,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  tableWidget: {
    overflowX: "auto",
  },
  progressBar: {
   // backgroundColor: theme.palette.warning.main,
  },
  performanceLegendWrapper: {
    display: "flex",
    flexGrow: 1,
    alignItems: "center",
    //marginBottom: theme.spacing(1),
  },
  legendElement: {
    display: "flex",
    alignItems: "center",
    //marginRight: theme.spacing(2),
  },
  legendElementText: {
   // marginLeft: theme.spacing(1),
  },
  serverOverviewElement: {
    display: "flex",
    alignItems: "center",
    maxWidth: "100%",
  },
  serverOverviewElementText: {
    minWidth: 145,
   // paddingRight: theme.spacing(2),
  },
  serverOverviewElementChartWrapper: {
    width: "100%",
  },
  mainChartBody: {
    overflowX: "auto",
  },
  mainChartHeader: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
   // [theme.breakpoints.only("xs")]: {
      //flexWrap: "wrap",
    //},
  },
  mainChartHeaderLabels: {
    display: "flex",
    alignItems: "center",
    //[theme.breakpoints.only("xs")]: {
   //   order: 3,
      //width: "100%",
      //justifyContent: "center",
     // marginTop: theme.spacing(3),
      //marginBottom: theme.spacing(2),
    //},
  },
  mainChartHeaderLabel: {
    display: "flex",
    alignItems: "center",
    //marginLeft: theme.spacing(3),
  },
  mainChartSelectRoot: {
   // borderColor: theme.palette.text.hint + "80 !important",
  },
  mainChartSelect: {
    padding: 10,
    paddingRight: 25,
  },
  mainChartLegentElement: {
    fontSize: "18px !important",
    //marginLeft: theme.spacing(1),
  },
}));
