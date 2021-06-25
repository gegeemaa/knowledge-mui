export const enter = state => {
  return {
    type: 'ADD',
    id: '-1',
    date: state.date,
    title: state.title,
    body: state.body,
    topic: state.topic,

    // rate: rate.state,
  }
}
export const enterMultiple = state => {
  return {
    type: 'FETCH',
    payload: state,
  }
}
export const deleteRow = id => {
  return {
    type: 'DELETE',
    id: id,
  }
}
export const updateRow = state => {
  console.log('UPdatestate', state)
  return {
    type: 'UPDATE',
    payload: state,
  }
}
export const updateID = state => {
  // console.log('UPdatestate', state)
  return {
    type: 'UPDATEID',
    payload: state,
  }
}
