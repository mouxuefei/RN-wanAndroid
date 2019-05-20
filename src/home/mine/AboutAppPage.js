import React, {Component} from 'react';
import {View, Text, SectionList, Image, ActivityIndicator, Linking} from 'react-native'
import {TitleBar} from "../../widget/titleBar";
import {MineItemCell} from "../../widget/MineItemCell";

export class AboutAppPage extends Component {
    render() {
        let {navigation} = this.props;
        return <View style={{flex: 1, flexDirection: 'column'}}>
            <TitleBar title='关于' navigation={navigation}/>
            <View style={{
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: 30,
                marginTop: 30
            }}>
                <Image source={require('../../../res/logo.jpg')}
                       style={{width: 100, height: 100, borderRadius: 10,}}/>
            </View>
            <MineItemCell title="github" subtitle='Go Star'
                          click={this._projectAddress.bind(this)}/>
            <MineItemCell title="作者" subtitle='' click={this._authorAddress.bind(this)}/>
            <MineItemCell title="api地址" subtitle='' click={this._apiAddress.bind(this)}/>
            <View style={{flex: 1, backgroundColor: '#f5f5f5'}}/>
        </View>;
    }

    _projectAddress() {
        Linking.openURL("https://github.com/mouxuefei/RN-wanAndroid").catch(err => console.error('An error occurred', err));
    }

    _authorAddress() {
        Linking.openURL("https://github.com/mouxuefei/").catch(err => console.error('An error occurred', err));
    }

    _apiAddress() {
        Linking.openURL("https://wanandroid.com/blog/show/2").catch(err => console.error('An error occurred', err));
    }
}