/**
 * @component EditorMore.js
 * @description 新建市场活动/编辑页面
 * @time 2018/8/15
 * @author
 */
import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { routers, theme } from '../../../constants';
import { MarkActivityEnum } from '../../../constants/form';
import { MarketActivityStatus, MarketActivityTypes } from '../../../constants/enum';
import { formatDateByMoment, formatNumberToString } from '../../../utils/base';
import Toast from '../../../utils/toast';

// components
import { CommStatusBar, LeftBackIcon, RightView } from '../../../components/Layout';
import { ContainerScrollView } from '../../../components/Styles/Layout';
import { HorizontalDivider } from '../../../components/Styles/Divider';
import { TextareaGroup, TextareaView } from '../../../components/Styles/Editor';
import TitleItem from '../../../components/Details/TitleItem';
import NavInputItem from '../../../components/NavInputItem';
import { ListView, CenterText, RightText } from '../../../components/Styles/Form';
import DateTimePicker from '../../../components/DateTimePicker';

import MarkActivityStore from '../../../logicStores/markActivity';

class EditorMore extends React.Component {
  state = {
    name: null,
    beginDate: null,
    endDate: null,
    departmentId: null,
    departmentName: null,
    status: null,
    sourceType: null,
    description: null,
    budgetCost: null,
    budgetRevenue: null,
    budgetPeopleNumber: null,
    effect: null,
    actualPeopleNumber: null,
    actualCost: null,
    actualRevenue: null,
    executeDetail: null,
  };
  componentDidMount() {
    this.props.navigation.setParams({
      onPressRight: this.onPressRight,
    });
    this.initState();
  }
  onPressRight = () => {
    const {
      state: {
        name,
        beginDate,
        endDate,
        departmentId,
        description,
      },
      props: {
        navigation: { pop, state },
      },
    } = this;
    try {
      if (!name) throw new Error(MarkActivityEnum.name);
      if (!beginDate) throw new Error(MarkActivityEnum.beginDate);
      if (!endDate) throw new Error(MarkActivityEnum.endDate);
      if (!departmentId) throw new Error(MarkActivityEnum.departmentName);
      if (!description) throw new Error(MarkActivityEnum.description);
      const { item: { id } = {} } = state.params || {};
      // 新增
      if (!id) {
        MarkActivityStore.createMarkActivityReq(this.state, () => {
          pop(2);
        });
        return;
      }
      if (!id) throw new Error('id 不为空');
      MarkActivityStore.updateMarkActivityReq(this.state, () => {
        pop(1);
      });
    } catch (error) {
      Toast.showWarning(error.message);
    }
  };
  initState = () => {
    const {
      props: {
        navigation: { state },
      },
    } = this;
    const { item = {} } = state.params || {};
    if (!Object.keys(item).length) return;
    let {
      beginDate,
      endDate,
    } = item;
    if (beginDate) {
      beginDate = formatDateByMoment(beginDate);
    }
    if (endDate) {
      endDate = formatDateByMoment(endDate);
    }
    this.setState({
      ...formatNumberToString(item),
      beginDate,
      endDate,
    });
  };

  render() {
    const {
      state: {
        name,
        beginDate,
        endDate,
        departmentId,
        departmentName,
        description,
        status,
        sourceType,
        budgetCost,
        budgetRevenue,
        budgetPeopleNumber,
        effect,
        actualPeopleNumber,
        actualCost,
        executeDetail,
        actualRevenue,
      },
      props: {
        navigation: {
          navigate, state,
        },
      },
    } = this;
    const { item = {} } = state.params || {};
    const isCreateBool = !item.id;
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
            {...theme.getLeftStyle({
              placeholder: MarkActivityEnum.name,
              value: name,
              onChangeText: name => this.setState({ name }),
            })}
          />
          <NavInputItem
            leftText="活动状态"
            onPress={() => navigate(routers.typePicker, {
              selectedKey: status,
              typeEnum: MarketActivityStatus,
              callback: (key) => {
                this.setState({
                  status: key,
                });
              },
            })}
            center={
              <CenterText active={status}>
                { status ? MarketActivityStatus[status] : MarkActivityEnum.status }
              </CenterText>
            }
            isLast
            {...theme.navItemStyle}
          />
          <NavInputItem
            leftText="所属部门"
            onPress={() => navigate(routers.selectDepartment, {
              id: departmentId,
              callback: (item) => {
                if (!Object.keys(item).length) return;
                this.setState({
                  departmentId: item.id,
                  departmentName: item.name,
                });
              },
            })}
            center={
              <CenterText active={departmentId && departmentName}>
                {
                  (departmentId && departmentName) ? departmentName : MarkActivityEnum.departmentName
                }
              </CenterText>
            }
            isLast
            {...theme.navItemStyle}
          />
          <NavInputItem
            leftText="活动类型"
            onPress={() => navigate(routers.typePicker, {
              selectedKey: sourceType,
              typeEnum: MarketActivityTypes,
              callback: (key) => {
                this.setState({
                  sourceType: key,
                });
              },
            })}
            center={
              <CenterText active={sourceType}>
                { sourceType ? MarketActivityTypes[sourceType] : MarkActivityEnum.sourceType }
              </CenterText>
            }
            isLast
            {...theme.navItemStyle}
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
              value={description}
              onChangeText={description => this.setState({ description })}
              placeholder={MarkActivityEnum.description}
              placeholderTextColor={theme.textPlaceholderColor}
            />
          </TextareaGroup>
          <TitleItem text="计划信息" />
          <DateTimePicker
            onConfirm={
              date =>
                this.setState({
                  beginDate: `${formatDateByMoment(date)}`,
                })
            }
          >
            <NavInputItem
              leftText="开始日期"
              needPress={false}
              center={
                <CenterText active={beginDate}>
                  {beginDate || MarkActivityEnum.beginDate}
                </CenterText>
              }
              {...theme.navItemStyle}
            />
          </DateTimePicker>
          <DateTimePicker
            onConfirm={
              date =>
                this.setState({
                  endDate: `${formatDateByMoment(date)}`,
                })
            }
          >
            <NavInputItem
              leftText="结束日期"
              needPress={false}
              center={
                <CenterText active={endDate}>
                  {endDate || MarkActivityEnum.endDate}
                </CenterText>
              }
              {...theme.navItemStyle}
            />
          </DateTimePicker>
          <NavInputItem
            leftText="活动成本"
            {...theme.getLeftStyle({
              placeholder: MarkActivityEnum.budgetCost,
              value: budgetCost,
              onChangeText: budgetCost => this.setState({ budgetCost }),
            })}
            right={
              <RightText>元</RightText>
            }
          />
          <NavInputItem
            leftText="预期收入"
            {...theme.getLeftStyle({
              placeholder: MarkActivityEnum.budgetRevenue,
              value: budgetRevenue,
              onChangeText: budgetRevenue => this.setState({ budgetRevenue }),
            })}
            right={
              <RightText>元</RightText>
            }
          />
          <NavInputItem
            leftText="邀请人数"
            {...theme.getLeftStyle({
              placeholder: MarkActivityEnum.budgetPeopleNumber,
              value: budgetPeopleNumber,
              onChangeText: budgetPeopleNumber => this.setState({ budgetPeopleNumber }),
            })}
          />
          <NavInputItem
            leftText="预期响应"
            {...theme.getLeftStyle({
              placeholder: MarkActivityEnum.effect,
              value: effect,
              onChangeText: effect => this.setState({ effect }),
            })}
          />
          <TitleItem text="实际信息" />
          <NavInputItem
            leftText="实际人数"
            {...theme.getLeftStyle({
              placeholder: MarkActivityEnum.actualPeopleNumber,
              value: actualPeopleNumber,
              onChangeText: actualPeopleNumber => this.setState({ actualPeopleNumber }),
            })}
          />
          <NavInputItem
            leftText="实际成本"
            {...theme.getLeftStyle({
              placeholder: MarkActivityEnum.actualCost,
              value: actualCost,
              onChangeText: actualCost => this.setState({ actualCost }),
            })}
          />
          {
            isCreateBool ? null : (
              <NavInputItem
                leftText="实际收入"
                {...theme.getLeftStyle({
                  placeholder: MarkActivityEnum.actualRevenue,
                  value: actualRevenue,
                  onChangeText: actualRevenue => this.setState({ actualRevenue }),
                })}
              />
            )
          }
          <TitleItem text="其它信息" />
          <NavInputItem
            leftText="备注"
            center={<View />}
            right={<View />}
          />
          <TextareaGroup>
            <TextareaView
              rowSpan={5}
              bordered
              value={executeDetail}
              onChangeText={(executeDetail) => { this.setState({ executeDetail }); }}
              placeholder={MarkActivityEnum.executeDetail}
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
