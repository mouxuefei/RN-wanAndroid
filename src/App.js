/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { View, Platform } from 'react-native';
import AppContainer from "./router/Index";

export default class App extends Component {
    render() {
        return (
            <AppContainer  />
        );
    }
}



