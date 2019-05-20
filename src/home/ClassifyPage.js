import React, {Component} from 'react';
import {View, Text, StyleSheet, SectionList, ScrollView} from 'react-native'
import {ClassifyItem} from "../widget/ClassifyItem";
import {TitleBar} from "../widget/titleBar";
import NetUtils from "../net/NetUtils";
import {Loading} from "../widget/Loading";
import {Empty} from "../widget/Empty";

export class ClassifyPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            classifyData: null
        };
    }

    componentDidMount() {
        this.getClassifyData()
    }

    getClassifyData() {
        const url = "https://www.wanandroid.com/tree/json";
        NetUtils.get(url, null, (result) => {
                this.setState({
                    classifyData: result
                })
            }
        )
    }

    render() {
        const {navigation} = this.props;
        return <View style={styles.container}>
            <TitleBar title='分类' right='' navigation={navigation} leftShow={false}/>
            {this.getContent()}
        </View>
    }

    getContent() {
        if (this.state.classifyData == null) {
            return <Loading/>
        } else if (this.state.classifyData === 0) {
            return <Empty/>
        } else {
            let children = [];
            this.state.classifyData.map((value, index) => {
                children.push(<ClassifyItem title={value.name} data={value.children}/>);
            });
            return <ScrollView>{children}</ScrollView>
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "column",
        alignContent: 'flex-start',
        backgroundColor: '#FFFFFF',
    },

});
