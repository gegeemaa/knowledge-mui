import { React, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Paper } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  paper: {
    padding: '15px',
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
})

export default function StudyNow() {
  const classes = useStyles()

  return <Paper className={classes.paper}>Hello</Paper>
}
