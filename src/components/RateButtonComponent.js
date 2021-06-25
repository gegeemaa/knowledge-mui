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
    </div>
  )
}

export default RateButtonComponent
