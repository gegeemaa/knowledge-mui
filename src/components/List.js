import { React, useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import axios from '../axios-knowledges'
import { makeStyles } from '@material-ui/core/styles'
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from '@material-ui/core'
import {
  enterMultiple,
  deleteRow,
  updateRow,
} from '../redux/actions/knowledgeActions'
import EditIcon from '@material-ui/icons/Edit'
import AddIcon from '@material-ui/icons/Add'
import Modal from './Modal'

// import InputForm from '../../components/form'

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
})

const List = () => {
  const dispatch = useDispatch()
  const classes = useStyles()
  const knowledges = useSelector(state => state.list)
  const [items, setItems] = useState(knowledges)
  const [filter, setFilter] = useState('All')
  // const [buttonText, setButtonText] = useState('Update')
  const buttonText = 'Update'
  let data = []
  var period = 1
  const FILTER_MAP = {
    All: () => true,
    0: x => isToday(new Date(x.date)),
    1: x => daysDiff(1, new Date(x.date)),
    3: x => daysDiff(3, new Date(x.date)),
    7: x => daysDiff(7, new Date(x.date)),
    30: x => daysDiff(30, new Date(x.date)),
  }

  useEffect(() => {
    console.log('Hello')
    // gants udaa, ehnii
    axios
      .get('/knowledges.json')
      .then(response => {
        //Object-iig array-ruu horvuuleh
        const arr = Object.entries(response.data)
        // console.log(arr)
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

  const isToday = date => {
    const today = new Date()
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    )
  }

  const daysDiff = (period, date) => {
    const today = new Date()
    var diffDays = parseInt((today - date) / (1000 * 60 * 60 * 24), 10)
    // console.log("diffDays" + diffDays);
    return diffDays === period
  }
  const createData = (id, date, title, topic) => {
    return { id, date, title, topic }
  }
  const rows = items
    .filter(FILTER_MAP[filter])
    .map((knowledge, i) =>
      createData(knowledge.id, knowledge.date, knowledge.title, knowledge.topic)
    )

  const handleChange = evt => {
    var filter = evt.target.value
    setFilter(filter)
  }
  //   const deleteItem = id => {
  //     //Delete from DB
  //     console.log('DeleteItem' + id)
  //     axios.delete('/knowledges/' + id + '.json').then(response => {
  //       console.log('Ustgalaa')
  //     })
  //     setItems(items.filter(item => item.id !== id))
  //     //Redux-aas ustgah
  //     dispatch(deleteRow(id))
  //   }

  const [open, setOpen] = useState(false)
  const [value, setValue] = useState(null)

  const showModal = id => {
    setOpen(true)
    const found = items.find(item => item.id === id)
    const val = {
      id,
      date: found.date,
      title: found.title,
      body: found.body,
      topic: found.topic,
    }
    setValue(val)
  }

  const handleCancel = () => {
    setOpen(false)
  }

  const onUpdate = newValue => {
    // console.log('Updated:', newValue)
    if (newValue.date !== '' && newValue.title !== '') {
      const knowledge = {
        id: newValue.id,
        date: newValue.date.toISOString().slice(0, 10),
        title: newValue.title,
        body: newValue.body,
        topic: newValue.topic,
      }
      dispatch(updateRow(knowledge))
      // // send data to Firebase database
      axios
        .put('/knowledges/' + newValue.id + '.json', knowledge)
        .then(response => {
          // redux-ruu yavuulj bn
          // console.log(response)
        })
    }
    setOpen(false)
  }
  return (
    <div>
      <a onClick={() => showModal('-1')}>
        {' '}
        <AddIcon />{' '}
      </a>
      <FormControl component="fieldset">
        <RadioGroup
          aria-label="All"
          name="gender1"
          value={filter}
          onChange={handleChange}>
          <FormControlLabel value="All" control={<Radio />} label="All" />
          <FormControlLabel value="0" control={<Radio />} label="Today" />
          <FormControlLabel value="1" control={<Radio />} label="1 day" />
          <FormControlLabel value="3" control={<Radio />} label="3 days" />
          <FormControlLabel value="7" control={<Radio />} label="7 days" />
          <FormControlLabel value="30" control={<Radio />} label="30 days" />
        </RadioGroup>
      </FormControl>

      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Topic</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.date}
                </TableCell>
                <TableCell>{row.title}</TableCell>
                <TableCell>{row.topic}</TableCell>
                <TableCell align="right">
                  <a onClick={() => showModal(row.id)}>
                    <EditIcon />
                  </a>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal
        open={open}
        handleCancel={handleCancel}
        value={value}
        onUpdate={onUpdate}
        buttonText={buttonText}
      />
    </div>
  )
}
export default List
