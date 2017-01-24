/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  Navigator
} from 'react-native';
import Main from './src/Main';

export default class myreactproject extends Component {
    render () {
        return (
            <Navigator
                initialRoute={{name: 'HomePage', component: Main, index: 0}}
                renderScene={(route, navigator) => {
                    return < route.component navigator = {navigator} {...route.params} />;
                }}
            >
            </Navigator>
        )
    }
}


AppRegistry.registerComponent('myreactproject', () => myreactproject);
