/**
 * @component CreateCustomer.js
 * @description 新增客户页面
 * @time 2018/8/15
 * @author JUSTIN XU
 */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { theme } from '../../../constants';

// components
import { CommStatusBar, LeftBackIcon, RightView } from '../../../components/Layout';
import { ContainerScrollView } from '../../../components/Styles/Layout';
import { HorizontalDivider } from '../../../components/Styles/Divider';
import TitleItem from '../../../components/Details/TitleItem';
import NavInputItem from '../../../components/NavInputItem';
import ScanCard from '../../../components/Create/ScanCard';
import CreateMoreButton from '../../../components/Create/CreateMoreButton';


const ListView = styled.View`
  background: ${theme.whiteColor};
`;

const RightTet = styled.Text`
  font-size: ${theme.moderateScale(16)};
  color: #AEAEAE;
  font-family: ${theme.fontRegular};
`;

const NavItemStyle = {
  leftWidth: theme.moderateScale(83),
  height: 44,
  showNavIcon: true,
};

class CreateCustomer extends React.Component {
  render() {
    return (
      <ContainerScrollView
        bottomPadding
      >
        <CommStatusBar />
        <ScanCard
          onPress={() => alert(1)}
        />
        <TitleItem
          text="必填信息"
          fontSize={16}
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
          />
          <NavInputItem
            leftText="省份地市"
            inputProps={{
              'placeholder': '请输入省份，地方，市',
              fontSize: theme.moderateScale(16),
            }}
            leftTextStyle={{
              color: '#373737',
              width: theme.moderateScale(80),
            }}
            height={44}
          />
          <NavInputItem
            leftText="详细地址"
            right={
              <RightTet>请选择地址</RightTet>
            }
            {...NavItemStyle}
          />
          <NavInputItem
            leftText="电话"
            right={
              <RightTet>请输入电话</RightTet>
            }
            {...NavItemStyle}
          />
          <NavInputItem
            leftText="所属部门"
            right={
              <RightTet>请选择所属部门</RightTet>
            }
            {...NavItemStyle}
          />
        </ListView>
        <HorizontalDivider
          height={41}
        />
        <CreateMoreButton
          onPress={() => alert(1)}
        />
      </ContainerScrollView>
    );
  }
}

CreateCustomer.navigationOptions = ({ navigation, screenProps }) => ({
  title: '新建客户',
  headerLeft: (
    <LeftBackIcon
      onPress={() => navigation.goBack()}
    />
  ),
  headerRight: (
    <RightView
      onPress={navigation.state.params ? navigation.state.params.onPressRight : null}
      right="完成"
      rightStyle={{
        color: theme.primaryColor,
      }}
    />
  ),
});

CreateCustomer.defaultProps = {};

CreateCustomer.propTypes = {
  navigation: PropTypes.shape({
    dispatch: PropTypes.func,
    goBack: PropTypes.func,
    navigate: PropTypes.func,
    setParams: PropTypes.func,
    state: PropTypes.shape({
      key: PropTypes.string,
      routeName: PropTypes.string,
      params: PropTypes.object,
    }),
  }).isRequired,
};

export default CreateCustomer;
