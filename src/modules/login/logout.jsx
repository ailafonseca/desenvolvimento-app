import React from "react"
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { logout } from './loginActions'

class Logout extends React.Component {
    componentDidMount() {
        this.props.logout()
        this.props.history.push('/')
    }

    render() {
        return null
    }
}

const mapStateToProps = state => ({ login: state.login })
const mapDispatchToProps = dispatch => bindActionCreators({ logout }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(Logout)