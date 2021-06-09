import { React, useState, useEffect } from 'react'
import clsx from 'clsx'
import { useSelector, useDispatch } from 'react-redux'
import axios from '../axios-knowledges'
import { Paper, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import {
  enterMultiple,
  // deleteRow,
  // updateRow,
} from '../redux/actions/knowledgeActions'
import { Block, RowingSharp } from '@material-ui/icons'

const useStyles = makeStyles({
  paper: {
    padding: '15px',
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  buttonRate: {
    display: 'none',
  },
  buttonBlock: {
    display: 'block',
  },
})

export default function StudyNow() {
  const dispatch = useDispatch()
  const classes = useStyles()
  const knowledges = useSelector(state => state.list)
  const [items, setItems] = useState(knowledges)
  const [answerDisplay, setAnswerDisplay] = useState(false)
  const [currentIndex, setIndex] = useState(0)
  const [answer, setAnswer] = useState('')
  let data = []

  // eniig daraa ni tusdaa component bolgoh
  useEffect(() => {
    console.log('HellouseEffect')
    // gants udaa, ehnii
    axios
      .get('/knowledges.json')
      .then(response => {
        //Object-iig array-ruu horvuuleh
        const arr = Object.entries(response.data)
        // console.log(arr)
        // map() ni array-aas shine array uusgeh function yum.
        data = arr.map(el => ({
          id: el[0],
          date: el[1].date,
          title: el[1].title,
          body: el[1].body,
          topic: el[1].topic,
        }))
        //Redux-ruu firebase DB-ees avsan ogogdloo nemj bna.
        dispatch(enterMultiple(data))
      })
      .catch(error => {
        // console.log(error)
      })
  }, [])

  useEffect(() => {
    // Should not ever set state during rendering, so do this in useEffect instead.
    setItems(knowledges)
  }, [knowledges])

  const showAnswer = argument => {
    setAnswerDisplay(true)
    console.log('Lenth' + items.length)
  }

  const next = arg => {
    console.log('Hello' + currentIndex)
    setIndex(currentIndex + 1)
    setAnswerDisplay(false)
  }

  return (
    <Paper className={classes.paper}>
      {items && currentIndex < items.length ? (
        <div>
          <p>{items[currentIndex].title}</p>

          <Button
            variant="outlined"
            color="primary"
            onClick={() => showAnswer(currentIndex)}>
            Show answer
          </Button>
          {answerDisplay && (
            <div>
              <div id="body">{items[currentIndex].body}</div>
              <Button
                variant="outlined"
                color="primary"
                onClick={() => next('good')}>
                Good
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                onClick={() => next('bad')}>
                Bad
              </Button>
            </div>
          )}
        </div>
      ) : items ? (
        <p>Card-iig ajillaj duuslaa. Bayarlalaa!</p>
      ) : (
        <p>There is not value.</p>
      )}
    </Paper>
  )
}
