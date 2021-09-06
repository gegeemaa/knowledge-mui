import { React, useState, useEffect } from 'react'
import clsx from 'clsx'
import { useSelector, useDispatch } from 'react-redux'
import axios from '../axios-knowledges'
import { Paper, Button } from '@material-ui/core'
import { enterMultiple } from '../redux/actions/knowledgeActions'
import NewCardButtons from './category/NewCardButtons'
import LearningCardButtons from './category/LearningCardButtons'
import useStyles from '../styles/styles'
import Editor from 'rich-markdown-editor'

const StudyNow = () => {
  const dispatch = useDispatch()
  const classes = useStyles()
  const knowledges = useSelector(state => state.list)
  const [items, setItems] = useState(knowledges)
  const [answerDisplay, setAnswerDisplay] = useState(false)
  const [currentIndex, setIndex] = useState(0)
  const [answer, setAnswer] = useState('')

  let today = new Date()

  let data = []

  const [cartCategoryText, setCartCategoryText] = useState('')
  const [labelWarning, setLabelWarning] = useState(false)
  const [labelInfo, setLabelInfo] = useState(false)
  const [labelSuccess, setLabelSuccess] = useState(false)
  const [key, setKey] = useState(0)

  useEffect(() => {
    // gants udaa, ehnii
    axios
      .get('/knowledges.json')
      .then(response => {
        //Object-iig array-ruu horvuuleh
        const arr = Object.entries(response.data)
        // console.log(arr)
        // map() ni array-aas shine array uusgeh function yum.
        data = arr
          .map(el => ({
            id: el[0],
            date: el[1].date,
            title: el[1].title,
            body: el[1].body,
            topic: el[1].topic,
            rate: el[1].rate,
            severity: el[1].severity,
            delay_time: el[1].delay_time,
          }))
          .filter(x => new Date() >= new Date(x.delay_time))
        // Date-eer ni sortolj baina.
        data.sort(function (a, b) {
          var dateA = new Date(a.delay_time),
            dateB = new Date(b.delay_time)
          return dateA - dateB
        })
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
    if (items[currentIndex].rate === '0') {
      setCartCategoryText('New card')
      setLabelInfo(true)
      setLabelWarning(false)
      setLabelSuccess(false)
    } else {
      setCartCategoryText('Learning card')
      setLabelWarning(true)
      setLabelInfo(false)
      setLabelSuccess(false)
    }
    // Editor-oo reset hiihiin tuld
    setKey(v => v + 1)
  }

  const next = (buttonName, cardCategory) => {
    setIndex(currentIndex + 1)
    setAnswerDisplay(false)

    let changedDate
    //CardCategory is new
    if (buttonName === 'again' && cardCategory === '0') {
      changedDate = today.getMinutes() + 1
      today.setMinutes(changedDate)
    } else if (buttonName === 'good' && cardCategory === '0') {
      changedDate = today.getMinutes() + 10
      today.setMinutes(changedDate)
    } else if (buttonName === 'easy' && cardCategory === '0') {
      changedDate = today.getDate() + 4
      today.setDate(changedDate)
      cardCategory = '1'
    }
    //CardCategory is learning
    else if (buttonName === 'again' && cardCategory === '1') {
      changedDate = today.getMinutes() + 1
      today.setMinutes(changedDate)
    } else if (buttonName === 'good' && cardCategory === '1') {
      changedDate = today.getDate() + 1
      today.setDate(changedDate)
    } else if (buttonName === 'easy' && cardCategory === '1') {
      changedDate = today.getDate() + 4
      today.setDate(changedDate)
    }

    // // send data to Firebase database
    axios
      .put('/knowledges/' + items[currentIndex].id + '.json', {
        ...items[currentIndex],
        delay_time: today.toISOString().slice(0, 19),
        rate: cardCategory,
      })
      .then(response => {})
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
        <p className={classes.fontBold}>The note is finished. Thank you!</p>
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
              {items[currentIndex].rate === '0' && (
                <NewCardButtons
                  cardCategory={items[currentIndex].rate}
                  onClick={next}
                />
              )}
              {items[currentIndex].rate === '1' && (
                <LearningCardButtons
                  cardCategory={items[currentIndex].rate}
                  onClick={next}
                />
              )}
              <br />
              <p>
                <span
                  className={clsx(
                    classes.label,
                    labelWarning && classes.warning,
                    labelInfo && classes.info,
                    labelSuccess && classes.success
                  )}>
                  {cartCategoryText}
                </span>
              </p>

              <Editor
                // id="body"
                key={key}
                defaultValue={items[currentIndex].body}
                readOnly={true}
                className={classes.editor}
              />
            </div>
          )}
        </div>
      </Paper>
    )
  }
}
export default StudyNow
