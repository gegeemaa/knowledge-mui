import { React, useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import axios from '../axios-knowledges'
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from '@material-ui/core'
import { DataGrid } from '@material-ui/data-grid'
import {
  enterMultiple,
  deleteRow,
  updateRow,
} from '../redux/actions/knowledgeActions'
import EditIcon from '@material-ui/icons/Edit'
// import InputForm from '../../components/form'

const List = () => {
  const dispatch = useDispatch()

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
  const rows = items.filter(FILTER_MAP[filter]).map((knowledge, i) => ({
    id: knowledge.id,
    date: knowledge.date,
    title: knowledge.title,
    topic: knowledge.topic,
    // action: <EditIcon />,
  }))

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
  //   const [isModalVisible, setIsModalVisible] = useState(false)
  //   const [value, setValue] = useState(null)

  //   const showModal = id => {
  //     setIsModalVisible(true)
  //     const found = items.find(item => item.id === id)
  //     const val = {
  //       id,
  //       date: moment(new Date(found.date), 'YYYY-MM-DD'),
  //       title: found.title,
  //       body: found.body,
  //       topic: found.topic,
  //     }
  //     setValue(val)
  //   }

  //   const handleCancel = () => {
  //     setIsModalVisible(false)
  //   }

  //   const onUpdate = newValue => {
  //     console.log('Updated:', newValue)
  //     if (newValue.date !== '' && newValue.title !== '') {
  //       const knowledge = {
  //         id: newValue.id,
  //         date: newValue.date.format('YYYY-MM-DD'),
  //         title: newValue.title,
  //         body: newValue.body,
  //         topic: newValue.topic,
  //       }
  //       dispatch(updateRow(knowledge))
  //       // // send data to Firebase database
  //       axios
  //         .put('/knowledges/' + newValue.id + '.json', knowledge)
  //         .then(response => {
  //           // redux-ruu yavuulj bn
  //           console.log(response)
  //         })
  //     }
  //     setIsModalVisible(false)
  //   }
  const columns = [
    { field: 'date', headerName: 'Date', width: 130 },
    { field: 'title', headerName: 'Title', width: 130 },
    { field: 'topic', headerName: 'Topic', width: 130 },
    { field: 'action', headerName: 'Action', width: 90 },
  ]

  return (
    <div>
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

      {/* <Table dataSource={rows}>
        <Column title="Date" dataIndex="date" key="date" />
        <Column title="Title" dataIndex="title" key="title" />
        <Column title="Topic" dataIndex="topic" key="topic" />
        <Column
          title="Action"
          key="action"
          render={(text, record) => (
            <Space size="middle">
              <a onClick={() => showModal(text.key)}>
                <EditOutlined />
              </a>
              <a onClick={() => deleteItem(text.key)}>
                <DeleteOutlined />
              </a>
            </Space>
          )}
        />
      </Table> */}
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid rows={rows} columns={columns} pageSize={5} />
      </div>

      {/* <Modal
        title="Basic Modal"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancel
          </Button>,
        ]}>
        <InputForm value={value} onUpdate={onUpdate} buttonText={buttonText} />
      </Modal> */}
    </div>
  )
}

export default List
