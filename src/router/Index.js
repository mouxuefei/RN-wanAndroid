/**
 * router 层
 */
import { createStackNavigator, createAppContainer } from 'react-navigation';
import {routerList} from "./List";

const StackNavigatorConfigs = {
    initialRouteName: 'Tab'
};

const AppNavigator = createStackNavigator(routerList, StackNavigatorConfigs);

const AppContainer = createAppContainer(AppNavigator);

export default AppContainer;