import React, { Component } from 'react'
import ContentHeader from '../common/template/contentHeader'
import Content from '../common/template/content'
import PainelEstatisticaUnidades from './PainelEstatisticaUnidades'
import PainelCasos from './PainelCasos'
import PainelGraficos from './PainelGraficos'
import PainelPerfil from './PainelPerfil'

class Dashboard extends Component {

    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div>
                <ContentHeader title='Dashboard' small='COVID-19' />
                <Content>
                    <PainelCasos />
                    <PainelEstatisticaUnidades />
                    <PainelGraficos />
                    {/* <PainelPerfil /> */}
                </Content>
            </div>
        )
    }
}
export default Dashboard