import React, { Component } from "react";
import { Button, message } from "antd";
import { PoweroffOutlined } from "@ant-design/icons";
import { GetCode } from "../../api/account";

//定时器
let timer = null as any;
type CodeState = {
  code_button_disabled: boolean;
  code_button_loading: boolean;
  code_button_text: string;
  userid: number | string;
  module: string;
};
type CodeProps = {
  userid: number | string;
  module: string;
};
export default class Code extends Component<CodeProps, CodeState> {
  //构造函数只运行一次，可以把props的只赋给state作为初始值
  constructor(props: CodeProps) {
    super(props);
    this.state = {
      module: props.module,
      userid: props.userid,
      code_button_disabled: false,
      code_button_loading: false,
      code_button_text: "获取验证码",
    };
  }

  /**倒计时函数 */
  countDown = () => {
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
  //接受父组件传来的值
  componentWillReceiveProps({ userid }: CodeProps) {
    this.setState({
      userid,
    });
  }
  //组件销毁
  componentWillUnmount() {
    //清除定时器
    clearInterval(timer);
  }

  getCode = () => {
    const { userid, module } = this.state;
    // this.props.userid每次都会去父组件取值性能消耗
    if (!userid) {
      message.error("请输入用户名");
      return;
    }

    this.setState({
      code_button_loading: true,
      code_button_text: "发送中",
    });

    const requestData = {
      username: userid,
      module,
    };

    GetCode(requestData)
      .then((res) => {
        //倒计时函数
        this.countDown();
        message.success(`${res.data.message}`);
      })
      .catch((err) => {
        this.setState({
          code_button_loading: false,
          code_button_text: "重新获取",
        });
      });
  };

  render() {
    const {
      code_button_disabled,
      code_button_loading,
      code_button_text,
    } = this.state;
    return (
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
    );
  }
}
