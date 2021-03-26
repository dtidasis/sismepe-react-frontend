import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { selectTab } from './tabActions'
import { connect } from 'react-redux'
import IF from '../operador/if'

class TabContent extends Component {

    render() {
        const selected = this.props.tab.selected === this.props.id
        const visible = this.props.tab.visible[this.props.id]
        return (
            <IF teste={visible}>
                <div id={this.props.id} className={`tab-pane ${selected ? 'active' : ''}`}>
                    {this.props.children}
                </div>

            </IF>
        )
    }
}

const mapStateToProps = state => ({ tab: state.tab })
export default connect(mapStateToProps)(TabContent);