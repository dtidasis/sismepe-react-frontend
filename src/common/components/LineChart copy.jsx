import React from 'react'
import { Chart } from 'primereact/chart';
import 'modules/admin-lte/plugins/select2/select2.min.css'
import Grid from '../layout/grid'

let cols;

function expand(props, resize=false) {
    if(resize) {
        return '12 12'
    } else {
        return props.cols

    }
}

export default (props) => {
    return (
    <Grid cols={expand(props, false)}>
        <div className="box box-info">
            <div className="box-header with-border">
                <h3 className="box-title">{props.titulo}</h3>

                <div className="box-tools pull-right">
                    <button type="button" className="btn btn-box-tool" data-widget="collapse"><i className="fa fa-minus"></i>
                    </button>
                    <button type="button" className="btn btn-box-tool" data-widget="remove"><i className="fa fa-times"></i></button>
                    <button type="button" className="btn btn-box-tool" onClick={() => expand(props, true)}><i className="fa fa-expand"></i></button>
                </div>
            </div>
                <div className="box-body">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label>Mês</label>
                                <select value={props.value} onChange={props.onChange} className="form-control select2">
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
                    <Chart type='line' data={props.data} />
                </div>
            </div>
        </div>
    </Grid>
)}