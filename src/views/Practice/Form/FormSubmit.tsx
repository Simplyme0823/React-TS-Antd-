import React, { Component } from 'react'

import { Form, Input } from 'antd';



const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 5 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
    },
};

export default class FormSubmit extends Component<any, any> {
    constructor(props: any) {
        super(props)
        this.state = {
            name: ""
        }
    }
    formRef = React.createRef()
    render() {
        console.log(this.formRef)
        return (
            <Form {...formItemLayout}
            >
                <Form.Item
                    label="Fail"
                >
                    <Input placeholder="Name" value={this.state.name} />
                </Form.Item>
            </Form>
        )
    }
}
