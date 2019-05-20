import React, {Component} from 'react';
import {View, Text, SectionList, ActivityIndicator, Image,TouchableNativeFeedback} from 'react-native'
import NetUtils from "../net/NetUtils";
import {Loading} from "../widget/Loading";
import {Empty} from "../widget/Empty";
import {TitleBar} from "../widget/titleBar";

const END_NODATA = 1;//没有更多数据
const END_LOADING = 2;//加载更多
const END_ERROR = 0;//错误
export class ProjectPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            projectList: [{
                key: "projectItem",
                data: null,
            },],
            showFoot: END_LOADING,//底部的内容如果是1
            pageNum: 1,
            isEndList: false,
        }
    }

    componentDidMount() {
        this.loadData(false);
    }


    loadData(isLoadmore) {
        const url = "https://www.wanandroid.com/project/list/" + this.state.pageNum + "/json?cid=294";

        console.log(url);
        NetUtils.get(url, null, (result) => {
                this.setState({
                    pageNum: this.state.pageNum + 1
                });
                let data = result.datas;
                if (isLoadmore) {
                    if (data.length === 0 || data.length < 15) {
                        this.setState({
                            showFoot: END_NODATA,
                            projectList: [{
                                key: "projectItem",
                                data: [...this.state.projectList[0].data, ...data],
                            },],
                        });
                    } else {
                        this.setState({
                            showFoot: END_LOADING,
                            projectList: [{
                                key: "projectItem",
                                data: [...this.state.projectList[0].data, ...data],
                            },],
                        });
                    }
                } else {
                    this.setState({
                        projectList: [{
                            key: "projectItem",
                            data: data,
                        },],
                    });
                }

            }
        )
    }

    render() {
        const {navigation} = this.props;
        return <View style={{flex: 1}}>
            <TitleBar title='项目' right='' navigation={navigation} leftShow={false}/>
            {this.getSectionList()}
        </View>
    }

    getSectionList() {
        if (this.state.projectList[0].data == null) {
            return <Loading/>
        } else if (this.state.projectList[0].data === 0) {
            return <Empty/>
        } else {
            return <SectionList
                onEndReached={this._onEndReached.bind(this)}
                onEndReachedThreshold={1}
                ListFooterComponent={this._renderFooter.bind(this)}
                sections={this.state.projectList}
                renderItem={this._renderProjectItem}
                keyExtractor={(item) => item.title}
                ItemSeparatorComponent={this._ProjectItemSeparator}
            />;
        }
    }

    _onEndReached() {
        if (this.state.showFoot === END_NODATA) {
            return;
        }
        this.loadData(true);
    }

    _renderFooter() {
        if (this.state.showFoot === END_NODATA) {
            return (
                <View style={{height: 30, alignItems: 'center', justifyContent: 'center',}}>
                    <Text style={{color: '#999999', fontSize: 14, marginTop: 5, marginBottom: 5,}}>
                        我是有底线的...
                    </Text>
                </View>
            );
        } else if (this.state.showFoot === END_LOADING) {
            return (
                <View style={{flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                    <ActivityIndicator/>
                    <Text style={{marginLeft: 10}}>正在加载更多数据...</Text>
                </View>
            );
        } else if (this.state.showFoot === END_ERROR) {
            return (
                <View style={{height: 30, alignItems: 'center', justifyContent: 'flex-start',}}>
                    <Text style={{color: '#FF0000', fontSize: 14, marginTop: 5, marginBottom: 5,}}>
                        加载失败
                    </Text>
                </View>
            );
        }
    }

    _ProjectItemSeparator = () => {
        return <View style={{height: 1, backgroundColor: '#f5f5f5'}}/>
    };

    _itemClick(title, link,event){
        this.props.navigation.navigate('WebPage', {
            url: link,
            title: title
        })
    }
    _renderProjectItem = (info) => {
        let title = '  ' + info.item.title;
        let link = '  ' + info.item.link;
        return <TouchableNativeFeedback onPress={this._itemClick.bind(this, title, link)}>
            <View style={{flexDirection: 'row', flex: 1, height: 100}}>
                <View style={{
                    flexDirection: 'column',
                    flex: 1,
                    height: 100,
                    marginLeft: 10,
                    alignItems: 'flex-start'
                }}>
                    <Text style={{color: '#333333', fontSize: 16, marginTop: 5, textAlign: 'left'}}
                          numberOfLines={1}
                          ellipsizeMode="tail">{info.item.title}</Text>
                    <Text style={{color: '#999999', fontSize: 14, marginTop: 5, textAlign: 'left'}}
                          numberOfLines={1}
                          ellipsizeMode="tail">{info.item.desc}</Text>
                    <View style={{flex: 1}}/>
                    <View style={{flexDirection: 'row', marginBottom: 3, marginLeft: 5}}>
                        <Text>{info.item.niceDate}</Text>
                    </View>
                </View>
                <View style={{justifyContent: 'center'}}>
                    <Image source={{uri: info.item.envelopePic}}
                           style={{height: 70, width: 60, marginRight: 15}}
                           resizeMode='contain'
                    />
                </View>

            </View>
        </TouchableNativeFeedback>
    };


}