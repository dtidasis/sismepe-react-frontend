import React from 'react'

export default (props) => (
    <div className="box box-info">
        <div className="box-header with-border">
            <h3 className="box-title">{props.titulo}</h3>
            <div className="box-tools pull-right">
                <button type="button" className="btn btn-box-tool" data-widget="collapse"><i className="fa fa-minus"></i></button>
                <button type="button" className="btn btn-box-tool" data-widget="remove"><i className="fa fa-times"></i></button>
            </div>
        </div>

        <div className="box-body">
            {props.children}
        </div>
    </div>
)