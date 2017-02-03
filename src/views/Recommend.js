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
import MovieDetail from './MovieDetail'

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
            <TouchableOpacity 
                onPress={() => this.goMoiveDetail(rowData)}
            >
                <View
                    style={styles.container}
                >
                    <View style={styles.imageBox}>
                        <Image style={styles.image} source={{uri: rowData.images.small}}></Image>
                    </View>
                    <View style={styles.rowRight}>
                        <View style={styles.movieInfo}>
                            <Text style={styles.title}>{rowData.title}</Text>
                            <View>
                                <Text style={styles.types}>类型：{rowData.genres.join(', ')}</Text>
                                <Text style={styles.actor}>主演：{rowData.casts.map((actor) => actor.name).join('/')}</Text>
                            </View>
                        </View>
                        <View style={styles.gradeBox}>
                            <Text style={styles.grade}>{rowData.rating.average}分</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        )
    }

    goMoiveDetail (rowData) {
        let {navigator} = this.naprop;
        if (navigator) {
            console.log(rowData)
            navigator.push({
                component: MovieDetail,
                params: {
                    id: rowData.id
                }
            })
        }
    }

    render () {
        if (!this.state.loaded) {
            return this.renderLoading();
        }
        return this.renderList();
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        flexDirection: 'row',
        borderColor: '#000',
        borderWidth: 0.5,
        margin: 10
    },
    imageBox: {
        width: 70,
        height: 90,
        margin: 10        
    },
    image: {
        width: 70,
        height: 90
    },
    rowRight: {
        margin: 10,
        marginLeft: 10,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    title: {
        fontWeight: 'bold',
        fontSize: 20,
        color: 'black'
    },
    gradeBox: {
        marginLeft: 10,
        marginRight: 20
    },
    grade: {
        color: 'rgb(255,188,0)',
        fontSize: 18
    },
    types: {
        color: '#aaa',
        fontSize: 12,
        marginTop: 18
    },
    actor: {
        color: '#aaa',
        fontSize: 12,
        marginTop: 4
    }
})