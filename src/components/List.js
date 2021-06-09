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
  // updateRow,
} from '../redux/actions/knowledgeActions'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import AddIcon from '@material-ui/icons/Add'
import VisibilityIcon from '@material-ui/icons/Visibility'
import Modal from './Modal'
import Grid from '@material-ui/core/Grid'

// import InputForm from '../../components/form'

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
  paper: {
    padding: '15px',
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  AddIcon: {
    color: '#3f51b5',
  },
})

const List = () => {
  const dispatch = useDispatch()
  const classes = useStyles()
  const knowledges = useSelector(state => state.list)
  const [items, setItems] = useState(knowledges)
  const [filter, setFilter] = useState('All')
  const [buttonText, setButtonText] = useState('')

  // const [buttonText, setButtonText] = useState('Update')
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
    // console.log('Hello')
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
  const createData = (id, date, title, body, topic) => {
    return { id, date, title, body, topic }
  }

  // console.log('Items:')
  // console.log(items)
  const rows = items.filter(FILTER_MAP[filter])

  // console.log('ROW')
  // console.log(rows)

  const handleChange = evt => {
    var filter = evt.target.value
    setFilter(filter)
  }
  const deleteItem = id => {
    //Delete from DB
    // console.log('DeleteSItem' + id)
    axios.delete('/knowledges/' + id + '.json').then(response => {
      // console.log('Ustgalaa')
    })
    setItems(items.filter(item => item.id !== id))
    //Redux-aas ustgah
    dispatch(deleteRow(id))
  }

  const [open, setOpen] = useState(false)
  const [value, setValue] = useState(null)

  const openItem = knowledge => {
    if (knowledge !== null) {
      setButtonText('Update')
    } else {
      setButtonText('Add')
    }
    console.log('Button:' + buttonText)

    setOpen(true)
    setValue(knowledge)
  }
  const seeItem = knowledge => {
    setValue(knowledge)
  }

  const handleCancel = () => {
    setOpen(false)
  }

  return (
    <div>
      <a onClick={() => openItem(null)}>
        <AddIcon className={classes.AddIcon} fontSize="large" />
      </a>
      &nbsp; &nbsp;
      <FormControl component="fieldset">
        <RadioGroup
          row
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
      <Grid container spacing={3}>
        <Grid item xs={6}>
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
                {rows.map(knowledge => (
                  <TableRow key={knowledge.id}>
                    <TableCell component="th" scope="row">
                      {knowledge.date}
                    </TableCell>
                    <TableCell>{knowledge.title}</TableCell>
                    <TableCell>{knowledge.topic}</TableCell>
                    <TableCell align="right">
                      <a onClick={() => seeItem(knowledge)}>
                        <VisibilityIcon />
                      </a>
                      <a onClick={() => openItem(knowledge)}>
                        <EditIcon />
                      </a>
                      <a onClick={() => deleteItem(knowledge.id)}>
                        <DeleteIcon />
                      </a>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid item xs={6}>
          <Paper className={classes.paper}>
            {value !== null ? (
              <div>
                <h3>{value.date}</h3>
                <h3>{value.title}</h3>
                <p>{value.body}</p>
                <p>{value.rate}</p>
              </div>
            ) : (
              ''
            )}
          </Paper>
        </Grid>
      </Grid>
      <Modal
        open={open}
        handleCancel={handleCancel}
        value={value}
        buttonText={buttonText}
      />
    </div>
  )
}
export default List
