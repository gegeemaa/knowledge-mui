import React from 'react'
import { Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'

const useStyles = makeStyles({
  delayTime: {
    fontSize: '14px',
    marginBottom: '2px',
    display: 'block',
  },
  button: {
    display: 'inline-block',
    marginRight: '12px',
  },
  label: {
    padding: '.2em .6em .3em',
    color: 'white',
    fontWeight: 'bold',
    borderRadius: '15px',
    fontSize: '85%',
    lineHeight: '1',
  },
  warning: { backgroundColor: '#f0ad4e' },
  info: { backgroundColor: '#5bc0de' },
  success: { backgroundColor: '#04AA6D' },
})

const RateButtonComponent = ({
  item,
  cardCategory,
  onClick,
  delayTimeButtonHardText,
  delayTimeButtonGoodText,
  delayTimeButtonEasyText,
}) => {
  // console.log(cardCategory)
  const classes = useStyles()
  let cartCategoryText
  let labelWarning = false
  let labelInfo = false
  let labelSuccess = false
  if (cardCategory === '0') {
    cartCategoryText = 'New card'
    labelWarning = true
  } else if (cardCategory === '1') {
    cartCategoryText = 'Learning card'
    labelInfo = true
  } else {
    cartCategoryText = 'Reviewing card'
    labelSuccess = true
  }
  return (
    <div>
      <span
        className={clsx(
          classes.label,
          labelWarning && classes.warning,
          labelInfo && classes.info,
          labelSuccess && classes.success
        )}>
        {cartCategoryText}
      </span>
      {cardCategory === '0' && (
        <div>
          {' '}
          <div className={classes.button}>
            <p className={classes.delayTime}> 1 minute </p>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => onClick('again', item, cardCategory)}
              className="button">
              Again
            </Button>
          </div>
          <div className={classes.button}>
            <p className={classes.delayTime}> 10 minutes </p>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => onClick('good', item, cardCategory)}>
              Good
            </Button>
          </div>
          <div className={classes.button}>
            <p className={classes.delayTime}>4 days</p>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => onClick('easy', item, cardCategory)}>
              Easy
            </Button>
          </div>
        </div>
      )}
      {cardCategory === '1' && (
        <div>
          {' '}
          <div className={classes.button}>
            <p className={classes.delayTime}>1 minute</p>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => onClick('again', item, cardCategory)}>
              Again
            </Button>
          </div>
          <div className={classes.button}>
            <p className={classes.delayTime}> 1 day </p>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => onClick('good', item, cardCategory)}>
              Good
            </Button>
          </div>
          <div className={classes.button}>
            <p className={classes.delayTime}> 4 days </p>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => onClick('easy', item, cardCategory)}>
              Easy
            </Button>
          </div>
        </div>
      )}
      {cardCategory === '2' && (
        <div>
          {' '}
          <div className={classes.button}>
            <p className={classes.delayTime}>10 minutes</p>
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => onClick('again', item, cardCategory)}>
              Again
            </Button>
          </div>
          <div className={classes.button}>
            <p className={classes.delayTime}>{delayTimeButtonHardText}</p>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => onClick('hard', item, cardCategory)}>
              Hard
            </Button>
          </div>
          <div className={classes.button}>
            <p className={classes.delayTime}>{delayTimeButtonGoodText}</p>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => onClick('good', item, cardCategory)}>
              Good
            </Button>
          </div>
          <div className={classes.button}>
            <p className={classes.delayTime}>{delayTimeButtonEasyText}</p>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => onClick('easy', item, cardCategory)}>
              Easy
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

export default RateButtonComponent
