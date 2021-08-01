import React from 'react'
import { Button } from '@material-ui/core'
import useStyles from '../../styles/styles'

export default function ReviewCardButtons({
  cardCategory,
  onClick,
  delayTimeButtonHardText,
  delayTimeButtonGoodText,
  delayTimeButtonEasyText,
}) {
  const classes = useStyles()
  return (
    <div>
      {' '}
      <div className={classes.button}>
        <p className={classes.delayTime}>10 minutes</p>
        <Button
          variant="outlined"
          color="secondary"
          onClick={() => onClick('again', cardCategory)}>
          Again
        </Button>
      </div>
      <div className={classes.button}>
        <p className={classes.delayTime}>{delayTimeButtonHardText}</p>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => onClick('hard', cardCategory)}>
          Hard
        </Button>
      </div>
      <div className={classes.button}>
        <p className={classes.delayTime}>{delayTimeButtonGoodText}</p>
        <Button
          variant="outlined"
          color="primary"
          onClick={() => onClick('good', cardCategory)}>
          Good
        </Button>
      </div>
      <div className={classes.button}>
        <p className={classes.delayTime}>{delayTimeButtonEasyText}</p>
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
