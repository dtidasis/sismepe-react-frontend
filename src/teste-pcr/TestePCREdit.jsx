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
import If from '../common/operador/if'
import Endereco from '../common/components/Endereco'

class TestePCREdit extends Component {

    constructor(props) {
        super(props)
        this.INITIAL_ENTITY = {
            id: '',
            ativo: 'S',
            positivo: '',
            pessoa: { id: null },
            setor: { id: null },
            operativa: { id: null },
            nome: '',
            nomeMae: '',
            cpf: '',
            telefone: '',
            numeroGAL: '',
            dataColetaExame: '',
            dataResultadoExame: '',
            dataNascimento: '',
            sexo: '',
            cep: '',
            logradouro: '',
            bairro: '',
            cidade: '',
            uf: '',
            numero: '',
            complemento: ''
        }
        this.INITIAL_STATE = {
            matricula: '',
            cpfFiltro: '',
            listaPessoas: [],
            listaSetores: [],
            listaOperativas: [],
            entity: this.INITIAL_ENTITY
        }
        this.state = this.INITIAL_STATE;
    }

    componentDidMount() {
        $("#data_coleta").inputmask("dd/mm/yyyy", { "placeholder": "dd/mm/aaaa" });
        $("#data_resultado").inputmask("dd/mm/yyyy", { "placeholder": "dd/mm/aaaa" });
        $("#data_nascimento").inputmask("dd/mm/yyyy", { "placeholder": "dd/mm/aaaa" });

        const id = this.props.location.query.id;
        if (id) {
            this.buscarRegistro(id);
        }

        this.consultarSetores();
        this.consultarOperativas();
    }

    toMask() {
        $("#data_nascimento").inputmask("dd/mm/yyyy", { "placeholder": "dd/mm/aaaa" });
    }

    salvar() {
        const entity = this.state.entity;
        const method = entity.id ? 'put' : 'post'
        let url = `${consts.API_URL}/teste-pcr`;

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
        $("#data_nascimento").val('')
    }

    onChange(e) {
        if (e.target.name === 'matricula') {
            this.setState({ matricula: e.target.value })

        } else if (e.target.name === 'cpf_filtro') {
            this.setState({ ...this.state, cpfFiltro: e.target.value })

        } else if (e.target.name === 'pessoa') {
            let entity = { ...this.state.entity }
            entity.pessoa.id = e.target.value;
            entity.nome = '';
            this.setState({ ...this.state, entity })

        } else if (e.target.name === 'nome') {
            let entity = { ...this.state.entity }
            entity.nome = e.target.value;
            this.setState({ ...this.state, entity })

        } else if (e.target.name === 'nomeMae') {
            let entity = { ...this.state.entity }
            entity.nomeMae = e.target.value;
            this.setState({ ...this.state, entity })

        } else if (e.target.name === 'positivo') {
            let entity = { ...this.state.entity }
            entity.positivo = e.target.value;
            this.setState({ ...this.state, entity })

        } else if (e.target.name === 'sexo') {
            let entity = { ...this.state.entity }
            entity.sexo = e.target.value;
            this.setState({ ...this.state, entity })

        } else if (e.target.name === 'telefone') {
            let entity = { ...this.state.entity }
            entity.telefone = e.target.value;
            this.setState({ ...this.state, entity })

        } else if (e.target.name === 'cpf') {
            let entity = { ...this.state.entity }
            entity.cpf = e.target.value;
            this.setState({ ...this.state, entity })

        } else if (e.target.name === 'setor') {
            let entity = { ...this.state.entity }
            entity.setor.id = e.target.value;
            this.setState({ ...this.state, entity })

        } else if (e.target.name === 'operativa') {
            let entity = { ...this.state.entity }
            entity.operativa.id = e.target.value;
            this.setState({ ...this.state, entity })

        } else if (e.target.name === 'gal') {
            let entity = { ...this.state.entity }
            entity.numeroGAL = e.target.value;
            this.setState({ ...this.state, entity })

        } else if (e.target.name === 'tipoPessoa') {
            const entity = this.INITIAL_ENTITY
            entity.setor.id = null;
            entity.pessoa.id = null;
            this.setState({ ...this.state, entity, tipoPessoa: e.target.value, matricula: '' })
            $("#data_coleta").val('')
            $("#data_resultado").val('')
            $("#data_nascimento").val('')
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

        if (e.target.name === 'data_nascimento') {
            let entity = { ...this.state.entity }
            entity.dataNascimento = e.target.value;
            this.setState({ ...this.state, entity })
        }
    }

    consultarPessoa() {
        const url = `${consts.API_URL}/dashboard/${this.state.matricula}`;
        const request = axios.get(url)
            .then(request => {
                if (request.data.length === 0) {
                    toastr.error('Erro', 'Matrícula não encontrada.')
                }
                let entity = { ...this.state.entity }
                entity.pessoa.id = null;
                entity.nome = '';
                this.setState({ ...this.state, listaPessoas: request.data, entity, cpfFiltro: '' })
            })
    }

    consultarPessoaCpf() {
        const url = `${consts.API_URL}/dashboard/cpf/${this.state.cpfFiltro}`;
        const request = axios.get(url)
            .then(request => {
                if (request.data.length === 0) {
                    toastr.error('Erro', 'CPF não encontrado.')
                }
                let entity = { ...this.state.entity }
                entity.pessoa.id = null;
                entity.nome = '';
                this.setState({ ...this.state, listaPessoas: [request.data], entity, matricula: '' })
            })
    }

    consultarSetores() {
        const filtro = {};
        const url = `${consts.API_URL}/setor-pessoa-teste/filtro`;
        const request = axios.post(url, filtro)
            .then(request => {
                this.setState({ listaSetores: request.data })
            })
    }

    consultarOperativas() {
        const filtro = {};
        const url = `${consts.API_URL}/operativa-pessoa-teste/filtro`;
        const request = axios.post(url, filtro)
            .then(request => {
                this.setState({ listaOperativas: request.data })
            })
    }

    buscarRegistro(id) {
        const url = `${consts.API_URL}/teste-pcr/${id}`;
        const request = axios.get(url)
            .then(request => {
                const entity = request.data

                if (!entity.setor) {
                    entity.setor = { id: null }
                }

                if (!entity.operativa) {
                    entity.operativa = { id: null }
                }

                let tipoPessoa = 'S'

                if (!entity.pessoa) {
                    entity.pessoa = { id: null }
                    tipoPessoa = 'N'
                }
                this.setState({ ...this.state, entity, tipoPessoa })

                $("#data_coleta").val(this.state.entity.dataColetaExame)
                $("#data_resultado").val(this.state.entity.dataResultadoExame)
                $("#data_nascimento").val(this.state.entity.dataNascimento)
            })
    }

    renderOptions() {
        return (this.state.listaPessoas.map((p, index) => (
            <option key={index} value={p.codigoPessoa}>{p.nome} - {p.tipo}</option>
        )))
    }

    carregarSetores() {
        if (this.state.listaSetores) {
            return (this.state.listaSetores.map((p, index) => (
                <option key={index} value={p.id}>{p.descricao}</option>
            )))
        }
    }

    carregarOperativas() {
        if (this.state.listaSetores) {
            return (this.state.listaOperativas.map((p, index) => (
                <option key={index} value={p.id}>{p.descricao}</option>
            )))
        }
    }

    setEndereco(endereco) {
        let entity = { ...this.state.entity }
        entity.cep = endereco.cep;
        if (entity.cep) {
            entity.cep = entity.cep.replace('-', '');
        }
        entity.logradouro = endereco.logradouro;
        entity.bairro = endereco.bairro;
        entity.cidade = endereco.cidade;
        entity.uf = endereco.uf;
        entity.numero = endereco.numero;
        entity.complemento = endereco.complemento;
        this.setState({ ...this.state, entity, endereco })
    }

    render() {
        return (
            <div>
                <ContentHeader title='Teste PCR COVID-19' small='Cadastrar' />
                <Content>
                    <Panel titulo='Teste PCR COVID-19' >
                        <Row>
                            <div className="box-body">
                                <form role="form">
                                    <If teste={!this.state.entity.id}>
                                        <Row>
                                            <Grid cols='12 6 2'>
                                                <label>Tipo</label>
                                                <div className="input-group input-group">
                                                    <div className="form-group">
                                                        <div>
                                                            <div className="radio">
                                                                <label>
                                                                    <input type="radio" onChange={(e) => this.onChange(e)} name="tipoPessoa" defaultValue="B" />
                                                                    Beneficiário
                                                            </label>
                                                            </div>
                                                            <div className="radio">
                                                                <label>
                                                                    <input type="radio" onChange={(e) => this.onChange(e)} name="tipoPessoa" defaultValue="N" />
                                                                Não Beneficiário
                                                            </label>
                                                            </div>

                                                        </div>
                                                    </div>
                                                </div>

                                            </Grid>
                                        </Row>
                                    </If>

                                    <If teste={!this.state.entity.id}>
                                        <If teste={this.state.tipoPessoa === 'B'}>
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

                                                <Grid cols='12 6 3'>
                                                    <label>CPF</label>
                                                    <div className="input-group input-group">
                                                        <input type="text" name='cpf_filtro' onChange={(e) => this.onChange(e)} value={this.state.cpfFiltro} className="form-control" placeholder="CPF" />
                                                        <span className="input-group-btn">
                                                            <button type="button" onClick={(e) => this.consultarPessoaCpf()} className="btn btn-info btn-flat"><i className='fa fa-search'></i></button>
                                                        </span>
                                                    </div>
                                                </Grid>

                                                <Grid cols='12 6 5'>
                                                    <div className="form-group">
                                                        <label>Pessoa</label>
                                                        <select className="form-control select2" name='pessoa' onChange={(e) => this.onChange(e)} value={this.state.entity.pessoa.id || ''}>
                                                            <option value=''>Selecione</option>
                                                            {this.renderOptions()}
                                                        </select>
                                                    </div>
                                                </Grid>
                                            </Row>
                                        </If>
                                    </If>

                                    <If teste={this.state.entity.id && this.state.entity.pessoa.nome}>
                                        <Row>
                                            <Grid cols='12 12 6'>
                                                <div className="form-group">
                                                    <label>Nome</label>
                                                    <input type="text" name='nome' onChange={(e) => this.onChange(e)} value={this.state.entity.pessoa.nome} className="form-control" readOnly />
                                                </div>
                                            </Grid>
                                        </Row>
                                    </If>

                                    <If teste={(this.state.tipoPessoa === 'N')}>
                                        <div>
                                            <Row>
                                                <Grid cols='12 6 3'>
                                                    <div className="form-group">
                                                        <label>CPF</label>
                                                        <input type="text" name='cpf' onChange={(e) => this.onChange(e)} value={this.state.entity.cpf} className="form-control" />
                                                    </div>
                                                </Grid>
                                            </Row>

                                            <Row>
                                                <Grid cols='12 12 6'>
                                                    <div className="form-group">
                                                        <label>Nome</label>
                                                        <input type="text" name='nome' onChange={(e) => this.onChange(e)} value={this.state.entity.nome} className="form-control" />
                                                    </div>
                                                </Grid>

                                                <Grid cols='6 6 3'>
                                                    <div className="form-group">
                                                        <label>Data da Nascimento</label>
                                                        <div className="input-group date">
                                                            <div className="input-group-addon">
                                                                <i className="fa fa-calendar" />
                                                            </div>
                                                            <input id='data_nascimento' name='data_nascimento' type="text" value={this.state.data} onKeyUp={(e) => this.changeDate(e)} className="form-control" data-inputmask="'alias': 'dd/mm/yyyy'" data-mask onClick={() => this.toMask()}></input>
                                                        </div>
                                                    </div>
                                                </Grid>

                                                <Grid cols='12 6 3'>
                                                    <div className="form-group">
                                                        <label>Sexo</label>
                                                        <select className="form-control select2" name='sexo' onChange={(e) => this.onChange(e)} value={this.state.entity.sexo || ''}>
                                                            <option value=''>Selecione</option>
                                                            <option value='M'>Masculino</option>
                                                            <option value='F'>Feminino</option>
                                                        </select>
                                                    </div>
                                                </Grid>

                                                <Grid cols='12 12 6'>
                                                    <div className="form-group">
                                                        <label>Nome da Mãe</label>
                                                        <input type="text" name='nomeMae' onChange={(e) => this.onChange(e)} value={this.state.entity.nomeMae} className="form-control" />
                                                    </div>
                                                </Grid>
                                            </Row>
                                        </div>
                                    </If>

                                    <Row>
                                        <Grid cols='12 12 12'>
                                            <Endereco onEnderecoRetornado={(end) => this.setEndereco(end)}
                                                cep={this.state.entity.cep}
                                                logradouro={this.state.entity.logradouro}
                                                numero={this.state.entity.numero}
                                                complemento={this.state.entity.complemento}
                                                cidade={this.state.entity.cidade}
                                                bairro={this.state.entity.bairro}
                                                uf={this.state.entity.uf}>
                                            </Endereco>
                                        </Grid>
                                    </Row>


                                    <Row>
                                        <Grid cols='12 6 3'>
                                            <div className="form-group">
                                                <label>Telefone</label>
                                                <input type="text" name='telefone' onChange={(e) => this.onChange(e)} value={this.state.entity.telefone} className="form-control" />
                                            </div>
                                        </Grid>

                                        <Grid cols='12 6 3'>
                                            <div className="form-group">
                                                <label>Setor</label>
                                                <select className="form-control select2" name='setor' onChange={(e) => this.onChange(e)} value={this.state.entity.setor.id || ''}>
                                                    <option value=''>Selecione</option>
                                                    {this.carregarSetores()}
                                                </select>
                                            </div>
                                        </Grid>

                                        <Grid cols='12 6 3'>
                                            <div className="form-group">
                                                <label>Operativa</label>
                                                <select className="form-control select2" name='operativa' onChange={(e) => this.onChange(e)} value={this.state.entity.operativa.id || ''}>
                                                    <option value=''>Selecione</option>
                                                    {this.carregarOperativas()}
                                                </select>
                                            </div>
                                        </Grid>

                                        {/* <If teste={(this.state.tipoPessoa === 'N')}>
                                            <Grid cols='12 6 3'>
                                                <div className="form-group">
                                                    <label>CPF</label>
                                                    <input type="text" name='cpf' onChange={(e) => this.onChange(e)} value={this.state.entity.cpf} className="form-control" />
                                                </div>
                                            </Grid>
                                        </If> */}
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
                                                <label>Nº GAL</label>
                                                <input type="text" name='gal' onChange={(e) => this.onChange(e)} value={this.state.entity.numeroGAL} className="form-control" placeholder="Nº GAL" />
                                            </div>
                                        </Grid>

                                        <Grid cols='12 6 3'>
                                            <div className="form-group">
                                                <label>Positivo</label>
                                                <select className="form-control select2" name='positivo' onChange={(e) => this.onChange(e)} value={this.state.entity.positivo || ''}>
                                                    <option value=''>Selecione</option>
                                                    <option value='S'>Sim</option>
                                                    <option value='N'>Não</option>
                                                </select>
                                            </div>
                                        </Grid>
                                    </Row>


                                    <div className="box-footer">
                                        <button type='button' className='btn btn-primary' onClick={() => this.salvar()}>Salvar</button>
                                        <Link to='testePCRList'>
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
export default TestePCREdit