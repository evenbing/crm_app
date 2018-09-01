/**
 * @component Editor.js
 * @description 编辑资料页面
 * @time 2018/8/13
 * @author JUSTIN XU
 */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import theme from '../../../constants/theme';
import { moderateScale } from '../../../utils/scale';

// components
import { CommStatusBar, LeftBackIcon, RightView } from '../../../components/Layout';
import { ContainerView } from '../../../components/Styles/Layout';
import { HorizontalDivider } from '../../../components/Styles/Divider';
import TitleItem from '../../../components/Details/TitleItem';
import NavInputItem from '../../../components/NavInputItem';
import CreateMoreButton from '../../../components/Create/CreateMoreButton';

const ListView = styled.View`
  background: ${theme.whiteColor};
`;

const CenterText = styled.Text`
  font-size: ${moderateScale(16)};
  color: #AEAEAE;
  font-family: ${theme.fontRegular};
`;

const RightText = CenterText.extend`
  color: ${theme.textColor};
`;

const NavItemStyle = {
  leftWidth: moderateScale(83),
  height: 44,
  showNavIcon: true,
};

class Editor extends React.Component {
  componentDidMount() {
    this.props.navigation.setParams({
      onPressRight: this.onPressRight,
    });
  }
  onPressRight = () => alert('finish');
  render() {
    return (
      <ContainerView
        bottomPadding
      >
        <CommStatusBar />
        <HorizontalDivider
          height={9}
        />
        <TitleItem text="必填信息" />
        <ListView>
          <NavInputItem
            leftText="主题"
            inputProps={{
              'placeholder': '请输入主题',
              fontSize: moderateScale(16),
            }}
            leftTextStyle={{
              color: '#373737',
              width: moderateScale(80),
            }}
            height={44}
          />
          <NavInputItem
            leftText="客户"
            center={
              <CenterText>请选择客户</CenterText>
            }
            {...NavItemStyle}
          />
          <NavInputItem
            leftText="总金额"
            inputProps={{
              'placeholder': '请输入总金额',
              fontSize: moderateScale(16),
            }}
            leftTextStyle={{
              color: '#373737',
              width: moderateScale(80),
            }}
            right={
              <RightText>元</RightText>
            }
            {...NavItemStyle}
          />
          <NavInputItem
            leftText="开始日期"
            center={
              <CenterText>请选择活动开始日期</CenterText>
            }
            {...NavItemStyle}
          />
          <NavInputItem
            leftText="结束日期"
            center={
              <CenterText>2017-09-09</CenterText>
            }
            {...NavItemStyle}
          />
          <NavInputItem
            leftText="所属部门"
            center={
              <CenterText>请选择所属部门</CenterText>
            }
            {...NavItemStyle}
          />
        </ListView>
        <HorizontalDivider height={41} />
        <CreateMoreButton
          onPress={() => alert(1)}
        />
      </ContainerView>
    );
  }
}

Editor.navigationOptions = ({ navigation, screenProps }) => ({
  title: '编辑资料',
  headerLeft: (
    <LeftBackIcon
      onPress={() => navigation.goBack()}
    />
  ),
  headerRight: (
    <RightView
      onPress={navigation.state.params ? navigation.state.params.onPressRight : null}
      right="完成"
    />
  ),
});

Editor.defaultProps = {};

Editor.propTypes = {
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

export default Editor;
