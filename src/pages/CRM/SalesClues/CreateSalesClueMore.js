import React, { Component } from 'react';
import styled from 'styled-components';
import { LeftBackIcon, RightView, CommStatusBar } from '../../../components/Layout';
import { theme } from '../../../constants';
import { ContainerScrollView } from '../../../components/Styles/Layout';
import TitleItem from '../../../components/Details/TitleItem';
import NavInputItem from '../../../components/NavInputItem';
import RemarkInput from '../../../components/RemarkInput';
import { HorizontalDivider } from '../../../components/Styles/Divider';

const ListView = styled.View`
  background: ${theme.whiteColor};
`;

const CenterTet = styled.Text`
  font-size: ${theme.moderateScale(16)};
  color: #AEAEAE;
  font-family: ${theme.fontRegular};
`;

const NavItemStyle = {
  leftWidth: theme.moderateScale(83),
  height: 44,
  showNavIcon: true,
};

class CreateSalesClueMore extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <ContainerScrollView
        bottomPadding
      >
        <CommStatusBar />
        <TitleItem
          text="基本信息"
          fontSize={16}
          titleBackColor="transparent"
        />
        <ListView>
          <NavInputItem
            leftText="姓名"
            inputProps={{
              'placeholder': '请输入姓名',
              fontSize: theme.moderateScale(16),
            }}
            leftTextStyle={{
              color: '#373737',
              width: theme.moderateScale(80),
            }}
            height={44}
          />
          <NavInputItem
            leftText="性别"
            center={
              <CenterTet>请选择性别</CenterTet>
            }
            {...NavItemStyle}
          />
          <NavInputItem
            leftText="公司名称"
            inputProps={{
              'placeholder': '请输入公司名称',
              fontSize: theme.moderateScale(16),
            }}
            leftTextStyle={{
              color: '#373737',
              width: theme.moderateScale(80),
            }}
            height={44}
          />
          <NavInputItem
            leftText="部门"
            inputProps={{
              'placeholder': '请输入部门',
              fontSize: theme.moderateScale(16),
            }}
            leftTextStyle={{
              color: '#373737',
              width: theme.moderateScale(80),
            }}
            height={44}
          />
          <NavInputItem
            leftText="职务"
            inputProps={{
              'placeholder': '请输入职务',
              fontSize: theme.moderateScale(16),
            }}
            leftTextStyle={{
              color: '#373737',
              width: theme.moderateScale(80),
            }}
            height={44}
          />
        </ListView>
        <TitleItem
          text="联系信息"
          fontSize={16}
          titleBackColor="transparent"
        />
        <ListView>
          <NavInputItem
            leftText="电话"
            inputProps={{
              'placeholder': '请输入电话',
              fontSize: theme.moderateScale(16),
            }}
            leftTextStyle={{
              color: '#373737',
              width: theme.moderateScale(80),
            }}
            height={44}
          />
          <NavInputItem
            leftText="手机"
            inputProps={{
              'placeholder': '请输入手机',
              fontSize: theme.moderateScale(16),
            }}
            leftTextStyle={{
              color: '#373737',
              width: theme.moderateScale(80),
            }}
            height={44}
          />
          <NavInputItem
            leftText="邮箱"
            inputProps={{
              'placeholder': '请输入邮箱',
              fontSize: theme.moderateScale(16),
            }}
            leftTextStyle={{
              color: '#373737',
              width: theme.moderateScale(80),
            }}
            height={44}
          />
          <NavInputItem
            leftText="微博"
            inputProps={{
              'placeholder': '请输入微博',
              fontSize: theme.moderateScale(16),
            }}
            leftTextStyle={{
              color: '#373737',
              width: theme.moderateScale(80),
            }}
            height={44}
          />
          <NavInputItem
            leftText="省份"
            center={
              <CenterTet>请选择省份、地、市</CenterTet>
            }
            {...NavItemStyle}
          />
          <NavInputItem
            leftText="地址"
            inputProps={{
              'placeholder': '请输入地址',
              fontSize: theme.moderateScale(16),
            }}
            leftTextStyle={{
              color: '#373737',
              width: theme.moderateScale(80),
            }}
            height={44}
          />
          <NavInputItem
            leftText="邮编"
            inputProps={{
              'placeholder': '请输入邮编',
              fontSize: theme.moderateScale(16),
            }}
            leftTextStyle={{
              color: '#373737',
              width: theme.moderateScale(80),
            }}
            height={44}
          />
        </ListView>
        <TitleItem
          text="其它信息"
          fontSize={16}
          titleBackColor="transparent"
        />
        <ListView>
          <NavInputItem
            leftText="线索来源"
            center={
              <CenterTet>请选择线索来源</CenterTet>
            }
            {...NavItemStyle}
          />
          <NavInputItem
            leftText="市场活动"
            center={
              <CenterTet>请选择市场活动</CenterTet>
            }
            {...NavItemStyle}
          />
          <NavInputItem
            leftText="所属部门"
            center={
              <CenterTet>请选择所属部门</CenterTet>
            }
            {...NavItemStyle}
          />
        </ListView>
        <TitleItem
          text="备注"
          fontSize={16}
          color="#373737"
        />
        <RemarkInput />
        <HorizontalDivider
          height={20}
        />
      </ContainerScrollView>
    );
  }
}

CreateSalesClueMore.navigationOptions = ({ navigation }) => ({
  title: '更多销售线索',
  headerLeft: (
    <LeftBackIcon
      onPress={() => navigation.goBack()}
    />
  ),
  headerRight: (
    <RightView
      onPress={() => alert(1)}
      right="完成"
      rightStyle={{
        color: theme.primaryColor,
      }}
    />
  ),
});

export default CreateSalesClueMore;
