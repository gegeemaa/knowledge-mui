import React from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import InputForm from './InputForm'

const Modal = ({ open, handleCancel, value, buttonText }) => {
  return (
    <Dialog
      open={open}
      onClose={handleCancel}
      aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">{buttonText} knowledge</DialogTitle>
      <DialogContent>
        <InputForm
          value={value}
          buttonText={buttonText}
          handleCancel={handleCancel}
        />
      </DialogContent>
    </Dialog>
  )
}
export default Modal
