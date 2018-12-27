/**
 * Created by DEV005 on 2017/10/27.
 */
import React, { Component } from 'react';
import { StyleSheet, View, Text, ActivityIndicator, TouchableOpacity, Image } from 'react-native';
import { width } from '../utils/getSize';
import { getFooterBottom, getHeaderHeight, getHeaderPadding, xnBorderWidth } from '../utils/utils';
import { nativeGoBack } from '../utils/base';

const styles = StyleSheet.create({
  xnLoading: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  xnLoadingHd: {
    width,
    paddingTop: getHeaderPadding(),
    height: getHeaderHeight(),
    justifyContent: 'center',
  },
  xnLoadingHdBack: {
    paddingLeft: 15,
    paddingRight: 10,
    paddingTop: 10,
    paddingBottom: 10,
    width: 41,
    height: 36,
  },
  xnLoadingHdIcon: {
    width: 16,
    height: 16,
  },
  xnLoadingBd: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  xnLoadingActivity: {
    marginRight: 15,
  },
  xnLoadingBdText: {
    fontSize: 14,
    color: '#000',
  },
  xnLoadingFt: {
    height: 44 + getFooterBottom(),
    width,
    alignItems: 'center',
    paddingBottom: getFooterBottom(),
    justifyContent: 'center',
    backgroundColor: '#f9f9f9',
    borderTopWidth: xnBorderWidth(),
    borderTopColor: '#d9d9d9',
  },
  xnLoadingFtText: {
    fontSize: 16,
    color: '#000',
  },
});

export default class xnLoading extends Component {
  componentDidMount() {

  }

  onClose = () => {
    nativeGoBack();
  };

  render() {
    return (
      <View style={styles.xnLoading}>
        <View style={styles.xnLoadingHd}>
          <TouchableOpacity
            style={styles.xnLoadingHdBack}
            onPress={() => {
            this.onClose();
          }}
          >
            <Image style={styles.xnLoadingHdIcon} source={require('../img/back-dark.png')} resizeMode="contain" />
          </TouchableOpacity>
        </View>
        <View style={styles.xnLoadingBd}>
          <ActivityIndicator style={styles.xnLoadingActivity} size="small" color="#d9d9d9" animating />
          <Text style={styles.xnLoadingBdText}>加载中...</Text>
        </View>
        <TouchableOpacity
          style={styles.xnLoadingFt}
          onPress={() => {
            this.onClose();
          }}
        ><Text style={styles.xnLoadingFtText}>关闭</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
