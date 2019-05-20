import React, {Component} from 'react';
import {View, Text, Image, TouchableWithoutFeedback, Dimensions} from 'react-native'
import PropTypes from "prop-types";

const {width, height} = Dimensions.get('window');

export class TitleBar extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let leftIcon = this.props.leftShow ? <Image source={require('../../res/back.png')}
                                                    style={{height: 15, width: 20, marginLeft: 10}}
                                                    resizeMode='cover'/> :
            <View/>;
        return <View
            style={{flexDirection: 'column', height: 46, backgroundColor: this.props.backColor}}>
            <View style={{
                height: 45,
                justifyContent: 'space-between',
                flexDirection: 'row',
                alignItems: 'center',
            }}>
                <TouchableWithoutFeedback
                    onPress={this.back.bind(this)}
                >
                    <View style={{width: 50}}>
                        {leftIcon}
                    </View>
                </TouchableWithoutFeedback>


                <Text style={{fontSize: 18, color: '#333333'}}
                      numberOfLines={1}
                      ellipsizeMode="tail">{this.props.title ? (this.props.title.length > 20 ? this.props.title.substr(0, 20) + "..." : this.props.title) : ""}</Text>
                <View style={{width: 50}}>
                    <Text style={{marginRight: 10}}>{this.props.right}</Text>
                </View>

            </View>
            <View style={{height: 1, backgroundColor: '#f5f5f5'}}/>
        </View>
    }

    back() {
        if (this.props.backPressed) {
            this.props.backPressed();
            return
        }
        this.props.navigation.goBack();
    }

    static propTypes = {
        title: PropTypes.string,
        right: PropTypes.string,
        pressRight: PropTypes.func,
        backPressed: PropTypes.func,
        navigation: PropTypes.object.isRequired,
        backColor: PropTypes.string,
        leftShow: PropTypes.bool,
    };

    static defaultProps = {
        title: '',
        right: '',
        backColor: '#ffffff',
        leftShow: true,
    }
}