import React, {Component} from 'react';
import {View, Text, Image} from 'react-native'
import {TitleBar} from "../../widget/titleBar";
import {createMaterialTopTabNavigator, createAppContainer} from 'react-navigation';
import {Empty} from "../../widget/Empty";
import NetUtils from "../../net/NetUtils";
import {Loading} from "../../widget/Loading";
import {GzhItemPage} from "./GzhItemPage";

export class GzhListPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            projectList: [],
            isLoad: true
        }
    }

    componentDidMount() {
        this.getProjectTitleList()
    }

    getProjectTitleList() {
        const url = "https://wanandroid.com/wxarticle/chapters/json";
        NetUtils.get(url, null, (result) => {
                console.log(result[0].id);
                this.setState({
                    collectionList: result
                });
            }
        )
    }

    render() {
        const {navigation} = this.props;
        return <View style={{flex: 1, flexDirection: 'column'}}>
            <TitleBar title='公众号' right='' navigation={navigation}/>
            {this.getPages()}
        </View>
    }

    getPages() {
        if (this.state.collectionList == null || this.state.collectionList.length === 0) {
            if (this.state.isLoad){
                return <Loading/>;
            } else{
                return <Empty/>;
            }

        }
        let Pages = this.topNavigator();
        return <Pages/>;
    }

    createTabs() {
        let tabPages = {};
        this.state.collectionList.map((value, index) => {
            tabPages[value.name] = {
                // 以函数的方式书写、这样写不行  screen:<PopularPages tabName={value}/>
                screen: props => <GzhItemPage chapterId={value.id} />
            }
        });
        return tabPages
    }

    topNavigator() {
        let topTabs = createMaterialTopTabNavigator(
            this.createTabs(),
            {
                lazy: true,
                swipeEnabled: true,
                animationEnabled: true,
                tabBarOptions: {
                    activeTintColor: '#45C018',
                    inactiveTintColor: '#111111',
                    upperCaseLabel: false,
                    scrollEnabled: true,//tabs超出屏幕宽度可以滚动
                    tabStyle: {
                        minWidth: 50//tab的宽度

                    },
                    labelStyle: {
                        fontSize: 14,
                    },
                    indicatorStyle: {
                        height: 2,
                        backgroundColor: "#45C018"
                    },
                    style: {
                        backgroundColor: "#ffffff",
                        height: 50, justifyContent: 'center', alignItems: 'center'
                    }
                }
            }
        );
        return createAppContainer(topTabs)
    }

}
