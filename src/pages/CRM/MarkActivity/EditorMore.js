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
  constructor(props) {
    super(props);
    this.state = {
      name: null,
      beginDate: null,
      endDate: null,
      departmentId: null,
      status: null,
      sourceType: null,
      description: null,
      budgetCost: null,
      budgetRevenue: null,
      budgetPeopleNumber: null,
      effect: null,
      actualPeopleNumber: null,
      actualCost: null,
      executeDetail: null,
    };
  }
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
    const {
      state: {
        name,
        beginDate,
        endDate,
        departmentId,
        status,
        sourceType,
        description,
        budgetCost,
        budgetRevenue,
        budgetPeopleNumber,
        effect,
        actualPeopleNumber,
        actualCost,
        executeDetail,
      },
    } = this;
    return (
      <ContainerScrollView
        bottomPadding
      >
        <CommStatusBar />
        <HorizontalDivider
          height={12}
        />
        <ListView>
          <TitleItem text="基本信息" />
          <NavInputItem
            leftText="活动名称"
            {...this.getLeftStyle('请输入活动名称')}
            {...NavItemStyle}
            inputProps={{
              placeholder: '请输入姓名',
              fontSize: theme.moderateScale(16),
              onChangeText: () => { this.setState({ name }); },
              value: name,
            }}
          />
          <NavInputItem
            leftText="活动状态"
            center={
              <CenterText>请选择活动状态</CenterText>
            }
            {...NavItemStyle}
          />
          <NavInputItem
            leftText="活动类型"
            center={
              <CenterText>请选择活动类型</CenterText>
            }
            {...NavItemStyle}
          />
          <NavInputItem
            leftText="活动说明"
            center={<View />}
            right={<View />}
            height={44}
          />
          <TextareaGroup>
            <TextareaView
              rowSpan={5}
              bordered
              placeholder="请输入活动说明"
              placeholderTextColor={theme.textPlaceholderColor}
            />
          </TextareaGroup>
          <TitleItem text="计划信息" />
          <NavInputItem
            leftText="开始日期"
            center={
              <CenterText>请选择开始日期</CenterText>
            }
            {...NavItemStyle}
          />
          <NavInputItem
            leftText="结束日期"
            center={
              <CenterText>请选择结束日期</CenterText>
            }
            {...NavItemStyle}
          />
          <NavInputItem
            leftText="活动成本"
            {...this.getLeftStyle('请输入金额')}
            right={
              <RightText>元</RightText>
            }
          />
          <NavInputItem
            leftText="预期收入"
            {...this.getLeftStyle('请输入金额')}
            right={
              <RightText>元</RightText>
            }
          />
          <NavInputItem
            leftText="邀请人数"
            {...this.getLeftStyle('请输入金额')}
          />
          <NavInputItem
            leftText="预期响应"
            {...this.getLeftStyle('请输入金额')}
          />
          <TitleItem text="实际信息" />
          <NavInputItem
            leftText="实际人数"
            {...this.getLeftStyle('请输入人数')}
          />
          <NavInputItem
            leftText="实际成本"
            {...this.getLeftStyle('请输入金额')}
            right={
              <RightText>元</RightText>
            }
          />
          <NavInputItem
            leftText="实际收入"
            {...this.getLeftStyle('请输入金额')}
            right={
              <RightText>元</RightText>
            }
          />
          <TitleItem text="其它信息" />
          <NavInputItem
            leftText="负责人"
            center={
              <CenterText>请选择负责人</CenterText>
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
          <NavInputItem
            leftText="创建人"
            center={
              <CenterText>请选择创建人</CenterText>
            }
            {...NavItemStyle}
          />
          <NavInputItem
            leftText="创建时间"
            center={
              <CenterText>请选择创建时间</CenterText>
            }
            {...NavItemStyle}
          />
          <NavInputItem
            leftText="最近修改时间"
            center={
              <CenterText>请选择最近修改时间</CenterText>
            }
            {...NavItemStyle}
          />
          <NavInputItem
            leftText="最近跟进人"
            center={
              <CenterText>请选择最近跟进人</CenterText>
            }
            {...NavItemStyle}
          />
          <NavInputItem
            leftText="最近跟进时间"
            center={
              <CenterText>请选择最近跟进时间</CenterText>
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

EditorMore.navigationOptions = ({ navigation }) => ({
  title: '市场活动详情',
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
