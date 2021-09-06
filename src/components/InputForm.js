import React, { useRef, useState } from 'react'
import clsx from 'clsx'
import { useDispatch } from 'react-redux'
import Editor, { theme } from 'rich-markdown-editor'
import styled from 'styled-components'
import {
  TextField,
  Menu,
  MenuItem,
  makeStyles,
  InputLabel,
  Select,
  Button,
  FormControl,
} from '@material-ui/core'
import 'date-fns'
import DateFnsUtils from '@date-io/date-fns'
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers'
import { updateFunction } from './updateFunction'
import { addFunction } from './addFunction'

const useStyles = makeStyles(theme => ({
  submitButton: {
    flex: '0 0 auto',
    display: 'flex',
    padding: '8px',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  formControl: {
    minWidth: 120,
    margin: theme.spacing(1),
  },
  textEditor: {
    minHeight: 200,
  },
}))

const InputForm = ({ buttonText, value, handleCancel }) => {
  console.log('value' + value)
  const id = value !== null ? value.id : null
  const today = new Date()
  const todayString = today.toISOString().slice(0, 10)
  const [key, setKey] = useState(0)
  const [date, setDate] = useState(value !== null ? value.date : todayString)
  const [title, setTitle] = useState(value !== null ? value.title : '')
  const [body, setBody] = useState(value !== null ? value.body : '')
  const [topic, setTopic] = useState(value !== null ? value.topic : '')
  const [rate, setRate] = useState(value !== null ? value.rate : '0')
  let delay_time = value !== null ? value.delay_time : ''
  let user_id = value !== null ? value.user_id : ''

  const dispatch = useDispatch()

  const classes = useStyles()

  const change = evt => {
    const name = evt.target.name
    const newValue = evt.target.value
    if (name === 'Title') {
      setTitle(newValue)
    } else if (name == 'Topic') {
      setTopic(newValue)
    } else {
      setRate(newValue)
    }
  }
  const changeDate = date => {
    setDate(date !== null ? date.toISOString().slice(0, 10) : null)
  }
  const onFinish = () => {
    // updateFunction function-iin parameter-eer form-iin valuenuudaas gadna id-g nemj yavuulj bna.
    if (id !== null) {
      updateFunction(
        id,
        date,
        title,
        body,
        topic,
        rate,
        delay_time,
        user_id,
        dispatch
      )
    } else {
      addFunction(id, date, title, body, topic, rate, dispatch)
      setTitle('')
      setBody('')
      setTopic('')
      setKey(v => v + 1)
    }
    if (handleCancel !== 'inVisible') {
      handleCancel()
    }
  }

  return (
    <form noValidate autoComplete="off">
      <FormControl className={classes.formControl}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format="yyyy-MM-dd"
            id="date"
            name="date"
            label="Created date"
            value={date}
            onChange={changeDate}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
            autoOk
            emptyLabel="Not accept empty date!"
          />
        </MuiPickersUtilsProvider>
      </FormControl>
      <FormControl fullWidth className={classes.formControl}>
        <TextField
          label="Title"
          id="title"
          name="Title"
          value={title}
          onChange={change}
          variant="outlined"
        />
      </FormControl>
      <FormControl
        fullWidth
        variant="outlined"
        className={clsx(classes.formControl, classes.textEditor)}>
        <Editor
          key={key}
          readOnly={false}
          placeholder="
          Here is Mark Down Editor. Write BODY here..."
          onClickLink={() => {
            console.log('click')
          }}
          onChange={value => {
            setBody(value())
          }}
          defaultValue={body}
          // theme={{
          //   light: theme.light,
          // }}
        />
      </FormControl>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="demo-simple-select-filled-label">Topic</InputLabel>
        <Select name="Topic" value={topic} onChange={change} label="Topic">
          <MenuItem value="Coding">Coding</MenuItem>
          <MenuItem value="React">React</MenuItem>
          <MenuItem value="Swedish">Swedish</MenuItem>
        </Select>
      </FormControl>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="demo-simple-select-filled-label">Rate</InputLabel>
        <Select name="Rate" value={rate} onChange={change} label="Rate">
          <MenuItem value="0" disabled>
            New
          </MenuItem>
          <MenuItem value="1" disabled>
            Learning
          </MenuItem>
          {/* {MenuItemEgen} */}
        </Select>
      </FormControl>
      <div className={classes.submitButton}>
        <Button onClick={onFinish} color="primary">
          {buttonText}
        </Button>
        {handleCancel !== 'inVisible' && (
          <Button onClick={handleCancel} color="primary">
            Cancel
          </Button>
        )}
      </div>
    </form>
  )
}
export default InputForm
