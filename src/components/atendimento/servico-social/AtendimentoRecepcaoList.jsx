import React, { Component } from "react"
import ContentHeader from '../../../common/template/contentHeader'
import Content from '../../../common/template/content'
import Panel from "../../../common/components/Panel"
import Grid from "../../../common/layout/grid"
import Row from '../../../common/layout/row'
import consts from '../../../consts'
import axios from 'axios'
import { Link } from 'react-router'

class AtendimentoRecepcaoList extends Component {

    constructor(props) {
        super(props)
        this.INITIAL_STATE = {
            filtro: {
                descricao:''
            },
            lista:  []
        }
        this.state = this.INITIAL_STATE
    }

    render() {
        return (
            <div>
                <ContentHeader title='Recepção' small='Serviço Social' />
                <Content>
                    <Panel titulo='Atendimento do Serviço Social'>
                        <Row>
                            <div className="box-body">
                                <form role='form'>
                                    <Row>
                                        <Grid cols='12 6 6'>
                                            <div className="form-group">
                                                <label>Descrição</label>
                                                <input type='text' name='descricao' className='form-control' 
                                                placeholder='Descrição'/>
                                            </div>
                                        </Grid>
                                    </Row>
                                    <div className="box-footer">
                                        <button type='button' className="btn btn-primary">Consultar</button>
                                        <button type='button' className="btn btn-warning">Limpar</button>
                                    </div>
                                    <div className="box-footer"></div>
                                </form>
                                <Row>
                                    <Grid cols='12'>
                                        <span><strong>Total {this.state.lista ? this.state.lista.length :0} registros</strong></span>
                                        <div className="box-body table-responsive no-padding">
                                            <table className="table table-bordered table-striped table-hover">
                                                <thead>
                                                    <tr>
                                                        <th>Atendimento</th>
                                                        <th>Paciente</th>
                                                    </tr>
                                                </thead>
                                                <tbody>

                                                </tbody>
                                            </table>
                                        </div>
                                        <span><strong>Total {this.state.lista ? this.state.lista.length :0} registros</strong></span>
                                    </Grid>
                                </Row>
                            </div>
                        </Row>
                    </Panel>
                </Content>
            </div>
        )
    }
}

export default AtendimentoRecepcaoList