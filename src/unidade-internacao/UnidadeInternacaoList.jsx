import React, { Component } from 'react'
import ContentHeader from '../common/template/contentHeader'
import Content from '../common/template/content'
import Panel from '../common/components/Panel'
import Row from '../common/layout/row'
import Grid from '../common/layout/grid'
import consts from '../consts'
import axios from 'axios'
import { Link } from 'react-router'

class UnidadeInternacaoList extends Component {

    constructor(props) {
        super(props)
        this.INITIAL_STATE = {
            filtro: {
                descricao: '',
                covid: ''
            },
            lista: []
        }
        this.state = this.INITIAL_STATE
    }

    componentDidMount() {
        this.consultar();
    }

    clear() {
        this.setState(this.INITIAL_STATE, () => this.consultar())
    }

    consultar() {
        const filtro = this.state.filtro;
        const url = `${consts.API_URL}/unidade-internacao/filtro`;
        const request = axios.post(url, filtro)
            .then(request => {
                this.setState({ lista: request.data })
            })
    }

    onChange(e) {
        let filtro = { ...this.state.filtro }
        if (e.target.name === 'descricao') {
            filtro.descricao = e.target.value;

        } else if (e.target.name === 'covid') {
            filtro.covid = e.target.value;
        }
        this.setState({ ...this.state, filtro })
    }

    renderRows(list = []) {
        return this.state.lista.map((item, index) => {

            return (
                <tr key={index}>
                    <td>{item.descricao}</td>
                    <td>{item.covid === 'S' ? 'Sim' : 'Não'}</td>
                    <td>
                        <Link
                            to={`/unidadeInternacaoEdit?id=${item.id}`}>
                            <button className='btn-sm btn-default'>
                                <i className='fa fa-edit'></i>
                            </button>
                        </Link>
                    </td>
                </tr>
            )
        })
    }

    render() {
        return (
            <div>
                <ContentHeader title='Unidades de Internação' small='Consultar' />
                <Content>
                    <Panel titulo='Cadastro de Unidade de Internação' >
                        <Row>

                            <div className="box-body">
                                <form role="form">
                                    <Row>
                                        <Grid cols='12 6 6'>
                                            <div className="form-group">
                                                <label>Descricao</label>
                                                <input type="text" name='descricao' onChange={(e) => this.onChange(e)} value={this.state.filtro.descricao} className="form-control" placeholder="Descrição" />
                                            </div>
                                        </Grid>

                                        <Grid cols='12 6 2'>
                                            <div className="form-group">
                                                <label>Unidade COVID</label>
                                                <select className="form-control select2" name='covid' onChange={(e) => this.onChange(e)} value={this.state.filtro.covid} >
                                                    <option value=''>Selecione</option>
                                                    <option value='S'>Sim</option>
                                                    <option value='N'>Não</option>
                                                </select>
                                            </div>
                                        </Grid>
                                    </Row>

                                    <div className="box-footer">
                                        <button type='button' className='btn btn-primary' onClick={() => this.consultar()}>Consultar</button>
                                        <button type='button' className='btn btn-warning' onClick={(e) => this.clear(e)}>Limpar</button>
                                    </div>

                                    <div className="box-footer">
                                    </div>
                                </form>

                                <Row>
                                    <Grid cols='12'>
                                        <span><strong>Total: {this.state.lista ? this.state.lista.length : 0} registros</strong></span>
                                        <div className='box-body table-responsive no-padding'>
                                            <table className="table table-bordered table-striped table-hover">
                                                <thead>
                                                    <tr>
                                                        <th>Descrição</th>
                                                        <th>COVID</th>
                                                        <th>Ações</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {this.renderRows()}
                                                </tbody>
                                            </table>
                                        </div>
                                        <span><strong>Total: {this.state.lista ? this.state.lista.length : 0} registros</strong></span>
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
export default UnidadeInternacaoList