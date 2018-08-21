import React, { Component } from 'react';
import styled from 'styled-components';
import { LeftBackIcon, RightView, CommStatusBar } from '../../../components/Layout';
import { theme, routers } from '../../../constants';
import { ContainerScrollView } from '../../../components/Styles/Layout';
import TitleItem from '../../../components/Details/TitleItem';
import NavInputItem from '../../../components/NavInputItem';
import TouchableView from '../../../components/TouchableView';
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

const RightText = styled.Text`
  color: ${theme.primaryColor};
  font-family: ${theme.fontRegular};
`;

const NavItemStyle = {
  leftWidth: theme.moderateScale(83),
  height: 44,
  showNavIcon: true,
};

class CreateCustomerMore extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const {
      navigation: { navigate },
    } = this.props;
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
            leftText="客户名称"
            inputProps={{
              'placeholder': '请输入名称',
              fontSize: theme.moderateScale(16),
            }}
            leftTextStyle={{
              color: '#373737',
              width: theme.moderateScale(80),
            }}
            height={44}
            right={
              <TouchableView onPress={() => navigate(routers.queryBusiness)}>
                <RightText>工商信息查询</RightText>
              </TouchableView>
            }
          />
          <NavInputItem
            leftText="客户级别"
            center={
              <CenterTet>请选择级别</CenterTet>
            }
            {...NavItemStyle}
          />
          <NavInputItem
            leftText="上级客户"
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
            leftText="行业"
            inputProps={{
              'placeholder': '请输入所在行业',
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
            leftText="省份城市"
            center={
              <CenterTet>请选择省份、地、市</CenterTet>
            }
            {...NavItemStyle}
          />
          <NavInputItem
            leftText="详细地址"
            center={
              <CenterTet>定位详细地址</CenterTet>
            }
            {...NavItemStyle}
          />
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
            leftText="网址"
            inputProps={{
              'placeholder': '请输入网址',
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
            leftText="总人数"
            inputProps={{
              'placeholder': '请输入总人数',
              fontSize: theme.moderateScale(16),
            }}
            leftTextStyle={{
              color: '#373737',
              width: theme.moderateScale(80),
            }}
            height={44}
          />
          <NavInputItem
            leftText="年销售额"
            inputProps={{
              'placeholder': '请输入年销售额',
              fontSize: theme.moderateScale(16),
            }}
            leftTextStyle={{
              color: '#373737',
              width: theme.moderateScale(80),
            }}
            height={44}
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

CreateCustomerMore.navigationOptions = ({ navigation }) => ({
  title: '新建客户',
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

export default CreateCustomerMore;
