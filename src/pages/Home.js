import React from 'react';
import { IndexRoute, Route, Link, Router, hashHistory } from 'react-router';
import { NavBar, List, WhiteSpace } from 'antd-mobile';
import TrackHome from './KYD/Home';
import TrackResult from './KYD/Result';
import NoTrackHome from './other/Demo';
import TrackManualHome from './KYD/ManualHome';

function HomeIndex(props) {
  return (
    <div>
      <NavBar mode="light">采集Demo</NavBar>
      <WhiteSpace />
      <List>
        <List.Item
          arrow="horizontal"
          onClick={() => props.history.push('/notrack')}
        >
          无数据采集
        </List.Item>
        <List.Item
          arrow="horizontal"
          onClick={() => props.history.push('/track-item')}
        >
          有数据采集-自动提交
        </List.Item>
        <List.Item arrow="horizontal">
          <Link to="/track-manual-item">有数据采集-手动提交</Link>
        </List.Item>
      </List>
    </div>
  );
}

export default function Home(props) {
  return (
    <Router history={hashHistory}>
      <Route path="/" component={HomeIndex} />
      <Route path="/track-item" component={TrackHome} />
      <Route path="/track-manual-item" component={TrackManualHome} />
      <Route path="/track-item-result" component={TrackResult} />
      <Route path="/notrack" component={NoTrackHome} />
    </Router>
  );
}
