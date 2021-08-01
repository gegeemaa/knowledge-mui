import React from 'react'
import { Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'
import clsx from 'clsx'
import NewCardButtons from './category/NewCardButtons'
import LearningCardButtons from './category/LearningCardButtons'
import ReviewCardButtons from './category/ReviewCardButtons'
import useStyles from '../styles/styles'

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
  console.log('onClick:')
  console.log(onClick)
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
        <NewCardButtons
          item={item}
          cardCategory={cardCategory}
          onClick={onClick}
        />
      )}
      {cardCategory === '1' && (
        <LearningCardButtons
          item={item}
          cardCategory={cardCategory}
          onClick={onClick}
        />
      )}
      {cardCategory === '2' && (
        <ReviewCardButtons
          item={item}
          cardCategory={cardCategory}
          onClick={onClick}
          delayTimeButtonHardText={delayTimeButtonHardText}
          delayTimeButtonGoodText={delayTimeButtonGoodText}
          delayTimeButtonEasyText={delayTimeButtonEasyText}
        />
      )}
    </div>
  )
}

export default RateButtonComponent
