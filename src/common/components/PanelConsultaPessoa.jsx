import React, { Component } from 'react'
import 'modules/admin-lte/plugins/select2/select2.min.css'
import { toastr } from 'react-redux-toastr'
import Grid from '../layout/grid'
import Row from '../layout/row'
import If from '../operador/if'
import Panel from './Panel'
import axios from 'axios'
import consts from '../../consts'

class PanelConsultaPessoa extends Component {

    constructor(props) {
        super(props)
        this.INITIAL_STATE = {
            matricula: '',
            cpf: '',
            tipo_pessoa: null,
            listaPessoas: [],
            pessoa: { id: null }
        }
        this.state = this.INITIAL_STATE;
    }

    consultarPessoa() {
        const tipo = this.state.tipo_pessoa;
        if (tipo) {
            if (tipo === 'B') {
                this.consultarPessoaPorMatricula();
            } else {
                this.consultarPessoaPorCPF();
            }
        }
    }

    consultarPessoaPorMatricula() {
        const url = `${consts.API_URL}/dashboard/${this.state.matricula}`;
        const request = axios.get(url)
            .then(request => {
                if (request.data.length === 0) {
                    toastr.error('Erro', 'Matrícula não encontrada.')
                }
                let entity = { ...this.state.entity }
                entity.pessoa = { id: null }
                this.setState({ ...this.state, listaPessoas: request.data, entity })
            })
    }

    consultarPessoaPorCPF() {
        const url = `${consts.API_URL}/dashboard/cpf/${this.state.cpf}`;
        const request = axios.get(url)
            .then(request => {
                if (request.data.length === 0) {
                    toastr.error('Erro', 'CPF não encontrado.')
                    this.setState({ ...this.state, listaPessoas: []})
                } else {
                    this.setState({ ...this.state, listaPessoas: [request.data]})
                }
            })
    }

    onChange(e) {
        if (e.target.name === 'matricula') {
            this.setState({ matricula: e.target.value })

        } else if (e.target.name === 'cpf') {
            this.setState({ cpf: e.target.value })

        } else if (e.target.name === 'tipo_pessoa') {
            this.setState({ ...this.state, tipo_pessoa: e.target.value, listaPessoas: [], matricula: '', cpf: '' })
        }
    }

    renderOptions() {
        return (this.state.listaPessoas.map((p, index) => (
            <option key={index} value={p.codigoPessoa}>{p.nome} - {p.tipo}</option>
        )))
    }

    renderRows(list = []) {
        return this.state.listaPessoas.map((item, index) => {

            let className = ''
            switch (item.status) {
                case 'POSITIVO':
                    className = 'bg-red';
                    break;
                case 'AGUARDANDO':
                    className = 'bg-orange';
                    break;
                default:
                    className = '';
                    break;
            }


            return (
                <tr key={index} className={className}>
                    <td>{item.nome}</td>
                    <td>{item.cpf}</td>
                    <td>{item.sexo}</td>
                    <td>{item.dataNascimento}</td>
                    <td>
                        <button type='button' className='btn-sm btn-success' title='Selecionar' onClick={() => this.props.selecionarPessoa(item)}>
                            <i className='fa fa-check-circle-o'></i>
                        </button>
                    </td>
                </tr>
            )
        })
    }

    render() {
        return (
            <Panel titulo='Consultar Pessoa' >
                <Row>
                    <div className="box-body">
                        <form role="form">
                            <Row>
                                <Grid cols='12 6 4'>
                                    <div className="form-group">
                                        <div className="radio">
                                            <label>
                                                <input type="radio" name="tipo_pessoa" id="optionsRadios1" defaultValue="B" onChange={(e) => this.onChange(e)} />
                                                Beneficiário (Titulares e Dependentes do SISMEPE)
                                            </label>
                                        </div>
                                        <div className="radio">
                                            <label>
                                                <input type="radio" name="tipo_pessoa" id="optionsRadios2" defaultValue="N" onChange={(e) => this.onChange(e)} />
                                                Não Beneficiário do SISMEPE
                                            </label>
                                        </div>
                                    </div>
                                </Grid>
                            </Row>

                            <If teste={this.state.tipo_pessoa === 'B'}>
                                <Row>
                                    <Grid cols='12 6 2'>
                                        <label>Matrícula</label>
                                        <div className="input-group input-group">
                                            <input type="text" name='matricula' onChange={(e) => this.onChange(e)} value={this.state.matricula} className="form-control" placeholder="Matrícula" />
                                            <span className="input-group-btn">
                                                <button type="button" onClick={(e) => this.consultarPessoa()} className="btn btn-info btn-flat"><i className='fa fa-search'></i></button>
                                            </span>
                                        </div>
                                    </Grid>
                                </Row>
                            </If>

                            <If teste={this.state.tipo_pessoa === 'N'}>
                                <Row>
                                    <Grid cols='12 6 2'>
                                        <label>CPF</label>
                                        <div className="input-group input-group">
                                            <input type="text" name='cpf' onChange={(e) => this.onChange(e)} value={this.state.cpf} className="form-control" placeholder="___.___.___-__" />
                                            <span className="input-group-btn">
                                                <button type="button" onClick={(e) => this.consultarPessoa()} className="btn btn-info btn-flat"><i className='fa fa-search'></i></button>
                                            </span>
                                        </div>
                                    </Grid>
                                </Row>
                            </If>

                            <If teste={this.state.listaPessoas}>
                                <Row>
                                    <Grid cols='12'>
                                        <span><strong>Total: {this.state.listaPessoas ? this.state.listaPessoas.length : 0} registros</strong></span>
                                        <div className='box-body table-responsive no-padding'>
                                            <table className="table table-bordered table-striped table-hover">
                                                <thead>
                                                    <tr>
                                                        <th>Nome</th>
                                                        <th>CPF</th>
                                                        <th>Sexo</th>
                                                        <th>Nascimento</th>
                                                        <th>Ações</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {this.renderRows()}
                                                </tbody>
                                            </table>
                                        </div>
                                        <span><strong>Total: {this.state.listaPessoas ? this.state.listaPessoas.length : 0} registros</strong></span>
                                    </Grid>
                                </Row>
                            </If>

                            <div className="box-footer">
                            </div>
                        </form>
                    </div>
                </Row>
            </Panel>
        )

    }
}

export default PanelConsultaPessoa