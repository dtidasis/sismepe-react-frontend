import React from 'react'
import MenuItem from  './menuItem'
import MenuTree from  './menuTree'

export default props => (
    <ul className='sidebar-menu'>
        <MenuItem path='/' label='Dashboard Internação' icon='dashboard' />
        <MenuItem path='/dashboardPCR' label='Dashboard PCR' icon='dashboard' />
        <MenuItem path='/internados' label='Internados' icon='user-md' />

        <MenuTree label='Suspeitas COVID-19' icon='warning'>
            <MenuItem path='/suspeitasCovidInternacao' label='Internação' />
            <MenuItem path='/suspeitasCovidUrgencia' label='Urgência' />
        </MenuTree>

        <MenuItem path='/classificacao' label='Classificação de Risco' icon='list-alt' />

        <MenuTree label='Teste COVID-19' icon='flask'>
            <MenuItem path='/testePCRList' label='Teste PCR' />
            <MenuItem path='/testeRapidoList' label='Teste Rápido' />
            <MenuItem path='/setorList' label='Setores' />
            <MenuItem path='/operativaList' label='Operativas' />
        </MenuTree>

        <MenuTree label='Configurações' icon='cogs'>
            <MenuItem path='/unidadeInternacaoList' label='Unidades de Internação' />
        </MenuTree>
        
    </ul>
)