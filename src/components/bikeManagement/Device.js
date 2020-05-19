import React from "react";
import clsx from "clsx";
import DeviceTable from "./DeviceTable";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as deviceAction from "../../redux/actions/deviceAction";

import { withStyles, makeStyles, createStyles } from "@material-ui/core/styles";

import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";

import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

import { orange, red, green } from "@material-ui/core/colors";

import { toast } from "react-toastify";

const ColorButton = withStyles(theme => ({
  root: {
    color: theme.palette.getContrastText(orange[500]),
    backgroundColor: orange[500],
    "&:hover": {
      backgroundColor: orange[700]
    }
  }
}))(Button);

const useStyles = makeStyles(theme =>
  createStyles({
    wrapper: {
      margin: theme.spacing(1),
      position: "relative"
    },
    buttonSuccess: {
      backgroundColor: red[500],
      "&:hover": {
        backgroundColor: red[700]
      }
    },
    cancelSuccess: {
      backgroundColor: green[500],
      "&:hover": {
        backgroundColor: green[700]
      }
    },
    buttonProgress: {
      color: green[500],
      position: "absolute",
      top: "50%",
      left: "20%",
      marginTop: -12,
      marginLeft: -12
    },
    cancelButtonProgress: {
      color: red[500],
      position: "absolute",
      top: "50%",
      left: "70%",
      marginTop: -12,
      marginLeft: -12
    }
  })
);

function Device(props) {
  const classes = useStyles();
  const { actions } = props;
  const [open, setOpen] = React.useState(false);
  const [state, setState] = React.useState({
    imei_no: "",
    device_model: "",
    description: ""
  });

  const [imeiError, setImeiNoError] = React.useState(false);
  const [modelError, setModelNumberError] = React.useState(false);
  const [descriptionError, setDescriptionError] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  async function handleSubmit(e) {
    e.preventDefault();
    if (state.imei_no === "") setImeiNoError(true);
    if (state.device_model === "") setModelNumberError(true);
    if (state.description === "") setDescriptionError(true);
    if (
      state.imei_no !== "" &&
      state.device_model !== "" &&
      state.description !== ""
    ) {
      await actions.saveDevice(state);
      toast.success("Data saved succesfully.");
      handleClose();
    }
  }

  const changeField = e => {
    setState({ ...state, [e.target.id]: e.target.value }); //Microsoft edge does not support spread operator
    setImeiNoError(false);
    setModelNumberError(false);
    setDescriptionError(false);
    //const newState = Object.assign(state, { [e.target.name]: e.target.value });
    //setState(newState);
  };

  const buttonClassname = clsx({
    [classes.buttonSuccess]: props.apiCallStatus
  });

  const cancelButtonClassname = clsx({
    [classes.cancelSuccess]: props.apiCallStatus
  });

  return (
    <div>
      <ColorButton
        variant="contained"
        color="primary"
        backgroundcolor="#27b084"
        className="bikeMgmtButton"
        onClick={handleClickOpen}
      >
        Add New Device
      </ColorButton>
      <h4 className="bikeHeading" style={{ color: "#4caf50" }}>
        Device Management
      </h4>
      <div className="dashboardTable">
        <DeviceTable deviceData={props.deviceData} />
      </div>

      <div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">New Device</DialogTitle>
          <form noValidate onSubmit={e => handleSubmit(e)}>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                id="imei_no"
                label="IMEI No."
                type="text"
                fullWidth
                onChange={e => changeField(e)}
                error={imeiError}
                helperText={imeiError ? "IMEI number is Required!" : " "}
              />
              <TextField
                margin="dense"
                id="device_model"
                label="Device Model"
                type="text"
                fullWidth
                onChange={e => changeField(e)}
                error={modelError}
                helperText={modelError ? "Device Model is Required!" : " "}
              />
              <TextField
                margin="dense"
                id="description"
                label="Description"
                type="text"
                fullWidth
                onChange={e => changeField(e)}
                error={descriptionError}
                helperText={descriptionError ? "Description is Required!" : " "}
              />
            </DialogContent>
            <DialogActions>
              <div className={classes.wrapper}>
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  disabled={props.apiCallStatus}
                  className={buttonClassname}
                  style={{ marginRight: "10px" }}
                >
                  Save
                </Button>
                {props.apiCallStatus && (
                  <CircularProgress
                    size={24}
                    className={classes.buttonProgress}
                  />
                )}

                <Button
                  variant="contained"
                  color="secondary"
                  disabled={props.apiCallStatus}
                  className={cancelButtonClassname}
                  onClick={handleClose}
                >
                  Cancel
                </Button>
                {props.apiCallStatus && (
                  <CircularProgress
                    size={24}
                    className={classes.cancelButtonProgress}
                  />
                )}
              </div>
            </DialogActions>
          </form>
        </Dialog>
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  return {
    deviceData: state.deviceReducer.deviceData,
    apiCallStatus: state.apiCallStatusReducer.apiCallSuccess
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      saveDevice: bindActionCreators(deviceAction.saveDevice, dispatch)
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Device);
