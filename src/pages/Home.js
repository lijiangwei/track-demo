import React from "react";
import { Switch, Route, Link, useHistory } from "react-router-dom";
import { NavBar, List, WhiteSpace } from "antd-mobile";
import TrackHome from './KYD/Home';
import NoTrackHome from './other/Demo';

export default function Home() {
  let history = useHistory();
  return (
      <Switch>
        <Route path="/" exact>
          <div>
            <NavBar mode="light">采集Demo</NavBar>
            <WhiteSpace />
            <List>
              <List.Item arrow="horizontal" onClick={() => history.push('/notrack')}>无数据采集</List.Item>
              <List.Item arrow="horizontal" onClick={() => history.push('/track-item')}>有数据采集-单个组件</List.Item>
              <List.Item arrow="horizontal">
                <Link to='/notrack'>有数据采集-统一处理</Link>
              </List.Item>
            </List>
          </div>
        </Route>
        <Route path="/track-item" component={TrackHome} />
        <Route path="/notrack" component={NoTrackHome} />
      </Switch>
  );
}
