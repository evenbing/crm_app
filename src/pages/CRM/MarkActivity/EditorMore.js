import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { View } from 'react-native';
import moment from 'moment';
import theme from '../../../constants/theme';
import { moderateScale } from '../../../utils/scale';

// components
import { CommStatusBar, LeftBackIcon, RightView } from '../../../components/Layout';
import { ContainerScrollView } from '../../../components/Styles/Layout';
import { HorizontalDivider } from '../../../components/Styles/Divider';
import { TextareaGroup, TextareaView } from '../../../components/Styles/Editor';
import TitleItem from '../../../components/Details/TitleItem';
import NavInputItem from '../../../components/NavInputItem';
import { MarkActivityEnum } from '../../../constants/form';
import { CenterText } from '../../../components/Styles/Form';
import { routers } from '../../../constants';
import { MarketActivityStatus, MarketActivityTypes } from '../../../constants/enum';
import DateTimePicker from '../../../components/DateTimePicker';
import { formatDate } from '../../../utils/base';
import MarkActivityStore from '../../../logicStores/markActivity';
import Toast from '../../../utils/toast';

const formatDateType = 'yyyy-MM-dd hh:mm';

const ListView = styled.View`
  background: ${theme.whiteColor};
`;

const RightText = CenterText.extend`
  color: ${theme.textColor};
`;

class EditorMore extends React.Component {
  constructor(props) {
    super(props);
    const {
      navigation: {
        state: {
          params: {
            name,
            beginDate,
            endDate,
            departmentId,
            departmentName,
            description,
          },
        },
      },
    } = props;
    this.state = {
      name,
      beginDate,
      endDate,
      departmentId,
      departmentName,
      status: null,
      statusName: null,
      sourceType: null,
      sourceTypeName: null,
      description,
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

  onPressRight = () => {
    const {
      state: {
        name,
        beginDate,
        endDate,
        departmentId,
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
      },
      props: {
        navigation: {
          navigate,
        },
      },
    } = this;
    try {
      if (!name) throw new Error(MarkActivityEnum.name);
      if (!beginDate) throw new Error(MarkActivityEnum.beginDate);
      if (!endDate) throw new Error(MarkActivityEnum.endDate);
      if (!departmentId) throw new Error(MarkActivityEnum.departmentName);
      if (!description) throw new Error(MarkActivityEnum.description);
      MarkActivityStore.createMarkActivityReq({
        name,
        beginDate: moment(beginDate).format('YYYY-MM-DD HH:mm:ss'),
        endDate: moment(endDate).format('YYYY-MM-DD HH:mm:ss'),
        departmentId,
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
      }, () => {
        navigate(routers.markActivity);
      });
    } catch (error) {
      Toast.showError(error.message);
    }
  };

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
        departmentName,
        description,
        status,
        statusName,
        sourceType,
        sourceTypeName,
        budgetCost,
        budgetRevenue,
        budgetPeopleNumber,
        effect,
        actualPeopleNumber,
        actualCost,
        executeDetail,
      },
      props: {
        navigation: {
          navigate,
        },
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
              callback: (key, value) => {
                this.setState({
                  status: key,
                  statusName: value,
                });
              },
            })}
            center={

              <CenterText active={status && statusName}>
                {
                  (status && statusName) ? statusName : MarkActivityEnum.status
                }
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
              callback: (key, value) => {
                this.setState({
                  sourceType: key,
                  sourceTypeName: value,
                });
              },
            })}
            center={
              <CenterText active={sourceType && sourceTypeName}>
                { (sourceType && sourceTypeName) ? sourceTypeName : MarkActivityEnum.sourceType }
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
                  beginDate: `${formatDate(date, formatDateType)}`,
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
                  endDate: `${formatDate(date, formatDateType)}`,
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
          <TitleItem text="其它信息" />
          {/* <NavInputItem
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
          /> */}
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
