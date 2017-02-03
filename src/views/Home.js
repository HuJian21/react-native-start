import React, { Component } from 'react';
import { StyleSheet, Dimensions, Image, View } from 'react-native';

import ViewPager from 'react-native-viewpager';
import NavigationBar from 'react-native-navbar';

const deviceWidth = Dimensions.get('window').width;
const API_SOON = 'https://api.douban.com/v2/movie/coming_soon';

export default class Home extends Component {
    constructor(props) {
        super(props);
        this._fetchData = this._fetchData.bind(this);
        this.renderPage = this._renderPage.bind(this);
        this.state = {
            dataSource: new ViewPager.DataSource({
                pageHasChanged: (p1, p2) => p1 !== p2,
            })
        }
    }

    // 生命周期钩子
    componentDidMount () {
        this._fetchData();
    }

    async _fetchData () {
        try {
            let response = await fetch(API_SOON);
            let responseJson = await response.json();
            let imageAry = [];
            for (let i = 0; i < 5; i++) {
                let image = {};
                image = responseJson.subjects[i].images.large;
                imageAry.push(image);
            }
            this.setState({
                dataSource: this.state.dataSource = this.state.dataSource.cloneWithPages(imageAry)
            })
            console.log(this.state.dataSource);
        } catch (error) {
            console.error(error);
        }
    }

    _renderPage(data) {
        return (
            <Image style={styles.pager} source={{uri: data}} />
        );
    }

    render () {
        return (
            <View style={styles.container}>
                <NavigationBar
                    style={{height: 40}}
                    title={{title: '首页'}}
                />
                <View style={styles.page}>
                    <ViewPager
                        dataSource={this.state.dataSource}
                        renderPage={this.renderPage}
                        isLoop={true}
                        autoPlay={true}
                    >
                    </ViewPager>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    pager: {
        height: 180,
        width: deviceWidth
    },
    page: {
        height: 180,
        width: deviceWidth
    }
})