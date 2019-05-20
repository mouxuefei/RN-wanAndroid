import React, {Component} from 'react';
import {View, Text, TextInput, Image, TouchableOpacity, StyleSheet,ToastAndroid} from 'react-native'
import {TitleBar} from "../../widget/titleBar";
import NetUtils from "../../net/NetUtils";
var Dimensions = require('Dimensions');
var ScreenWidth = Dimensions.get('window').width;
export class Login extends Component {
    constructor(props){
        super(props);
        this.state= {
            userName:'',
            passWord:''
        }
    }
    render() {
        let {navigation} = this.props;
        return <View style={{flex: 1, flexDirection: 'column'}}>
            <TitleBar title='登录' navigation={navigation}/>
            <View style={{marginTop: 80}}>
                <TextInput placeholder={'请输入用户名'} style={loginStyles.textInputStyle}
                           onChangeText={(userName)=>this.setState({userName:userName})}/>
                <TextInput placeholder={'请输入密码'}  secureTextEntry={true} style={loginStyles.textInputStyle}
                           onChangeText={(passWord)=>this.setState({passWord:passWord})}/>
            </View>

            <TouchableOpacity
                style={loginStyles.loginBtnStyle}
                onPress={this.loginMethod.bind(this)}>
                <Text style={{color:'white'}}>登录</Text>
            </TouchableOpacity>
        </View>;
    }


    loginMethod() {
        if (this.state.userName===''||this.state.passWord===''){
            ToastAndroid.show("请输入用户名或者密码",ToastAndroid.SHORT);
            return
        }
        const url="https://www.wanandroid.com/user/login";
        let formData = new FormData();
        formData.append('username',this.state.userName);
        formData.append('password',this.state.passWord);
        NetUtils.post(url,formData,(info)=>{
            ToastAndroid.show("登录成功",ToastAndroid.SHORT);
            this.props.navigation.pop();
        })
    }
}

const loginStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#dddddd',
        // 设置侧轴的对齐方式
        alignItems:'center'
    },


    textInputStyle:{
        width: ScreenWidth*0.8,
        height:38,
        marginTop:10,
        backgroundColor:'white',
        marginBottom:1,
        // 内容居中
        textAlign:'left',
        borderColor: 'lightgrey',
        borderWidth: 1,
        borderRadius:4,
        alignSelf:'center'
    },

    loginBtnStyle:{
        height:35,
        marginLeft:20,
        marginRight:20,
        backgroundColor:'green',
        marginTop:30,
        marginBottom:20,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:8
    },
});