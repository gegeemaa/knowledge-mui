import React from 'react'
import { useDispatch } from 'react-redux'
import axios from '../axios-knowledges'
import { enter, updateID } from '../redux/actions/knowledgeActions'
import InputForm from './InputForm'

const AddKnowledge = () => {
  const dispatch = useDispatch()
  const buttonText = 'Add'
  const value = {
    date: new Date(),
    title: '',
    body: '',
    topic: '',
  }
  const add = values => {
    console.log(values)
    if (values.date !== '' && values.title !== '') {
      const knowledge = {
        date: values.date.toISOString().slice(0, 10),
        title: values.title,
        body: values.body,
        topic: values.topic,
      }
      // console.log(knowledge)
      // redux-ruu yavuulj bna
      dispatch(enter(knowledge))
      // send data to Firebase database
      axios.post('/knowledges.json', knowledge).then(response => {
        dispatch(updateID({ ...knowledge, id: response.data.name }))
      })
    }
  }
  return (
    <div>
      {/* <InputForm onUpdate={addItem} value={value} buttonText={buttonText} /> */}
      <InputForm value={value} submit={add} buttonText={buttonText} />
    </div>
  )
}
export default AddKnowledge
