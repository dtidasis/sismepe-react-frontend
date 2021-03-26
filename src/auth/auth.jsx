import './auth.css'
import React, { Component } from 'react'
import { reduxForm, Field } from 'redux-form'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { login, signup } from './authActions'
import Row from '../common/layout/row'
import Grid from '../common/layout/grid'
import Messages from '../common/msg/messages'
import Input from '../common/form/inputAuth'
import logo from '../assets/img/logo.png'

class Auth extends Component {
    constructor(props) {
        super(props)
        this.state = { loginMode: true }
    }

    changeMode() {
        this.setState({ loginMode: !this.state.loginMode })
    }

    onSubmit(values) {
        const { login, signup } = this.props
        this.state.loginMode ? login(values) : signup(values)
    }

    render() {
        const { loginMode } = this.state
        const { handleSubmit } = this.props
        return (
            <div className="login-box">
                {/* <div className="login-logo"><b> SISMEPE</b> <br />Painel COVID-19</div> */}
                <div className="login-logo">
                    <img src={logo} alt="logo" className="logo" /> <br /><br />Painel COVID-19</div>
                <div className="login-box-body">
                    <p className="login-box-msg">Bem-vindo!</p>
                    
                    <form onSubmit={handleSubmit(v => this.onSubmit(v))} method='POST'>
                        <Field
                            component={Input}
                            type="input" name="login"
                            placeholder="Login"
                            icon='user' />

                        <Field
                            component={Input}
                            type="password"
                            name="senha"
                            placeholder="Senha"
                            icon='lock' />

                        <Row>
                            <Grid cols="4">
                                <button type="submit"
                                    className="btn btn-primary btn-block btn-flat">Entrar</button>
                            </Grid>
                        </Row>
                    </form>
                </div>
                <Messages />
            </div>
        )
    }
}

Auth = reduxForm({ form: 'authForm' })(Auth)
const mapDispatchToProps = dispatch => bindActionCreators({ login, signup }, dispatch)
export default connect(null, mapDispatchToProps)(Auth)