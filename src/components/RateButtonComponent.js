import React from 'react'

export default function RateButtonComponent({ cardCategory }) {
  return (
    <div>
      {cardCategory === '0' && (
        <div>
          {' '}
          1 minute
          <Button
            variant="outlined"
            color="primary"
            onClick={() => next('again')}>
            Again
          </Button>
          10 minutes
          <Button
            variant="outlined"
            color="primary"
            onClick={() => next('good')}>
            Good
          </Button>
          4 days
          <Button
            variant="outlined"
            color="primary"
            onClick={() => next('easy')}>
            Easy
          </Button>
        </div>
      )}
    </div>
  )
}
