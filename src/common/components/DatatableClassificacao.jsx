import React from 'react'
import Grid from '../layout/grid'

function renderRows(list = []) {
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

function renderColumns(list = []) {
    return list.map(c => {
        return (
            <td>{c}</td>
        )
    })
}

export default (props) => {
    return (
        <Grid cols='12'>
            <div className="box-body">
                <div>
                <span>Total Diurno: {props.list}</span> <span>Total Diurno: 80</span>
                </div>
                <table id="example1" className="table table-bordered table-striped">
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
                        {renderRows(props.lista)}
                    </tbody>
                    <tfoot>
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
                    </tfoot>
                </table>
            </div>
        </Grid>
    )
}