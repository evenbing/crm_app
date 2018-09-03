import React, { Component } from 'react';
import styled from 'styled-components';

import NavView from '../../components/NavItem';
import { LeftBackIcon, CommStatusBar } from '../../components/Layout';
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

class AddTask extends Component {
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
          <NavInputItem
            leftText="任务主题"
            inputProps={{
              placeholder: '请输入姓名',
              fontSize: theme.moderateScale(16),
            }}
            leftTextStyle={{
              color: '#373737',
              width: theme.moderateScale(80),
            }}
            height={44}
          />
          <Divder height={10} />
          <NavView leftText="截止时间" rightText="2018-12-12 12:00" />
          <Divder height={10} />
          <NavView leftText="提醒" rightText="提前十分钟" />
          <Divder height={1} marginHorizontal={15} />
          <NavView leftText="负责人" rightText="无" />
          <Divder height={1} marginHorizontal={15} />
          <NavView leftText="参与人" rightText="无" />
          <Divder height={10} />
          <NavView leftText="关联业务" rightText="客户" />
          <Divder height={1} marginHorizontal={15} />
          <ItemTitle>描述</ItemTitle>
          <RemarkInput />
          <ItemTitle>图片</ItemTitle>
        </ScrollView>
      </ContainerView>
    );
  }
}

AddTask.navigationOptions = () => ({
  title: '新增任务',
  headerLeft: (
    <LeftBackIcon />
  ),
});


export default AddTask;
