import React, { Component } from 'react'
import { Chart } from 'primereact/chart';
import 'modules/admin-lte/plugins/select2/select2.min.css'
import Grid from '../layout/grid'
import axios from 'axios'
import consts from '../../consts'

class ChartCasosSemana extends Component {

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
        const request = axios.get(`${consts.API_URL}/dashboard/casosSemanaEpidemiologica`)
            .then(request => {
                const obt = [2,1,4,0,1 ]
                const data = [{
                    label: request.data.descricao,
                    data: request.data.quantitativos,
                    fill: false,
                    backgroundColor: request.data.cor,
                    borderColor: request.data.cor
                }]

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

export default ChartCasosSemana