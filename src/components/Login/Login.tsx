import React, { Component, ChangeEvent, KeyboardEvent } from "react";
import { RouteComponentProps, withRouter, Redirect } from "react-router-dom";
import { Form, Input, Button, Row, Col, message } from "antd";
import { FormInstance } from "antd/lib/form";
import {
  UserOutlined,
  LockOutlined,
  PoweroffOutlined,
} from "@ant-design/icons";
import { noop } from "../../common/util/tool";
import { mapDispatchToProps } from "../../actions/users";

import { connect } from "react-redux";
import { usersActionState } from "../../reducers/users";
import { combinedState } from "../../reducers";
import { GetCode } from "../../api/account";

/**
 * 接口继承，类继承，基类，静态方法，范型，private，protect，this，重载/重写，多态
 */
export interface LoginStateProps {
  userid: number | undefined | string;
  psd: string | undefined | number;
  code_button_disabled: boolean;
  code_button_loading: boolean;
  code_button_text: string;
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
    };
    /**
     * 构造函数只运行一次
     */
    this.inputUserid = this.inputUserid.bind(this);
    this.getCode = this.getCode.bind(this);
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
    const { userid } = this.state;

    this.props.login({ userid });
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

  /**倒计时函数 */
  countDown = () => {
    //定时其
    let timer = null as any;
    //倒计时时间
    let sec = 60;
    //修改状态
    this.setState({
      code_button_loading: false,
      code_button_disabled: true,
      code_button_text: `${sec}S`,
    });
    // setIntervale\clearInterval 不间断定时器
    //setTimeOut\clearTimeout 只执行一次
    timer = setInterval(() => {
      if (sec-- === 0) {
        clearInterval(timer);
        return false;
      }
      this.setState({
        code_button_text: `${sec}S`,
      });
    }, 1000);
  };
  //获取验证码
  getCode() {
    if (!this.state.userid) {
      message.error("请输入用户名");
      return;
    }
    this.setState({
      code_button_loading: true,
      code_button_text: "发送中",
    });
    const requestData = {
      username: this.state.userid,
      module: "login",
    };

    GetCode(requestData)
      .then((res) => {
        //倒计时函数
        this.countDown();
      })
      .catch((err) => {
        this.setState({
          code_button_loading: false,
          code_button_text: "重新获取",
        });
      });
  }
  render() {
    const {
      userid,
      code_button_disabled,
      code_button_loading,
      code_button_text,
    } = this.state;
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
              { required: true, message: "请输入验证码" },
              { len: 6, message: "请输入6位验证码" },
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
                <Input placeholder="验证码"></Input>
              </Col>
              <Col span={8}>
                <Button
                  type="danger"
                  onClick={this.getCode}
                  block
                  disabled={code_button_disabled}
                  icon={<PoweroffOutlined />}
                  loading={code_button_loading}
                >
                  {/**这里使用了Button组件的disable属性， 对于div没有disable属性
                   * 需要一个flag控制频繁请求
                   */}
                  {code_button_text}
                </Button>
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
