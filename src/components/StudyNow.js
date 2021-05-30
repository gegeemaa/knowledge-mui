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
  return (
    <Paper className={classes.paper}>
      {value !== null ? (
        <div>
          <h3>{value.date}</h3>
          <h3>{value.title}</h3>
          <p>{value.body}</p>
        </div>
      ) : (
        ''
      )}
    </Paper>
  )
}
