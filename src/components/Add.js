import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Paper, Grid } from '@material-ui/core'
import InputForm from './InputForm'

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    margin: 'auto',
    maxWidth: 600,
  },
}))

export default function Add() {
  const classes = useStyles()
  return (
    <Paper className={classes.paper}>
      <InputForm value={null} buttonText="Add" handleCancel="inVisible" />
    </Paper>
  )
}
