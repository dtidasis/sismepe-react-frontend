import React, { Component } from 'react'
import Grid from '../common/layout/grid'
import Row from '../common/layout/row'
import axios from 'axios'
import consts from '../consts'
import ContentHeader from '../common/template/contentHeader'
import Content from '../common/template/content'
import Panel from '../common/components/Panel'

class PainelObitos extends Component {

    constructor(props) {
        super(props)
        this.INITIAL_STATE = {
            nome: '',
            sexo: '',
            unidade: '',
            tipo: '',
            categoria: '',
            corporacao: '',
            situacao: '',
            status: '',
        }
        this.state = this.INITIAL_STATE
    }

    getFiltro() {
        let filtro = `?nome=${this.state.nome}&sexo=${this.state.sexo}&unidade=${this.state.unidade}`;
        filtro += `&tipo=${this.state.tipo}&categoria=${this.state.categoria}&corporacao=${this.state.corporacao}`;
        filtro += `&situacao=${this.state.situacao}&status=${this.state.status}`;
        return filtro;
    }

    consultar() {
        const filtro = this.getFiltro()
        const request = axios.get(`${consts.API_URL}/dashboard/pacientesInternados${filtro}`)
            .then(request => {
                this.setState({ pacientesInternados: request.data })
            })
    }

    componentDidMount() {
        this.consultar()
    }

    onChange(e) {
        if (e.target.name === 'nome') {
            this.setState({ nome: e.target.value })

        } else if (e.target.name === 'sexo') {
            this.setState({ sexo: e.target.value })

        } else if (e.target.name === 'tipo') {
            this.setState({ tipo: e.target.value })

        } else if (e.target.name === 'categoria') {
            this.setState({ categoria: e.target.value })

        } else if (e.target.name === 'corporacao') {
            this.setState({ corporacao: e.target.value })

        } else if (e.target.name === 'situacao') {
            this.setState({ situacao: e.target.value })

        }
    }

    clear(e) {
        this.setState(this.INITIAL_STATE, () => this.consultar())
    }

    renderRows(list = []) {
        return list.map((item, index) => {
            let className = ''
            switch (item.suspeitaCovid) {
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
                    <td>{item.idade}</td>
                    <td>{item.tipo}</td>
                    <td>{item.categoria}</td>
                    <td>{item.corporacao}</td>
                    <td>{item.situacao}</td>
                </tr>
            )
        })
    }

    render() {
        return (

            <div>
                <ContentHeader title='Óbitos' small='Consultar' />
                <Content>
                    <Panel titulo='Óbitos de Pacientes confirmados para COVID-19' >

                        <Grid cols='12'>
                            <div className="box-body">
                                <form role="form">
                                    <Row>
                                        <Grid cols='12 6 4'>
                                            <div className="form-group pull-center">
                                                <h1>Em desenvolvimento</h1>
                                            </div>
                                        </Grid>
                                    </Row>
                                </form>
                            </div>
                        </Grid>
                    </Panel>
                </Content>
            </div>
        )
    }

    render2() {
        return (

            <div>
                <ContentHeader title='Óbitos' small='Consultar' />
                <Content>
                    <Panel titulo='Óbitos de Pacientes confirmados para COVID-19' >

                        <Grid cols='12'>
                            <div className="box-body">
                                <form role="form">
                                    <Row>
                                        <Grid cols='12 6 4'>
                                            <div className="form-group">
                                                <label>Nome</label>
                                                <input type="text" name='nome' onChange={(e) => this.onChange(e)} value={this.state.nome} className="form-control" placeholder="Nome" />
                                            </div>
                                        </Grid>

                                        <Grid cols='12 6 2'>
                                            <div className="form-group">
                                                <label>Sexo</label>
                                                <select className="form-control select2" name='sexo' onChange={(e) => this.onChange(e)} value={this.state.sexo} >
                                                    <option value=''>Selecione</option>
                                                    <option value='M'>Masculino</option>
                                                    <option value='F'>Feminino</option>
                                                </select>
                                            </div>
                                        </Grid>

                                        <Grid cols='12 6 2'>
                                            <div className="form-group">
                                                <label>Tipo</label>
                                                <select className="form-control select2" name='tipo' onChange={(e) => this.onChange(e)} value={this.state.tipo}>
                                                    <option value=''>Selecione</option>
                                                    <option value='TITULAR'>Titular</option>
                                                    <option value='DEPENDENTE'>Dependente</option>
                                                </select>
                                            </div>
                                        </Grid>

                                        <Grid cols='12 6 2'>
                                            <div className="form-group">
                                                <label>Categoria</label>
                                                <select className="form-control select2" name='categoria' onChange={(e) => this.onChange(e)} value={this.state.categoria}>
                                                    <option value=''>Selecione</option>
                                                    <option value='MIL'>Militar</option>
                                                    <option value='FC'>Func. Civil</option>
                                                    <option value='PENS'>Pensionista</option>
                                                </select>
                                            </div>
                                        </Grid>
                                        <Grid cols='12 6 2'>
                                            <div className="form-group">
                                                <label>Corporação</label>
                                                <select className="form-control select2" name='corporacao' onChange={(e) => this.onChange(e)} value={this.state.corporacao}>
                                                    <option value=''>Selecione</option>
                                                    <option value='PM'>PM</option>
                                                    <option value='CBM'>CBM</option>
                                                </select>
                                            </div>
                                        </Grid>
                                    </Row>

                                    <Row>

                                        <Grid cols='12 6 2'>
                                            <div className="form-group">
                                                <label>Situação</label>
                                                <select className="form-control select2" name='situacao' onChange={(e) => this.onChange(e)} value={this.state.situacao}>
                                                    <option value=''>Selecione</option>
                                                    <option value='ATIVO'>Ativo</option>
                                                    <option value='INATIVO'>Inativo</option>
                                                </select>
                                            </div>
                                        </Grid>

                                    </Row>

                                    <Row>
                                        <div className="box-footer">
                                            <button type='button' className='btn btn-primary' onClick={() => this.consultar()}>Consultar</button>
                                            <button type='button' className='btn btn-warning' onClick={(e) => this.clear(e)}>Limpar</button>
                                        </div>
                                    </Row>

                                    <div className="box-footer">
                                    </div>
                                </form>

                                <span><strong>Total: {this.state.pacientesInternados ? this.state.pacientesInternados.length : 0} registros</strong></span>
                                <div className='box-body table-responsive no-padding'>
                                    <table className="table table-bordered table-striped table-hover">
                                        <thead>
                                            <tr>
                                                <th>Nome</th>
                                                <th>Matrícula</th>
                                                <th>Sexo</th>
                                                <th>Idade</th>
                                                <th>Tipo</th>
                                                <th>Categoria</th>
                                                <th>Corporação</th>
                                                <th>Situação</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.renderRows(this.state.pacientesInternados)}
                                        </tbody>
                                    </table>
                                </div>
                                <span><strong>Total: {this.state.pacientesInternados ? this.state.pacientesInternados.length : 0} registros</strong></span>
                            </div>
                        </Grid>

                    </Panel>
                </Content>
            </div>

        )
    }
}

export default PainelObitos