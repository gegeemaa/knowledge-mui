import React from 'react'
import { Button } from '@material-ui/core'
import useStyles from '../../styles/styles'

export default function LearningCardButtons({ cardCategory, onClick }) {
  const classes = useStyles()
  return (
    <div>
      {' '}
      <div className={classes.button}>
        <p className={classes.delayTime}>1 minute</p>
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => onClick('again', cardCategory)}>
          Again
        </Button>
      </div>
      <div className={classes.button}>
        <p className={classes.delayTime}> 1 day </p>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => onClick('good', cardCategory)}>
          Good
        </Button>
      </div>
      <div className={classes.button}>
        <p className={classes.delayTime}> 4 days </p>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => onClick('easy', cardCategory)}>
          Easy
        </Button>
      </div>
    </div>
  )
}
