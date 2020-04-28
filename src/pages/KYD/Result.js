import React from 'react';
import { Link } from 'react-router';
import { NavBar, WhiteSpace, Icon } from 'antd-mobile';
import { withTrack } from 'track';

export default class Confirm extends React.Component {
  render() {
    return (
      <div>
        <NavBar
          mode="light"
          leftContent={
            <Link to="/">
              <Icon type="left" />
            </Link>
          }
        >
          第二页
        </NavBar>
        <WhiteSpace />
        <ResultDemoWrapper />
      </div>
    );
  }
}

class ResultDemo extends React.Component {
  render() {
    return (
      <h5
        style={{
          textAlign: 'center',
        }}
      >
        模拟结果页
      </h5>
    );
  }
}

const ResultDemoWrapper = withTrack('1002')(ResultDemo);
