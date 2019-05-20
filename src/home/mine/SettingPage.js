import React, {Component} from 'react';
import {View, Text, SectionList, Image, ActivityIndicator, Linking} from 'react-native'
import {TitleBar} from "../../widget/titleBar";

export class SettingPage extends Component {
    render() {
        let {navigation} = this.props;
        return <View style={{flex: 1, flexDirection: 'column'}}>
            <TitleBar title='设置' navigation={navigation}/>

        </View>;
    }


}