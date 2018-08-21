/**
 * @component CreateCustomer.js
 * @description 新增客户页面
 * @time 2018/8/15
 * @author JUSTIN XU
 */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { theme, routers } from '../../../constants';

// components
import { CommStatusBar, LeftBackIcon, RightView } from '../../../components/Layout';
import { ContainerScrollView } from '../../../components/Styles/Layout';
import { HorizontalDivider } from '../../../components/Styles/Divider';
import TitleItem from '../../../components/Details/TitleItem';
import NavInputItem from '../../../components/NavInputItem';
import ScanCard from '../../../components/Create/ScanCard';
import CreateMoreButton from '../../../components/Create/CreateMoreButton';
import TouchableView from '../../../components/TouchableView';

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

class CreateCustomer extends React.Component {
  componentDidMount() {
    this.props.navigation.setParams({
      onPressRight: this.onPressRight,
    });
  }
  onPressRight = () => alert('finish');
  render() {
    const {
      navigation: { navigate },
    } = this.props;
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
            right={
              <TouchableView onPress={() => navigate(routers.queryBusiness)}>
                <RightText>工商信息查询</RightText>
              </TouchableView>
            }
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
            center={
              <CenterTet>请选择地址</CenterTet>
            }
            {...NavItemStyle}
          />
          <NavInputItem
            leftText="电话"
            center={
              <CenterTet>请输入电话</CenterTet>
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
        <HorizontalDivider
          height={41}
        />
        <CreateMoreButton
          onPress={() => navigate(routers.createCustomerMore)}
        />
      </ContainerScrollView>
    );
  }
}

CreateCustomer.navigationOptions = ({ navigation }) => ({
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
