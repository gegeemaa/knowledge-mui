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
import { daysBetween } from '../functions/functions'

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
  fontBold: {
    fontWeight: '900',
  },
})

const StudyNow = () => {
  const dispatch = useDispatch()
  const classes = useStyles()
  const knowledges = useSelector(state => state.list)
  const [items, setItems] = useState(knowledges)
  const [answerDisplay, setAnswerDisplay] = useState(false)
  const [currentIndex, setIndex] = useState(0)
  const [answer, setAnswer] = useState('')
  const [delayTime, setDelayTime] = useState('')
  const [delayTimeButtonHardText, setDelayTimeButtonHardText] = useState('')
  const [delayTimeButtonGoodText, setDelayTimeButtonGoodText] = useState('')
  const [delayTimeButtonEasyText, setDelayTimeButtonEasyText] = useState('')

  let delayTimeTextHard
  let delayTimeTextGood
  let delayTimeTextEasy

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
        //Redux-ruu firebase DB-ees avsan ogogdloo nemj bna.
        dispatch(enterMultiple(data))
        if (currentIndex === '0' && data[currentIndex].rate === '2') {
          if (Math.floor(data[currentIndex].delay_time_ms) > 1) {
            setDelayTimeButtonHardText(
              daysBetween(data[currentIndex].delay_time_ms / 2)
            )
          } else {
            setDelayTimeButtonHardText('1 day')
          }

          console.log(delayTimeButtonHardText)
          console.log(data)
          console.log('SONIN yum be?')
          setDelayTimeButtonGoodText(
            daysBetween(data[currentIndex].delay_time_ms * 2)
          )
          setDelayTimeButtonEasyText(
            daysBetween(data[currentIndex].delay_time_ms * 3)
          )
        }
      })
      .catch(error => {
        // console.log(error)
      })

    console.log('StudyNow-aas hevlej bna.')
  }, [])

  useEffect(() => {
    // Should not ever set state during rendering, so do this in useEffect instead.
    setItems(knowledges)
  }, [knowledges])

  const showAnswer = argument => {
    setAnswerDisplay(true)
    // console.log('Lenth' + items.length)
  }

  const next = (buttonName, item, cardCategory) => {
    let pervios_delay_time_ms = items[currentIndex].delay_time_ms
    setIndex(currentIndex + 1)
    setAnswerDisplay(false)
    // console.log(buttonName, cardCategory)

    let delay_time_ms
    //CardCategory is new
    if (buttonName === 'again' && cardCategory === '0') {
      today.setMinutes(today.getMinutes() + 1)
      delay_time_ms = 1 * 60 * 1000
    } else if (buttonName === 'good' && cardCategory === '0') {
      today.setMinutes(today.getMinutes() + 10)
      delay_time_ms = 10 * 60 * 1000
    } else if (buttonName === 'easy' && cardCategory === '0') {
      today.setDate(today.getDate() + 4)
      delay_time_ms = 4 * 60 * 60 * 24 * 1000
      cardCategory = '1'
    }
    //CardCategory is learning
    else if (buttonName === 'again' && cardCategory === '1') {
      today.setMinutes(today.getMinutes() + 1)
      delay_time_ms = 1 * 60 * 1000
    } else if (buttonName === 'good' && cardCategory === '1') {
      today.setDate(today.getDate() + 1)
      delay_time_ms = 1 * 60 * 60 * 24 * 1000
      cardCategory = '2'
    } else if (buttonName === 'easy' && cardCategory === '1') {
      today.setDate(today.getDate() + 4)
      delay_time_ms = 4 * 60 * 60 * 24 * 1000
      cardCategory = '2'
    }
    //CardCategory is review
    else if (buttonName === 'again' && cardCategory === '2') {
      today.setMinutes(today.getMinutes() + 10)
      delay_time_ms = 10 * 60 * 1000
    } else if (buttonName === 'hard' && cardCategory === '2') {
      // Eniig daraa ni zasna
      today.setDate(today.getDate() + 2)
      delay_time_ms = 2 * 60 * 60 * 24 * 1000
    } else if (buttonName === 'good' && cardCategory === '2') {
      delay_time_ms = pervios_delay_time_ms * 2
    } else if (buttonName === 'easy' && cardCategory === '2') {
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

    // Daraagiin cardnii button deerh hugatsaanuudiin tootsoololuudiig gargaj irne. Hamgiin suuliin kart bol shaardlagagui.
    if (currentIndex < items.length && items[currentIndex].rate === '2') {
      if (Math.floor(items[currentIndex].delay_time_ms) > 1) {
        delayTimeTextHard = daysBetween(items[currentIndex].delay_time_ms / 2)
      } else {
        delayTimeTextHard = '1 day'
      }
      delayTimeTextGood = daysBetween(items[currentIndex].delay_time_ms * 2)
      delayTimeTextEasy = daysBetween(items[currentIndex].delay_time_ms * 3)
      setDelayTimeButtonHardText(delayTimeTextHard)
      setDelayTimeButtonGoodText(delayTimeTextGood)
      setDelayTimeButtonEasyText(delayTimeTextEasy)
    }
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
        <p className={classes.fontBold}>
          Card-iig ajillaj duuslaa. Bayarlalaa!
        </p>
      </Paper>
    )
  } else {
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
}
export default StudyNow
