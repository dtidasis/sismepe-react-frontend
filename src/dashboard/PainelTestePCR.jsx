import React, { Component } from 'react'
import axios from 'axios'
import consts from '../consts'
import { Chart } from 'primereact/chart';

class PainelTestePCR extends Component {
    constructor(props) {
        super(props)
        this.state = {
            casos: {
                testes: 0,
                positivos: 0,
                negativos: 0,
                aguardando: 0
            },
            data: {
                labels: ['Positivos', 'Negativos', 'Aguardando'],
                datasets: [
                    {
                        data: [0, 0, 0],
                        backgroundColor: [
                            "#dd4b39",
                            "#00a65a",
                            "#f39c12"
                        ],
                        hoverBackgroundColor: [
                            "#e05a4a",
                            "#00ba65",
                            "#f5ac37"
                        ]
                    }]
            },
            options: {
                legend: {
                    position: 'top'
                },
                animation: {
                    animateScale: true
                }
            }
        }
    }

    componentWillMount() {
        this.consultarCasos()
    }

    consultarCasos() {
        const url = `${consts.API_URL}/dashboard/pcr`;
        const request = axios.get(url)
            .then(request => {
                let data = { ...this.state.data }
                data.datasets[0].data = [request.data.positivos, request.data.negativos, request.data.aguardando]
                this.setState({ ...this.state, casos: request.data, data })
            })
    }

    render() {
        return (

            <div className="box box-default">
                <div className="box-header with-border">
                    <h3 className="box-title">Teste PCR</h3>
                    <div className="box-tools pull-right">
                        <button type="button" className="btn btn-box-tool" data-widget="collapse"><i className="fa fa-minus" />
                        </button>
                        <button type="button" className="btn btn-box-tool" data-widget="remove"><i className="fa fa-times" /></button>
                    </div>
                </div>

                <div className="box-body">
                    <div className="row">
                        
                        <div className="col-md-8">
                            <div className="row">
                                <div className="col-sm-3 border-right">
                                    <div className="description-block">
                                        <span className="description-text">Testes</span>
                                        <h1>{this.state.casos.testes}</h1>
                                        <h3>100%</h3>
                                    </div>
                                </div>

                                <div className="col-sm-3 border-right">
                                    <div className="description-block">
                                        <span className="description-text">Positivos</span>
                                        <h1>{this.state.casos.positivos}</h1>
                                        <h3>{((this.state.casos.positivos / this.state.casos.testes) * 100).toFixed(2)}%</h3>
                                    </div>
                                </div>

                                <div className="col-sm-3 border-right">
                                    <div className="description-block">
                                        <span className="description-text">Negativos</span>
                                        <h1>{this.state.casos.negativos}</h1>
                                        <h3>{((this.state.casos.negativos / this.state.casos.testes) * 100).toFixed(2)}%</h3>
                                    </div>
                                </div>
                                <div className="col-sm-3 border-right">
                                    <div className="description-block">
                                        <span className="description-text">Aguardando</span>
                                        <h1>{this.state.casos.aguardando}</h1>
                                        <h3>{((this.state.casos.aguardando / this.state.casos.testes) * 100).toFixed(2)}%</h3>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-4">
                            <div className="chart-responsive">
                                <div className="chart">
                                    <Chart type="pie" data={this.state.data} options={this.state.options} />
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}

export default PainelTestePCR