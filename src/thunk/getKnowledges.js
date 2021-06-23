import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import axios from '../axios-knowledges'
export default function getKnowledges() {
  const dispatch = useDispatch()
  const knowledges = useSelector(state => state.list)
  // eniig daraa ni tusdaa component bolgoh
  useEffect(() => {
    // console.log('HellouseEffect')
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
        }))
        //Redux-ruu firebase DB-ees avsan ogogdloo nemj bna.
        dispatch(enterMultiple(data))
      })
      .catch(error => {
        console.log(error)
      })
  }, [])

  useEffect(() => {
    // Should not ever set state during rendering, so do this in useEffect instead.
    setItems(knowledges)
  }, [knowledges])
  return knowledges
}
