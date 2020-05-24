import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import MenuItem from '@material-ui/core/MenuItem';

import { addUser, editUser, deleteUser } from '../services/api/users';

export function FormDialog( {value, update} ) {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState( value ? value.name : '' );
  const [position, setPosition] = useState( value ? value.position : '' );
  const [email, setEmail] = useState( value ? value.email : '' );
  const [age, setAge] = useState( value ? value.age : '' );
  const [gender, setGender] = useState( value ? value.gender : '' );

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOk = () => {
    if ( value ){
      editUser({
        "name": name,
        "position": position,
        "email": email,
        "age": age,
        "gender": gender
      }, value.id)
      .then( (res) => {
        if (res.errors) console.log(res.errors[0].message)
      })
    } else {
      addUser({
        "name": name,
        "position": position,
        "email": email,
        "age": age,
        "gender": gender
      })
      .then( (res) => {
        if (res.errors) console.log(res.errors[0].message)
      })
    }
    update();
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        {value ? 'Edit' : 'Add User' }
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Add a new user information.
          </DialogContentText>
          <TextField margin="dense" id="name" label="name" type="text" defaultValue={name} onInput={(e) => setName(e.target.value)} autoFocus fullWidth />
          <TextField margin="dense" id="position" label="position" type="text" onInput={(e) => setPosition(e.target.value)} defaultValue={position} fullWidth />
          <TextField margin="dense" id="email" label="email" type="email" onInput={(e) => setEmail(e.target.value)} defaultValue={email} fullWidth />
          <TextField margin="dense" id="age" label="age" type="number" onInput={(e) => setAge(e.target.value)} defaultValue={age} fullWidth/>
          <TextField margin="dense" id="gender" label="gender" type="Select" value={gender} select onChange={(e) => setGender(e.target.value)} fullWidth>
            <MenuItem key="male" value="male">male</MenuItem>
            <MenuItem key="female" value="female">female</MenuItem>
            <MenuItem key="other" value="other">other</MenuItem>
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleOk} color="primary">
            {value ? 'Edit' : 'Add User' }
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export function DeleteDialog( {value, update } ) {
  const [open, setOpen] = useState(false);
  const [id] = useState(value);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOk = () => {
    deleteUser(id);
    update();
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" color="secondary" onClick={handleClickOpen}>
        DELETE
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"DELETE This user?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            You cannot undo after you delete this user.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleOk} color="primary" autoFocus>
            DELETE
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
