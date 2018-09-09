import React, { Component } from 'react';
import styled from 'styled-components';

import NavView from '../../components/NavItem';
import { CommStatusBar, LeftBackIcon } from '../../components/Layout';
import { moderateScale } from '../../utils/scale';
import { theme } from '../../constants';
import RemarkInput from '../../components/RemarkInput';
import NavInputItem from '../../components/NavInputItem';

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

class AddSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
    };
  }

  getLeftStyle = (inputProps, width = 80) => {
    return {
      inputProps: {
        ...inputProps,
        fontSize: moderateScale(16),
      },
      leftTextStyle: {
        color: theme.textFormColor,
        width: moderateScale(width),
      },
      height: 44,
    };
  };

  render() {
    const { name } = this.state;
    return (
      <ContainerView>
        <CommStatusBar />
        <ScrollView>
          <Divder height={9} />
          <NavInputItem
            leftText="日程主题"
            {...this.getLeftStyle({
              placeholder: '请输入日程主题',
              value: name,
              onChangeText: name => this.setState({ name }),
            })}
          />
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
          <RemarkInput />
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
