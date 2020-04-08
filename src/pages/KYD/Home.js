import React, { PureComponent } from "react";
import { NavBar, List, InputItem, WhiteSpace, Button, Icon } from "antd-mobile";
import {Link} from 'react-router-dom';
import {TrackInputItem, withTrack} from 'track';
import {createForm} from 'rc-form';

export default class Home extends PureComponent {
  render() {
    return (
      <div>
        <NavBar mode="light"
          leftContent={<Link to="/"><Icon type="left" /></Link>}>首页</NavBar>
        <WhiteSpace />
        <FormDemoWrapper />
      </div>
    );
  }
}

class FormDemo extends React.Component {

  handleSubmit = () => {
    this.props.form.validateFields({ force: true }, (error) => {
      if (!error) {
        console.log(this.props.form.getFieldsValue());
      }
    });
  }

  handleOriginFocus = (e) => {
    console.log(e);
  }

  render() {
    const { getFieldProps } = this.props.form;
    return (
      <div>
        <List>
          <TrackInputItem
            {...getFieldProps("phone")}
            type="phone"
            placeholder="请输入手机号"
            elementId="200104"
            onFocus={this.handleOriginFocus}
          >
            手机号
          </TrackInputItem>
          <InputItem
            {...getFieldProps("phoneCode")}
            type="digit"
            placeholder="请输入短信验证码"
            extra={
              <Button size="small">获取验证码</Button>
            }
          >
            短信验证码
          </InputItem>
          <List.Item>
            <Button type="primary" onClick={this.handleSubmit}>提交</Button>
          </List.Item>
        </List>
      </div>
    );
  }
}

const FormDemoWrapper = withTrack(createForm()(FormDemo));
