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

    componentDidMount(){
        this.consultar();
    }

    consultar(){
        const filtro = this.state.filtro;
        const url = `${consts.API_URL}/unidade-internacao/filtro`;
        const request = axios.post(url,filtro).then(request => {
            this.setState({lista: request.data})
        })
    }

    clear(){
        this.setState(this.INITIAL_STATE, () => this.consultar())
    }

    renderRows(list = []){
        return this.state.lista.map((item, index) => {
            return (
                <tr key={index}>
                    <td>{item.descricao}</td>
                </tr>
            )
        })
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
                                        <button type='button' className="btn btn-primary" onClick={() => this.consultar()}>Consultar</button>
                                        <button type='button' className="btn btn-warning" onClick={() => this.clear()}>Limpar</button>
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
                                                        <th>Nº Agend.</th>
                                                        <th>Data</th>
                                                        <th>Horário</th>
                                                        <th>Prestador</th>
                                                        <th>Same</th>
                                                        <th>Paciente</th>
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

export default AtendimentoRecepcaoList