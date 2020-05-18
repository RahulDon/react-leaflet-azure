import React from "react";

import AllocationTable from "./AllocationTable";

import {
  createMuiTheme,
  withStyles,
  makeStyles,
  createStyles
} from "@material-ui/core/styles";
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

import { green, orange } from "@material-ui/core/colors";

const ColorButton = withStyles(theme => ({
  root: {
    color: theme.palette.getContrastText(orange[500]),
    backgroundColor: orange[500],
    "&:hover": {
      backgroundColor: orange[700]
    }
  }
}))(Button);

const theme = createMuiTheme({
  palette: {
    primary: green
  }
});

const useStyles = makeStyles(theme =>
  createStyles({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120
    },
    selectEmpty: {
      marginTop: theme.spacing(2)
    }
  })
);

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium
  };
}

function Allocation() {
  const [open, setOpen] = React.useState(false);

  const [vehicalName, setVehicalName] = React.useState([]);
  const [deviceName, setDeviceName] = React.useState([]);
  const [cityName, setCityName] = React.useState([]);

  const handleVehicalChange = event => {
    setVehicalName(event.target.value);
  };

  const handleDeviceChange = event => {
    setDeviceName(event.target.value);
  };

  const handleCityChange = event => {
    setCityName(event.target.value);
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
    "TVS Apache RTR 160",
    "TVS Apache RTR 160 4V",
    "TVS Apache RR 310",
    "TVS Jupiter",
    "TVS XL100",
    "TVS Apache RTR 180",
    "TVS Apache RTR 200 4V",
    "TVS Scooty Pep Plus",
    "TVS iQube Electric",
    "TVS NTORQ 125"
  ];

  const device = [
    "Light sensor",
    "Fuel pressure sensor",
    "Fuel level sensor",
    "Mass airflow sensor",
    "Oil level sensor",
    "Oil pressure sensor",
    "Parking sensor",
    "Radar sensor",
    "Speed sensor",
    "Throttle position sensor"
  ];

  const city = [
    "Faridabad",
    "Gurugram",
    "Panipat",
    "Ambala",
    "Yamunanagar",
    "Rohtak",
    "Hisar",
    "Karnal",
    "Sonipat",
    "Panchkula"
  ];
  const classes = useStyles();
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
        <AllocationTable />
      </div>

      <div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">New Allocation</DialogTitle>
          <DialogContent>
            <FormControl className={classes.formControl}>
              <InputLabel id="vehical">Vehical</InputLabel>
              <Select
                labelId="vehical"
                id="demo-mutiple-name"
                value={vehicalName}
                onChange={handleVehicalChange}
                input={<Input />}
                MenuProps={MenuProps}
              >
                {vehical.map(name => (
                  <MenuItem
                    key={name}
                    value={name}
                    style={getStyles(name, vehicalName, theme)}
                  >
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl className={classes.formControl}>
              <InputLabel id="device">Device</InputLabel>
              <Select
                labelId="device"
                id="demo-mutiple-name"
                value={deviceName}
                onChange={handleDeviceChange}
                input={<Input />}
                MenuProps={MenuProps}
              >
                {device.map(name => (
                  <MenuItem
                    key={name}
                    value={name}
                    style={getStyles(name, deviceName, theme)}
                  >
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl className={classes.formControl}>
              <InputLabel id="city">City</InputLabel>
              <Select
                labelId="city"
                id="demo-mutiple-name"
                value={cityName}
                onChange={handleCityChange}
                input={<Input />}
                MenuProps={MenuProps}
              >
                {city.map(name => (
                  <MenuItem
                    key={name}
                    value={name}
                    style={getStyles(name, cityName, theme)}
                  >
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button variant="outlined" color="primary" onClick={handleClose}>
              Save
            </Button>
            <Button variant="outlined" color="secondary" onClick={handleClose}>
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}

export default Allocation;
