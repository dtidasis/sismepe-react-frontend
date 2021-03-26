import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Grid from '../common/layout/grid'
import Row from '../common/layout/row'
import ValueBox from '../common/widget/valueBox'

import Input from '../common/form/input'
import IF from '../common/operador/if'

export default ({credit, debt}) => (
    <Grid cols='12'>
        <fieldset>
            <legend>Resumo</legend>
            <Row>
                <ValueBox text='Total de Créditos' cols='12 4' color='green' icon='bank' value={`R$ ${credit}`} />
                <ValueBox text='Total de Débitos' cols='12 4' color='red' icon='credit-card' value={`R$ ${debt}`} />
                <ValueBox text='Valor Consolidado' cols='12 4' color='blue' icon='money' value={`R$ ${credit-debt}`} />
            </Row>
        </fieldset>
    </Grid>
)