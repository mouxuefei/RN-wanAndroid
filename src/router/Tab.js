import React from 'react';
import { createBottomTabNavigator } from 'react-navigation';

import {HomePage} from "../home/HomePage";
import {Image, StyleSheet} from "react-native";
import {ProjectPage} from "../home/ProjectPage";
import {ClassifyPage} from "../home/ClassifyPage";
import {PersonalPage} from "../home/PersonalPage";

const Tab = createBottomTabNavigator({
        Home: {
            screen: HomePage,
            navigationOptions: {
                tabBarLabel: "首页",
                tabBarIcon: ({focused, tintColor}) => (
                    <Image
                        source={focused ? require('../../res/home_select.png'):require('../../res/home_normal.png')}
                        style={styles.tabBarIconStyle}
                    />
                ),
            },
        },

        Shops: {
            screen: ProjectPage,
            navigationOptions: {
                tabBarLabel: "项目",
                tabBarIcon: ({focused, tintColor}) => (
                    <Image
                        source={focused ? require('../../res/project_select.png'): require('../../res/project_normal.png')}
                        style={styles.tabBarIconStyle}
                    />
                )
            }
        },
        Classify: {
            screen: ClassifyPage,
            navigationOptions: {
                tabBarLabel: "分类",
                tabBarIcon: ({focused, tintColor}) => (
                    <Image
                        source={focused ? require('../../res/classify_select.png'):require('../../res/classify_normal.png')}
                        style={styles.tabBarIconStyle}
                    />
                ),
            },
        },

        Personal: {
            screen: PersonalPage,
            navigationOptions: {
                tabBarLabel: "我的",
                tabBarIcon: ({focused, tintColor}) => (
                    <Image
                        source={focused ? require('../../res/me_select.png'): require('../../res/me_normal.png')}
                        style={styles.tabBarIconStyle}
                    />
                )
            }
        },
    },

    {
        // 初始化哪个界面为显示的第一个界面，如果不配置，默认使用RouteConfigs中的第一个页面当做根界面
        // initialRouteName: "Home",
        lazy: true,
        backBehavior:"none",//按下返回键时的行为，initialRoute返回initialRouteName对应的页面。none返回上一页面。默认initialRoute
        tabBarOptions: {
            inactiveTintColor: "#333333",
            activeTintColor: "#1296db",
            labelStyle: {
                fontSize: 11
            }
        }
    }
);
export default Tab;
const styles = StyleSheet.create({
    tabBarIconStyle: {
        width: 25,
        height: 25,
    },
});

