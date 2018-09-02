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
            leftText="姓名"
            {...this.getLeftStyle('请输入姓名')}
            height={44}
          />
          <NavInputItem
            leftText="性别"
            center={
              <CenterText>请选择性别</CenterText>
            }
            {...NavItemStyle}
          />
          <NavInputItem
            leftText="出生日期"
            {...this.getLeftStyle('请选择出生日期')}
            {...NavItemStyle}
          />
          <NavInputItem
            leftText="公司名称"
            {...this.getLeftStyle('请输入公司名称')}
            height={44}
          />
          <NavInputItem
            leftText="部门"
            {...this.getLeftStyle('请输入所属部门')}
            height={44}
          />
          <NavInputItem
            leftText="职务"
            {...this.getLeftStyle('请输入职务')}
            isLast
            height={44}
          />
        </ListView>
        <TitleItem text="联系信息" />
        <ListView>
          <NavInputItem
            leftText="电话"
            {...this.getLeftStyle('请输入联系电话')}
            height={44}
          />
          <NavInputItem
            leftText="手机"
            {...this.getLeftStyle('请输入手机')}
            height={44}
          />
          <NavInputItem
            leftText="邮编"
            {...this.getLeftStyle('请输入邮编')}
            height={44}
          />
          <NavInputItem
            leftText="微博"
            {...this.getLeftStyle('请输入微博')}
            height={44}
          />
          <NavInputItem
            leftText="省份"
            center={
              <CenterText>请选择省份</CenterText>
            }
            {...NavItemStyle}
          />
          <NavInputItem
            leftText="地址"
            {...this.getLeftStyle('请输入地址')}
            height={44}
          />
          <NavInputItem
            leftText="邮编"
            {...this.getLeftStyle('请输入邮编')}
            isLast
            height={44}
          />
        </ListView>
        <TitleItem text="其他信息" />
        <ListView>
          <NavInputItem
            leftText="所属部门"
            center={
              <CenterText>请选择所属部门</CenterText>
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
        <HorizontalDivider height={8} />
      </ContainerScrollView>
    );
  }
}

EditorMore.navigationOptions = ({ navigation, screenProps }) => ({
  title: '联系人更多资料',
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
