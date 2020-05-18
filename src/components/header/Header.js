import React from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import { bindActionCreators } from "redux";

import * as authActions from "../../redux/actions/authenticationAction";
import * as dashboardActions from "../../redux/actions/dashboardActions";

import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2),
    "&:hover": {
      cursor: "pointer"
    }
  },
  title: {
    flexGrow: 1,
    "&:hover": {
      cursor: "pointer"
    }
  },
  showClickMap: {
    flexGrow: 1,
    "&:hover": {
      cursor: "pointer",
      color: "yellow"
    }
  },
  showClickDashboard: {
    marginRight: theme.spacing(2),
    "&:hover": {
      cursor: "pointer",
      color: "yellow"
    }
  }
}));

function Header(props) {
  const { actions } = props;
  const classes = useStyles();
  let history = useHistory();

  const fnGoToDashboard = () => {
    history.push("/");
  };

  const fnGoToMap = () => {
    actions.showMapIcon();
    history.push("/map");
  };

  async function handleLogout(e) {
    await actions.logout();
    history.push("/");
  }

  return (
    <React.Fragment>
      <AppBar position="fixed">
        <Toolbar>
          {!props.showMapIcon ? (
            <>
              <Typography variant="h6" className={classes.menuButton}>
                Dashboard
              </Typography>
              <Typography
                variant="h6"
                className={classes.showClickMap}
                onClick={fnGoToMap}
              >
                Map
              </Typography>
            </>
          ) : (
            <>
              <Typography
                variant="h6"
                className={classes.showClickDashboard}
                onClick={fnGoToDashboard}
              >
                Dashboard
              </Typography>
              <Typography variant="h6" className={classes.title}>
                Map
              </Typography>
            </>
          )}
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </React.Fragment>
  );
}

function mapStateToProps(state) {
  return {
    showMapIcon: state.dashboard.showMapIcon
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      showMapIcon: bindActionCreators(dashboardActions.showMapIcon, dispatch),
      logout: bindActionCreators(authActions.logout, dispatch)
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);
