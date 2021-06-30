import React from 'react'
import { Button } from '@material-ui/core'

const RateButtonComponent = ({ item, cardCategory, onClick }) => {
  console.log(cardCategory)
  return (
    <div>
      {cardCategory === 0 && (
        <div>
          {' '}
          1 minute
          <Button
            variant="outlined"
            color="primary"
            onClick={() => onClick('again', item, cardCategory)}>
            Again
          </Button>
          10 minutes
          <Button
            variant="outlined"
            color="primary"
            onClick={() => onClick('good', item, cardCategory)}>
            Good
          </Button>
          4 days
          <Button
            variant="outlined"
            color="primary"
            onClick={() => onClick('easy', item, cardCategory)}>
            Easy
          </Button>
        </div>
      )}
      {cardCategory === 1 && (
        <div>
          {' '}
          1 minute
          <Button
            variant="outlined"
            color="primary"
            onClick={() => onClick('again', item, cardCategory)}>
            Again
          </Button>
          1 day
          <Button
            variant="outlined"
            color="primary"
            onClick={() => onClick('good', item, cardCategory)}>
            Good
          </Button>
          4 days
          <Button
            variant="outlined"
            color="primary"
            onClick={() => onClick('easy', item, cardCategory)}>
            Easy
          </Button>
        </div>
      )}
      {cardCategory === 2 && (
        <div>
          {' '}
          10 minutes
          <Button
            variant="outlined"
            color="primary"
            onClick={() => onClick('again', item, cardCategory)}>
            Again
          </Button>
          2 days
          <Button
            variant="outlined"
            color="primary"
            onClick={() => onClick('hard', item, cardCategory)}>
            Hard
          </Button>
          {good_delay_time_text}
          <Button
            variant="outlined"
            color="primary"
            onClick={() => onClick('good', item, cardCategory)}>
            Good
          </Button>
          {easy_delay_time_text}
          <Button
            variant="outlined"
            color="primary"
            onClick={() => onClick('easy', item, cardCategory)}>
            Easy
          </Button>
        </div>
      )}
    </div>
  )
}

export default RateButtonComponent
