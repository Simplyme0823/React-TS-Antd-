/** @format */

import React, { Component, ReactText } from "react";

import { Form, Input, Button, Table, Switch, message } from "antd";

import { GetList, Delete } from "../.././../api/department";

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
};

type requestDataFormat = {
  pageNumber: number;
  pageSize: number;
  name?: string;
};
type rowDataFormat = {
  status: string;
};
export default class Department extends Component<any, thisState> {
  constructor(props: any) {
    super(props);
    this.state = {
      pageNumber: 1,
      pageSize: 10,
      keyWords: "",
      selectedRowData: [],
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
                <Button type="primary">编辑</Button>
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

  onHandlerDelete = async (id: string) => {
    const res = await Delete({ id });
    if (res.data.resCode === 0) {
      message.info(res.data.message);
      this.loadData();
    }
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
    console.log(res.data.data.data);
    this.setState({ data: res.data.data.data });
  };

  /**复选框 */
  onCheckbox = (selectedRowKeys: ReactText[]) => {
    console.log(selectedRowKeys);
    this.setState({ selectedRowData: selectedRowKeys });
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
      </div>
    );
  }
}
