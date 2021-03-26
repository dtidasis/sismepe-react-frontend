import React, { Component } from 'react'
import { Chart } from 'primereact/chart';
import Grid from '../../layout/grid'
import axios from 'axios'
import consts from '../../../consts'

class ChartCasosSemanaPCR extends Component {

    constructor(props) {
        super(props)

        this.state = {
            cols: this.props.cols,
            resize: false,
            chart: {}
        }
    }

    expand() {
        if (!this.state.resize) {
            this.setState({ cols: '12 12 12', resize: true })
        } else {
            this.setState({ cols: this.props.cols, resize: false })
        }
    }

    getDados() {
        let chart;
        const acumulado = this.props.acumulado ? true : false;
        const request = axios.get(`${consts.API_URL}/dashboard/casosSemanaEpidemiologicaPCR`)
            .then(request => {
                const data = [{
                    label: request.data.descricao,
                    data: acumulado ? request.data.acumulados : request.data.quantitativos,
                    fill: false,
                    backgroundColor: acumulado ? '#f39c12' : '#dd4b39', 
                    borderColor: acumulado ? '#f39c12' : '#dd4b39'
                }
            ];
                chart = {
                    labels: request.data.labels,
                    datasets: data
                }
                this.setState({ chart })
            })
    }

    componentDidMount() {
        this.getDados()
    }

    render() {
        return (
            <Grid cols={this.state.cols}>
                <div className="box box-info">
                    <div className="box-header with-border">
                        <h3 className="box-title">{this.props.titulo}</h3>

                        <div className="box-tools pull-right">
                            <button type="button" className="btn btn-box-tool" data-widget="collapse"><i className="fa fa-minus"></i>
                            </button>
                            <button type="button" className="btn btn-box-tool" onClick={() => this.expand()}><i className="fa fa-expand"></i></button>
                            <button type="button" className="btn btn-box-tool" data-widget="remove"><i className="fa fa-times"></i></button>
                        </div>
                    </div>
                    <div className="box-body">
                        <div className="chart">
                            <Chart type='line' data={this.state.chart} />
                        </div>
                    </div>
                </div>
            </Grid>
        )
    }
}
export default ChartCasosSemanaPCR