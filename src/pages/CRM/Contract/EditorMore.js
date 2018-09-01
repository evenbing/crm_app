/**
 * @component EditorMore.js
 * @description 编辑更多资料页面
 * @time 2018/8/13
 * @author JUSTIN XU
 */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { View } from 'react-native';
import theme from '../../../constants/theme';
import { moderateScale } from '../../../utils/scale';

// components
import { CommStatusBar, LeftBackIcon, RightView } from '../../../components/Layout';
import { ContainerScrollView } from '../../../components/Styles/Layout';
import { HorizontalDivider } from '../../../components/Styles/Divider';
import { TextareaGroup, TextareaView } from '../../../components/Styles/Editor';
import TitleItem from '../../../components/Details/TitleItem';
import NavInputItem from '../../../components/NavInputItem';

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

class EditorMore extends React.Component {
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
    };
  };
  render() {
    return (
      <ContainerScrollView
        bottomPadding
      >
        <CommStatusBar />
        <HorizontalDivider
          height={9}
        />
        <TitleItem text="基本信息" />
        <ListView>
          <NavInputItem
            leftText="合同名称"
            {...this.getLeftStyle('请输入合同名称')}
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
            leftText="销售机会"
            {...this.getLeftStyle('请输入销售机会')}
            {...NavItemStyle}
          />
          <NavInputItem
            leftText="合同类型"
            {...this.getLeftStyle('请输入合同类型')}
            {...NavItemStyle}
          />
          <NavInputItem
            leftText="合同状态"
            {...this.getLeftStyle('请输入合同状态')}
            {...NavItemStyle}
          />
          <NavInputItem
            leftText="付款方式"
            {...this.getLeftStyle('请输入付款方式')}
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
            isLast
            {...NavItemStyle}
          />
        </ListView>
        <TitleItem text="其他信息" />
        <ListView>
          <NavInputItem
            leftText="合同编号"
            {...this.getLeftStyle('请选择所属部门')}
            height={44}
          />
          <NavInputItem
            leftText="签约日期"
            center={
              <CenterText>请选择签约日期</CenterText>
            }
            {...NavItemStyle}
          />
          <NavInputItem
            leftText="我方签约人"
            center={
              <CenterText>请选择我方签约人</CenterText>
            }
            {...NavItemStyle}
          />
          <NavInputItem
            leftText="客户方签约人"
            {...this.getLeftStyle('请选择客户方签约人', 100)}
            height={44}
          />
          <NavInputItem
            leftText="所属部门"
            center={
              <CenterText>请选择所属部门</CenterText>
            }
            {...NavItemStyle}
          />
          <NavInputItem
            leftText="合同正文"
            center={<View />}
            right={<View />}
            height={44}
          />
          <TextareaGroup>
            <TextareaView
              rowSpan={5}
              bordered
              placeholder="请输入合同正文"
              placeholderTextColor={theme.textPlaceholderColor}
            />
          </TextareaGroup>
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
        <HorizontalDivider height={8} />
      </ContainerScrollView>
    );
  }
}

EditorMore.navigationOptions = ({ navigation, screenProps }) => ({
  title: '合同更多资料',
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

EditorMore.defaultProps = {};

EditorMore.propTypes = {
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

export default EditorMore;
