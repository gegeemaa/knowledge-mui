import React from 'react'
import { useHistory } from 'react-router-dom'
import { Paper, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import GetNumberOfCards from '../thunk/GetNumberOfCards'

const useStyles = makeStyles({
  table: {
    margin: 'auto',
    width: '40%',
    padding: '10px',
  },
  td: {
    width: '40%',
  },
  button: {
    marginLeft: '35%',
    marginBottom: '10px',
  },
})
export default function InfoStudyCard() {
  const classes = useStyles()
  let history = useHistory()

  function handleClick() {
    history.push('./StudyNow')
  }
  return (
    <Paper>
      <table className={classes.table}>
        <tr>
          <td className={classes.td}>New</td>
          <td style={{ color: 'blue', fontWeight: 'bold' }}>78</td>
        </tr>
        <tr>
          <td>Learning</td>
          <td style={{ color: 'orange', fontWeight: 'bold' }}>94</td>
        </tr>
        <tr>
          <td>Reviewing</td>
          <td style={{ color: 'green', fontWeight: 'bold' }}>80</td>
        </tr>
      </table>
      <Button
        variant="outlined"
        color="primary"
        onClick={handleClick}
        className={classes.button}>
        Study Now
      </Button>
      <GetNumberOfCards />
    </Paper>
  )
}
