import { React, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import clsx from 'clsx'
import Editor from 'rich-markdown-editor'
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
  TablePagination,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
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
import Alert from '@material-ui/lab/Alert'
import { TrendingUpOutlined } from '@material-ui/icons'
// import getKnowledges from '../thunk/getKnowledges'

// import InputForm from '../../components/form'

const useStyles = makeStyles({
  table: {
    minWidth: 400,
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
  icon: {
    fontSize: '20px',
    display: 'inline',
  },
  tableTitle: {
    fontWeight: 'bold',
  },
  radio: {
    display: 'inline',
  },
  label: {
    padding: '.2em .6em .3em',
    color: 'white',
    fontWeight: 'bold',
    borderRadius: '15px',
    fontSize: '85%',
    // lineHeight: '1',
  },
  // card category style
  info: { backgroundColor: '#5bc0de' },
  warning: { backgroundColor: '#f0ad4e' },

  success: { backgroundColor: '#04AA6D' },
})

const List = () => {
  const dispatch = useDispatch()
  const classes = useStyles()
  const knowledges = useSelector(state => state.list)
  const [items, setItems] = useState(knowledges)
  const [filter, setFilter] = useState('All')
  const [buttonText, setButtonText] = useState('')

  const [cartCategoryText, setCartCategoryText] = useState('')
  const [labelWarning, setLabelWarning] = useState(false)
  const [labelInfo, setLabelInfo] = useState(false)
  const [labelSuccess, setLabelSuccess] = useState(false)

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
          // delay_time: new Date(el[1].delay_time),
          delay_time: el[1].delay_time,
        }))

        console.log('LISTees hevlej bna')
        // string-iig date-ryy horvuuleed sortloj bna.
        const sortedData = data
          .slice()
          .sort((a, b) => new Date(a.delay_time) - new Date(b.delay_time))
        // sortedData
        //Redux-ruu firebase DB-ees avsan ogogdloo nemj bna.
        dispatch(enterMultiple(sortedData))
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
  const [severity, setSeverity] = useState('')
  const [severityMessege, setSeverityMessege] = useState('')
  // let severity = ''

  const openItem = knowledge => {
    if (knowledge !== null) {
      setButtonText('Update')
    } else {
      setButtonText('Add')
    }
    // console.log('Button:' + buttonText)

    setOpen(true)
    setValue(knowledge)
  }
  const seeItem = knowledge => {
    setValue(knowledge)
    if (knowledge.rate == 0) {
      setCartCategoryText('New card')
      setLabelInfo(true)
      setLabelWarning(false)
      setLabelSuccess(false)
    } else if (knowledge.rate == 1) {
      setCartCategoryText('Learning card')
      setLabelWarning(true)
      setLabelInfo(false)
      setLabelSuccess(false)
    } else {
      setCartCategoryText('Reviewing card')
      setLabelSuccess(true)
      setLabelInfo(false)
      setLabelWarning(false)
    }
  }

  const handleCancel = () => {
    setOpen(false)
  }

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        onClick={() => openItem(null)}>
        <AddIcon fontSize="small" /> Add note
      </Button>
      &nbsp; &nbsp;
      <FormControl component="fieldset">
        <FormLabel component="legend" className={classes.radio}>
          Filter by created date:
        </FormLabel>
        <RadioGroup
          row
          aria-label="All"
          name="gender1"
          value={filter}
          onChange={handleChange}
          className={classes.radio}>
          <FormControlLabel value="All" control={<Radio />} label="All" />
          <FormControlLabel value="0" control={<Radio />} label="Today" />
          <FormControlLabel value="1" control={<Radio />} label="1 day" />
          <FormControlLabel value="3" control={<Radio />} label="3 days" />
          <FormControlLabel value="7" control={<Radio />} label="7 days" />
          <FormControlLabel value="30" control={<Radio />} label="30 days" />
        </RadioGroup>
      </FormControl>
      <br />
      <Grid container spacing={3}>
        <Grid item xs={5}>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell className={classes.tableTitle}>
                    Study date
                  </TableCell>
                  <TableCell className={classes.tableTitle}>Title</TableCell>
                  <TableCell className={classes.tableTitle}>Topic</TableCell>
                  {/* <TableCell>Created date</TableCell> */}
                  <TableCell className={classes.tableTitle} align="right">
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map(knowledge => (
                  <TableRow key={knowledge.id}>
                    <TableCell>{knowledge.delay_time.slice(0, 10)}</TableCell>
                    <TableCell size="small">{knowledge.title}</TableCell>
                    <TableCell>{knowledge.topic}</TableCell>

                    {/* <TableCell component="th" scope="row">
                      {knowledge.date}
                    </TableCell> */}
                    <TableCell align="right">
                      <a onClick={() => seeItem(knowledge)}>
                        <VisibilityIcon
                          className={classes.icon}
                          style={{ color: '#1976d2' }}
                        />
                      </a>{' '}
                      &nbsp;
                      <a onClick={() => openItem(knowledge)}>
                        <EditIcon
                          className={classes.icon}
                          style={{ color: '#4caf50' }}
                        />
                      </a>
                      &nbsp;
                      <a onClick={() => deleteItem(knowledge.id)}>
                        <DeleteIcon
                          className={classes.icon}
                          style={{ color: 'rgb(220, 0, 78)' }}
                        />
                      </a>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
        <Grid item xs={7}>
          <Paper className={classes.paper}>
            {value !== null ? (
              <div>
                <h3>Study date: {value.delay_time.slice(0, 10)}</h3>
                <h3>Topic: {value.topic} </h3>
                <h3>{value.title}</h3>
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

                <br />
                <Editor value={value.body} readOnly={true} />
              </div>
            ) : (
              <Alert severity="info">
                Select related note from the list by clicking on "See" button!
              </Alert>
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
