import React, { Component } from 'react'
import EditTable from './EditTable'
import FormSubmit from './FormSubmit'

export default class Form extends Component {
    render() {
        return (
            <>
                <FormSubmit></FormSubmit>
                <EditTable></EditTable>
            </>
        )
    }
}
