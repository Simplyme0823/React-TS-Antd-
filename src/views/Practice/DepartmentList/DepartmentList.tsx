/** @format */

import React, { Component, ReactText } from "react";

import { Form, Input, Button, Table, Switch, message, Modal } from "antd";

import { GetList, Delete, SwitchStatus } from "../.././../api/department";

import { Link } from "react-router-dom";
export declare type StoreValue = any;
export interface Store {
  [name: string]: StoreValue;
}

export type thisState = {
  columns: any[];
  data: any[];
  pageNumber: number;
  pageSize: number;
  // 复选框数据
  selectedRowData: any[];
  keyWords: string;
  visible: boolean;
  id: string;
  confirmLoading: boolean;
  flag: boolean;
};

type requestDataFormat = {
  pageNumber: number;
  pageSize: number;
  name?: string;
};

type rowDataFormat = {
  status: string;
  id: string;
};

export default class Department extends Component<any, thisState> {
  constructor(props: any) {
    super(props);
    this.state = {
      id: "",
      visible: false,
      pageNumber: 1,
      pageSize: 10,
      keyWords: "",
      selectedRowData: [],
      confirmLoading: false,
      flag: false, // 除了组建自身的loading 也可以用flag来判断
      columns: [
        {
          title: "禁启用",
          dataIndex: "name",
          key: "name",
          render: (_: any, rowData: rowDataFormat) => {
            return (
              <Switch
                checkedChildren="开启"
                unCheckedChildren="关闭"
                defaultChecked={rowData.status === "1" ? true : false}
                onChange={() => this.changeSwitch(rowData)}
                loading={rowData.id === this.state.id}
              ></Switch>
            );
          },
        },
        {
          title: "部门名称",
          dataIndex: "name",
          key: "name",
        },
        {
          title: "人员数量",
          dataIndex: "number",
          key: "number",
        },
        {
          title: "操作",
          dataIndex: "operation",
          key: "operation",
          width: 215,
          render: (_: any, rowData: any) => {
            return (
              <div className="inline-button">
                <Button
                  type="primary"
                  onClick={() => this.onHanderEdit(rowData.id)}
                >
                  <Link
                    to={{
                      pathname: "/practice/form",
                      state: { id: rowData.id },
                    }}
                  >
                    编辑
                  </Link>
                </Button>
                <Button
                  type="danger"
                  onClick={() => this.onHandlerDelete(rowData.id)}
                >
                  删除
                </Button>
              </div>
            );
          },
        },
      ],
      data: [],
    };
  }
  onHanderEdit = async (id: string) => {};

  onHandlerDelete = async (id: string) => {
    this.setState({
      visible: true,
      id,
    });
  };
  changeSwitch = async (rowData: rowDataFormat) => {
    this.setState({
      id: rowData.id,
    });
    const requestData = {
      id: rowData.id,
      status: rowData.status === "1" ? false : true,
    };
    const res = await SwitchStatus(requestData);
    if (res.data.resCode === 0) {
      this.loadData();
      message.info(res.data.message);
    }
    this.setState({
      id: "",
    });
  };
  onFinish = (value: Store) => {
    this.setState({
      keyWords: value.username,
      pageNumber: 1,
      pageSize: 10,
    });
    this.loadData();
  };

  componentDidMount() {
    this.loadData();
  }

  loadData = async () => {
    let requestData: requestDataFormat = {
      pageNumber: this.state.pageNumber,
      pageSize: this.state.pageSize,
    };
    if (this.state.keyWords) {
      requestData = { ...requestData, name: this.state.keyWords };
    }
    const res = await GetList(requestData);
    this.setState({ data: res.data.data.data });
    console.log(res.data.data.data);
  };

  /**复选框 */
  onCheckbox = (selectedRowKeys: ReactText[]) => {
    console.log(selectedRowKeys);
    this.setState({ selectedRowData: selectedRowKeys });
  };

  hideModal = () => {
    this.setState({
      visible: !this.state.visible,
    });
  };
  confirmDel = async () => {
    this.setState({
      confirmLoading: true,
    });
    const res = await Delete({ id: this.state.id });
    if (res.data.resCode === 0) {
      message.info(res.data.message);
      this.loadData();
      this.setState({
        visible: false,
        confirmLoading: false,
      });
    }
  };
  render() {
    const { columns, data } = this.state;
    const rowSelection = {
      onChange: this.onCheckbox,
    };
    return (
      <div style={{ flex: 1 }}>
        <Form layout="inline" onFinish={this.onFinish}>
          <Form.Item
            label="部门名称"
            name="username"
            rules={[{ required: false, message: "请输入部门名称" }]}
          >
            <Input placeholder="请输入名称"></Input>
          </Form.Item>
          <Form.Item shouldUpdate={true}>
            <Button type="primary" htmlType="submit">
              搜索
            </Button>
          </Form.Item>
        </Form>
        <div className="table-wrap">
          <Table
            rowKey="id"
            columns={columns}
            dataSource={data}
            bordered
            rowSelection={rowSelection}
          ></Table>
        </div>
        <Modal
          title="提示"
          visible={this.state.visible}
          onOk={this.confirmDel}
          onCancel={this.hideModal}
          okText="确认"
          cancelText="取消"
          confirmLoading={this.state.confirmLoading}
        >
          <p className="text-center">
            确定删除此信息？
            <strong className="color-red">删除后将无法恢复。</strong>
          </p>
        </Modal>
      </div>
    );
  }
}
