import React from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import InputForm from './InputForm'

const Modal = ({ open, handleCancel, value, onUpdate, buttonText }) => {
  return (
    <Dialog
      open={open}
      onClose={handleCancel}
      aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Subscribe</DialogTitle>
      <DialogContent>
        <InputForm value={value} submit={onUpdate} buttonText={buttonText} />
      </DialogContent>
      {/* <DialogActions>
        <Button onClick={handleCancel} color="primary">
          Cancel
        </Button>
        <Button onClick={handleCancel} color="primary">
          Subscribe
        </Button>
      </DialogActions> */}
    </Dialog>
  )
}
export default Modal
