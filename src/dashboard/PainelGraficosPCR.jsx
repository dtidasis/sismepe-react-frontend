import React from 'react'
import Row from '../common/layout/row'
import CollapsablePanel from '../common/components/CollapsablePanel'
import ChartCasosSemanaPCR from '../common/components/graficos/ChartCasosSemanaPCR'

export default (props) => (
    <CollapsablePanel titulo='Gráficos'>
        <Row>
            <ChartCasosSemanaPCR
                titulo='Casos Por Semana Epidemiológica'
                cols='12 12 6'
                acumulado={false} />

            <ChartCasosSemanaPCR
                titulo='Casos Acumulados Por Semana Epidemiológica'
                cols='12 12 6'
                acumulado={true} />
        </Row>

    </CollapsablePanel>
)