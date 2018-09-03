/**
 * @component Editor.js
 * @description 编辑资料页面
 * @time 2018/8/13
 * @author JUSTIN XU
 */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { routers, theme } from '../../../constants';
import { moderateScale } from '../../../utils/scale';

// components
import { CommStatusBar, LeftBackIcon, RightView } from '../../../components/Layout';
import { HorizontalDivider } from '../../../components/Styles/Divider';
import TitleItem from '../../../components/Details/TitleItem';
import NavInputItem from '../../../components/NavInputItem';
import CreateMoreButton from '../../../components/Create/CreateMoreButton';
import { ContainerScrollView } from '../../../components/Styles/Layout';

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
  getLeftStyle = (placeholder, width = 80) => {
    return {
      inputProps: {
        placeholder,
        fontSize: moderateScale(16),
      },
      leftTextStyle: {
        color: '#373737',
        width: moderateScale(width),
      },
      height: 44,
    };
  };
  render() {
    const {
      navigation: { navigate },
    } = this.props;
    return (
      <ContainerScrollView
        bottomPadding
      >
        <CommStatusBar />
        <HorizontalDivider
          height={9}
        />
        <TitleItem text="必填信息" />
        <ListView>
          <NavInputItem
            leftText="合同名称"
            {...this.getLeftStyle('请输入合同名称')}
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
            {...this.getLeftStyle('请输入总金额')}
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
          onPress={() => navigate(routers.contractEditorMore)}
        />
      </ContainerScrollView>
    );
  }
}

Editor.navigationOptions = ({ navigation }) => ({
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
      rightStyle={{
        color: theme.primaryColor,
      }}
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
