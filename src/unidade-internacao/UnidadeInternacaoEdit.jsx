import React, { Component } from 'react'
import { toastr } from 'react-redux-toastr'
import ContentHeader from '../common/template/contentHeader'
import Content from '../common/template/content'
import Panel from '../common/components/Panel'
import Row from '../common/layout/row'
import Grid from '../common/layout/grid'
import consts from '../consts'
import axios from 'axios'
import { Link } from 'react-router'

class UnidadeInternacaoEdit extends Component {

    constructor(props) {
        super(props)
        this.INITIAL_STATE = {
            entity: {
                descricao: '',
                covid: ''
            }
        }
        this.state = this.INITIAL_STATE;
    }

    componentDidMount() {
        const id = this.props.location.query.id;
        if (id) {
            this.buscarRegistro(id);
        }
    }

    salvar() {
        const entity = this.state.entity;
        const method = entity.id ? 'put' : 'post'
        let url = `${consts.API_URL}/unidade-internacao`;

        if (entity.id) {
            url += `/${entity.id}`
        }

        axios[method](url, entity)
            .then(request => {
                toastr.success('Mensagem', 'Registro salvo com sucesso!')
                this.setState(this.INITIAL_STATE)
                this.limparCampos()
            })
            .catch(e => {
                toastr.error('Erro', e.response.data.message)
            })
    }

    limparCampos() {
        this.setState(this.INITIAL_STATE)
    }

    onChange(e) {
        if (e.target.name === 'descricao') {
            let entity = { ...this.state.entity }
            entity.descricao = e.target.value;
            this.setState({ ...this.state, entity })

        } else if (e.target.name === 'covid') {
            let entity = { ...this.state.entity }
            entity.covid = e.target.value;
            this.setState({ ...this.state, entity })

        } else if (e.target.name === 'cor') {
            let entity = { ...this.state.entity }
            entity.cor = e.target.value;
            this.setState({ ...this.state, entity })
        }
    }

    buscarRegistro(id) {
        const url = `${consts.API_URL}/unidade-internacao/${id}`;
        const request = axios.get(url)
            .then(request => {
                const entity = request.data
                this.setState({ ...this.state, entity })
            })
    }

    render() {
        return (
            <div>
                <ContentHeader title='Unidade de Internação' small='Inserir' />
                <Content>
                    <Panel titulo='Cadastro de Unidade de Internação' >
                        <Row>
                            <div className="box-body">
                                <form role="form">

                                    <Row>
                                        <Grid cols='12 6 6'>
                                            <div className="form-group">
                                                <label>Descrição</label>
                                                <input type="text" name='descricao' onChange={(e) => this.onChange(e)} value={this.state.entity.descricao} className="form-control" placeholder="Nome da Unidade de Internacao" />
                                            </div>

                                        </Grid>

                                        <Grid cols='12 6 3'>
                                            <div className="form-group">
                                                <label>Unidade COVID</label>
                                                <select className="form-control select2" name='covid' onChange={(e) => this.onChange(e)} value={this.state.entity.covid} >
                                                    <option value=''>Selecione</option>
                                                    <option value='S'>Sim</option>
                                                    <option value='N'>Não</option>
                                                </select>
                                            </div>
                                        </Grid>
                                    </Row>

                                    <div className="box-footer">
                                        <button type='button' className='btn btn-primary' onClick={() => this.salvar()}>Salvar</button>
                                        <Link to='unidadeInternacaoList'>
                                            <button type='button' className='btn btn-warning'>Consultar</button>
                                        </Link>
                                    </div>

                                    <div className="box-footer">
                                    </div>
                                </form>
                            </div>
                        </Row>
                    </Panel>
                </Content>
            </div>
        )
    }
}
export default UnidadeInternacaoEdit