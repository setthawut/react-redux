import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { mapDispatchToProps } from '../redux/actions'
import { Container, Row, Col, Nav, Navbar } from 'react-bootstrap'
import { Link, useLocation } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUsers, faUserCircle, faDesktop, faPowerOff, faFileImport } from '@fortawesome/free-solid-svg-icons'

class Footer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    componentDidMount() {
        
    }
    
    render() {
        const { user, location } = this.props
        var year = new Date().getFullYear();
        
        if (!!user) {
            return (
                <div id="footer">
                    <div className="data">©{year} คณะกรรมการสิ่งแวดล้อมแห่งชาติ. All Rights Reserved. - v0.0.1</div>
                </div>
            )
        } else {
            return null
        }
    }
}

Footer.propTypes = {

}

function mapStateToProps(state) {
    return {
        user: state.login.user,
    }
}

export default connect(mapStateToProps, null)(Footer)