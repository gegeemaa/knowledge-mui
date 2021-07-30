import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Paper, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import axios from '../axios-knowledges'

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
  let data
  const [countOfNew, setCountOfNew] = useState()
  const [countOfLearning, setCountOfLearning] = useState()
  const [countOfReviewing, setCountOfReviewing] = useState()

  function handleClick() {
    history.push('./StudyNow')
  }

  console.log('HELLO:')

  useEffect(() => {
    axios
      .get('/knowledges.json')
      .then(response => {
        //Object-iig array-ruu horvuuleh
        const arr = Object.entries(response.data)
        // map() ni array-aas shine array uusgeh function yum.
        data = arr
          .map(el => ({
            id: el[0],
            date: el[1].date,
            title: el[1].title,
            body: el[1].body,
            topic: el[1].topic,
            rate: el[1].rate,
            // delay_time: new Date(el[1].delay_time),
            delay_time: el[1].delay_time,
          }))
          .filter(x => new Date() >= new Date(x.delay_time))
        console.log(data)
        // countOfNew = data.filter(x => x.rate == '0').length
        // countOfLearning = data.filter(x => x.rate == '1').length
        // countOfReviewing = data.filter(x => x.rate == '2').length
        setCountOfNew(data.filter(x => x.rate == '0').length)
        setCountOfLearning(data.filter(x => x.rate == '1').length)
        setCountOfReviewing(data.filter(x => x.rate == '2').length)
      })
      .catch(error => {
        // console.log(error)
      })
  }, [])

  return (
    <Paper>
      <table className={classes.table}>
        <tr>
          <td className={classes.td}>New</td>
          <td style={{ color: 'blue', fontWeight: 'bold' }}>{countOfNew}</td>
        </tr>
        <tr>
          <td>Learning</td>
          <td style={{ color: 'orange', fontWeight: 'bold' }}>
            {countOfLearning}
          </td>
        </tr>
        <tr>
          <td>Reviewing</td>
          <td style={{ color: 'green', fontWeight: 'bold' }}>
            {countOfReviewing}
          </td>
        </tr>
      </table>
      <Button
        variant="outlined"
        color="primary"
        onClick={handleClick}
        className={classes.button}>
        Study Now
      </Button>
    </Paper>
  )
}
