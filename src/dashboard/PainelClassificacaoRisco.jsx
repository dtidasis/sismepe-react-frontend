import React, { Component } from 'react'
import axios from 'axios'
import CollapsablePanel from '../common/components/CollapsablePanel'
import Row from '../common/layout/row'
import Grid from '../common/layout/grid'
import consts from '../consts'
import ContentHeader from '../common/template/contentHeader'
import Content from '../common/template/content'
import Panel from '../common/components/Panel'

class PainelClassificacaoRisco extends Component {

    constructor(props) {
        super(props)

        this.INITIAL_STATE = {
            nome: '',
            sexo: '',
            tipo: '',
            categoria: '',
            corporacao: '',
            situacao: '',
            turno: '',
            data: new Date().toLocaleDateString()
        }

        this.state = this.INITIAL_STATE
    }

    changeDate(e) {
        this.setState({ data: e.target.value })
    }

    getFiltro() {
        let filtro = `?data=${this.state.data}&nome=${this.state.nome}&sexo=${this.state.sexo}&unidade=${this.state.unidade}`;
        filtro += `&tipo=${this.state.tipo}&categoria=${this.state.categoria}&corporacao=${this.state.corporacao}`;
        filtro += `&situacao=${this.state.situacao}&turno=${this.state.turno}`;
        return filtro;
    }

    gerarPDF() {
        const filtro = this.getFiltro()
        axios({
            url: `${consts.API_URL}/dashboard/downloadClassificacaoRisco${filtro}`,
            method: 'GET',
            responseType: 'blob', // important
          }).then((response) => {
             const url = window.URL.createObjectURL(new Blob([response.data]));
             const link = document.createElement('a');
             link.href = url;
             link.setAttribute('download', 'Classificacao_Risco.pdf');
             document.body.appendChild(link);
             link.click();
          });
    }

    consultar() {
        const filtro = this.getFiltro();
        const url = `${consts.API_URL}/dashboard/classificacao${filtro}`;
        const request = axios.get(url)
            .then(request => {
                this.setState({ pacientes: request.data })
            })
    }

    onChange(e) {
        if (e.target.name === 'nome') {
            this.setState({ nome: e.target.value })

        } else if (e.target.name === 'sexo') {
            this.setState({ sexo: e.target.value })

        } else if (e.target.name === 'unidade') {
            this.setState({ unidade: e.target.value })

        } else if (e.target.name === 'tipo') {
            this.setState({ tipo: e.target.value })

        } else if (e.target.name === 'categoria') {
            this.setState({ categoria: e.target.value })

        } else if (e.target.name === 'corporacao') {
            this.setState({ corporacao: e.target.value })

        } else if (e.target.name === 'situacao') {
            this.setState({ situacao: e.target.value })

        } else if (e.target.name === 'turno') {
            this.setState({ turno: e.target.value })

        }
    }

    clear(e) {
        this.setState(this.INITIAL_STATE, () => this.consultar())
    }

    componentWillMount() {
        this.consultar();
    }

    componentDidMount() {
        $("#datemask").inputmask("dd/mm/yyyy", { "placeholder": "dd/mm/aaaa" });
    }

    renderRows(list = []) {
        return list.map((item, index) => {
            return (
                <tr key={index} >
                    <td>{item.nome}</td>
                    <td>{item.matricula}</td>
                    <td>{item.sexo}</td>
                    <td>{item.idade}</td>
                    <td>{item.tipo}</td>
                    <td>{item.categoria}</td>
                    <td>{item.corporacao}</td>
                    <td>{item.situacao}</td>
                    <td>{item.turno}</td>
                </tr>
            )
        })
    }

    render() {
        return (
            <div>
                <ContentHeader title='Classificação de Risco Por Plantão' small='Consultar' />
                <Content>
                    <Panel titulo='Classificação de Risco Por Plantão'>

                    <div className="box-body">
                    <form role="form">
                        <Row>
                            <Grid cols='6 6 3'>
                                <div className="form-group">
                                    <label>Data:</label>
                                    <div className="input-group date">
                                        <div className="input-group-addon">
                                            <i className="fa fa-calendar" />
                                        </div>
                                        <input id='datemask' type="text" value={this.state.data} onKeyPress={(e) => this.changeDate(e)} className="form-control" data-inputmask="'alias': 'dd/mm/yyyy'" data-mask></input>
                                    </div>
                                </div>
                            </Grid>
                        </Row>
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

                            <Grid cols='12 6 2'>
                                <div className="form-group">
                                    <label>Turno</label>
                                    <select className="form-control select2" name='turno' onChange={(e) => this.onChange(e)} value={this.state.turno}>
                                        <option value=''>Selecione</option>
                                        <option value='D'>Diurno</option>
                                        <option value='N'>Noturno</option>
                                    </select>
                                </div>
                            </Grid>
                        </Row>

                        <Row>
                            <div className="box-footer">
                                <button type='button' className='btn btn-primary' onClick={() => this.consultar()}>Consultar</button>
                                <button type='button' className='btn btn-warning' onClick={(e) => this.clear(e)}>Limpar</button>
                                <button type='button' className='btn btn-default' onClick={(e) => this.gerarPDF()}>Gerar PDF</button>
                            </div>
                        </Row>

                        <div className="box-footer">
                        </div>
                    </form>

                    <Row>
                        <Grid cols='12'>
                            <span><strong>Total: {this.state.pacientes ? this.state.pacientes.length : 0} registros</strong></span>
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
                                            <th>Turno</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.renderRows(this.state.pacientes)}
                                    </tbody>
                                </table>
                            </div>
                            <span><strong>Total: {this.state.pacientes ? this.state.pacientes.length : 0} registros</strong></span>
                        </Grid>

                    </Row>
                </div>
                        
                    </Panel>
                    </Content>
                    </div>
            
        )
    }
}

export default PainelClassificacaoRisco