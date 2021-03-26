import React, { Component } from 'react'
import { toastr } from 'react-redux-toastr'
import ContentHeader from '../common/template/contentHeader'
import Content from '../common/template/content'
import Panel from '../common/components/Panel'
import Row from '../common/layout/row'
import Grid from '../common/layout/grid'
import consts from '../consts'
import axios from 'axios'

class SuspeitaCovidEdit extends Component {

    constructor(props) {
        super(props)
        this.INITIAL_STATE = {
            entity: {
                ativo: 'S',
                positivo: '',
                atendimento: {
                    id: null,
                    paciente: {
                        id: null,
                        pessoa: { id: null }
                    },
                    motivoAlta: {
                        id: null,
                        tipo: ''
                    }
                },
                dataColetaExame: null,
                dataResultadoExame: null
            }
        }
        this.state = this.INITIAL_STATE;
    }

    componentDidMount() {
        $("#data_coleta").inputmask("dd/mm/yyyy", { "placeholder": "dd/mm/aaaa" });
        $("#data_resultado").inputmask("dd/mm/yyyy", { "placeholder": "dd/mm/aaaa" });
        $("#data_alta").inputmask("dd/mm/yyyy", { "placeholder": "dd/mm/aaaa" });

        const id = this.props.location.query.id;
        if (id) {
            this.buscarRegistro(id);
        }
    }

    salvar() {
        const entity = this.state.entity;
        const method = entity.id ? 'put' : 'post'
        let url = `${consts.API_URL}/suspeita-covid`;

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
        $("#data_coleta").val('')
        $("#data_resultado").val('')
        $("#data_alta").val('')
    }

    onChange(e) {
        if (e.target.name === 'positivo') {
            let entity = { ...this.state.entity }
            entity.positivo = e.target.value;
            this.setState({ ...this.state, entity })
        }
    }

    changeDate(e) {
        if (e.target.name === 'data_coleta') {
            let entity = { ...this.state.entity }
            entity.dataColetaExame = e.target.value;
            this.setState({ ...this.state, entity })
        }

        if (e.target.name === 'data_resultado') {
            let entity = { ...this.state.entity }
            entity.dataResultadoExame = e.target.value;
            this.setState({ ...this.state, entity })
        }
    }

    buscarRegistro(id) {
        const url = `${consts.API_URL}/suspeita-covid/${id}`;
        const request = axios.get(url)
            .then(request => {
                const entity = request.data
                this.setState({ ...this.state, entity })
                $("#data_coleta").val(this.state.entity.dataColetaExame)
                $("#data_resultado").val(this.state.entity.dataResultadoExame)
                $("#data_alta").val(this.state.entity.atendimento.dataFinalizacao)
            })
    }

    goBack() {
        window.history.back();
    }

    render() {
        return (
            <div>
                <ContentHeader title='Suspeitas COVID-19' small='Consultar' />
                <Content>
                    <Panel titulo='Suspeitas COVID-19' >
                        <Row>
                            <div className="box-body">
                                <form role="form">
                                    <Row>
                                        <Grid cols='12 12 6'>
                                            <div className="form-group">
                                                <label>Pessoa</label>
                                                <input type="text" name='nome' value={this.state.entity.atendimento.paciente.pessoa.nome} className="form-control" readOnly='true' />
                                            </div>
                                        </Grid>
                                    </Row>

                                    <Row>
                                        <Grid cols='6 6 3'>
                                            <div className="form-group">
                                                <label>Data da Coleta</label>
                                                <div className="input-group date">
                                                    <div className="input-group-addon">
                                                        <i className="fa fa-calendar" />
                                                    </div>
                                                    <input id='data_coleta' name='data_coleta' type="text" value={this.state.data} onKeyUp={(e) => this.changeDate(e)} className="form-control" data-inputmask="'alias': 'dd/mm/yyyy'" data-mask></input>
                                                </div>
                                            </div>
                                        </Grid>

                                        <Grid cols='6 6 3'>
                                            <div className="form-group">
                                                <label>Data do Resultado</label>
                                                <div className="input-group date">
                                                    <div className="input-group-addon">
                                                        <i className="fa fa-calendar" />
                                                    </div>
                                                    <input id='data_resultado' name='data_resultado' type="text" value={this.state.data} onKeyUp={(e) => this.changeDate(e)} className="form-control" data-inputmask="'alias': 'dd/mm/yyyy'" data-mask></input>
                                                </div>
                                            </div>
                                        </Grid>

                                        <Grid cols='12 6 3'>
                                            <div className="form-group">
                                                <label>Positivo</label>
                                                <select className="form-control select2" name='positivo' onChange={(e) => this.onChange(e)} value={this.state.entity.positivo}>
                                                    <option value={null}>Selecione</option>
                                                    <option value='S'>Sim</option>
                                                    <option value='N'>Não</option>
                                                </select>
                                            </div>
                                        </Grid>
                                    </Row>

                                    <Row>
                                        <Grid cols='6 6 3'>
                                            <div className="form-group">
                                                <label>Data da Alta</label>
                                                <div className="input-group date">
                                                    <div className="input-group-addon">
                                                        <i className="fa fa-calendar" />
                                                    </div>
                                                    <input id='data_alta' name='data_alta' type="text" value={this.state.data} onKeyUp={(e) => this.changeDate(e)} className="form-control" data-inputmask="'alias': 'dd/mm/yyyy'" data-mask readOnly></input>
                                                </div>
                                            </div>
                                        </Grid>

                                        <Grid cols='12 12 6'>
                                            <div className="form-group">
                                                <label>Motivo da Alta</label>
                                                <input type="text" name='nome' value={this.state.entity.atendimento.motivoAlta ? this.state.entity.atendimento.motivoAlta.descricao : ''} className="form-control" readOnly />
                                            </div>
                                        </Grid>
                                    </Row>

                                    <div className="box-footer">
                                        <button type='button' className='btn btn-primary' onClick={() => this.salvar()}>Salvar</button>
                                        
                                            <button type='button' className='btn btn-warning' onClick={() => this.goBack()}>Consultar</button>
                                        
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
export default SuspeitaCovidEdit