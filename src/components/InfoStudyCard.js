import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { Paper, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import Editor from 'rich-markdown-editor'
import axios from '../axios-knowledges'

const useStyles = makeStyles(theme => ({
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
  papper: {
    padding: theme.spacing(3),
    maxWidth: 1000,
    margin: 'auto',
  },
}))
const text = `
Notes are divided into the following 2 categories:
  1. New notes
  2. Learning notes

The above number of cards on which to work today is shown with related categories. When you continue by clicking on the "Study now" button, the first note's title will be shown by giving you some time to think about the answer. By clicking on the "Show answer" button, a related answer should be shown. Depending on how your answer you have thought matches with the answer, you should grade your note. Grading notes means that you will decide after how much time notes will be shown. Let's call this time "Waiting time."
 
There are several grading buttons on note and number of buttons and it's related waiting time depends on note's category. 

**New**: It is a newly created note and has the following 3 constant grading buttons.
  - again (1minute)
  - good (10 minutes)
  - easy (4 days)
If you grade the note as "easy", it's category will be changed to "Learning".

**Learning**: It is a note you are working on and has the following 3 constant grading buttons.
  - again (1minute)
  - good (1 day)
  - easy (4 days)
`

export default function InfoStudyCard() {
  const classes = useStyles()
  let history = useHistory()
  let data
  const [countOfNew, setCountOfNew] = useState()
  const [countOfLearning, setCountOfLearning] = useState()

  function handleClick() {
    history.push('./StudyNow')
  }

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
        setCountOfNew(data.filter(x => x.rate == '0').length)
        setCountOfLearning(data.filter(x => x.rate == '1').length)
      })
      .catch(error => {
        // console.log(error)
      })
  }, [])

  return (
    <Paper className={classes.papper}>
      <table className={classes.table}>
        <tr>
          <td className={classes.td}>New</td>
          <td style={{ color: '#5bc0de', fontWeight: 'bold' }}>{countOfNew}</td>
        </tr>
        <tr>
          <td>Learning</td>
          <td style={{ color: '#f0ad4e', fontWeight: 'bold' }}>
            {countOfLearning}
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
      <Editor defaultValue={text} readOnly={true} />
    </Paper>
  )
}
