import {packageList} from "./RouterList";
import Tab from "./Tab";
import {ProjectListPage} from "../home/Project/ProjectListPage";
import {ProjectItemPage} from "../home/Project/ProjectItemPage";
import {GzhListPage} from "../home/gzh/GzhListPage";
import WebPage from "../home/web/WebPage";
import {AboutAppPage} from "../home/mine/AboutAppPage";
import {CollectionPage} from "../home/mine/CollectionPage";
import {AdvancePage} from "../home/mine/AdvancePage";
import {GzhItemPage} from "../home/gzh/GzhItemPage";
import {SettingPage} from "../home/mine/SettingPage";
import {Login} from "../home/login/Login";

// const navigationOption = (name, options = {}) => {
//     return {
//         screen: packageList[name],
//         navigationOptions: {
//             title: name,
//             headerStyle: Object.assign(
//                 { marginTop: 24, height: 40 },
//                 options.headerStyle
//             ),
//             headerTitleStyle: Object.assign(
//                 { fontSize: 14 },
//                 options.headerTitleStyle
//             )
//         }
//     };
// };

export const routerList = {
    Tab: { screen: Tab, navigationOptions: () => ({ header: null }) },
    ProjectListPage: {screen:ProjectListPage,navigationOptions:()=>({header: null})},
    GzhListPage: {screen:GzhListPage,navigationOptions:()=>({header: null})},
    AboutAppPage: {screen:AboutAppPage,navigationOptions:()=>({header: null})},
    WebPage: {screen:WebPage,navigationOptions:()=>({header: null})},
    CollectionPage: {screen:CollectionPage,navigationOptions:()=>({header: null})},
    AdvancePage: {screen:AdvancePage,navigationOptions:()=>({header: null})},
    GzhItemPage: {screen:GzhItemPage,navigationOptions:()=>({header: null})},
    SettingPage: {screen:SettingPage,navigationOptions:()=>({header: null})},
    Login: {screen:Login,navigationOptions:()=>({header: null})},
};