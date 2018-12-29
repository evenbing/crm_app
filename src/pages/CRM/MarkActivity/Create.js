/**
 * @component Create.js
 * @description 新建市场活动页面
 * @time 2018/9/2
 * @author JUSTIN XU
 */
import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { CommStatusBar, LeftBackIcon, RightView, ToastUtil } from 'xn-react-native-applets';

// constants
import { theme, routers } from 'constants';
import { MarkActivityEnum } from 'constants/form';

// utils
import { formatDateByMoment, formatDateType } from 'utils/base';
import { verifyDateTime } from 'utils/formVerify';

// components
import { ContainerView } from 'components/Styles/Layout';
import { HorizontalDivider } from 'components/Styles/Divider';
import { TextareaGroup, TextareaView } from 'components/Styles/Editor';
import NavInputItem from 'components/NavInputItem';
import CreateMoreButton from 'components/Create/CreateMoreButton';
import TitleItem from 'components/Details/TitleItem';
import DateTimePicker from 'components/DateTimePicker';
import { ListView, CenterText } from 'components/Styles/Form';

// logicStores
import MarkActivityStore from 'logicStores/markActivity';

class Create extends React.Component {
  state = {
    name: null,
    beginDate: null,
    endDate: null,
    departmentId: null,
    departmentName: null,
    description: null,
  };

  componentDidMount() {
    this.props.navigation.setParams({
      onPressRight: this.onPressRight,
    });
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
        navigation: {
          goBack,
        },
      },
    } = this;
    try {
      if (!name) throw new Error(MarkActivityEnum.name);
      if (!beginDate) throw new Error(MarkActivityEnum.beginDate);
      if (!endDate) throw new Error(MarkActivityEnum.endDate);
      if (!departmentId) throw new Error(MarkActivityEnum.departmentName);
      if (!description) throw new Error(MarkActivityEnum.description);
      await verifyDateTime(beginDate, endDate);
      MarkActivityStore.createMarkActivityReq(this.state, () => {
        goBack();
      });
    } catch (error) {
      ToastUtil.showWarning(error.message);
    }
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
      },
      props: {
        navigation: {
          push,
          navigate,
        },
      },
    } = this;
    return (
      <ContainerView
        bottomPadding
      >
        <CommStatusBar />
        <HorizontalDivider
          height={12}
        />
        <ListView>
          <TitleItem text="必填信息" />
          <NavInputItem
            leftText="活动名称"
            {...theme.getLeftStyle({
              placeholder: MarkActivityEnum.name,
              value: name,
              onChangeText: name => this.setState({ name }),
            })}
          />
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
        </ListView>
        <HorizontalDivider
          height={41}
        />
        <CreateMoreButton
          onPress={() => push(routers.markActivityEditorMore, {
            item: this.state,
          })}
        />
      </ContainerView>
    );
  }
}

Create.navigationOptions = ({ navigation }) => ({
  title: '新增市场活动',
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

Create.defaultProps = {};

Create.propTypes = {
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

export default Create;
