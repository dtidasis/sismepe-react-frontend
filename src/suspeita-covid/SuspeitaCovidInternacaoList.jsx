import React, { Component } from 'react'
import ContentHeader from '../common/template/contentHeader'
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
                tipoConsulta: 'I'
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
        const url = `${consts.API_URL}/suspeita-covid/filtro`;
        const request = axios.post(url, filtro)
            .then(request => {
                this.setState({ lista: request.data })
            })
    }

    gerarPDF() {
        const filtro = this.state.filtro;
        axios({
            url: `${consts.API_URL}/suspeita-covid/downloadSuspeitasCovid`,
            method: 'POST',
            responseType: 'blob', // important
            data: filtro
          }).then((response) => {
             const url = window.URL.createObjectURL(new Blob([response.data]));
             const link = document.createElement('a');
             link.href = url;
             link.setAttribute('download', 'Suspeitas_Covid.pdf');
             document.body.appendChild(link);
             link.click();
          });
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
                    <td>{item.idade}</td>
                    <td>{item.tipo}</td>
                    <td>{item.categoria}</td>
                    <td>{item.corporacao}</td>
                    <td>{item.situacao}</td>
                    <td>{item.dataColetaExame}</td>
                    <td>{item.dataResultadoExame}</td>
                    <td>{item.status}</td>
                    <td>{item.tipoMotivoAlta === 'O' ? 'S' : 'N'}</td>
                    <td>
                        <Link
                            to={`/suspeitaEdit?id=${item.id}`}>
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
                <ContentHeader title='Suspeitas COVID-19' small='Consultar' />
                <Content>
                    <Panel titulo='Suspeitas COVID-19 - Internação' >
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
                                                <label>Matrícula</label>
                                                <input type="text" name='matricula' onChange={(e) => this.onChange(e)} value={this.state.filtro.matricula} className="form-control" placeholder="Matrícula" />
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
                                                <label>Corporação</label>
                                                <select className="form-control select2" name='corporacao' onChange={(e) => this.onChange(e)} value={this.state.filtro.corporacao}>
                                                    <option value=''>Selecione</option>
                                                    <option value='PM'>PM</option>
                                                    <option value='CBM'>CBM</option>
                                                </select>
                                            </div>
                                        </Grid>
                                        <Grid cols='12 6 2'>
                                            <div className="form-group">
                                                <label>Situação</label>
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
                                                    <option value='SUSPEITO'>Não Coletado</option>
                                                </select>
                                            </div>
                                        </Grid>

                                        <Grid cols='12 6 2'>
                                            <div className="form-group">
                                                <label>Óbito</label>
                                                <select className="form-control select2" name='obito' onChange={(e) => this.onChange(e)} value={this.state.filtro.obito}>
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
                                        <button type='button' className='btn btn-default' onClick={(e) => this.gerarPDF()}>Gerar PDF</button>
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
                                                        <th>Matrícula</th>
                                                        <th>Sexo</th>
                                                        <th>Idade</th>
                                                        <th>Tipo</th>
                                                        <th>Categoria</th>
                                                        <th>Corporação</th>
                                                        <th>Situação</th>
                                                        <th>Data da Coleta</th>
                                                        <th>Data Resultado</th>
                                                        <th>Resultado</th>
                                                        <th>Óbito</th>
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
export default SuspeitaCovidList