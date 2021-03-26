import React, { Component } from 'react'
import CollapsablePanel from '../common/components/CollapsablePanel'
import axios from 'axios'
import consts from '../consts'


class PainelCasos extends Component {

    constructor(props) {
        super(props)
        this.state = {
            casos: {
                suspeitos: 0,
                positivos: 0,
                negativos: 0,
                obitos: 0,
                aguardando: 0,
                naoTestados: 0
            }
        }
    }

    componentWillMount() {
        this.consultarCasos()
    }

    consultarCasos() {
        const url = `${consts.API_URL}/dashboard/casos`;
        const request = axios.get(url)
            .then(request => {
                this.setState({ casos: request.data })
            })
    }

    render() {
        return (
            <CollapsablePanel titulo='Internação'>
                <div className="col-md-12">
                    <div className="box box-widget widget-user">
                        <div className="box-footer">
                            <div className="row">

                                <div className="col-sm-3 border-right">
                                    <div className="description-block">
                                        <h1>{this.state.casos.suspeitos}</h1>
                                        <span className="description-text">Internações</span>
                                    </div>
                                </div>

                                <div className="col-sm-3 border-right">
                                    <div className="description-block">
                                        <h1>{this.state.casos.positivos}</h1>
                                        <span className="description-text">Positivos</span>
                                    </div>
                                </div>

                                <div className="col-sm-3 border-right">
                                    <div className="description-block">
                                        <h1>{this.state.casos.negativos}</h1>
                                        <span className="description-text">Negativos</span>
                                    </div>
                                </div>

                                <div className="col-sm-3 border-right">
                                    <div className="description-block">
                                        <h1>{this.state.casos.obitos}</h1>
                                        <span className="description-text">Óbitos</span>
                                    </div>
                                </div>
                            </div>
                            <div className="row">

                                <div className="col-sm-3 border-right">
                                    <div className="description-block">
                                        <h1>{this.state.casos.internados}</h1>
                                        <span className="description-text">Internados</span>
                                    </div>
                                </div>

                                <div className="col-sm-3 border-right">
                                    <div className="description-block">
                                        <h1>{this.state.casos.aguardando}</h1>
                                        <span className="description-text">Aguardando Resultado</span>
                                    </div>
                                </div>

                                <div className="col-sm-3 border-right">
                                    <div className="description-block">
                                        <h1>{this.state.casos.naoTestados}</h1>
                                        <span className="description-text">Não Testados</span>
                                    </div>
                                </div>

                                <div className="col-sm-3 border-right">
                                    <div className="description-block">
                                        <h1>{this.state.casos.altas}</h1>
                                        <span className="description-text">Altas</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </CollapsablePanel>
        )
    }
}

export default PainelCasos