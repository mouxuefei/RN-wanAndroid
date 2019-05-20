import React, {Component} from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet, Share,ToastAndroid} from 'react-native'
import {MineItemCell,} from "../widget/MineItemCell";

export class PersonalPage extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        let headerText=PersonalPage.renderHeader();
        return <View style={{flex: 1,flexDirection:'column'}}>
            {headerText}
            <MineItemCell title="趋势" image={require('../../res/qushi.png')} click={this._advance.bind(this)} />
            <MineItemCell title="收藏" image={require('../../res/collection.png')} click={this._collection.bind(this)}/>
            <View style={{height:10,backgroundColor:'#f5f5f5'}}/>
            {/*<MineItemCell title="设置" image={require('../../res/setting.png')} click={this._setting.bind(this)}/>*/}
            <MineItemCell title="关于" image={require('../../res/about.png')} click={this._aboutApp.bind(this)}/>
            <MineItemCell title="分享" image={require('../../res/share.png')} click={this._shareApp}/>
            <View style={{flex:1,backgroundColor:'#f5f5f5'}}/>
        </View>
    }
    _setting(){
        this.props.navigation.navigate('SettingPage')
    }
    _advance(){
        this.props.navigation.navigate('AdvancePage')
    }
    _collection(){
        this.props.navigation.navigate('CollectionPage')
    }
    _aboutApp(){
        this.props.navigation.navigate('AboutAppPage')
    }
    _shareApp(){
        Share.share({
            message: '这是一款RN的玩androidAPP'
        })
            .then(this._showShareResult)
            .catch((error) => this.setState({result: 'error: ' + error.message}));
    }

    _showShareResult(){

    }

    static renderHeader() {
        return (
            <View style={styles.header}>
                <View style={styles.topContainer}>
                    <TouchableOpacity >
                        <Image style={[styles.icon, {marginRight: 15}]}
                               source={require('../../res/notice.png')}/>
                    </TouchableOpacity>

                </View>
                <View style={styles.userContainer}>
                    <Image style={styles.avatar} source={{uri:'http://img4.duitang.com/uploads/item/201406/30/20140630212346_Lnmxr.jpeg'}}/>

                </View>
            </View>
        )
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f3f3f3',
    },
    header: {
        backgroundColor: '#06C1AE',
        paddingBottom: 20
    },
    topContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginTop: 7,
    },
    icon: {
        width: 27,
        height: 27,
    },
    userContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        margin: 10,
    },
    avatar: {
        width: 50,
        height: 50,
        marginRight: 10,
        borderRadius: 25,
        borderWidth: 2,
        borderColor: '#51D3C6'
    }
});