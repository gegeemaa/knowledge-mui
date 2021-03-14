import axios from '../axios-knowledges'
import { enter, updateID } from '../redux/actions/knowledgeActions'

export const addFunction = (id, date, title, body, topic, dispatch) => {
  if (date !== '' && title !== '') {
    const knowledge = {
      id,
      date,
      title,
      body,
      topic,
    }
    // redux-ruu yavuulj bna
    dispatch(enter(knowledge))
    // send data to Firebase database
    axios.post('/knowledges.json', knowledge).then(response => {
      dispatch(updateID({ ...knowledge, id: response.data.name }))
    })
  }
}
