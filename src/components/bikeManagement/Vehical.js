import React from "react";
import VehicalTable from "./VehicalTable";

import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";

import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";

import { orange } from "@material-ui/core/colors";

const ColorButton = withStyles(theme => ({
  root: {
    color: theme.palette.getContrastText(orange[500]),
    backgroundColor: orange[500],
    "&:hover": {
      backgroundColor: orange[700]
    }
  }
}))(Button);

function Vehical() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <ColorButton
        variant="contained"
        color="primary"
        backgroundcolor="#27b084"
        className="bikeMgmtButton"
        onClick={handleClickOpen}
      >
        Add New Vehical
      </ColorButton>
      <h4 className="bikeHeading" style={{ color: "#0063cc" }}>
        Vehical Management
      </h4>
      <div className="dashboardTable">
        <VehicalTable />
      </div>

      <div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">New Vehical</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="type"
              label="Vehical Type"
              type="text"
              fullWidth
            />
            <TextField
              margin="dense"
              id="model"
              label="Vehical Model"
              type="text"
              fullWidth
            />
            <TextField
              margin="dense"
              id="description"
              label="Description"
              type="email"
              fullWidth
            />
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

export default Vehical;
