import React, { Component } from 'react'
import ContentHeader from '../common/template/contentHeader'
import { toastr } from 'react-redux-toastr'
import Content from '../common/template/content'
import Panel from '../common/components/Panel'
import Row from '../common/layout/row'
import Grid from '../common/layout/grid'
import consts from '../consts'
import axios from 'axios'
import { Link } from 'react-router'

class SuspeitaCovidList extends Component {

    constructor(props) {
        super(props)
        this.INITIAL_STATE = {
            filtro: {
                nome: '',
                sexo: '',
                tipo: '',
                categoria: '',
                corporacao: '',
                situacao: '',
                status: '',
                obito: '',
                matricula: '',
                dataInicio: '',
                dataFim: '',
                displayBasic: false,
            displayBasic2: false,
            displayBlockScroll: false,
            displayModal: false,
            displayMaximizable: false,
            displayPosition: false,
            position: 'center'
            },
            lista: []
        }
        this.state = this.INITIAL_STATE
    }

    componentDidMount() {
        $("#data_inicio").inputmask("dd/mm/yyyy", { "placeholder": "dd/mm/aaaa" });
        $("#data_fim").inputmask("dd/mm/yyyy", { "placeholder": "dd/mm/aaaa" });
        this.consultar();
    }

    clear() {
        $("#data_inicio").val('')
        $("#data_fim").val('')
        this.setState(this.INITIAL_STATE, () => this.consultar())
    }

    consultar() {
        const filtro = this.state.filtro;
        const url = `${consts.API_URL}/teste-pcr/filtro`;
        const request = axios.post(url, filtro)
            .then(request => {
                this.setState({ lista: request.data })
            })
    }

    onChange(e) {
        let filtro = { ...this.state.filtro }
        if (e.target.name === 'nome') {
            filtro.nome = e.target.value;

        } else if (e.target.name === 'sexo') {
            filtro.sexo = e.target.value;

        } else if (e.target.name === 'tipo') {
            filtro.tipo = e.target.value;

        } else if (e.target.name === 'categoria') {
            filtro.categoria = e.target.value;

        } else if (e.target.name === 'corporacao') {
            filtro.corporacao = e.target.value;

        } else if (e.target.name === 'situacao') {
            filtro.situacao = e.target.value;

        } else if (e.target.name === 'status') {
            filtro.status = e.target.value;

        } else if (e.target.name === 'obito') {
            filtro.obito = e.target.value;

        } else if (e.target.name === 'matricula') {
            filtro.matricula = e.target.value;
        }
        this.setState({ ...this.state, filtro })
    }

    changeDate(e) {
        if (e.target.name === 'data_inicio') {
            let filtro = { ...this.state.filtro }
            filtro.dataInicio = e.target.value;
            this.setState({ ...this.state, filtro })
        }

        if (e.target.name === 'data_fim') {
            let filtro = { ...this.state.filtro }
            filtro.dataFim = e.target.value;
            this.setState({ ...this.state, filtro })
        }
    }

    excluir(entity) {
        let url = `${consts.API_URL}/teste-pcr/${entity.id}`;
        axios.delete(url)
            .then(request => {
                toastr.success('Mensagem', 'Registro exclu??do com sucesso!')
                this.consultar()
            })
            .catch(e => {
                toastr.error('Erro', e.response.data.message)
            })
    }

    renderRows(list = []) {
        return this.state.lista.map((item, index) => {

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
                    <td>{item.matricula}</td>
                    <td>{item.sexo}</td>
                    <td>{item.dataNascimento}</td>
                    <td>{item.tipo}</td>
                    <td>{item.categoria}</td>
                    <td>{item.corporacao}</td>
                    <td>{item.situacao}</td>
                    <td>{item.dataColetaExame}</td>
                    <td>{item.dataResultadoExame}</td>
                    <td>{item.status}</td>
                    <td>
                        <Link
                            to={`/testePCREdit?id=${item.id}`}>
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

    render() {
        return (
            <div>
                <ContentHeader title='Teste PCR COVID-19' small='Consultar' />
                <Content>
                    <Panel titulo='Teste PCR COVID-19' >
                        <Row>

                            <div className="box-body">
                                <form role="form">
                                    <Row>
                                        <Grid cols='12 6 4'>
                                            <div className="form-group">
                                                <label>Nome</label>
                                                <input type="text" name='nome' onChange={(e) => this.onChange(e)} value={this.state.filtro.nome} className="form-control" placeholder="Nome" />
                                            </div>
                                        </Grid>

                                        <Grid cols='12 6 2'>
                                            <div className="form-group">
                                                <label>Matr??cula</label>
                                                <input type="text" name='matricula' onChange={(e) => this.onChange(e)} value={this.state.filtro.matricula} className="form-control" placeholder="Matr??cula" />
                                            </div>
                                        </Grid>

                                        <Grid cols='12 6 2'>
                                            <div className="form-group">
                                                <label>Sexo</label>
                                                <select className="form-control select2" name='sexo' onChange={(e) => this.onChange(e)} value={this.state.filtro.sexo} >
                                                    <option value=''>Selecione</option>
                                                    <option value='M'>Masculino</option>
                                                    <option value='F'>Feminino</option>
                                                </select>
                                            </div>
                                        </Grid>

                                        <Grid cols='12 6 2'>
                                            <div className="form-group">
                                                <label>Tipo</label>
                                                <select className="form-control select2" name='tipo' onChange={(e) => this.onChange(e)} value={this.state.filtro.tipo}>
                                                    <option value=''>Selecione</option>
                                                    <option value='TITULAR'>Titular</option>
                                                    <option value='DEPENDENTE'>Dependente</option>
                                                    <option value='OUTROS'>Outros</option>
                                                </select>
                                            </div>
                                        </Grid>

                                        <Grid cols='12 6 2'>
                                            <div className="form-group">
                                                <label>Categoria</label>
                                                <select className="form-control select2" name='categoria' onChange={(e) => this.onChange(e)} value={this.state.filtro.categoria}>
                                                    <option value=''>Selecione</option>
                                                    <option value='MIL'>Militar</option>
                                                    <option value='FC'>Func. Civil</option>
                                                    <option value='PENS'>Pensionista</option>
                                                </select>
                                            </div>
                                        </Grid>

                                    </Row>

                                    <Row>
                                        <Grid cols='12 6 2'>
                                            <div className="form-group">
                                                <label>Corpora????o</label>
                                                <select className="form-control select2" name='corporacao' onChange={(e) => this.onChange(e)} value={this.state.filtro.corporacao}>
                                                    <option value=''>Selecione</option>
                                                    <option value='PM'>PM</option>
                                                    <option value='CBM'>CBM</option>
                                                </select>
                                            </div>
                                        </Grid>
                                        <Grid cols='12 6 2'>
                                            <div className="form-group">
                                                <label>Situa????o</label>
                                                <select className="form-control select2" name='situacao' onChange={(e) => this.onChange(e)} value={this.state.filtro.situacao}>
                                                    <option value=''>Selecione</option>
                                                    <option value='ATIVO'>Ativo</option>
                                                    <option value='INATIVO'>Inativo</option>
                                                </select>
                                            </div>
                                        </Grid>

                                        <Grid cols='12 6 2'>
                                            <div className="form-group">
                                                <label>Resultado</label>
                                                <select className="form-control select2" name='status' onChange={(e) => this.onChange(e)} value={this.state.filtro.status}>
                                                    <option value=''>Selecione</option>
                                                    <option value='AGUARDANDO'>Aguardando Resultado</option>
                                                    <option value='POSITIVO'>Positivo</option>
                                                    <option value='NEGATIVO'>Negativo</option>
                                                </select>
                                            </div>
                                        </Grid>

                                        <Grid cols='6 6 3'>
                                            <div className="form-group">
                                                <label>Data Inicial</label>
                                                <div className="input-group date">
                                                    <div className="input-group-addon">
                                                        <i className="fa fa-calendar" />
                                                    </div>
                                                    <input id='data_inicio' name='data_inicio' type="text" value={this.state.data} onKeyUp={(e) => this.changeDate(e)} className="form-control" data-inputmask="'alias': 'dd/mm/yyyy'" data-mask></input>
                                                </div>
                                            </div>
                                        </Grid>

                                        <Grid cols='6 6 3'>
                                            <div className="form-group">
                                                <label>Data Final</label>
                                                <div className="input-group date">
                                                    <div className="input-group-addon">
                                                        <i className="fa fa-calendar" />
                                                    </div>
                                                    <input id='data_fim' name='data_fim' type="text" value={this.state.data} onKeyUp={(e) => this.changeDate(e)} className="form-control" data-inputmask="'alias': 'dd/mm/yyyy'" data-mask></input>
                                                </div>
                                            </div>
                                        </Grid>
                                    </Row>

                                    <div className="box-footer">
                                        <button type='button' className='btn btn-primary' onClick={() => this.consultar()}>Consultar</button>
                                        <button type='button' className='btn btn-warning' onClick={(e) => this.clear(e)}>Limpar</button>
                                        <Link to='testePCREdit'>
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
                                                        <th>Nome</th>
                                                        <th>Matr??cula</th>
                                                        <th>Sexo</th>
                                                        <th>Nascimento</th>
                                                        <th>Tipo</th>
                                                        <th>Categoria</th>
                                                        <th>Corpora????o</th>
                                                        <th>Situa????o</th>
                                                        <th>Data da Coleta</th>
                                                        <th>Data Resultado</th>
                                                        <th>Resultado</th>
                                                        <th>A????es</th>
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
export default SuspeitaCovidList