import React, { Component } from 'react'
import Row from '../layout/row'
import Grid from '../layout/grid'
import axios from 'axios'
import { toastr } from 'react-redux-toastr'
import conts from '../../consts'

class Endereco extends Component {
    constructor(props) {
        super(props)
        this.INITIAL_STATE = {
            endereco: {
                cep: '',
                logradouro: '',
                bairro: '',
                cidade: '',
                uf: '',
                numero: '',
                complemento: ''
            }
        }
        this.state = this.INITIAL_STATE;
    }

    componentDidMount() {
        $("[data-mask]").inputmask();
    }

    onChange(e) {
        if (e.target.name === 'numero') {
            let endereco = { ...this.state.endereco }
            endereco.numero = e.target.value;
            this.setState({ ...this.state, endereco })
            this.props.onEnderecoRetornado(endereco)

        } else if (e.target.name === 'complemento') {
            let endereco = { ...this.state.endereco }
            endereco.complemento = e.target.value;
            this.setState({ ...this.state, endereco })
            this.props.onEnderecoRetornado(endereco)

        }
    }

    consultarCEP() {
        let cep = $("#cep").val();
        cep = cep.replace('-', '');
        this.setState({ cep })
        const VIA_CEP_URL = conts.VIA_CEP_URL

        var xhr = new XMLHttpRequest()
    
        xhr.addEventListener('load', () => {
            var resp=xhr.responseText;
            var data = JSON.parse(resp);


            if (!data.erro) {
                let end = { ...this.state.endereco }
                const endereco = {
                    cep: this.state.cep,
                    logradouro: data.logradouro,
                    bairro: data.bairro,
                    cidade: data.localidade,
                    uf: data.uf,
                    numero: end.numero,
                    complemento: end.complemento
                }
                this.setState({ ...this.state, endereco })
                this.props.onEnderecoRetornado(endereco)

            } else {
                toastr.error('Erro', "CEP não encontrado")
                let endereco = { ...this.state.endereco }
                endereco.logradouro = ''
                endereco.numero = ''
                endereco.bairro = ''
                endereco.cidade = ''
                endereco.uf = ''
                this.setState({ endereco })
            }
        })

        xhr.open('get', `${VIA_CEP_URL}/${cep}/json/`, true);
        xhr.send()
      }

    render() {
        return (
            <div>

                <Row>
                    <Grid cols='12 6 2'>
                        <div className="form-group">
                            <label>CEP</label>
                            <div className="input-group">
                                <input type="text" name='cep' id='cep' className="form-control" onChange={(e) => this.onChange(e)} value={this.props.cep} data-inputmask="'mask': '99999-999'" data-mask></input>
                                <span className="input-group-btn">
                                    <button type="button" onClick={(e) => this.consultarCEP()} className="btn btn-info btn-flat"><i className='fa fa-search'></i></button>
                                </span>
                            </div>
                        </div>
                    </Grid>
                </Row>

                <Row>
                    <Grid cols='12 6 6'>
                        <div className="form-group">
                            <label>Logradouro</label>
                            <input type="text" name='logradouro' value={this.props.logradouro} className="form-control" readOnly />
                        </div>
                    </Grid>

                    <Grid cols='12 6 3'>
                        <div className="form-group">
                            <label>Número</label>
                            <input type="text" name='numero' onChange={(e) => this.onChange(e)} value={this.props.numero} className="form-control" />
                        </div>
                    </Grid>

                    <Grid cols='12 6 3'>
                        <div className="form-group">
                            <label>Complemento</label>
                            <input type="text" name='complemento' onChange={(e) => this.onChange(e)} value={this.props.complemento} className="form-control" />
                        </div>
                    </Grid>
                </Row>

                <Row>
                    <Grid cols='12 6 4'>
                        <div className="form-group">
                            <label>Bairro</label>
                            <input type="text" name='bairro' value={this.props.bairro} className="form-control" readOnly />
                        </div>
                    </Grid>

                    <Grid cols='12 6 4'>
                        <div className="form-group">
                            <label>Cidade</label>
                            <input type="text" name='cidade' value={this.props.cidade} className="form-control" readOnly />
                        </div>
                    </Grid>

                    <Grid cols='12 6 2'>
                        <div className="form-group">
                            <label>UF</label>
                            <input type="text" name='uf' value={this.props.uf} className="form-control" readOnly />
                        </div>
                    </Grid>
                </Row>
            </div>
        )
    }
}

export default Endereco