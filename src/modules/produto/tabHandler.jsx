import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { AppBar, Tabs, Tab, Typography, Box } from '@material-ui/core'
import { useTheme } from '@material-ui/core/styles'
import SwipeableViews from 'react-swipeable-views'

function TabPanel (props) {
  const { children, value, index, ...other } = props

  return (
    <Typography component='div' role='tabpanel' hidden={value !== index} id={`full-width-tabpanel-${index}`} aria-labelledby={`full-width-tab-${index}`} {...other}>
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  )
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
}

function a11yProps (index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`
  }
}

function displayTabs (tabs, theme) {
  return tabs.map((t, i) => (
    <TabPanel key={`tab-panel-${i}`} value={i} index={i} dir={theme.direction}>
      {typeof t.callback === 'function' && t.callback()}
    </TabPanel>
  ))
}

export default function TabHandler (props) {
  const [tab, setTab] = useState(1)
  const { tabs } = props
  const theme = useTheme()

  return (
    <>
      <AppBar position='relative' color='default'>
        <Tabs
          value={tab}
          onChange={() => setTab((tab + 1) % tabs.length)}
          indicatorColor='primary'
          textColor='primary'
          variant='fullWidth'
          aria-label='full width tabs example'
        >
          {tabs.map((t, i) => <Tab key={`tab-interator-${i}`} label={t.display} {...a11yProps(i)} />)}
        </Tabs>
      </AppBar>
      <SwipeableViews axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'} index={tab}>
        {displayTabs(tabs, theme)}
      </SwipeableViews>
    </>
  )
}

TabHandler.propTypes = {
  tabs: PropTypes.arrayOf(PropTypes.shape({
    display: PropTypes.string.isRequired,
    callback: PropTypes.func.isRequired
  })).isRequired
}
