import React from 'react'
import { connect } from 'react-redux'

const Footer = React.forwardRef((props, ref) =>
  props.tabSelectedMainMenu === 0 ? (
    <footer className='py-3 saveadd-primary-color' ref={ref}>
      <p className='text-center w-100 mb-0'>©2020 Saveadd - {`versão ${props.version}`}</p>
    </footer>
  ) : (
    <footer className='py-3 saveadd-secondary-color' ref={ref}>
      <p className='text-center w-100 mb-0'>©2020 Saveadd - {`versão ${props.version}`}</p>
    </footer>
  )
)

const mapStateToPros = (state) => ({
  tabSelectedMainMenu: state.main.tabSelectedMainMenu
})

const mapDispatchToProps = (dispatch) => ({ dispatch })

export default connect(mapStateToPros, mapDispatchToProps)(Footer)
