/**
 * @component Create.js
 * @description 新建市场活动页面
 * @time 2018/9/2
 * @author JUSTIN XU
 */
import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { theme, routers } from '../../../constants';
import { formatDateByMoment } from '../../../utils/base';
import { MarkActivityEnum } from '../../../constants/form';
import Toast from '../../../utils/toast';

// components
import { CommStatusBar, LeftBackIcon, RightView } from '../../../components/Layout';
import { ContainerView } from '../../../components/Styles/Layout';
import { HorizontalDivider } from '../../../components/Styles/Divider';
import { TextareaGroup, TextareaView } from '../../../components/Styles/Editor';
import NavInputItem from '../../../components/NavInputItem';
import CreateMoreButton from '../../../components/Create/CreateMoreButton';
import TitleItem from '../../../components/Details/TitleItem';
import DateTimePicker from '../../../components/DateTimePicker';
import { ListView, CenterText } from '../../../components/Styles/Form';

import MarkActivityStore from '../../../logicStores/markActivity';

const formatDateTypeShow = 'YYYY-MM-DD HH:mm';
class Create extends React.Component {
  state = {
    name: null,
    beginDate: null,
    beginDateShow: null,
    endDate: null,
    endDateShow: null,
    departmentId: null,
    departmentName: null,
    description: null,
  };

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
      MarkActivityStore.createMarkActivityReq(this.state, () => {
        goBack();
      });
    } catch (error) {
      Toast.showWarning(error.message);
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
            onConfirm={
              date =>
                this.setState({
                  beginDate: `${formatDateByMoment(date)}`,
                  beginDateShow: `${formatDateByMoment(date, formatDateTypeShow)}`,
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
            onConfirm={
              date =>
                this.setState({
                  endDate: `${formatDateByMoment(date)}`,
                  endDateShow: `${formatDateByMoment(date, formatDateTypeShow)}`,
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
      onPress={navigation.state.params ? navigation.state.params.onPressRight : null}
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
