import React from 'react'
import LineChart from '../common/components/LineChart'
import ChartCasosSemana from '../common/components/ChartCasosSemana'
import ChartClassificacaoRisco from '../common/components/ChartClassificacaoRisco'
import ChartCasos from '../common/components/ChartCasos'
import CollapsablePanel from '../common/components/CollapsablePanel'
import Row from '../common/layout/row'
import consts from '../consts'

export default (props) => (
    <CollapsablePanel titulo='Gráficos'>
        <Row>
            <ChartCasosSemana
                titulo='Casos x Óbitos Por Semana Epidemiológica'
                cols='12 12 6'
                tipo={consts.SEMANA_EPIDEMIOLOGICA} />
            <ChartCasos
                titulo='Casos Acumulados'
                cols='12 12 6'
                tipo={consts.OBITOS} />
            
            </Row>
            <Row>
            {/* <LineChart
                titulo='Classificação de Risco'
                cols='12 6 4'
                tipo={consts.CLASSIFICACAO} /> */}

            <ChartClassificacaoRisco
                titulo='Classificação de Risco'
                cols='12 12 12'
                tipo={consts.SEMANA_EPIDEMIOLOGICA} />

            <LineChart
                titulo='Admissões - Internação'
                cols='12 12 6'
                tipo={consts.ADMISSOES} />

            <LineChart
                titulo='Altas - Internação'
                cols='12 12 6'
                tipo={consts.ALTAS} />

        </Row>
    </CollapsablePanel>
)