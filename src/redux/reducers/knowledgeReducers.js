const initialState = {
  // date: '',
  // title: '',
  // body: '',
  // topic: '',
  list: [],
}

const knowledgeReducer = (state = initialState, action) => {
  if (action.type === 'ADD') {
    return {
      ...state,
      list: [
        ...state.list,
        {
          id: action.id,
          date: action.date,
          title: action.title,
          body: action.body,
          topic: action.topic,
          rate: 0,
          delay_time: '',
        },
      ],
    }
  } else if (action.type === 'FETCH') {
    // Firebase-ees olnoor ni nemj baina.
    return {
      ...state,
      list: action.payload,
    }
  } else if (action.type === 'DELETE') {
    // Firebase-ees olnoor ni nemj baina.
    return {
      ...state,
      list: state.list.filter(item => item.id !== action.id),
    }
  } else if (action.type === 'UPDATE') {
    // payload-ruu action-iin payload-iig zadlaj hiine
    // doorh bichiglel ni const payload = action.payload gedeg bichigleltei adilhan.
    const { payload } = action
    const list = state.list.map(v => (v.id === payload.id ? payload : v))
    return {
      ...state,
      list,
    }
  } else if (action.type === 'UPDATEID') {
    // payload-ruu action-iin payload-iig zadlaj hiine
    // doorh bichiglel ni const payload = action.payload gedeg bichigleltei adilhan.
    const { payload } = action
    const list = state.list.map(v => (v.id === '-1' ? payload : v))
    return {
      ...state,
      list,
    }
  }
  return state
}

export default knowledgeReducer
