import React from "react";

import clsx from "clsx";
import AllocationTable from "./AllocationTable";
import CircularProgress from "@material-ui/core/CircularProgress";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import * as allocationActions from "../../redux/actions/allocationAction";

import { withStyles, makeStyles, createStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import Input from "@material-ui/core/Input";
import MenuItem from "@material-ui/core/MenuItem";

import { green, red } from "@material-ui/core/colors";

import { orange } from "@material-ui/core/colors";

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
    root: {
      display: "flex",
      alignItems: "center"
    },
    wrapper: {
      margin: theme.spacing(1),
      position: "relative"
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120
    },
    selectEmpty: {
      marginTop: theme.spacing(2)
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

function Allocation(props) {
  const { actions } = props;
  const [open, setOpen] = React.useState(false);

  const [vehicalData, setVehicalData] = React.useState([]);
  const [deviceData, setDeviceData] = React.useState([]);
  const [cityData, setCityData] = React.useState([]);

  const handleVehicalChange = e => {
    setVehicalData(e.target.value);
  };

  const handleDeviceChange = event => {
    setDeviceData(event.target.value);
  };

  const handleCityChange = event => {
    setCityData(event.target.value);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const ITEM_HEIGHT = 48;
  const ITEM_PADDING_TOP = 8;

  const MenuProps = {
    PaperProps: {
      style: {
        maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
        width: 350
      }
    }
  };

  const vehical = [
    { id: 1, name: "TVS Apache RTR 160" },
    { id: 2, name: "TVS Apache RTR 160 4V" },
    { id: 3, name: "TVS Apache RR 310" },
    { id: 4, name: "TVS Jupiter" },
    { id: 5, name: "TVS XL100" }
  ];

  const device = [
    { id: 1, name: "Light sensor" },
    { id: 2, name: "Fuel pressure sensor" },
    { id: 3, name: "Fuel level sensor" },
    { id: 4, name: "Mass airflow sensor" },
    { id: 5, name: "Oil level sensor" }
  ];

  const city = [
    { id: 1, name: "Faridabad" },
    { id: 2, name: "Gurugram" },
    { id: 3, name: "Panipat" },
    { id: 4, name: "Ambala" },
    { id: 5, name: "Yamunanagar" }
  ];
  const classes = useStyles();

  async function handleSubmit(e) {
    e.preventDefault();
    let data = {
      bikeId: vehicalData,
      imie_id: deviceData,
      city: cityData
    };
    await actions.saveAllocation(data);
    toast.success("Data saved succesfully.");
    handleClose();
  }

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
        Add New Allocation
      </ColorButton>
      <h4 className="bikeHeading" style={{ color: "#9c27b0" }}>
        Allocation Management
      </h4>
      <div className="dashboardTable">
        <AllocationTable allocationData={props.allocationData} />
      </div>

      <div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">New Allocation</DialogTitle>
          <form noValidate onSubmit={e => handleSubmit(e)}>
            <DialogContent>
              <FormControl className={classes.formControl}>
                <InputLabel id="vehical">Vehical</InputLabel>
                <Select
                  labelId="vehical"
                  id="vehical"
                  value={vehicalData || ""}
                  onChange={handleVehicalChange}
                  input={<Input />}
                  MenuProps={MenuProps}
                >
                  {vehical.map(obj => (
                    <MenuItem
                      key={obj.id}
                      value={obj.name}
                      // style={getStyles(obj.name, vehicalData, theme)}
                    >
                      {obj.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl className={classes.formControl}>
                <InputLabel id="device">Device</InputLabel>
                <Select
                  labelId="device"
                  id="device"
                  value={deviceData || ""}
                  onChange={handleDeviceChange}
                  input={<Input />}
                  MenuProps={MenuProps}
                >
                  {device.map(obj => (
                    <MenuItem
                      key={obj.id}
                      value={obj.name}
                      // style={getStyles(obj.name, deviceData, theme)}
                    >
                      {obj.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <FormControl className={classes.formControl}>
                <InputLabel id="city">City</InputLabel>
                <Select
                  labelId="city"
                  id="city"
                  value={cityData || ""}
                  onChange={handleCityChange}
                  input={<Input />}
                  MenuProps={MenuProps}
                >
                  {city.map(obj => (
                    <MenuItem
                      key={obj.id}
                      value={obj.name}
                      // style={getStyles(obj.name, cityData, theme)}
                    >
                      {obj.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
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
    allocationData: state.allocationReducer.allocationData,
    apiCallStatus: state.apiCallStatusReducer.apiCallSuccess
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      saveAllocation: bindActionCreators(
        allocationActions.saveAllocation,
        dispatch
      )
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Allocation);
