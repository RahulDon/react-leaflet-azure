import React from "react";
import { makeStyles, withStyles, createStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const useStyles = makeStyles({
  table: {
    minWidth: 650
  }
});

const StyledTableCell = withStyles(theme =>
  createStyles({
    head: {
      backgroundColor: "#9c27b0",
      color: theme.palette.common.white
    },
    body: {
      fontSize: 14
    }
  })
)(TableCell);

const rows = [
  { id: 1, bikeId: 159, imie_id: 6.0, city: "Gurgaon", status: "Active" },
  { id: 2, bikeId: 237, imie_id: 9.0, city: "Gurgaon", status: "Active" },
  { id: 3, bikeId: 262, imie_id: 16.0, city: "Gurgaon", status: "Active" },
  { id: 4, bikeId: 305, imie_id: 3.7, city: "Gurgaon", status: "Active" },
  { id: 5, bikeId: 356, imie_id: 16.0, city: "Gurgaon", status: "Active" }
];

function AllocationTable() {
  const [open, setOpen] = React.useState(false);
  const [deleteModal, setDeleteModal] = React.useState(false);

  const editAllocation = () => {
    console.log("Edit Icon");
  };

  const deleteAllocation = () => {
    console.log("Delete Icon");
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDeleteOpen = () => {
    setDeleteModal(true);
  };

  const handleDeleteClose = () => {
    setDeleteModal(false);
  };

  const classes = useStyles();
  return (
    <React.Fragment>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <StyledTableCell>S.No</StyledTableCell>
              <StyledTableCell>Bike Id</StyledTableCell>
              <StyledTableCell>IMIE Id</StyledTableCell>
              <StyledTableCell>City</StyledTableCell>
              <StyledTableCell>Status</StyledTableCell>
              <StyledTableCell align="center">Action</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell>{row.bikeId}</TableCell>
                <TableCell>{row.imie_id}</TableCell>
                <TableCell>{row.city}</TableCell>
                <TableCell>{row.status}</TableCell>
                <TableCell align="center">
                  <EditIcon onClick={handleClickOpen} />{" "}
                  <DeleteIcon onClick={handleDeleteOpen} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <div>
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Edit Allocation</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Bike Id"
              type="email"
              fullWidth
            />
            <TextField
              margin="dense"
              id="imei"
              label="IMEI No."
              type="email"
              fullWidth
            />
            <TextField
              margin="dense"
              id="city"
              label="Allocated City"
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

      <Dialog
        open={deleteModal}
        onClose={handleDeleteClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle id="form-dialog-title">Delete Allocation</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this allocation?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            color="primary"
            onClick={handleDeleteClose}
          >
            Yes
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleDeleteClose}
          >
            No
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}

export default AllocationTable;
