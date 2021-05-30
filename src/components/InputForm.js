import React, { useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
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

const useStyles = makeStyles({
  // formInput: {
  //   width: 1200,
  // },
  // formInput: {
  //   '& > *': {
  //     margin: 10,
  //   },
  // },
  // formControl: {
  //   display: 'block',
  // },
  submitButton: {
    flex: '0 0 auto',
    display: 'flex',
    padding: '8px',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
})

const InputForm = ({ buttonText, value, handleCancel }) => {
  // if (Object.keys(value).length === 0) {
  //   const [date, setDate] = useState(new Date())
  //   const [title, setTitle] = useState('')
  //   const [body, setBody] = useState('')
  //   const [topic, setTopic] = useState('')
  // } else {
  console.log('value' + value)
  const id = value !== null ? value.id : null
  const today = new Date()
  const todayString = today.toISOString().slice(0, 10)
  const [date, setDate] = useState(value !== null ? value.date : todayString)
  const [title, setTitle] = useState(value !== null ? value.title : '')
  const [body, setBody] = useState(value !== null ? value.body : '')
  const [topic, setTopic] = useState(value !== null ? value.topic : '')
  const dispatch = useDispatch()

  const classes = useStyles()

  // }

  const change = evt => {
    const name = evt.target.name
    const newValue = evt.target.value
    if (name === 'Title') {
      setTitle(newValue)
    } else if (name === 'Body') {
      setBody(newValue)
    } else {
      setTopic(newValue)
    }
  }
  const changeDate = date => {
    setDate(date !== null ? date.toISOString().slice(0, 10) : null)
  }
  const onFinish = () => {
    // updateFunction function-iin parameter-eer form-iin valuenuudaas gadna id-g nemj yavuulj bna.
    if (id !== null) {
      updateFunction(id, date, title, body, topic, dispatch)
    } else {
      addFunction(id, date, title, body, topic, dispatch)
    }
    handleCancel()
  }

  return (
    <form noValidate autoComplete="off">
      <FormControl>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format="yyyy-MM-dd"
            margin="dense"
            id="date"
            name="Date"
            label="Date"
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
      <FormControl fullWidth>
        <TextField
          label="Title"
          id="title"
          name="Title"
          defaultValue={title}
          onChange={change}
          variant="outlined"
          margin="dense"
        />
      </FormControl>
      <FormControl fullWidth>
        <TextField
          id="body"
          name="Body"
          label="Body"
          onChange={change}
          multiline
          rows={4}
          defaultValue={body}
          variant="outlined"
          margin="dense"
        />
      </FormControl>
      <FormControl>
        <Select
          name="Topic"
          value={topic}
          onChange={change}
          displayEmpty
          margin="dense"
          // className={classes.selectEmpty}
          inputProps={{ 'aria-label': 'Without label' }}>
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value="React">React</MenuItem>
          <MenuItem value="Exercise">Exercise</MenuItem>
          <MenuItem value="Meditation">Meditation</MenuItem>
        </Select>
      </FormControl>

      {/* <Button color="primary" onClick={onFinish} margin="dense">
        {buttonText}
      </Button> */}
      <div className={classes.submitButton}>
        <Button onClick={onFinish} color="primary">
          {buttonText}
        </Button>
        <Button onClick={handleCancel} color="primary">
          Cancel
        </Button>
      </div>
    </form>
  )
}
export default InputForm
