import React from 'react'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  // Cardnii undsen style
  paper: {
    padding: '15px',
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  buttonRate: {
    display: 'none',
  },
  buttonBlock: {
    display: 'block',
  },
  fontBold: {
    fontWeight: '900',
  },

  // Card buttons style
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
  // card category style
  warning: { backgroundColor: '#f0ad4e' },
  info: { backgroundColor: '#5bc0de' },
  success: { backgroundColor: '#04AA6D' },
})

export default useStyles
