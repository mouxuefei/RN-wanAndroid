'use strict';
import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    WebView,
    Dimensions,
} from 'react-native';
import {TitleBar} from "../../widget/titleBar";

const {width, height} = Dimensions.get('window');

export default class WebPage extends Component {

    constructor(props) {
        super(props);
    }
    render() {
        const {navigation} = this.props;
        const title = navigation.getParam('title', '');
        const url = navigation.getParam('url', 'http://www.baidu.com');
        return (
            <View style={styles.container}>
                <TitleBar title={title} right='' navigation={navigation}/>
                <WebView
                    style={{width: width, height: height - 20, backgroundColor: 'gray'}}
                    source={{uri: url, method: 'GET'}}
                    javaScriptEnabled={true}
                    domStorageEnabled={true}
                    scalesPageToFit={false}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection:'column',
        backgroundColor: '#f2f2f2',
    },
});

