/**
 * @component EditorMore.js
 * @description 新建市场活动/编辑页面
 * @time 2018/8/15
 * @author
 */
import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { CommStatusBar, DevicesUtil, LeftBackIcon, RightView, ToastUtil } from 'xn-react-native-applets';

// constants
import { routers, theme } from 'constants';
import { MarkActivityEnum } from 'constants/form';
import { MarketActivityStatus, MarketActivityTypes } from 'constants/enum';

// utils
import { delay, formatDateByMoment, formatDateType, formatNumberToString } from 'utils/base';
import { verifyDateTime } from 'utils/formVerify';

// logicStores
import MarkActivityStore from 'logicStores/markActivity';

// components
import { ContainerScrollView } from 'components/Styles/Layout';
import { HorizontalDivider } from 'components/Styles/Divider';
import { TextareaGroup, TextareaView } from 'components/Styles/Editor';
import TitleItem from 'components/Details/TitleItem';
import NavInputItem from 'components/NavInputItem';
import { ListView, CenterText, RightText } from 'components/Styles/Form';
import DateTimePicker from 'components/DateTimePicker';

const { isIos } = DevicesUtil;

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
  onPressRight = async () => {
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
      await verifyDateTime(beginDate, endDate);
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
      ToastUtil.showWarning(error.message);
    }
  };
  onFocus = async (y = 40) => {
    await delay();
    this.scrollViewRef.scrollTo({
      x: 0,
      y: theme.moderateScale(isIos() ? y : y + 30),
      animated: true,
    });
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
      beginDateShow,
      endDate,
      endDateShow,
    } = item;
    if (beginDate) {
      beginDateShow = formatDateByMoment(beginDate, formatDateType);
      beginDate = formatDateByMoment(beginDate);
    }
    if (endDate) {
      endDateShow = formatDateByMoment(endDate, formatDateType);
      endDate = formatDateByMoment(endDate);
    }
    this.setState({
      ...formatNumberToString(item),
      beginDate,
      beginDateShow,
      endDate,
      endDateShow,
    });
  };

  render() {
    const {
      state: {
        name,
        beginDateShow,
        endDateShow,
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
        innerRef={(ref) => { this.scrollViewRef = ref; }}
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
                onFocus: () => this.onFocus(),
                onBlur: () => this.onFocus(0),
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
              onFocus={() => this.onFocus(80)}
            />
          </TextareaGroup>
          <TitleItem text="计划信息" />
          <DateTimePicker
            mode="date"
            onConfirm={
              date =>
                this.setState({
                  beginDate: `${formatDateByMoment(date)}`,
                  beginDateShow: `${formatDateByMoment(date, formatDateType)}`,
                })
            }
          >
            <NavInputItem
              leftText="开始日期"
              needPress={false}
              center={
                <CenterText active={beginDateShow}>
                  {beginDateShow || MarkActivityEnum.beginDate}
                </CenterText>
              }
              {...theme.navItemStyle}
            />
          </DateTimePicker>
          <DateTimePicker
            mode="date"
            isEnd
            onConfirm={
              date =>
                this.setState({
                  endDate: `${formatDateByMoment(date)}`,
                  endDateShow: `${formatDateByMoment(date, formatDateType)}`,
                })
            }
          >
            <NavInputItem
              leftText="结束日期"
              needPress={false}
              center={
                <CenterText active={endDateShow}>
                  {endDateShow || MarkActivityEnum.endDate}
                </CenterText>
              }
              {...theme.navItemStyle}
            />
          </DateTimePicker>
          <NavInputItem
            leftText="活动成本"
            {...theme.getLeftStyle({
                keyboardType: 'numeric',
                placeholder: MarkActivityEnum.budgetCost,
                value: budgetCost,
                onChangeText: budgetCost => this.setState({ budgetCost }),
                onFocus: () => this.onFocus(350),
            })}
            right={
              <RightText>元</RightText>
            }
          />
          <NavInputItem
            leftText="预期收入"
            {...theme.getLeftStyle({
                keyboardType: 'numeric',
                placeholder: MarkActivityEnum.budgetRevenue,
                value: budgetRevenue,
                onChangeText: budgetRevenue => this.setState({ budgetRevenue }),
                onFocus: () => this.onFocus(400),
            })}
            right={
              <RightText>元</RightText>
            }
          />
          <NavInputItem
            leftText="邀请人数"
            {...theme.getLeftStyle({
                keyboardType: 'numeric',
                placeholder: MarkActivityEnum.budgetPeopleNumber,
                value: budgetPeopleNumber,
                onChangeText: budgetPeopleNumber => this.setState({ budgetPeopleNumber }),
                onFocus: () => this.onFocus(450),
            })}
          />
          <NavInputItem
            leftText="预期响应"
            {...theme.getLeftStyle({
                keyboardType: 'numeric',
                placeholder: MarkActivityEnum.effect,
                value: effect,
                onChangeText: effect => this.setState({ effect }),
                onFocus: () => this.onFocus(500),
            })}
            right={
              <RightText>人</RightText>
            }
          />
          <TitleItem text="实际信息" />
          <NavInputItem
            leftText="实际人数"
            {...theme.getLeftStyle({
                keyboardType: 'numeric',
                placeholder: MarkActivityEnum.actualPeopleNumber,
                value: actualPeopleNumber,
                onChangeText: actualPeopleNumber => this.setState({ actualPeopleNumber }),
                onFocus: () => this.onFocus(550),
            })}
            right={
              <RightText>人</RightText>
            }
          />
          <NavInputItem
            leftText="实际成本"
            {...theme.getLeftStyle({
                keyboardType: 'numeric',
                placeholder: MarkActivityEnum.actualCost,
                value: actualCost,
                onChangeText: actualCost => this.setState({ actualCost }),
                onFocus: () => this.onFocus(600),
            })}
            right={
              <RightText>元</RightText>
            }
          />
          {
            isCreateBool ? null : (
              <NavInputItem
                leftText="实际收入"
                {...theme.getLeftStyle({
                  keyboardType: 'numeric',
                  placeholder: MarkActivityEnum.actualRevenue,
                  value: actualRevenue,
                  onChangeText: actualRevenue => this.setState({ actualRevenue }),
                  onFocus: () => this.onFocus(650),
                })}
                right={
                  <RightText>元</RightText>
                }
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
              onFocus={() => this.onFocus(isCreateBool ? 700 : 750)}
              onBlur={() => this.onFocus(0)}
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
      onPress={navigation.state.params ? navigation.state.params.onPressRight : () => null}
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
