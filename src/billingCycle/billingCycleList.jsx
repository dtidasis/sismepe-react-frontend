import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { getList, showUpdate, showDelete } from './billingCycleActions'

class BillingCycleList extends Component {

    componentWillMount() {
        this.props.getList();
    }

    renderRows() {
        const list = this.props.list || [];

        return list.map( e => (
            <tr key={e._id}>
                <td>{e.name}</td>
                <td>{e.month}</td>
                <td>{e.year}</td>
                <td>
                    <button onClick={() => this.props.showUpdate(e)} className='btn btn-warning'>
                        <i className='fa fa-pencil'></i>
                    </button>
                    <button onClick={() => this.props.showDelete(e)} className='btn btn-danger'>
                        <i className='fa fa-trash-o'></i>
                    </button>
                </td>
            </tr>
        ))
    }

    render() {
        return (
            <table className='table'>
                <thead>
                    <tr>
                        <td>Nome</td>
                        <td>Mês</td>
                        <td>Ano</td>
                        <td className='table-actions'>Ações</td>
                    </tr>
                </thead>
                <tbody>
                    {this.renderRows()}
                </tbody>
            </table>
        )
    }
}
const mapStateToProps = state => ({list: state.billingCycle.list})
const mapDispatchToProps = dispatch => bindActionCreators({getList, showUpdate, showDelete}, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(BillingCycleList)