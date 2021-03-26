import React, { Component } from 'react'
import ContentHeader from '../common/template/contentHeader'
import Content from '../common/template/content'
import Tabs from '../common/tab/tabs'
import TabsHeader from '../common/tab/tabsHeader'
import TabsContent from '../common/tab/tabsContent'
import TabContent from '../common/tab/tabContent'
import TabHeader from '../common/tab/tabHeader'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { init, create, update, remove } from './postoActions'
import { Chart } from 'primereact/chart';
import { DataTable, Column } from 'primereact/datatable';
import "./DataTable.css"

class PostoList extends Component {

    componentWillMount() {
        this.props.init()
    }

    renderRows() {
        const list = this.props.list || [];
        return list.map(p => (
            <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.nome}</td>
            </tr>
        ))
    }

    render() {
        const data = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [
                {
                    label: 'COVID-19',
                    data: [17,14,33,27,27,42,41,43,30,35,40,44,75,74,66,73,77,77,68,120,92,77,0,0,0,0,0,0,0,0,0],
                    fill: false,
                    backgroundColor: '#42A5F5',
                    borderColor: '#42A5F5'
                },
                {
                    label: 'Second Dataset',
                    data: [28, 48, 40, 19, 86, 27, 90],
                    fill: false,
                    backgroundColor: '#66BB6A',
                    borderColor: '#66BB6A'
                }
            ]
        };
        return (
            <div>
                <ContentHeader title='Posto' small='Consultar'></ContentHeader>
                <Content>
                    <Tabs>
                        <TabsHeader>
                            <TabHeader label='Listar' icon='bars' target='tabList' />
                        </TabsHeader>
                        <TabsContent>
                            <TabContent id='tabList'>
                                <table className='table'>
                                    <thead>
                                        <tr>
                                            <td>ID</td>
                                            <td>Descrição</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.renderRows()}
                                    </tbody>
                                </table>
                            </TabContent>
                        </TabsContent>
                    </Tabs>
                </Content>
            </div>
        )
    }
}
const mapStateToProps = state => ({ list: state.posto.list })
const mapDispatchToProps = dispatch => bindActionCreators({ init, create, update, remove }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(PostoList)