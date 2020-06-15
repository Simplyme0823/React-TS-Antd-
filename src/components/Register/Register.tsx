import React, { Component, ChangeEvent, KeyboardEvent } from "react";
import { RouteComponentProps, withRouter, Redirect } from "react-router-dom";
import { Form, Input, Button, Row, Col, message } from "antd";
import { FormInstance } from "antd/lib/form";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { noop } from "../../common/util/tool";
import { mapDispatchToProps } from "../../actions/users";
import { connect } from "react-redux";
import { usersActionState } from "../../reducers/users";
import { combinedState } from "../../reducers";
import Code from "../Code/Code";
import { Register_ } from "../../api/account";
const Crypto = require("crypto-js");

/**
 * 接口继承，类继承，基类，静态方法，范型，private，protect，this，重载/重写，多态
 */
export interface RegisterState {
  userid: number | string;
  psd: string | number;
  confirm: string | number;
  code: string | number;
  module: string;
}

/*interface LoginProps extends RouteComponentProps, usersActionState {
    login: (userid: any) => void
}*/

const mapStatetoProps = (state: combinedState): usersActionState => {
  //只取出与登录有关联的属性
  return state.users;
};

/* RouteComponentProps 前端路由信息
    history: H.History<S>;
    location: H.Location<S>;
    match: match<Params>;
    staticContext?: C;*/
type RegisterProps = ReturnType<typeof mapStatetoProps> &
  ReturnType<typeof mapDispatchToProps> &
  RouteComponentProps & { switchForm: any };

const layout = {
  wrapperCol: { span: 6 },
};

class Register extends Component<RegisterProps, RegisterState> {
  /**
   * es6内部为严格模式
   * @param props
   */
  constructor(props: RegisterProps) {
    //调用父类构造函数
    super(props);
    this.state = {
      userid: "",
      psd: "",
      confirm: "",
      code: "",
      module: "register",
    };
    /**
     * 构造函数只运行一次
     */
    this.login = this.login.bind(this);
    this.inputPwd = this.inputPwd.bind(this);
    this.inputUserid = this.inputUserid.bind(this);
    this.enter = this.enter.bind(this);
    this.getCode = this.getCode.bind(this);
    this.inputConfirm = this.inputConfirm.bind(this);
  }

  form = React.createRef<FormInstance>();

  inputUserid(event: ChangeEvent<HTMLInputElement>) {
    this.setState({
      userid: event.target.value,
    });
  }

  inputPwd(event: ChangeEvent<HTMLInputElement>) {
    this.setState({
      psd: event.target.value,
    });
  }

  inputConfirm(event: ChangeEvent<HTMLInputElement>) {
    this.setState({
      confirm: event.target.value,
    });
  }

  getCode(event: ChangeEvent<HTMLInputElement>) {
    this.setState({
      code: event.target.value,
    });
  }
  login() {
    const { userid } = this.state;
    this.props.login({ userid });
  }

  enter(event: KeyboardEvent) {
    event.keyCode === 13 ? this.login() : noop();
  }

  toggleForm = () => {
    this.props.switchForm("login");
  };

  onFinish = () => {
    const data = {
      username: this.state.userid,
      password: Crypto.MD5(this.state.psd).toString(),
      code: this.state.code,
    };
    Register_(data)
      .then((res) => {
        const data = res.data;
        message.success(data.message);
        if (data.resCode === 0) {
          this.toggleForm();
        }
      })
      .then((err) => {});
  };

  render() {
    return this.props.isLogin ? (
      <Redirect to="/admin/clicklisten" />
    ) : (
      <>
        <Row>
          <Col span={12} offset={6}>
            <h1 style={{ textAlign: "center" }} onClick={this.toggleForm}>
              Register
            </h1>
          </Col>
        </Row>
        <Form
          onKeyUp={this.enter /**by value, by ref */}
          name="login"
          {...layout}
          onFinish={this.onFinish}
        >
          <Form.Item
            style={{ justifyContent: "center" }}
            name="userid"
            rules={[{ required: true, message: "Please input your userid!" }]}
          >
            <Row>
              <Input
                prefix={<UserOutlined />}
                placeholder="userid"
                value={this.state.userid}
                onChange={this.inputUserid}
              ></Input>
            </Row>
          </Form.Item>
          <Form.Item
            style={{ justifyContent: "center" }}
            name="password"
            rules={[
              { required: true, message: "Please input your userid !" },
              ({ getFieldValue }) => ({
                validator(role, value) {
                  const confirm = getFieldValue("confirm");
                  if (value === "") {
                    return Promise.reject("请输入密码");
                  }
                  if (confirm && value !== confirm) {
                    return Promise.reject("两次密码不一致");
                  }
                  return Promise.resolve();
                },
              }),
            ]}
          >
            <Row>
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="password"
                value={this.state.psd}
                onChange={this.inputPwd}
              ></Input.Password>
            </Row>
          </Form.Item>
          <Form.Item
            style={{ justifyContent: "center" }}
            name="confirm"
            rules={[{ required: true, message: "Please input your userid !" }]}
          >
            <Row>
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="确认密码"
                value={this.state.confirm}
                onChange={this.inputConfirm}
              ></Input.Password>
            </Row>
          </Form.Item>
          <Form.Item
            style={{ justifyContent: "center" }}
            name="code"
            rules={[{ required: true, message: "请输入6位数验证码", len: 6 }]}
          >
            <Row gutter={13}>
              <Col span={16}>
                <Input
                  placeholder="验证码"
                  value={this.state.code}
                  onChange={this.getCode}
                ></Input>
              </Col>
              <Col span={8}>
                <Code
                  userid={this.state.userid}
                  module={this.state.module}
                ></Code>
              </Col>
            </Row>
          </Form.Item>
          <Form.Item style={{ justifyContent: "center" }}>
            <Button type="primary" htmlType="submit" block>
              注册
            </Button>
          </Form.Item>
        </Form>
      </>
    );
  }
}

/**hoc
 * mapStatetoProps 是把redux内部总
 */
export default withRouter(
  connect(mapStatetoProps, mapDispatchToProps)(Register)
);
