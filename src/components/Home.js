import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Paper, Grid } from '@material-ui/core'
import Editor from 'rich-markdown-editor'
import GitHubIcon from '@material-ui/icons/GitHub'
const text = `
## Welcome to the "Note memorizing" application!

This application is dedicated to register notes or anything you are learning and memorize them according to specific rules which are based on brain scientience. Application is inspired by Anki or rules to remember are similar to Ankis rules.

Notes are divided into the following 2 categories:
  1. New notes
  2. Learning notes

When you click on the "Work on notes" menu, the number of notes on which to work today and their categories will be shown. When you continue by clicking on the "Study now" button, the first note's title will be shown by giving you some time to think about the answer. By clicking on the "Show answer" button, a related answer should be shown. Depending on how your answer you have thought matches with the answer, you should grade your note. Grading notes means that you will decide after how much time notes will be shown. Let's call this time "Waiting time."
 
There are several grading buttons on note and number of buttons and it's related waiting time depends on note's category. 

**New**: It is a newly created note and has the following 3 constant grading buttons.
  - again (1minute)
  - good (10 minutes)
  - easy (4 days)
If you grade the note as "easy", it's category will be changed to "Learning".

**Learning**: It is a note you are working on and has the following 3 constant grading buttons.
  - again (1minute)
  - good (1 day)
  - easy (4 days)
`
const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(3),
    maxWidth: 1000,
    margin: 'auto',
  },
}))

export default function Home() {
  const classes = useStyles()
  return (
    <Paper className={classes.paper}>
      <Editor defaultValue={text} readOnly={true} />
      <a href="https://github.com/gegeemaa/knowledge-mui" target="_blank">
        <GitHubIcon />
      </a>
    </Paper>
  )
}
