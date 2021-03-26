import React, { Component } from 'react'
import axios from 'axios'
import CollapsablePanel from '../common/components/CollapsablePanel'
import Infobox from '../common/components/Infobox'
import Row from '../common/layout/row'
import consts from '../consts'

class PainelInternacoes extends Component {

    constructor(props) {
        super(props)
        this.state = {}
    }

    componentWillMount() {
        const request = axios.get(`${consts.API_URL}/dashboard/estatisticaUnidades`)
        .then(request => {
            this.setState({ estatistica: request.data })
        })
    }

    renderRows() {
        const est = this.state.estatistica || []
        return est.map(e => {
            const tx = Math.round(e.taxaOcupacao)
            return (
                <Infobox cols='12 6 3' nome={e.nome} ocupados={e.ocupados} disponiveis={e.vagos} lotacao={tx} key={e.nome} />
            )
        })
    }

    render() {
        return (
            <CollapsablePanel titulo='Painel de Internações' >
                <Row>
                    {this.renderRows()}
                </Row>
            </CollapsablePanel>

        )
    }
}

export default PainelInternacoes