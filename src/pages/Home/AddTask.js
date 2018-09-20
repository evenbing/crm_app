/*
 * @Author: ShiQuan
 * @Date: 2018-09-13 23:12:01
 * @Last Modified by: ShiQuan
 * @Last Modified time: 2018-09-15 10:19:40
 */
import React, { Component } from 'react';
import styled from 'styled-components';
import { observer } from 'mobx-react/native';
import PropTypes from 'prop-types';
import DateTimePicker from '../../components/DateTimePicker';

import NavView from '../../components/NavItem';
import { LeftBackIcon, CommStatusBar } from '../../components/Layout';
import { moderateScale } from '../../utils/scale';
import { theme, routers } from '../../constants';
import RemarkInput from '../../components/RemarkInput';
import NavInputItem from '../../components/NavInputItem';
import { formatDate } from '../../utils/base';
import { ActionSheet } from '../../components/Modal';
import { RemindTypes, ModuleTypes } from '../../constants/enum';
import { TaskEnum } from '../../constants/form';
import { CenterText } from '../../components/Styles/Form';

const formatDateType = 'yyyy-MM-dd hh:mm';

const ContainerView = styled.View`
  flex: 1;
  background-color: white;
`;

const ScrollView = styled.ScrollView`
  background-color: white;
  flex: 1;
`;

const Divder = styled.View`
  height: ${props => moderateScale(props.height)};
  ${props => props.marginHorizontal ? `margin: 0px ${moderateScale(props.marginHorizontal)}px` : ''};
  background-color: #F6F6F6;
`;

const ItemTitle = styled.Text`
  padding: ${moderateScale(11)}px ${moderateScale(15)}px;
  font-family: ${theme.fontRegular};
  font-size: ${moderateScale(16)};
  color: #373737;
`;

const remindTypeLabels = RemindTypes.map(item => ({ leftText: item.label }));
const moduleTypeLabels = ModuleTypes.map(item => ({ leftText: item.label }));

@observer
class AddTask extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      dateTimePickerVisible: false,
      deadline: '',
      remindActionSheetVisible: false,
      remindType: RemindTypes[0].label,
      noticeTime: RemindTypes[0].value,
      moduleActionSheetVisible: false,
      moduleTypeLabel: ModuleTypes[0].label,
      moduleType: ModuleTypes[0].value,
    };
  }

  onChangeTaskName = (name) => {
    this.setState({ name });
  }

  onConfirmDateTimePicker = (date) => {
    this.setState({
      deadline: `${formatDate(date, 'yyyy-MM-dd hh:mm')}`,
    });
    this.setDateTimePickerVisible(false);
  }

  onCancelDateTimePicker = () => {
    this.setDateTimePickerVisible(false);
  }

  onShowModuleActionSheet = () => {
    this.setState({ moduleActionSheetVisible: true });
  }

  onPressModuleActionSheetItem = ({ item }) => {
    const { value } = ModuleTypes.filter(type => type.label === item.leftText)[0];
    this.setState({
      moduleTypeLabel: item.leftText,
      moduleType: value,
    });
  }

  onPressModuleActionSheetClose = () => {
    this.setState({ moduleActionSheetVisible: false });
  }

  onShowRemindActionSheet = () => {
    this.setState({ remindActionSheetVisible: true });
  }

  onPressRemindActionSheetItem = ({ item }) => {
    const { value } = RemindTypes.filter(type => type.label === item.leftText)[0];
    this.setState({
      remindType: item.leftText,
      noticeTime: value,
    });
  }

  onPressRemindActionSheetClose = () => {
    this.setState({ remindActionSheetVisible: false });
  }

  setDateTimePickerVisible = (visible) => {
    this.setState({ dateTimePickerVisible: visible });
  }

  render() {
    const {
      state: {
        name,
        startTime,
        endTime,
        moduleType,
        moduleId,
        comment,
        needNotice,
        noticeTime,
        noticeTimeName,
        longitudeAndLatitude,
        locationInfo,
        isPrivate,
        principal,
        userIds,
      },
      props: {
        navigate,
      },
    } = this;

    const remindActionSheetProps = {
      isVisible: remindActionSheetVisible,
      onPressClose: this.onPressRemindActionSheetClose,
      onPressItem: this.onPressRemindActionSheetItem,
      list: remindTypeLabels,
    };

    const moduleActionSheetProps = {
      isVisible: moduleActionSheetVisible,
      onPressClose: this.onPressModuleActionSheetClose,
      onPressItem: this.onPressModuleActionSheetItem,
      list: moduleTypeLabels,
    };

    return (
      <ContainerView>
        <CommStatusBar />
        <ScrollView>
          <Divder height={9} />
          <NavInputItem
            leftText="任务主题"
            {...theme.getLeftStyle({
              placeholder: TaskEnum.name,
              value: name,
              onChangeText: name => this.setState({ name }),
            })}
          />
          <Divder height={10} />
          <DateTimePicker
            onConfirm={
              date =>
                this.setState({
                  endDate: `${formatDate(date, formatDateType)}`,
                })
            }
          >
            <NavInputItem
              leftText="截止时间"
              needPress={false}
              center={
                <CenterText active={endDate}>
                  {endDate || TaskEnum.endDate}
                </CenterText>
              }
              {...theme.navItemStyle}
            />
          </DateTimePicker>
          <Divder height={10} />
          <NavInputItem
            leftText="提醒"
            onPress={() => navigate(routers.typePicker, {
              selectedKey: noticeTime,
              typeEnum: ModuleTypes,
              callback: (key, value) => {
                this.setState({
                  noticeTime: key,
                  noticeTimeName: value,
                });
              },
            })}
            center={
              <CenterText active={noticeTime && noticeTimeName}>
                {(noticeTime && noticeTimeName) ? noticeTimeName : TaskEnum.noticeTime}
              </CenterText>
            }
            isLast
            {...theme.navItemStyle}
          />
          <Divder height={1} marginHorizontal={15} />
          <NavView leftText="负责人" rightText="无" />
          <Divder height={1} marginHorizontal={15} />
          <NavView leftText="参与人" rightText="无" />
          <Divder height={10} />
          <NavInputItem
            leftText="关联业务"
            onPress={() => navigate(routers.typePicker, {
              selectedKey: noticeTime,
              typeEnum: ModuleTypes,
              callback: (key, value) => {
                this.setState({
                  noticeTime: key,
                  noticeTimeName: value,
                });
              },
            })}
            center={
              <CenterText active={noticeTime && noticeTimeName}>
                {(noticeTime && noticeTimeName) ? noticeTimeName : TaskEnum.noticeTime}
              </CenterText>
            }
            isLast
            {...theme.navItemStyle}
          />
          <ActionSheet {...moduleActionSheetProps} />
          <Divder height={1} marginHorizontal={15} />
          <ItemTitle>描述</ItemTitle>
          <RemarkInput />
          <ItemTitle>图片</ItemTitle>
        </ScrollView>
      </ContainerView>
    );
  }
}

AddTask.navigationOptions = () => ({
  title: '新增任务',
  headerLeft: (
    <LeftBackIcon />
  ),
});

AddTask.propTypes = {
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

export default AddTask;
