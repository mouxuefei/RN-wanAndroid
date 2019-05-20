import React, {Component} from 'react';
import {View, Text, StyleSheet,} from 'react-native'

export class ClassifyItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            colors: ['#79CDCD', '#71C671', '#4169E1',
                '#EE82EE', '#F4A460', '#FF7256', '#FFB90F']
        };
    }

    render() {
        let title = this.props.title;
        return <View>
            <Text style={{
                fontSize: 18,
                color: '#333333',
                marginLeft: 15,
                marginTop: 8,
                marginBottom: 8
            }}>{title}</Text>
            <View style={styles.container}>
                {this.getChildView()}
            </View>
        </View>;
    }

    getChildView() {
        let children = [];
        this.props.data.map((value, index) => {
            children.push(this.getItems(value));
        });
        return children
    }

    getItems(value) {
        const index = Math.floor(Math.random() * 6);
        let color = this.state.colors[index];
        return <View style={{
            marginLeft: 15, marginRight: 15,
            backgroundColor: color,
            marginTop: 5,
            marginBottom: 5,
            borderRadius:15,
            paddingBottom:3,
            paddingTop:3,
            paddingLeft:8,
            paddingRight:8
        }}>
            <Text style={{fontSize: 14, color: '#ffffff'}}>{value.name}</Text>
        </View>;
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        backgroundColor: '#F5FCFF',
        paddingBottom:5,
        paddingTop:5
    },
});
