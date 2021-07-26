import React from 'react'
import axios from '../axios-knowledges'

export default function GetNumberOfCards() {
  let data
  let countOfNew
  let countOfLearning
  let countOfReviewing
  axios
    .get('/knowledges.json')
    .then(response => {
      //Object-iig array-ruu horvuuleh
      const arr = Object.entries(response.data)

      // map() ni array-aas shine array uusgeh function yum.
      data = arr
        .map(el => ({
          id: el[0],
          date: el[1].date,
          title: el[1].title,
          body: el[1].body,
          topic: el[1].topic,
          rate: el[1].rate,
          // delay_time: new Date(el[1].delay_time),
          delay_time: el[1].delay_time,
        }))
        .filter(x => new Date() >= new Date(x.delay_time))

      countOfNew = data.filter(x => x.rate == '0').length
      countOfLearning = data.filter(x => x.rate == '1').length
      countOfReviewing = data.filter(x => x.rate == '2').length

      console.log(data)
    })
    .catch(error => {
      // console.log(error)
    })

  return <div>Hellow</div>
}
