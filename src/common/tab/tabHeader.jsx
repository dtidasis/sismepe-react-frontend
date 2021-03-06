import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { selectTab } from './tabActions'
import { connect } from 'react-redux'
import IF from '../operador/if'

class TabHeader extends Component {

    render() {
        const selected = this.props.tab.selected === this.props.target
        const visible = this.props.tab.visible[this.props.target]
        return (
            <IF teste={visible}>
                <li className={selected ? 'active' : ''}>
                    <a href='javascript:;'
                        data-toggle='tab'
                        onClick={() => this.props.selectTab(this.props.target)}
                        data-target={this.props.target}>
                        <i className={`fa fa-${this.props.icon}`}></i> {this.props.label}
                    </a>
                </li>
            </IF>
        )
    }
}

const mapStateToProps = state => ({ tab: state.tab })
const mapDispatchToProps = dispatch => bindActionCreators({ selectTab }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(TabHeader);