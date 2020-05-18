import React, { useEffect } from "react";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as dashboardActions from "../../redux/actions/dashboardActions";

import Allocation from "../bikeManagement/Allocation";
import Device from "../bikeManagement/Device";
import Vehical from "../bikeManagement/Vehical";

import {
  createMuiTheme,
  withStyles,
  makeStyles,
  ThemeProvider
} from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

import { green, purple } from "@material-ui/core/colors";

const ColorButton = withStyles(theme => ({
  root: {
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: purple[500],
    "&:hover": {
      backgroundColor: purple[700]
    }
  }
}))(Button);

const BootstrapButton = withStyles({
  root: {
    boxShadow: "none",
    textTransform: "none",
    fontSize: 16,
    padding: "6px 12px",
    border: "1px solid",
    lineHeight: 1.5,
    backgroundColor: "#0063cc",
    borderColor: "#0063cc",
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(","),
    "&:hover": {
      backgroundColor: "#0069d9",
      borderColor: "#0062cc",
      boxShadow: "none"
    },
    "&:active": {
      boxShadow: "none",
      backgroundColor: "#0062cc",
      borderColor: "#005cbf"
    },
    "&:focus": {
      boxShadow: "0 0 0 0.2rem rgba(0,123,255,.5)"
    }
  }
})(Button);

const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(1)
  }
}));

const theme = createMuiTheme({
  palette: {
    primary: green
  }
});

function Dashboard(props) {
  const { actions } = props;

  useEffect(() => {
    actions.hideMapIcon();
    if (props.openManagementPage === "") {
      openAllocationPage();
    }
  }, []);

  const openAllocationPage = () => {
    actions.openAllocationPage();
  };

  const openDevicePage = () => {
    actions.openDevicePage();
  };

  const openVehicalPage = () => {
    actions.openVehicalPage();
  };

  const classes = useStyles();
  return (
    <div className="dashboardBody">
      <ColorButton
        variant="contained"
        color="primary"
        className={classes.margin}
        onClick={openAllocationPage}
      >
        Allocation Management
      </ColorButton>
      <ThemeProvider theme={theme}>
        <Button
          variant="contained"
          color="primary"
          className={classes.margin}
          onClick={openDevicePage}
        >
          Device Management
        </Button>
      </ThemeProvider>
      <BootstrapButton
        variant="contained"
        color="primary"
        disableRipple
        className={classes.margin}
        onClick={openVehicalPage}
      >
        Vehical Management
      </BootstrapButton>

      {props.openManagementPage === "allocation" && <Allocation />}
      {props.openManagementPage === "device" && <Device />}
      {props.openManagementPage === "vehical" && <Vehical />}
    </div>
  );
}

function mapStateToProps(state) {
  return {
    openManagementPage: state.dashboard.openManagement
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      showMapIcon: bindActionCreators(dashboardActions.showMapIcon, dispatch),
      hideMapIcon: bindActionCreators(dashboardActions.hideMapIcon, dispatch),
      openAllocationPage: bindActionCreators(
        dashboardActions.openAllocationPage,
        dispatch
      ),
      openDevicePage: bindActionCreators(
        dashboardActions.openDevicePage,
        dispatch
      ),
      openVehicalPage: bindActionCreators(
        dashboardActions.openVehicalPage,
        dispatch
      )
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
