import React, { PureComponent } from "react";
import { NavBar, List, InputItem, WhiteSpace, Button, Icon, Picker } from "antd-mobile";
import {Link} from 'react-router-dom';
import {
  TrackInputItem,
  TrackInput,
  TrackButton,
  withTrack,
  TrackCheckbox,
  TrackPicker,
  TrackModal,
}
from 'track';
import {createForm} from 'rc-form';

const {AgreeItem} = TrackCheckbox;

const seasons = [
  {
    label: '春',
    value: '春',
  },
  {
    label: '夏',
    value: '夏',
  },
  {
    label: '秋',
    value: '秋',
  },
  {
    label: '冬',
    value: '冬',
  },
];

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

  state = {
    agreement: true,
    season: [],
    visible: false,
  }

  handleSubmit = (e) => {
    this.props.form.validateFields({ force: true }, (error) => {
      if (!error) {
        console.log(this.props.form.getFieldsValue());
      }
    });
  }

  handleOriginFocus = (val, flag) => {
  }

  handleOriginSelect = (e) => {
    console.log(e.type, e.currentTarget.value);
  }

  handleComposition = (e) => {
    console.log('handleComposition', e);
  }

  handleCompositionStart = (e) => {
    console.log('handleCompositionStart', e);
  }

  handleSelect = (e) => {
    console.log(e.type);
  }

  handleInput = (e) => {
    console.log(e.type);
  }

  handleChange = (e) => {
    console.log(e.type);
  }

  handleKeyDown = (e) => {
    console.log(e.type, e.keyCode);
  }

  handleContextMenu = (e) => {
    console.log("handleContextMenu");
  }

  handleClick = (e) => {
    console.log(e);
  }

  handlePickerChange = (val) => {
    console.log('picker change: ', val);
    this.setState({
      season: val,
    });
  }

  handlePickerOk = (val) => {
    console.log('picker ok');
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
            onContextMenu={this.handleContextMenu}
            clear={true}
            onFocus={(val) => this.handleOriginFocus(val, '5')}
          >
            InputItem
          </TrackInputItem>
          <TrackInputItem
            {...getFieldProps("phoneCode")}
            elementId="200106"
            type="text"
            placeholder="请输入短信验证码"
            onInput={this.handleInput}
            onKeyDown={this.handleKeyDown}
            extra={
              <TrackButton elementId="200105" size="small">获取验证码</TrackButton>
            }
          >
            短信验证码
          </TrackInputItem>
          <List.Item>
            <TrackPicker
              elementId="200110"
              // {...getFieldProps("seasons", {
              //   initialValue: this.state.season
              // })}
              data={seasons}
              value={this.state.season}
              cols={1}
              onChange={this.handlePickerChange}
              onOk={this.handlePickerOk}
              >
              <List.Item arrow="horizontal">Picker</List.Item>
            </TrackPicker>
          </List.Item>
          <List.Item>
            <Button type="primary" onClick={() => this.setState({
              season: ['秋'],
            })}>修改Picker的值触发反显</Button>
          </List.Item>
          <List.Item>
            <AgreeItem
              {...getFieldProps("agreement")}
              elementId="200108"
              onChange={(e) => {
                this.setState({
                  agreement: e.target.checked
                })
              }}
              onContextMenu={(e) => console.log(e)}
              checked={this.state.agreement}
              >
              AgreeItem</AgreeItem>
          </List.Item>
          <List.Item>
            <div>
              input：<TrackInput type="text" placeholder="原始输入框" elementId="200109"
                onSelect={this.handleOriginSelect}
                />
            </div>
          </List.Item>
          <List.Item>
            <Button type="primary" onClick={() => this.setState({
              visible: true,
            })}>Modal</Button>
          </List.Item>
          <List.Item>
            <TrackButton elementId="200107" type="primary" onClick={this.handleSubmit}>提交</TrackButton>
          </List.Item>
        </List>
        <TrackModal
          visible={this.state.visible}
          elementId="200111"
          transparent
          maskClosable={false}
          title="协议"
          footer={[{ text: 'Ok', onPress: () => {this.setState({
            visible: false,
          })} }]}
        >
          <div style={{ height: 100, overflow: 'scroll' }}>
            这是一段协议内容....
          </div>
        </TrackModal>
      </div>
    );
  }
}

const FormDemoWrapper = withTrack('1001')(createForm()(FormDemo));
