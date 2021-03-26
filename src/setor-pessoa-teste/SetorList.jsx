import React, { Component } from 'react'
import ContentHeader from '../common/template/contentHeader'
import Content from '../common/template/content'
import Panel from '../common/components/Panel'
import Row from '../common/layout/row'
import Grid from '../common/layout/grid'
import consts from '../consts'
import axios from 'axios'
import { Link } from 'react-router'

class SetorList extends Component {

    constructor(props) {
        super(props)
        this.INITIAL_STATE = {
            filtro: {
                descricao: ''
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
        const url = `${consts.API_URL}/setor-pessoa-teste/filtro`;
        const request = axios.post(url, filtro)
            .then(request => {
                this.setState({ lista: request.data })
            })
    }

    onChange(e) {
        let filtro = { ...this.state.filtro }
        if (e.target.name === 'descricao') {
            filtro.descricao = e.target.value;
        } 
        this.setState({ ...this.state, filtro })
    }

    renderRows(list = []) {
        return this.state.lista.map((item, index) => {

            return (
                <tr key={index}>
                    <td>{item.descricao}</td>
                    <td>
                        <Link
                            to={`/setorEdit?id=${item.id}`}>
                            <button className='btn-sm btn-default'>
                                <i className='fa fa-edit'></i>
                            </button>
                        </Link>
                        <button className='btn-sm btn-danger' onClick={() => this.excluir(item)}>
                            <i className='fa fa-trash'></i>
                        </button>
                    </td>
                </tr>
            )
        })
    }

    excluir(item) {
        let url = `${consts.API_URL}/setor-pessoa-teste/${item.id}`;
        axios.delete(url)
            .then(request => {
                toastr.success('Mensagem', 'Setor excluído com sucesso!')
                this.setState(this.INITIAL_STATE)
                this.limparCampos()
            })
            .catch(e => {
                toastr.error('Erro', e.response.data.message)
            })
    }

    render() {
        return (
            <div>
                <ContentHeader title='Setor de Pessoal para Teste COVID-19' small='Consultar' />
                <Content>
                    <Panel titulo='Cadastro de Setor de Pessoal para Teste de COVID-19' >
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
                                    </Row>

                                    <div className="box-footer">
                                        <button type='button' className='btn btn-primary' onClick={() => this.consultar()}>Consultar</button>
                                        <button type='button' className='btn btn-warning' onClick={(e) => this.clear(e)}>Limpar</button>
                                        <Link to='setorEdit'>
                                            <button type='button' className='btn btn-success'>Novo</button>
                                        </Link>
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
export default SetorList