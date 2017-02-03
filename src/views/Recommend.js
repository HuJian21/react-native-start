import React, { Component } from 'react';

import {
    View,
    StyleSheet,
    ListView,
    ActivityIndicator,
    TouchableOpacity,
    RefreshControl,
    Image,
    Text
} from 'react-native';

import NavigationBar from 'react-native-navbar';

const API_TOP = 'https://api.douban.com/v2/movie/top250';

export default class Recommend extends Component {
    constructor (props) {
        super(props);
        this.fetchData = this._fetchData.bind(this);
        let dataSource = new ListView.DataSource({
            rowHasChanged: (r1, r2) => r1 !== r2
        });
        this.state = {
            dataSource: dataSource,
            data: []
        };
        this.naprop = this.props;
    }

    componentDidMount () {
        this.fetchData();
    }

    // 请求数据
    async _fetchData () {
        try {
            let response = await fetch(API_TOP);
            let responseJson = await response.json();
            let responseData = responseJson.subjects;
            this.setState({
                data: responseData,
                dataSource: this.state.dataSource.cloneWithRows(responseData),
                loaded: true,
                isRefreshing: false
            });
        } catch (error) {
            console.error(error);
        }
    }

    renderLoading () {
        return (
            <View>
                <ActivityIndicator
                    style={[{margin: 10}, {backgroundColor:'#0000'}, {height: 80}]}
                >
                </ActivityIndicator>
            </View>
        )
    }
 
    renderList () {
        return (
            <View>
                <NavigationBar
                    style={{height: 40}}
                    title={{title: '推荐'}}
                />
                <ListView
                    dataSource={this.state.dataSource}
                    renderRow={this.renderItem.bind(this)}
                >
                </ListView>
            </View>
        )
    }

    renderItem (rowData) {
        return (
            <View
                style={styles.container}
            >
                <View style={styles.imageBox}>
                    <Image style={styles.image} source={{uri: rowData.images.small}}></Image>
                </View>
                <View style={styles.movieInfo}>
                    <Text style={styles.title}>{rowData.title}</Text>
                </View>
            </View>
        )
    }

    render () {
        if (!this.state.loaded) {
            return this.renderLoading();
        } else {
            return this.renderList();
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: 100,
        justifyContent: 'center',
        flexDirection: 'row'
    },
    imageBox: {
        width: 70,
        height: 90
    },
    image: {
        width: 70,
        height: 90
    },
    movieInfo: {
        marginLeft: 70
    },
    title: {
        fontWeight: 'bold',
        fontSize: 20,
        color: 'red'
    }
})