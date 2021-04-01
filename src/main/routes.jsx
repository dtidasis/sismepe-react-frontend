import React from 'react'
import { Router, Route, IndexRoute, Redirect, hashHistory } from 'react-router'
import Dashboard from '../dashboard/dashboard'
import DashboardPCR from '../dashboard/DashboardPCR'
import DashboardClassificacaoRisco from '../dashboard/DashboardClassificacaoRisco'
import AuthOrApp from './authOrApp'
import SuspeitaCovidInternacaoList from '../suspeita-covid/SuspeitaCovidInternacaoList'
import SuspeitaCovidUrgenciaList from '../suspeita-covid/SuspeitaCovidUrgenciaList'
import SuspeitaCovidEdit from '../suspeita-covid/SuspeitaCovidEdit'
import PainelPacientesInternados from '../dashboard/PainelPacientesInternados'
import TestePCRList from '../teste-pcr/TestePCRList'
import TestePCREdit from '../teste-pcr/TestePCREdit'
import TesteRapidoList from '../teste-rapido/TesteRapidoList'
import TesteRapidoEdit from '../teste-rapido/TesteRapidoEdit'
import SetorList from '../setor-pessoa-teste/SetorList'
import SetorEdit from '../setor-pessoa-teste/SetorEdit'
import OperativaList from '../operativa-pessoa-teste/OperativaList'
import OperativaEdit from '../operativa-pessoa-teste/OperativaEdit'
import UnidadeInternacaoList from '../unidade-internacao/UnidadeInternacaoList'
import UnidadeInternacaoEdit from '../unidade-internacao/UnidadeInternacaoEdit'
import DashboardMilitar from '../dashboard/DashboardMilitar'
import AtendimentoRecepcaoList from '../components/atendimento/servico-social/AtendimentoRecepcaoList'
import AtendimentoConsultaList from '../components/atendimento/servico-social/AtendimentoConsultaList'

export default props => (
    <Router history={hashHistory}>
        <Route path='/' component={AuthOrApp}>
            <IndexRoute component={Dashboard} />
            <Route path='dashboardPCR' component={DashboardPCR} />
            <Route path='dashboardMilitar' component={DashboardMilitar} />
            <Route path='internados' component={PainelPacientesInternados} />
            <Route path='classificacao' component={DashboardClassificacaoRisco} />
            <Route path='suspeitasCovidInternacao' component={SuspeitaCovidInternacaoList} />
            <Route path='suspeitasCovidUrgencia' component={SuspeitaCovidUrgenciaList} />
            <Route path='suspeitaEdit' component={SuspeitaCovidEdit} />
            <Route path='testePCREdit' component={TestePCREdit} />
            <Route path='testePCRList' component={TestePCRList} />
            <Route path='testeRapidoList' component={TesteRapidoList} />
            <Route path='testeRapidoEdit' component={TesteRapidoEdit} />
            <Route path='setorList' component={SetorList} />
            <Route path='setorEdit' component={SetorEdit} />
            <Route path='operativaList' component={OperativaList} />
            <Route path='operativaEdit' component={OperativaEdit} />
            <Route path='unidadeInternacaoList' component={UnidadeInternacaoList} />
            <Route path='unidadeInternacaoEdit' component={UnidadeInternacaoEdit} />
            <Route path='atendimentoServicoSocialRecepcaoList' component={AtendimentoRecepcaoList} />
            <Route path='atendimentoServicoSocialConsultaList' component={AtendimentoConsultaList} />
        </Route>
        <Redirect from='*' to='/' />
    </Router>
)