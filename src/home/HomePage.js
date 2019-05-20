import React, {Component} from 'react';
import {
    View,
    Text,
    ScrollView,
    TouchableNativeFeedback,
    Image,
    SectionList,
    ActivityIndicator,
    Platform,
    default as Dimensions
} from 'react-native'
import {Banner} from "../banner/Banner";
import NetUtils from "../net/NetUtils";
import {PullView} from 'react-native-pull';
import {ProjectListPage} from "./Project/ProjectListPage";

export class HomePage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            moreTitle: "",
            refreshing: false,
            bannerData: [],
            projectData: [{
                key: "project",
                data: []
            },],

            gzhData: [{
                key: "gzh",
                data: []
            },],
        };

        this.onPullRelease = this.onPullRelease.bind(this);
        this.topIndicatorRender = this.topIndicatorRender.bind(this);
    }

    componentDidMount() {
        this.getNetData(null)
    }

    getNetData(resolve) {
        this.getBannerData();
        this.getHotArticleData();
        this.getGzhData(resolve);
    }

    onPullRelease(resolve) {
        this.getNetData(resolve);
        resolve();
    }

    topIndicatorRender(pulling, pullok, pullrelease) {
        const hide = {position: 'absolute', left: 10000};
        const show = {position: 'relative', left: 0};
        setTimeout(() => {
            if (pulling) {
                this.txtPulling && this.txtPulling.setNativeProps({style: show});
                this.txtPullok && this.txtPullok.setNativeProps({style: hide});
                this.txtPullrelease && this.txtPullrelease.setNativeProps({style: hide});
            } else if (pullok) {
                this.txtPulling && this.txtPulling.setNativeProps({style: hide});
                this.txtPullok && this.txtPullok.setNativeProps({style: show});
                this.txtPullrelease && this.txtPullrelease.setNativeProps({style: hide});
            } else if (pullrelease) {
                this.txtPulling && this.txtPulling.setNativeProps({style: hide});
                this.txtPullok && this.txtPullok.setNativeProps({style: hide});
                this.txtPullrelease && this.txtPullrelease.setNativeProps({style: show});
            }
        }, 1);

        return (
            <View style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                height: 60
            }}>
                <ActivityIndicator size="small" color="gray" style={{marginRight:5}}/>
                <Text ref={(c) => {
                    this.txtPulling = c;
                }}>下拉刷新...</Text>
                <Text ref={(c) => {
                    this.txtPullok = c;
                }}>松开刷新......</Text>
                <Text ref={(c) => {
                    this.txtPullrelease = c;
                }}>玩命刷新中......</Text>
            </View>
        );
    }

    render() {
        return <PullView
            onPullRelease={this.onPullRelease}
            topIndicatorRender={this.topIndicatorRender} topIndicatorHeight={60}>
            <ScrollView>
                <View style={{flex: 1}}>
                    <Banner data={this.state.bannerData}/>
                    {this.getView(1, "推荐项目", require('../../res/suggestion.png'), '#00C5CD')}
                    <View style={{flex: 1, backgroundColor: '#ffffff'}}>
                        <SectionList
                            renderItem={this._renderItem}
                            sections={this.state.projectData}
                            keyExtractor={(item) => item.title}
                            ItemSeparatorComponent={this._itemSeparator}
                        />
                    </View>
                    {this.getView(2, "推荐公众号", require('../../res/gongzhognhao.png'), '#BAD4FF')}

                    <View style={{flex: 1, backgroundColor: '#ffffff'}}>
                        <SectionList
                            renderItem={this._renderGzhItem}
                            sections={this.state.gzhData}
                            keyExtractor={(item) => item.title}
                            ItemSeparatorComponent={this._itemSeparator}
                        />
                    </View>
                    <View style={{
                        flex: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: 40,
                        backgroundColor: '#f5f5f5'
                    }}>
                        <Text style={{fontSize: 14}}>我是有底线的...</Text>
                    </View>
                </View>
            </ScrollView>
        </PullView>
    }

    getView(type, title, pic, color) {
        return <View style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: '#f5f5f5',
            height: 45
        }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image source={pic}
                       style={{width: 35, height: 35, marginLeft: 15}} resizeMode='cover'/>
                <Text style={{marginLeft: 10, color: color, fontSize: 18}}>{title}</Text>
            </View>
            <TouchableNativeFeedback
                onPress={this._onPressButton.bind(this, type)}
            >
                <View
                    style={{width: 50, height: 45, alignItems: 'center', justifyContent: 'center'}}>
                    <Image source={require('../../res/more.png')}
                           style={{width: 25, height: 10, marginRight: 15}}/>
                </View>

            </TouchableNativeFeedback>

        </View>;
    }

    /**
     * 点击了更多
     * @private
     */
    _onPressButton(type, event) {
        if (type === 1) {
            this.props.navigation.navigate('ProjectListPage')
        } else {
            this.props.navigation.navigate('GzhListPage')
        }
    }

    /**
     * 分割线
     */
    _itemSeparator = () => {
        return <View style={{height: 1, backgroundColor: '#f5f5f5'}}/>
    };

    /**
     * 公众号的item
     * @param info
     * @returns {*}
     * @private
     */
    _renderGzhItem = (info) => {
        let title = '  ' + info.item.title;
        let link = '  ' + info.item.link;
        let niceDate = '  ' + info.item.niceDate;
        return<TouchableNativeFeedback onPress={this._onPressItem.bind(this, title, link)}>
            <View style={{
                flexDirection: 'column',
                flex: 1,
                height: 60,
                marginLeft: 10,
                marginRight: 10,
                alignItems: 'flex-start'
            }}>
                <Text style={{color: '#333333', fontSize: 16, marginTop: 5, textAlign: 'left'}}
                      numberOfLines={1}
                      ellipsizeMode="tail">{title}</Text>

                <View style={{flex: 1}}/>
                <View style={{flexDirection: 'row', marginBottom: 3, marginLeft: 5}}>
                    <Text>{info.item.author}</Text>
                    <Text style={{marginLeft: 5}}>{niceDate}</Text>
                </View>
            </View>
        </TouchableNativeFeedback>
    };

    /**
     * 点击item
     * @param title
     * @param url
     * @param event
     * @private
     */
    _onPressItem(title, url, event) {
        this.props.navigation.navigate('WebPage', {
            url: url,
            title: title
        })
    }

    /**
     * 项目item
     * @param info
     * @returns {*}
     * @private
     */
    _renderItem = (info) => {
        var title = '  ' + info.item.title;
        var desc = '  ' + info.item.desc;
        var link = '  ' + info.item.link;
        var niceDate = '  ' + info.item.niceDate;
        return <TouchableNativeFeedback
            onPress={this._onPressItem.bind(this, title, link)}>
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
                          ellipsizeMode="tail">{title}</Text>
                    <Text style={{color: '#999999', fontSize: 14, marginTop: 5, textAlign: 'left'}}
                          numberOfLines={1}
                          ellipsizeMode="tail">{desc}</Text>
                    <View style={{flex: 1}}/>
                    <View style={{flexDirection: 'row', marginBottom: 3, marginLeft: 5}}>
                        <Text>{info.item.author}</Text>
                        <Text style={{marginLeft: 5}}>{niceDate}</Text>
                    </View>
                </View>
                <View style={{justifyContent: 'center'}}>
                    <Image source={{uri: info.item.envelopePic}}
                           style={{
                               height: 70,
                               width: 60,
                               marginRight: 15,
                               justifyContent: 'center'
                           }}
                           resizeMode='contain'
                    />
                </View>

            </View>
        </TouchableNativeFeedback>
    };

    getBannerData() {
        const bannerUrl = "https://www.wanandroid.com/banner/json";
        NetUtils.get(bannerUrl, null, (result) => {
                this.setState({
                    bannerData: result
                })
            }
        )
    }

    getHotArticleData() {
        const bannerUrl = "https://www.wanandroid.com/project/list/1/json?cid=294";
        NetUtils.get(bannerUrl, null, (result) => {
                this.setState({
                    projectData: [{
                        key: "project",
                        data: result.datas
                    },
                    ],
                });
            }
        )
    }

    getGzhData(resolve) {
        const url = "https://wanandroid.com/wxarticle/list/408/1/json";
        NetUtils.get(url, null, (result) => {
            if (resolve != null) {
                resolve();
            }
            this.setState({
                gzhData: [{
                    key: "gzh",
                    data: result.datas
                },],
            });
        })
    }
}