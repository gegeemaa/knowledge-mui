import React from 'react'
import PropTypes from 'prop-types'
import clsx from 'clsx'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Drawer from '@material-ui/core/Drawer'
import CssBaseline from '@material-ui/core/CssBaseline'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import List from '@material-ui/core/List'
import Typography from '@material-ui/core/Typography'
import Divider from '@material-ui/core/Divider'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import AddIcon from '@material-ui/icons/Add'
import FormatListNumberedIcon from '@material-ui/icons/FormatListNumbered'
import { Route, MemoryRouter, Switch } from 'react-router'
import { Link as RouterLink } from 'react-router-dom'
import ListKnowledges from './List'
import StudyNow from './StudyNow'
import WbIncandescentIcon from '@material-ui/icons/WbIncandescent'
import HomeIcon from '@material-ui/icons/Home'

const drawerWidth = 240

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}))

function ListItemLink(props) {
  const { icon, primary, to } = props

  const renderLink = React.useMemo(
    () =>
      React.forwardRef((itemProps, ref) => (
        <RouterLink to={to} ref={ref} {...itemProps} />
      )),
    [to]
  )
  return (
    // ListItem deer darah ued renderLink variable-ruu usrene
    <li>
      <ListItem button component={renderLink}>
        {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
        <ListItemText primary={primary} />
      </ListItem>
    </li>
  )
}

ListItemLink.propTypes = {
  icon: PropTypes.element,
  primary: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
}

export default function App() {
  const classes = useStyles()
  const theme = useTheme()
  const [open, setOpen] = React.useState(true)

  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }

  // Date.daysBetween = function (date1, date2) {
  //   //Get 1 day in milliseconds
  //   var one_day = 1000 * 60 * 60 * 24

  //   // Convert both dates to milliseconds
  //   var date1_ms = date1.getTime()
  //   var date2_ms = date2.getTime()

  //   // Calculate the difference in milliseconds
  //   var difference_ms = date2_ms - date1_ms
  //   //take out milliseconds
  //   difference_ms = difference_ms / 1000
  //   console.log(difference_ms)

  //   var seconds = Math.floor(difference_ms % 60)
  //   difference_ms = difference_ms / 60
  //   var minutes = Math.floor(difference_ms % 60)
  //   difference_ms = difference_ms / 60
  //   var hours = Math.floor(difference_ms % 24)
  //   var days = Math.floor(difference_ms / 24)

  //   return (
  //     days +
  //     ' days, ' +
  //     hours +
  //     ' hours, ' +
  //     minutes +
  //     ' minutes, and ' +
  //     seconds +
  //     ' seconds'
  //   )
  // }

  // //Set the two dates
  // var Jan1st2010 = new Date(2021, 5, 29)
  // var today = new Date()
  // //displays "Days from Wed Jan 01 0110 00:00:00 GMT-0500 (Eastern Standard Time) to Tue Dec 27 2011 12:14:02 GMT-0500 (Eastern Standard Time): 694686 days, 12 hours, 14 minutes, and 2 seconds"

  // console.log(
  //   'Days from ' +
  //     Jan1st2010 +
  //     ' to ' +
  //     today +
  //     ': ' +
  //     Date.daysBetween(Jan1st2010, today)
  // )

  return (
    <MemoryRouter initialEntries={['/drafts']} initialIndex={0}>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open,
          })}>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, open && classes.hide)}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap>
              Knowledge project
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper,
          }}>
          <div className={classes.drawerHeader}>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'ltr' ? (
                <ChevronLeftIcon />
              ) : (
                <ChevronRightIcon />
              )}
            </IconButton>
          </div>
          <Divider />
          <List>
            <ListItemLink
              to="/list"
              primary="List"
              icon={<FormatListNumberedIcon />}
            />
          </List>
          <List>
            <ListItemLink
              to="/studyNow"
              primary="Play card"
              icon={<WbIncandescentIcon />}
            />
          </List>
        </Drawer>
        <main
          className={clsx(classes.content, {
            [classes.contentShift]: open,
          })}>
          <div className={classes.drawerHeader} />
          <Switch>
            <Route exact path="/" component={ListKnowledges} />
            <Route path="/list" component={ListKnowledges} />
            <Route path="/studyNow" component={StudyNow} />
          </Switch>
        </main>
      </div>
    </MemoryRouter>
  )
}
