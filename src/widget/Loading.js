import React, {Component} from 'react';
import {View, Text, ActivityIndicator, ProgressBarAndroid} from 'react-native'

export class Loading extends Component {
    render() {
        return <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <ProgressBarAndroid style={{width: 30, height: 30}}/>
        </View>
    }
}