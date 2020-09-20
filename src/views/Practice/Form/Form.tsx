/** @format */

import React, { Component } from "react";

import { Form, Input, Button, InputNumber, Radio, message } from "antd";
import { FormInstance } from "antd/lib/form";
import { departmentAddApi } from "../../../api/department";
const formItemLayout = {
  labelCol: { span: 2 },
  wrapperCol: { span: 20 },
};

export declare type StoreValue = any;
export interface Store {
  [name: string]: StoreValue;
}

export type thisState = {
  name: string;
  content: string;
  number: number;
  status: boolean;
  loading: boolean;
};

export default class Department extends Component<any, thisState> {
  formRef = React.createRef<FormInstance>();
  constructor(props: any) {
    super(props);
    this.state = {
      name: "fdsaf",
      content: "fdsaf",
      number: 10,
      status: false,
      loading: false,
    };
  }

  onSubmit = async (values: Store) => {
    if (!values.name) {
      message.error("请输入姓名");
      return false;
    }

    if (!values.number || values.number === 0) {
      message.error("人员数量不能为0");
      return false;
    }
    if (!values.content) {
      message.error("描述不能为空");
      return false;
    }
    this.setState({
      loading: true,
    });
    const res = (await departmentAddApi(values)).data;
    const { resCode, message: Message } = res;
    this.setState({
      loading: false,
    });
    if (resCode === 0) {
      message.success(Message);
      this.formRef.current?.resetFields();
    }
  };

  render() {
    return (
      <Form
        {...formItemLayout}
        style={{ flex: 1 }}
        onFinish={this.onSubmit}
        ref={this.formRef}
        initialValues={{ number: 0, status: false }}
      >
        <Form.Item label="部门名称" name="name">
          <Input placeholder="请填写部门名称" />
        </Form.Item>
        <Form.Item label="人员数量" name="number">
          <InputNumber min={0} max={100} />
        </Form.Item>
        <Form.Item label="禁启用" name="status">
          <Radio.Group>
            <Radio value={false}>禁用</Radio>
            <Radio value={true}>启用</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item label="描述" name="content">
          <Input.TextArea placeholder="请填写描述" />
        </Form.Item>
        <Form.Item>
          <Button
            htmlType="submit"
            type="primary"
            disabled={this.state.loading}
          >
            提交
          </Button>
        </Form.Item>
      </Form>
    );
  }
}
