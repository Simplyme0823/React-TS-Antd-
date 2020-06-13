import React, { Component } from "react";
import { RouteComponentProps } from "react-router-dom";
import Register from "../Register/Register";
import Login from "../Login/Login";
type HomeStateProps = {
  type: string;
};

type HomeProps = RouteComponentProps;
export default class Home extends Component<HomeProps, HomeStateProps> {
  constructor(props: HomeProps) {
    super(props);
    this.state = {
      type: "login",
    };
  }
  switchForm = (value: string) => {
    this.setState({
      type: value,
    });
  };
  render() {
    return (
      <>
        {this.state.type === "login" ? (
          <Login switchForm={this.switchForm}></Login>
        ) : (
          <Register switchForm={this.switchForm} />
        )}
      </>
    );
  }
}
