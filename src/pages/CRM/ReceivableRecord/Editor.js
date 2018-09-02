/**
 * @component Editor.js
 * @description 编辑资料页面
 * @time 2018/9/2
 * @author JUSTIN XU
 */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { View } from 'react-native';
import { routers, theme } from '../../../constants';
import { moderateScale } from '../../../utils/scale';

// components
import { CommStatusBar, LeftBackIcon, RightView } from '../../../components/Layout';
import { ContainerView } from '../../../components/Styles/Layout';
import { HorizontalDivider } from '../../../components/Styles/Divider';
import { TextareaGroup, TextareaView } from '../../../components/Styles/Editor';
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
      >
        <CommStatusBar />
        <HorizontalDivider
          height={12}
        />
        <ListView>
          <NavInputItem
            leftText="回款期次"
            {...this.getLeftStyle('请输入期次')}
          />
          <NavInputItem
            leftText="实际回款金额"
            {...this.getLeftStyle('请输入金额', 110)}
            right={
              <RightText>元</RightText>
            }
            {...NavItemStyle}
          />
          <NavInputItem
            leftText="实际回款日期"
            center={
              <CenterText>请选择日期</CenterText>
            }
            {...NavItemStyle}
            leftWidth={moderateScale(110)}
          />
          <NavInputItem
            leftText="实付款方式"
            center={
              <CenterText>请选择方式</CenterText>
            }
            {...NavItemStyle}
            leftWidth={moderateScale(110)}
          />
          <NavInputItem
            leftText="负责人"
            center={
              <CenterText>请选择负责人</CenterText>
            }
            {...NavItemStyle}
          />
          <NavInputItem
            leftText="备注"
            center={<View />}
            right={<View />}
            height={44}
          />
          <TextareaGroup>
            <TextareaView
              rowSpan={5}
              bordered
              placeholder="请输入备注说明"
              placeholderTextColor={theme.textPlaceholderColor}
            />
          </TextareaGroup>
        </ListView>
        <HorizontalDivider
          height={41}
        />
        <CreateMoreButton
          onPress={() => navigate(routers.receivableRecordEditorMore)}
        />
      </ContainerView>
    );
  }
}

Editor.navigationOptions = ({ navigation, screenProps }) => ({
  title: '新增回款记录',
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
