import React, { PureComponent } from "react";
import { NavBar, List, InputItem, WhiteSpace, Button, Icon } from "antd-mobile";
import {Link} from 'react-router-dom';
import {createForm} from 'rc-form';

export default class Demo extends PureComponent {
  render() {
    return (
      <div>
        <NavBar mode="light"
          leftContent={<Link to="/"><Icon type="left" /></Link>}>正常页面</NavBar>
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

  handleOriginClick = (e) => {
    console.log(e);
  }

  render() {
    const { getFieldProps } = this.props.form;
    return (
      <div>
        <List>
          <InputItem
            {...getFieldProps("phone")}
            type="phone"
            placeholder="请输入手机号"
            onClick={this.handleOriginClick}
            onFocus={(e) => this.handleOriginFocus(e)}
          >
            手机号
          </InputItem>
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

const FormDemoWrapper = createForm()(FormDemo);
