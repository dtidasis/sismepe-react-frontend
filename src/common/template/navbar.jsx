import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { logout } from '../../auth/authActions'

class Navbar extends Component {
    constructor(props) {
        super(props)
        this.state = { open: false }
    }
    changeOpen() {
        this.setState({ open: !this.state.open })
    }
    render() {
        const { nome, sub } = this.props.user
        return (
            <div className="navbar-custom-menu">
                <ul className="nav navbar-nav">
                <li onMouseLeave={() => this.changeOpen()}
                        className={`dropdown user user-menu ${this.state.open ? 'open' : ''}`}>
                        <a href="javascript:;"
                           className="dropdown-toggle"
                           data-toggle="dropdown">
                            <span className="hidden-xs">{nome}</span>
                        </a>
                    </li>
                    <li>
                        <a href="javascript:;" onClick={this.props.logout} data-toggle="control-sidebar">
                            <i className="fa fa-power-off"></i>
                        </a>
                    </li>
                </ul>
            </div>
        )
    }

    render2() {
        const { nome, sub } = this.props.user
        return (
            <div className="navbar-custom-menu">
                <ul className="nav navbar-nav">
                    <li onMouseLeave={() => this.changeOpen()}
                        className={`dropdown user user-menu ${this.state.open ? 'open' : ''}`}>
                        <a
                            href="javascript:;"
                            onClick={() => this.changeOpen()} aria-expanded={this.state.open ? 'true' : 'false'}
                            className="dropdown-toggle"
                            data-toggle="dropdown">
                            <span className="hidden-xs">{nome}</span>
                        </a>

                        <ul className="dropdown-menu">
                            <li className="user-header">
                                <p>{name}<small>{sub}</small></p>
                            </li>
                            <li className="user-footer">
                                <div className="pull-right">
                                    <a href="#" onClick={this.props.logout} className="btn btn-default btn-flat">Sair</a>
                                </div>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        )
    }
}
const mapStateToProps = state => ({ user: state.auth.user })
const mapDispatchToProps = dispatch => bindActionCreators({ logout }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(Navbar)