import React, { Component } from "react"
import ContentHeader from '../../../common/template/contentHeader'
import Content from '../../../common/template/content'
import Panel from "../../../common/components/Panel"
import Grid from "../../../common/layout/grid"
import Row from '../../../common/layout/row'
import consts from '../../../consts'
import axios from 'axios'
import { Link } from 'react-router'

class AtendimentoConsultaList extends Component {

    constructor(props) {
        super(props)
        this.INITIAL_STATE = {
            filtro: {
                descricao:''
            },
            lista:  [],
        }
        this.state = this.INITIAL_STATE
    }

    
    componentDidMount() {
        this.consultar();
    }

    consultar() {
        const url = `${consts.API_URL}/atendimento-assistencia-social`;
        const request = axios.get(url)
            .then(request => {
                this.setState({ lista: request.data })
            })
    }


    renderRows(list = []) {
        return this.state.lista.map((item, index) => {
            let className = ''
            return (
                <tr key={index} className={className}>
                    <td>{item.id}</td>
                    <td>{item.dataAbertura}</td>
                    <td>{item.paciente.pessoa.nome}</td>
                    <td>
                        

                    </td>
                </tr>
            )
        })
    }


    render() {
        return (
            <div>
                <ContentHeader title='Consulta' small='Serviço Social' />
                <Content>
                    <Panel titulo='Atendimento do Serviço Social'>
                        <Row>
                            <div className="box-body">
                                <form role='form'>
                                    <Row>
                                        <Grid cols='12 6 6'>
                                            <div className="form-group">
                                                <label>Descrição</label>
                                                <input type='text' name='descricao' className='form-control ml-md' 
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
                                         <div className="box-body table-responsive no-padding">
                                            <table className="table table-bordered table-striped table-hover">
                                                <thead>
                                                    <tr>
                                                        <th>Atendimento</th>
                                                        <th>Abertura</th>
                                                        <th>Paciente</th>
                                                        <th>Ações</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                {this.renderRows()}
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

export default AtendimentoConsultaList