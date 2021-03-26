import React, { Component } from 'react'
import ContentHeader from '../common/template/contentHeader'
import Content from '../common/template/content'
import PainelTestePCR from './PainelTestePCR'
import PainelGraficosPCR from './PainelGraficosPCR'

export default (props) => (
    <div>
        <ContentHeader title='Teste PCR' small='COVID-19' />
        <Content>
            <PainelTestePCR cols='12 6 6' />
            <PainelGraficosPCR />
        </Content>
    </div>
)