import React, { Component } from 'react'
import ContentHeader from '../common/template/contentHeader'

class DashboardMilitar extends Component {

    constructor(props){
        super(props)
    }

    render(){
        return (
            <div>
                <ContentHeader title='Dashboard Militar' small='COVID-19'/>
            </div>
        )
    }

}
export default DashboardMilitar