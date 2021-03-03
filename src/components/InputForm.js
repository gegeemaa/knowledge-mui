import React, { useRef, useState } from 'react'
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

const InputForm = ({ submit, buttonText, value }) => {
  // if (Object.keys(value).length === 0) {
  //   const [date, setDate] = useState(new Date())
  //   const [title, setTitle] = useState('')
  //   const [body, setBody] = useState('')
  //   const [topic, setTopic] = useState('')
  // } else {
  const id = value.id
  const [date, setDate] = useState(value.date)
  const [title, setTitle] = useState(value.title)
  const [body, setBody] = useState(value.body)
  const [topic, setTopic] = useState(value.topic)
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
    setDate(date)
  }
  const onFinish = values => {
    // onUpdate function-iin parameter-eer form-iin valuenuudaas gadna id-g nemj yavuulj bna.
    submit(values)
  }

  return (
    <form noValidate autoComplete="off">
      <FormControl>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            disableToolbar
            variant="inline"
            format="yyyy-MM-dd"
            margin="normal"
            id="date"
            name="Date"
            label="Date"
            value={date}
            onChange={changeDate}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
        </MuiPickersUtilsProvider>
      </FormControl>
      <FormControl>
        <TextField
          label="Title"
          id="title"
          name="Title"
          defaultValue={title}
          onChange={change}
          variant="outlined"
        />
      </FormControl>
      <FormControl>
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
      <FormControl>
        <Select
          name="Topic"
          value={topic}
          onChange={change}
          displayEmpty
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

      <Button
        variant="contained"
        color="primary"
        onClick={() => onFinish({ id, date, title, body, topic })}>
        {buttonText}
      </Button>
    </form>
  )
}
export default InputForm
