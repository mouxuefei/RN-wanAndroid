import React, {Component} from 'react';
import {View, Text, Image} from 'react-native'

export class Empty extends Component {
    render() {
        return <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <Text style={{fontSize: 18}}>暂无数据~</Text>
        </View>
    }
}