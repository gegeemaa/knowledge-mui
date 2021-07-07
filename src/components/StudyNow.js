import { React, useState, useEffect } from 'react'
import clsx from 'clsx'
import { useSelector, useDispatch } from 'react-redux'
import axios from '../axios-knowledges'
import RateButtonComponent from './RateButtonComponent'
import { Paper, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import {
  enterMultiple,
  // deleteRow,
  // updateRow,
} from '../redux/actions/knowledgeActions'
import { Block, ContactsOutlined, RowingSharp } from '@material-ui/icons'
import { GridLeftEmptyCell } from '@material-ui/data-grid'

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
  const [delayTime, setDelayTime] = useState('')

  let today = new Date()

  let data = []

  // eniig daraa ni tusdaa component bolgoh
  useEffect(() => {
    // console.log('HellouseEffect')
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
          rate: el[1].rate,
          severity: el[1].severity,
          delay_time: el[1].delay_time,
          delay_time_ms: el[1].delay_time_ms,
        }))
        // Date-eer ni sortolj baina.
        data.sort(function (a, b) {
          var dateA = new Date(a.delay_time),
            dateB = new Date(b.delay_time)
          return dateA - dateB
        })
        console.log('Hello')
        console.log(data)
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
    // console.log('Lenth' + items.length)
  }

  // 2 date-iin zoruug day, hour, minutes, second-eer ilerhiileh function
  Date.daysBetween = function (delay_time_ms) {
    var text = ''
    //take out milliseconds
    delay_time_ms = delay_time_ms / 1000
    var seconds = Math.floor(delay_time_ms % 60)
    delay_time_ms = delay_time_ms / 60
    var minutes = Math.floor(delay_time_ms % 60)
    delay_time_ms = delay_time_ms / 60
    var hours = Math.floor(delay_time_ms % 24)
    var days = Math.floor(delay_time_ms / 24)

    if (days === 0) {
      if (hours === 0) {
        if (minutes === 0) {
          text = seconds + ' seconds'
        } else {
          text = minutes + ' minutes'
        }
      } else {
        text = hours + ' hours '
      }
    } else {
      text = days + ' days '
    }

    return text
  }

  let delayTimeTextHard
  let delayTimeTextGood
  let delayTimeTextEasy

  if (Math.floor(items[currentIndex].delay_time_ms) > 1) {
    delayTimeTextHard = Date.daysBetween(items[currentIndex].delay_time_ms / 2)
  } else {
    delayTimeTextHard = '1 day'
  }
  delayTimeTextGood = Date.daysBetween(items[currentIndex].delay_time_ms * 2)
  delayTimeTextEasy = Date.daysBetween(items[currentIndex].delay_time_ms * 3)

  const [delayTimeButtonHardText, setDelayTimeButtonHardText] =
    useState(delayTimeTextHard)
  const [delayTimeButtonGoodText, setDelayTimeButtonGoodText] =
    useState(delayTimeTextGood)
  const [delayTimeButtonEasyText, setDelayTimeButtonEasyText] =
    useState(delayTimeTextEasy)

  const next = (buttonName, item, cardCategory) => {
    let pervios_delay_time_ms = items[currentIndex].delay_time_ms
    setIndex(currentIndex + 1)
    setAnswerDisplay(false)
    // console.log(buttonName, cardCategory)

    let delay_time_ms
    //CardCategory is new
    if (buttonName === 'again' && cardCategory === 0) {
      today.setMinutes(today.getMinutes() + 1)
      delay_time_ms = 1 * 60 * 1000
    } else if (buttonName === 'good' && cardCategory === 0) {
      today.setMinutes(today.getMinutes() + 10)
      delay_time_ms = 10 * 60 * 1000
    } else if (buttonName === 'easy' && cardCategory === 0) {
      today.setDate(today.getDate() + 4)
      delay_time_ms = 4 * 60 * 60 * 24 * 1000
      cardCategory = 1
    }
    //CardCategory is learning
    else if (buttonName === 'again' && cardCategory === 1) {
      today.setMinutes(today.getMinutes() + 1)
      delay_time_ms = 1 * 60 * 1000
    } else if (buttonName === 'good' && cardCategory === 1) {
      today.setDate(today.getDate() + 1)
      delay_time_ms = 1 * 60 * 60 * 24 * 1000
      cardCategory = 2
    } else if (buttonName === 'easy' && cardCategory === 1) {
      today.setDate(today.getDate() + 4)
      delay_time_ms = 4 * 60 * 60 * 24 * 1000
      cardCategory = 2
    }
    //CardCategory is review
    else if (buttonName === 'again' && cardCategory === 2) {
      today.setMinutes(today.getMinutes() + 10)
      delay_time_ms = 10 * 60 * 1000
    } else if (buttonName === 'hard' && cardCategory === 2) {
      // Eniig daraa ni zasna
      today.setDate(today.getDate() + 2)
      delay_time_ms = 2 * 60 * 60 * 24 * 1000
    } else if (buttonName === 'good' && cardCategory === 2) {
      delay_time_ms = pervios_delay_time_ms * 2
    } else if (buttonName === 'easy' && cardCategory === 2) {
      delay_time_ms = pervios_delay_time_ms * 3
    }

    setDelayTime(today.toISOString().slice(0, 19))
    // // send data to Firebase database
    axios
      .put('/knowledges/' + item.id + '.json', {
        ...item,
        delay_time: today.toISOString().slice(0, 19),
        delay_time_ms: delay_time_ms,
        rate: cardCategory,
      })
      .then(response => {})
    // console.log('Hello')

    if (Math.floor(items[currentIndex].delay_time_ms) > 1) {
      delayTimeTextHard = Date.daysBetween(
        items[currentIndex].delay_time_ms / 2
      )
    } else {
      delayTimeTextHard = '1 day'
    }
    delayTimeTextGood = Date.daysBetween(items[currentIndex].delay_time_ms * 2)
    delayTimeTextEasy = Date.daysBetween(items[currentIndex].delay_time_ms * 3)
    setDelayTimeButtonHardText(delayTimeTextHard)
    setDelayTimeButtonGoodText(delayTimeTextGood)
    setDelayTimeButtonEasyText(delayTimeTextEasy)
  }

  if (items.length === 0) {
    return (
      <Paper className={classes.paper}>
        <p>There is not value.</p>
      </Paper>
    )
  } else if (currentIndex >= items.length) {
    return (
      <Paper className={classes.paper}>
        <p>Card-iig ajillaj duuslaa. Bayarlalaa!</p>
      </Paper>
    )
  }

  return (
    <Paper className={classes.paper}>
      <div>
        <h3>{items[currentIndex].title}</h3>

        {!answerDisplay && (
          <Button
            variant="outlined"
            color="primary"
            onClick={() => showAnswer(currentIndex)}>
            Show answer
          </Button>
        )}

        {answerDisplay && (
          <div>
            <div id="body">{items[currentIndex].body}</div>
            <RateButtonComponent
              item={items[currentIndex]}
              cardCategory={items[currentIndex].rate}
              severity={items[currentIndex].severity}
              delayTimeButtonHardText={delayTimeButtonHardText}
              delayTimeButtonGoodText={delayTimeButtonGoodText}
              delayTimeButtonEasyText={delayTimeButtonEasyText}
              onClick={next}
            />
          </div>
        )}
      </div>
    </Paper>
  )
}
