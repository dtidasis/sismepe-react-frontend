import React, { Component } from 'react'
import { Chart } from 'primereact/chart';
import 'modules/admin-lte/plugins/select2/select2.min.css'
import Grid from '../layout/grid'
import axios from 'axios'
import consts from '../../consts'

class LineChart extends Component {

    constructor(props) {
        super(props)
        this.data = new Date()
        const mes = (this.data.getMonth() + 1)
        this.ano = (this.data.getYear() + 1900)

        this.state = {
            cols: this.props.cols,
            resize: false,
            chart: {},
            mes: mes
        }
    }

    expand() {
        if (!this.state.resize) {
            this.setState({ cols: '12 12 12', resize: true })
        } else {
            this.setState({ cols: this.props.cols, resize: false })
        }
    }

    getDados(mes = this.state.mes) {
        let chart;
        const request = axios.get(`${consts.API_URL}/dashboard/${this.props.tipo}/${(this.ano)}/${mes}`)
            .then(request => {
                const data = request.data.map(d => ({
                    label: d.descricao,
                    data: d.quantitavivos,
                    fill: false,
                    backgroundColor: `#${d.cor}`,
                    borderColor: `#${d.cor}`

                }));
                chart = {
                    labels: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31],
                    datasets: data
                }
                this.setState({ chart, mes })
            })
    }

    componentDidMount() {
        this.getDados()
    }

    onChange(e) {
        const mes = e.target.value;
        if (mes > 0) {
            this.getDados(mes);
        }
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
                        <div className="row">
                            <div className="col-md-6">
                                <div className="form-group">
                                    <label>Mês</label>
                                    <select value={this.state.mes} onChange={(e) => this.onChange(e)} className="form-control select2">
                                        <option value='0'>Selecione</option>
                                        <option value='1'>JAN</option>
                                        <option value='2'>FEV</option>
                                        <option value='3'>MAR</option>
                                        <option value='4'>ABR</option>
                                        <option value='5'>MAI</option>
                                        <option value='6'>JUN</option>
                                        <option value='7'>JUL</option>
                                        <option value='8'>AGO</option>
                                        <option value='9'>SET</option>
                                        <option value='10'>OUT</option>
                                        <option value='11'>NOV</option>
                                        <option value='12'>DEZ</option>
                                    </select>
                                </div>
                            </div>
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

export default LineChart