import React, { Component } from 'react';
import { Image, Text, StyleSheet } from 'react-native';

import TabNaviagtor from 'react-native-tab-navigator';

import Home from './views/Home'
import Recommend from './views/Recommend'

export default class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedTab: 'home'
        }
    }

    render() {
        return (
            <TabNaviagtor tabBarStyle={{ height: 60, overflow: 'hidden' }}>
                <TabNaviagtor.Item
                    selected={this.state.selectedTab === 'home'}
                    title="首页"
                    titleStyle={styles.tabFont}
                    selectedTitleStyle={styles.tabSelectedFont}
                    renderIcon={() => <Image style={styles.tabImgSize} source={require('./assets/img/home.png')} />}
                    renderSelectedIcon={() => <Image style={styles.tabImgSize} source={require('./assets/img/home_selected.png')} />}
                    // event
                    onPress={() => this.setState({selectedTab: 'home'})}
                >
                    <Home {...this.props}></Home>
                </TabNaviagtor.Item>

                <TabNaviagtor.Item
                    selected={this.state.selectedTab === 'recommend'}
                    title="推荐"
                    titleStyle={styles.tabFont}
                    selectedTitleStyle={styles.tabSelectedFont}
                    renderIcon={() => <Image style={styles.tabImgSize} source={require('./assets/img/home.png')} />}
                    renderSelectedIcon={() => <Image style={styles.tabImgSize} source={require('./assets/img/home_selected.png')} />}
                    // event
                    onPress={() => this.setState({selectedTab: 'recommend'})}
                >
                    <Recommend></Recommend>
                </TabNaviagtor.Item>

                <TabNaviagtor.Item
                    selected={this.state.selectedTab === 'usercenter'}
                    title="我的"
                    titleStyle={styles.tabFont}
                    selectedTitleStyle={styles.tabSelectedFont}
                    renderIcon={() => <Image style={styles.tabImgSize} source={require('./assets/img/user.png')} />}
                    renderSelectedIcon={() => <Image style={styles.tabImgSize} source={require('./assets/img/user_selected.png')} />}
                    // event
                    onPress={() => this.setState({selectedTab: 'usercenter'})}
                >
                    <Text>i'm usercenter</Text>
                </TabNaviagtor.Item>


            </TabNaviagtor>
        )
    }
}

const styles = StyleSheet.create({
    tabFont: {
        color: 'rgb(169, 183, 183)',
        fontSize: 11
    },
    tabSelectedFont: {
        color: '#259AEF',
        fontSize: 11
    },
    tabImgSize: {
        width: 32,
        height: 32
    }
})