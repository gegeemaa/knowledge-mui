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
}))

const InputForm = ({ buttonText, value, handleCancel }) => {
  console.log('value' + value)
  const id = value !== null ? value.id : null
  const today = new Date()
  const todayString = today.toISOString().slice(0, 10)
  const [date, setDate] = useState(value !== null ? value.date : todayString)
  const [title, setTitle] = useState(value !== null ? value.title : '')
  const [body, setBody] = useState(value !== null ? value.body : '')
  const [topic, setTopic] = useState(value !== null ? value.topic : '')
  const [rate, setRate] = useState(value !== null ? value.rate : 0)

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
      updateFunction(id, date, title, body, topic, rate, dispatch)
    } else {
      addFunction(id, date, title, body, topic, rate, dispatch)
    }
    handleCancel()
  }
  // const MenuItemEgen = () => {
  //   if (value == null) {
  //     return (
  //       <div>
  //         <MenuItem value="0">New</MenuItem>
  //         <MenuItem value="1" disabled>
  //           Good
  //         </MenuItem>
  //         <MenuItem value="2" disabled>
  //           Bad
  //         </MenuItem>
  //       </div>
  //     )
  //   } else {
  //     return (
  //       <div>
  //         <MenuItem value="0">New</MenuItem>
  //         <MenuItem value="1">Good</MenuItem>
  //         <MenuItem value="2">Bad</MenuItem>
  //       </div>
  //     )
  //   }
  // }

  return (
    <form noValidate autoComplete="off">
      <FormControl className={classes.formControl}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format="yyyy-MM-dd"
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
      <FormControl fullWidth className={classes.formControl}>
        <TextField
          label="Title"
          id="title"
          name="Title"
          defaultValue={title}
          onChange={change}
          variant="outlined"
        />
      </FormControl>
      <FormControl fullWidth className={classes.formControl}>
        <TextField
          id="body"
          name="Body"
          label="Body"
          onChange={change}
          multiline
          rows={4}
          defaultValue={body}
          variant="outlined"
        />
      </FormControl>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="demo-simple-select-filled-label">Topic</InputLabel>
        <Select name="Topic" value={topic} onChange={change} label="Topic">
          <MenuItem value="React">React</MenuItem>
          <MenuItem value="Exercise">Exercise</MenuItem>
          <MenuItem value="Meditation">Meditation</MenuItem>
        </Select>
      </FormControl>
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="demo-simple-select-filled-label">Rate</InputLabel>
        <Select name="Rate" value={rate} onChange={change} label="Rate">
          <MenuItem value="0">New</MenuItem>
          <MenuItem value="1" disabled={value == null}>
            Good
          </MenuItem>
          <MenuItem value="2" disabled={value == null}>
            Bad
          </MenuItem>
          {/* {MenuItemEgen} */}
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
