import React from 'react'

export default (props) => (
    <div className="box box-info">
        <div className="box-header with-border">
            <h3 className="box-title">{props.titulo}</h3>
        </div>

        <div className="box-body">
            {props.children}
        </div>
    </div>
)