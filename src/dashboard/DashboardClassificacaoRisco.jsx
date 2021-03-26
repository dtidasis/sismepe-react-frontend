import React, { Component } from 'react'
import ContentHeader from '../common/template/contentHeader'
import Content from '../common/template/content'
import PainelClassificacaoRisco from './PainelClassificacaoRisco'


class DashboardClassificacaoRisco extends Component {

    constructor(props) {
        super(props)
        this.state = { pacientes: [] }
    }

    render() {
        return (
            <div>
                <ContentHeader title='Classificação de Risco' small='COVID-19' />
                <Content>
                    <PainelClassificacaoRisco />
                    {/*<PainelGraficos />*/}
                </Content>
            </div>
        )
    }
}
export default DashboardClassificacaoRisco