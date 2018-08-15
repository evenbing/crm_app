import React, { Component } from 'react';
import styled from 'styled-components';

import NavView from '../../components/NavItem';
import { CommStatusBar, LeftBackIcon } from '../../components/Layout';
import { moderateScale } from '../../utils/scale';
import { theme } from '../../constants';
import TextInput from '../../components/TextInput';

const ContainerView = styled.View`
  flex: 1;
  background-color: white;
`;

const ScrollView = styled.ScrollView`
  background-color: white;
  flex: 1;
`;

const Divder = styled.View`
  height: ${props => moderateScale(props.height)};
  ${props => props.marginHorizontal ? `margin: 0px ${moderateScale(props.marginHorizontal)}px` : ''};
  background-color: #F6F6F6;
`;

const ItemTitle = styled.Text`
  padding: ${moderateScale(11)}px ${moderateScale(15)}px;
  font-family: ${theme.fontRegular};
  font-size: ${moderateScale(16)};
  color: #373737;
`;

const DescriptionContent = styled.TextInput.attrs({
  numberOfLines: 5,
  placeholder: ' 请输入内容描述',
  placeholderTextColor: '#c1c1c1',
  returnKeyType: 'done',
  returnKeyLabel: 'done',
  clearButtonMode: 'never',
  underlineColorAndroid: 'transparent',
  autoCorrect: false,
  autoCapitalize: 'none',
})`
  height: ${moderateScale(100)};
  margin: 0px ${moderateScale(15)}px;
  padding: ${moderateScale(10)}px ${moderateScale(13)}px;
  border-width: ${moderateScale(1)}px;
  border-radius: ${moderateScale(2)}px;
  border-color: #E9E9E9;
  background-color: #F9F9F9;
`;

class AddSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <ContainerView>
        <CommStatusBar />
        <ScrollView>
          <Divder height={9} />
          <NavView leftText="日程主题" rightText="开心句号" />
          <Divder height={10} />
          <NavView leftText="开始时间" rightText="2018-12-12 12:00" />
          <Divder height={1} marginHorizontal={15} />
          <NavView leftText="结束时间" rightText="2017-23-21 11:00" />
          <Divder height={10} />
          <NavView leftText="提醒" rightText="提前十分钟" />
          <Divder height={1} marginHorizontal={15} />
          <NavView leftText="位置" rightText="江苏 苏州" />
          <Divder height={1} marginHorizontal={15} />
          <NavView leftText="参与人" rightText="无" />
          <Divder height={10} />
          <NavView leftText="关联业务" rightText="客户" />
          <Divder height={1} marginHorizontal={15} />
          <NavView leftText="重复规则" rightText="不重复" />
          <Divder height={1} marginHorizontal={15} />
          <ItemTitle>描述</ItemTitle>
          <DescriptionContent />
          <ItemTitle>图片</ItemTitle>
        </ScrollView>
      </ContainerView>
    );
  }
}

AddSchedule.navigationOptions = () => ({
  title: '新增日程',
  headerLeft: (
    <LeftBackIcon />
  ),
});

export default AddSchedule;
