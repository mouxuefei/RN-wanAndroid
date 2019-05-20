import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import PropTypes from "prop-types";
import {Separator} from "./Separator";

var Dimensions = require('Dimensions');
var ScreenWidth = Dimensions.get('window').width;

export class MineItemCell extends Component {
    render() {
        let icon = null;
        if (this.props.image) {
            icon = <Image style={styles.icon} source={this.props.image} />
        }
        return (

            <View style={styles.container}>
                <TouchableOpacity onPress={this._onPressButton.bind(this)}>
                    <View style={[styles.content]}>
                        {icon}
                        <Text>{this.props.title}</Text>
                        <View style={{ flex: 1, backgroundColor: 'blue' }} />
                        <Text style={{ color: '#999999' }}>{this.props.subtitle}</Text>
                        <Image style={styles.arrow} source={require('../../res/right_arror.png')} />
                    </View>
                    <Separator />
                </TouchableOpacity>
            </View>
        );
    }
    _onPressButton(){
        if (this.props.click) {
            this.props.click()
        }
    }
    static propTypes = {
        title: PropTypes.string,
        subtitle: PropTypes.string,
        image: PropTypes.number,
        click:PropTypes.func
    };

    static defaultProps = {
        title: "",
        subtitle: "",
        image:null,
    }

}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
    },
    icon:{
        width: 20,
        height:20,
        marginRight: 10
    },
    content: {
        height: 44,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 15,
        paddingRight: 10,
    },
    subtitleContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    arrow: {
        width: 14,
        height: 14,
        marginLeft: 5,
    }
});

