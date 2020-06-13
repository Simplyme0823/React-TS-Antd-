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
/**
 * 接口继承，类继承，基类，静态方法，范型，private，protect，this，重载/重写，多态
 */
export interface RegisterStateProps {
  userid: number | undefined | string;
  psd: string | undefined | number;
  confirm: string | undefined | number;
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

class Register extends Component<RegisterProps, RegisterStateProps> {
  /**
   * es6内部为严格模式
   * @param props
   */
  constructor(props: RegisterProps) {
    //调用父类构造函数
    super(props);
    this.state = {
      userid: undefined,
      psd: undefined,
      confirm: undefined,
    };
    /**
     * 构造函数只运行一次
     */
    this.login = this.login.bind(this);
    this.inputPwd = this.inputPwd.bind(this);
    this.inputUserid = this.inputUserid.bind(this);
    this.enter = this.enter.bind(this);
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
    this.props.switchForm("login");
  };

  getCode() {}
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
            rules={[{ required: true, message: "Please input your userid !" }]}
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
                value={this.state.psd}
                onChange={this.inputPwd}
              ></Input.Password>
            </Row>
          </Form.Item>
          <Form.Item
            style={{ justifyContent: "center" }}
            name="code"
            rules={[{ required: true, message: "请输入验证码" }]}
          >
            <Row gutter={13}>
              <Col span={16}>
                <Input
                  placeholder="验证码"
                  value={this.state.psd}
                  onChange={this.getCode}
                ></Input>
              </Col>
              <Col span={8}>
                <Button type="danger" block>
                  获取验证码
                </Button>
              </Col>
            </Row>
          </Form.Item>
          <Form.Item style={{ justifyContent: "center" }}>
            <Button type="primary" onClick={this.login} block>
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
export default withRouter(
  connect(mapStatetoProps, mapDispatchToProps)(Register)
);
