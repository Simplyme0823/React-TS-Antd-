import React, { Component, ChangeEvent, KeyboardEvent } from "react";
import { RouteComponentProps, withRouter, Redirect } from "react-router-dom";
import { Form, Input, Button, Row, Col } from "antd";
import { FormInstance } from "antd/lib/form";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { noop } from "../../common/util/tool";
import { mapDispatchToProps } from "../../actions/users";
import { connect } from "react-redux";
import { usersActionState } from "../../reducers/users";
import { combinedState } from "../../reducers";
import Code from "../Code/Code";
const Crypto = require("crypto-js");
/**
 * 接口继承，类继承，基类，静态方法，范型，private，protect，this，重载/重写，多态
 */
export interface LoginStateProps {
  userid: number | string;
  psd: string | number;
  code_button_disabled: boolean;
  code_button_loading: boolean;
  code_button_text: string;
  module: string;
  code: string | number;
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
type LoginProps = ReturnType<typeof mapStatetoProps> &
  ReturnType<typeof mapDispatchToProps> &
  RouteComponentProps & { switchForm: any };

const layout = {
  wrapperCol: { span: 6 },
};

class Login extends Component<LoginProps, LoginStateProps> {
  /**
   * es6内部为严格模式
   * @param props
   */
  constructor(props: LoginProps) {
    //调用父类构造函数
    super(props);
    this.state = {
      userid: "",
      psd: "",
      code_button_disabled: false,
      code_button_loading: false,
      code_button_text: "获取验证码",
      module: "login",
      code: "",
    };
    /**
     * 构造函数只运行一次
     */
    this.inputUserid = this.inputUserid.bind(this);
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

  login() {
    const { userid: username, psd, code } = this.state;
    const password = Crypto.MD5(psd).toString();
    this.props.login({ username, password, code });
  }

  enter(event: KeyboardEvent) {
    event.keyCode === 13 ? this.login() : noop();
  }

  toggleForm = () => {
    this.props.switchForm("register");
  };

  onFinish = (value: any) => {
    this.props.login(value);
  };

  getCode = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({
      code: event.target.value,
    });
  };

  render() {
    const { userid } = this.state;
    const _this = this;
    return this.props.isLogin ? (
      <Redirect to="/admin/clicklisten" />
    ) : (
      <>
        <Row>
          <Col span={12} offset={6}>
            <h1 style={{ textAlign: "center" }} onClick={this.toggleForm}>
              Log in
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
            rules={[
              ({ getFieldValue }) => ({
                validator(rule, value) {
                  //根据name来取值
                  if (value) {
                    _this.setState({
                      code_button_disabled: false,
                    });
                    return Promise.resolve();
                  }

                  return Promise.reject("邮箱格式不正确");
                },
              }),
            ]}
          >
            <Row>
              <Input
                prefix={<UserOutlined />}
                value={userid}
                placeholder="userid"
                onChange={this.inputUserid}
              ></Input>
            </Row>
          </Form.Item>
          <Form.Item
            style={{ justifyContent: "center" }}
            name="password"
            rules={[
              { required: true, message: "密码不能为空" },
              { min: 6, message: "密码不能小于6位" },
              { max: 20, message: "密码不能大于6位" },
            ]}
          >
            <Row>
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="password"
              ></Input.Password>
            </Row>
          </Form.Item>
          <Form.Item
            style={{ justifyContent: "center" }}
            name="code"
            rules={[
              { required: true, message: "请输入6位数验证码", len: 6 },
              // ({ getFieldValue }) => ({
              //   validator(rule, value) {
              //     //根据name来取值
              //     if (!value || getFieldValue("code") === value) {
              //       return Promise.resolve();
              //     }

              //     return Promise.reject("验证码错误");
              //   },
              // }),
            ]}
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
              Submit
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
export default withRouter(connect(mapStatetoProps, mapDispatchToProps)(Login));
