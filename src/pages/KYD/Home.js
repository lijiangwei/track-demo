import React, { PureComponent } from 'react';
import {
  NavBar,
  List,
  InputItem,
  WhiteSpace,
  Button,
  Icon,
  Picker,
} from 'antd-mobile';
import {
  TrackInputItem,
  TrackInput,
  TrackButton,
  withTrack,
  TrackCheckbox,
  TrackPicker,
  TrackModal,
  trackQueue,
  TrackA,
  TrackImg,
  TrackPickerMenu,
} from 'track';
import { createForm } from 'rc-form';
const logo = require('../../logo.svg');

const { AgreeItem } = TrackCheckbox;

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

const initArea = ['01', '01-01', '01-01-02'];

const areas = [
  {
    label: '北京',
    value: '01',
    children: [
      {
        label: '北京',
        value: '01-01',
        children: [
          {
            label: '顺义区',
            value: '01-01-01',
          },
          {
            label: '朝阳区',
            value: '01-01-02',
          },
        ],
      },
    ],
  },
  {
    label: '河南',
    value: '02',
    children: [
      {
        label: '郑州市',
        value: '02-01',
        children: [
          {
            label: '金水区',
            value: '02-01-01',
          },
          {
            label: '二七区',
            value: '02-01-02',
          },
        ],
      },
      {
        label: '新乡市',
        value: '02-02',
        children: [
          {
            label: '卫滨区',
            value: '02-02-01',
          },
          {
            label: '红旗区',
            value: '02-02-02',
          },
        ],
      },
    ],
  },
];

const jobs = [
  {
    label: '职业大类1',
    value: '01',
    children: [
      {
        label: '职业1-1',
        value: '01-01',
      },
      {
        label: '职业1-2',
        value: '01-02',
      },
    ],
  },
  {
    label: '职业大类2',
    value: '02',
    children: [
      {
        label: '职业2-1',
        value: '02-01',
      },
      {
        label: '职业2-2',
        value: '02-02',
      },
    ],
  },
];

export default class Home extends PureComponent {
  render() {
    return (
      <div>
        <NavBar
          mode="light"
          leftContent={
            <a
              onClick={() => {
                //返回按钮点击数据
                trackQueue.push({
                  elementId: '200101',
                  pageId: '1001',
                });
                this.props.history.goBack();
              }}
            >
              <Icon type="left" />
            </a>
          }
        >
          首页
        </NavBar>
        <WhiteSpace />
        <FormDemoWrapper history={this.props.history} />
      </div>
    );
  }
}

class FormDemo extends React.Component {
  state = {
    agreement: true,
    season: [],
    job: ['02', '02-01'],
    visible: false,
  };

  componentDidMount() {
    //配置用户信息
    trackQueue.configExtraInfo({
      V_SID: '',
      V_USER_ID: '',
    });
  }

  handleSubmit = (e) => {
    this.props.form.validateFields({ force: true }, (error) => {
      if (!error) {
        console.log(this.props.form.getFieldsValue());
        this.props.history.push('/track-item-result');
      }
    });
  };

  handlePickerChange = (val) => {
    this.setState({
      season: val,
    });
  };

  handleJobChange = (val) => {
    this.setState({
      job: val,
    });
  };

  render() {
    const { getFieldProps } = this.props.form;
    return (
      <div>
        <List>
          <TrackInputItem
            {...getFieldProps('phone')}
            type="phone"
            placeholder="请输入手机号"
            elementId="200104"
            clear={true}
          >
            InputItem
          </TrackInputItem>
          <TrackInputItem
            {...getFieldProps('phoneCode')}
            elementId="200106"
            type="text"
            placeholder="请输入短信验证码"
            extra={
              <TrackButton elementId="200105" size="small">
                获取验证码
              </TrackButton>
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
            >
              <List.Item arrow="horizontal">Picker</List.Item>
            </TrackPicker>
          </List.Item>
          <List.Item>
            <Button
              type="primary"
              onClick={() =>
                this.setState({
                  season: ['秋'],
                })
              }
            >
              修改Picker的值触发反显
            </Button>
          </List.Item>
          <List.Item>
            <TrackPicker
              elementId={['200119', '200120', '200121']}
              {...getFieldProps('area', {
                initialValue: initArea,
              })}
              data={areas}
              // cols={3}
            >
              <List.Item arrow="horizontal">选择地区</List.Item>
            </TrackPicker>
          </List.Item>
          <List.Item>
            <TrackPickerMenu
              elementId="200122"
              data={jobs}
              value={this.state.job}
              onOk={this.handleJobChange}
            />
          </List.Item>
          <List.Item>
            <AgreeItem
              {...getFieldProps('agreement')}
              elementId="200108"
              onChange={(e) => {
                this.setState({
                  agreement: e.target.checked,
                });
              }}
              onContextMenu={(e) => console.log(e)}
              checked={this.state.agreement}
            >
              AgreeItem
            </AgreeItem>
          </List.Item>
          <List.Item>
            <TrackA elementId="200115">测试这是一个链接</TrackA>
          </List.Item>
          <List.Item>
            <TrackImg
              elementId="200116"
              style={{
                width: 50,
                height: 50,
              }}
              onClick={() => {
                console.log('img click.');
              }}
              src={logo}
            />
          </List.Item>
          <List.Item>
            <div>
              input：
              <TrackInput
                type="text"
                placeholder="原始输入框"
                elementId="200109"
              />
            </div>
          </List.Item>
          <List.Item>
            <Button
              type="primary"
              onClick={() =>
                this.setState({
                  visible: true,
                })
              }
            >
              Modal
            </Button>
          </List.Item>
          <List.Item>
            <TrackButton
              elementId="200107"
              type="primary"
              onClick={this.handleSubmit}
            >
              提交
            </TrackButton>
          </List.Item>
        </List>
        <TrackModal
          visible={this.state.visible}
          elementId="200111"
          transparent
          maskClosable={false}
          title="协议"
          footer={[
            {
              text: 'Ok',
              onPress: () => {
                this.setState({
                  visible: false,
                });
              },
            },
          ]}
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
