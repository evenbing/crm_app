/**
 * @component EditorMore.js
 * @description 编辑更多资料页面
 * @time 2018/9/2
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
  leftWidth: moderateScale(113),
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
  getLeftStyle = (placeholder, width = 110) => {
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
    return (
      <ContainerScrollView
        bottomPadding
      >
        <CommStatusBar />
        <HorizontalDivider
          height={12}
        />
        <ListView>
          <NavInputItem
            leftText="回款期次"
            {...this.getLeftStyle('请输入回款期次')}
          />
          <NavInputItem
            leftText="实际回款金额"
            {...this.getLeftStyle('请输入金额')}
            right={
              <RightText>元</RightText>
            }
          />
          <NavInputItem
            leftText="实际回款日期"
            {...this.getLeftStyle('请选择计划回款日期')}
            {...NavItemStyle}
          />
          <NavInputItem
            leftText="负责人"
            {...this.getLeftStyle('请输入负责人')}
          />
          <NavInputItem
            leftText="合同"
            {...this.getLeftStyle('请输入合同')}
          />
          <NavInputItem
            leftText="客户名称"
            {...this.getLeftStyle('请输入客户名称')}
          />
          <NavInputItem
            leftText="付款方式"
            {...this.getLeftStyle('请输入付款方式')}
          />
          <NavInputItem
            leftText="实际回款金额"
            {...this.getLeftStyle('请输入金额')}
          />
          <NavInputItem
            leftText="所属部门"
            center={
              <CenterText>请选择所属部门</CenterText>
            }
            {...NavItemStyle}
          />
          <NavInputItem
            leftText="负责人"
            {...this.getLeftStyle('请输入负责人')}
          />
          <NavInputItem
            leftText="所属部门"
            center={
              <CenterText>请选择所属部门</CenterText>
            }
            {...NavItemStyle}
          />
          <NavInputItem
            leftText="创建人"
            {...this.getLeftStyle('请输入创建人')}
          />
          <NavInputItem
            leftText="创建时间"
            center={
              <CenterText>请选择创建时间</CenterText>
            }
            {...NavItemStyle}
          />
          <NavInputItem
            leftText="最近修改人"
            {...this.getLeftStyle('请输入修改人')}
          />
          <NavInputItem
            leftText="最近时间"
            center={
              <CenterText>请选择最近时间</CenterText>
            }
            {...NavItemStyle}
          />
          <NavInputItem
            leftText="备注"
            center={<View />}
            right={<View />}
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
        <HorizontalDivider height={20} />
      </ContainerScrollView>
    );
  }
}

EditorMore.navigationOptions = ({ navigation, screenProps }) => ({
  title: '回款记录详情',
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
