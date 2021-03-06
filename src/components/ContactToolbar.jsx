import React from 'react'
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar'
import { getDisplayPhoneNumber } from '../lib/phone-format'
import { getLocalTime } from '../lib/timezones'
import { grey100 } from 'material-ui/styles/colors'

const inlineStyles = {
  toolbar: {
    backgroundColor: grey100
  },
  cellToolbarTitle: {
    fontSize: '1em'
  },
  locationToolbarTitle: {
    fontSize: '1em'
  },
  timeToolbarTitle: {
    fontSize: '1em'
  }
}

const ContactToolbar = function ContactToolbar(props) {
  const { campaignContact, rightToolbarIcon } = props

  const { location } = campaignContact

  let city = ''
  let state = ''
  let timezone = null
  let offset = 0
  let hasDST = false

  if (location) {
    city = location.city
    state = location.state
    timezone = location.timezone
    if (timezone) {
      offset = timezone.offset
      hasDST = timezone.hasDST
    }
  }

  let formattedLocation = `${city}`
  if (city && state) {
    formattedLocation = `${formattedLocation}, `
  }
  formattedLocation = `${formattedLocation} ${state}`

  const formattedLocalTime = getLocalTime(offset, hasDST).format('h:mm a')
  return (
    <div>
      <Toolbar
        style={inlineStyles.toolbar}
      >
        <ToolbarGroup >
          <ToolbarTitle
            text={campaignContact.firstName}
          />
          <ToolbarTitle
            style={inlineStyles.cellToolbarTitle}
          />
          {location ? (
            <ToolbarTitle
              text={formattedLocalTime}
              style={inlineStyles.timeToolbarTitle}
            />) : ''
          }
          {location ? (
            <ToolbarTitle
              text={formattedLocation}
              style={inlineStyles.locationToolbarTitle}
            />) : ''}
          {rightToolbarIcon}
        </ToolbarGroup>
      </Toolbar>
    </div>
  )
}

ContactToolbar.propTypes = {
  campaignContact: React.PropTypes.object, // contacts for current assignment
  rightToolbarIcon: React.PropTypes.element
}

export default ContactToolbar
