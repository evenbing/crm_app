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
import { ContainerView } from '../../../components/Styles/Layout';
import { HorizontalDivider } from '../../../components/Styles/Divider';
import TitleItem from '../../../components/Details/TitleItem';
import NavInputItem from '../../../components/NavInputItem';
import CreateMoreButton from '../../../components/Create/CreateMoreButton';
import ScanCard from '../../../components/Create/ScanCard';

const ListView = styled.View`
  background: ${theme.whiteColor};
`;

const CenterText = styled.Text`
  font-size: ${moderateScale(16)};
  color: #AEAEAE;
  font-family: ${theme.fontRegular};
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
      <ContainerView
        bottomPadding
        backgroundColor={theme.whiteColor}
      >
        <CommStatusBar />
        <ScanCard
          onPress={() => alert(1)}
        />
        <TitleItem text="必填信息" />
        <ListView>
          <NavInputItem
            leftText="姓名"
            {...this.getLeftStyle('请输入姓名')}
          />
          <NavInputItem
            leftText="公司名称"
            center={
              <CenterText>请选择公司名称</CenterText>
            }
            {...NavItemStyle}
          />
          <NavInputItem
            leftText="职务"
            {...this.getLeftStyle('请输入职务')}
          />
          <NavInputItem
            leftText="电话"
            {...this.getLeftStyle('请输入电话')}
          />
          <NavInputItem
            leftText="手机"
            {...this.getLeftStyle('请输入手机')}
          />
          <NavInputItem
            leftText="部门"
            center={
              <CenterText>请选择所属部门</CenterText>
            }
            isLast
            {...NavItemStyle}
          />
        </ListView>
        <HorizontalDivider
          height={41}
          backgroundColor={theme.whiteColor}
        />
        <CreateMoreButton
          onPress={() => navigate(routers.contactEditorMore)}
        />
      </ContainerView>
    );
  }
}

Editor.navigationOptions = ({ navigation, screenProps }) => ({
  title: '新增联系人',
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
