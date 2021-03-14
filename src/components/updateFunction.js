import { updateRow } from '../redux/actions/knowledgeActions'
import axios from '../axios-knowledges'

export const updateFunction = (id, date, title, body, topic, dispatch) => {
  if (date !== '' && title !== '') {
    const knowledge = {
      id,
      date,
      title,
      body,
      topic,
    }
    dispatch(updateRow(knowledge))
    // // send data to Firebase database
    axios.put('/knowledges/' + id + '.json', knowledge).then(response => {})
  }
}
