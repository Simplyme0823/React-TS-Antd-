import React, { Component } from 'react'
import {RouteComponentProps, withRouter }from 'react-router-dom'


interface loginrouterprops {
    title:string,

}


interface loadingprops extends RouteComponentProps<loginrouterprops>{

}
class Loading extends Component<loadingprops> {
    render() {
        return (
            <div>
                Loading
            </div>
        )
    }
}

export default withRouter(Loading)