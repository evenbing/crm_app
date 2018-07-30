/**
 * Created by DEV005 on 2017/8/31.
 */
/* eslint-disable */
import React, { Component } from 'react';
import { BackHandler,AppState,StyleSheet,View,Text
    , NativeModules,AsyncStorage,NavigationActions,
    ActivityIndicator,TouchableOpacity,Image,Touch,Platform,Dimensions
} from 'react-native';

import { Toast } from 'native-base';
/**
 * 冒一个时间比较短的Toast
 * @param content
 */
export const xnToast = (content) => {
    if (global.toast !== undefined) {
        Toast.hide(toast);
    };
    global.toast = Toast.show(content.toString(), {
        duration: Toast.durations.LONG,
        position: Toast.positions.CENTER,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0
    });
};

export const formatStringWithHtml = (originString) => {
    if (originString === undefined) {
        return '';
    }
    const newString = originString
        .replace(/&nbsp;/g, ' ')
        .replace(/&quot;/g, '"')
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>');
    return newString;
};


//是否 isIphoneX
export function isIphoneX() {
    let dimen = Dimensions.get('window');
    return (
        Platform.OS === 'ios' &&
        !Platform.isPad &&
        !Platform.isTVOS &&
        (dimen.height === 812 || dimen.width === 812)
    );
}

//获取头部高度
export function getHeaderHeight() {
    if( Platform.OS === 'android'){
        return 48;

    }else if(Platform.OS === 'ios') {

        if(isIphoneX()){
            return 88;
        }else {
            return 64;
        }
    }
}
//获取头部填充高度
export function getHeaderPadding() {
    if( Platform.OS === 'android'){
        return 0;
    }else if(Platform.OS === 'ios') {
        if(isIphoneX()){
            return 44;
        }else {
            return 20;
        }
    }
}

//获取头部填充底部填充高度
export function getFooterBottom() {
    if( Platform.OS === 'android'){
        return 0;
    }else if(Platform.OS === 'ios') {
        if(isIphoneX()){
            return 34;
        }else {
            return 0;
        }
    }
}

//防止按钮多次触发
export const NoDoublePress = {
    lastPressTime: 1,
    onPress(callback){
        let curTime = new Date().getTime();
        if (curTime - this.lastPressTime > 1000) {
            this.lastPressTime = curTime;
            callback();
        }
    },
}

export function xnBorderWidth() {
    if(isIphoneX()){
        return 1;
    }else {
        return 0.5;
    }
}



const xnUtils={
    xnToast:xnToast,
    isIphoneX:isIphoneX,
    getHeaderHeight:getHeaderHeight,
    getHeaderPadding:getHeaderPadding,
    getFooterBottom:getFooterBottom,
    xnBorderWidth:xnBorderWidth
}
export default xnUtils;
