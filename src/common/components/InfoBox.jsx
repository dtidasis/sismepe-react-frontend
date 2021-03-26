import React from 'react'
import Grid from '../layout/grid'

export default (props) => {

    let color = 'bg-green'

    if (props.lotacao && props.lotacao > 90) {
        color = 'bg-red'

    } else if (props.lotacao && props.lotacao > 50) {
        color = 'bg-yellow'
    }


    return (
        <Grid cols={props.cols}>
            <div className={`info-box ${color}`}>
                <span className="info-box-icon">
                    <i className="fa fa-plus"></i>
                </span>
                <div className="info-box-content">
                    <span className="info-box-text"><strong>{props.nome}</strong></span>
                    <span className="info-box-number">Ocupados: {props.ocupados}</span>
                    <div className="progress">
                        <div className="progress-bar" style={{ width: `${props.lotacao}%` }}></div>
                    </div>
                    <span className="progress-description">
                        Lotação: {props.lotacao}% | Disp: {props.disponiveis}
                    </span>
                </div>
            </div>
            {/* <a href="#" className="small-box-footer">Mais detalhes <i className="fa fa-arrow-circle-right"></i></a> */}

        </Grid>
    )
}