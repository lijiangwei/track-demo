import React from 'react';
import {TrackContext} from './context';
import {trackQueue} from './queue';
/**
 * form表单增加收集数据的功能
 * @param {Component} FormComponent 要采集数据的form表单
 */
function withTrack(FormComponent){
  return class extends React.Component {

    componentDidMount(){
      trackQueue.clear();
    }

    componentWillMount(){
      trackQueue.send();
    }

    render(){
      return (
        <TrackContext.Provider value={trackQueue}>
          <FormComponent {...this.props} />
        </TrackContext.Provider>
      )
    }
  }
}

export {
  withTrack
}
