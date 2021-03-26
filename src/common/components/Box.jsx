import React from 'react'
import Grid from '../layout/grid'

export default (props) => {
    return (
        <Grid cols={props.cols}>
            <div className="box box-solid">
                <div className="box-header with-border">
                    <i className={`fa fa-${props.icon}`}></i>
                    <h3 className="box-title">{props.titulo}</h3>
                </div>
                <div className="box-body">
                    {props.children}
                </div>
            </div>
        </Grid>
    )
}