/*
 * @Author: ShiQuan
 * @Date: 2018-09-13 23:12:01
 * @Last Modified by: Edmond.Shi
 * @Last Modified time: 2018-09-20 18:17:14
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
import { FormActionSheet } from '../../components/Modal';
import { RemindTypes, ModuleTypes, NoticeTypes } from '../../constants/enum';
import { TaskEnum } from '../../constants/form';
import { CenterText } from '../../components/Styles/Form';
import ImageCollector from '../../components/ImageCollector';

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

// const remindTypeLabels = RemindTypes.map(item => ({ leftText: item.label }));
// const moduleTypeLabels = ModuleTypes.map(item => ({ leftText: item.label }));

@observer
class AddTask extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: null,
      startTime: null,
      endTime: null,
      moduleType: null,
      moduleTypeName: null,
      moduleId: null,
      comment: null,
      needNotice: null,
      noticeTime: null,
      noticeTimeName: null,
      longitudeAndLatitude: null,
      locationInfo: null,
      isPrivate: null,
      principal: null,
      principalName: null,
      userIds: null,
      userIdNames: null,
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
        moduleTypeName,
        moduleId,
        comment,
        needNotice,
        noticeTime,
        noticeTimeName,
        longitudeAndLatitude,
        locationInfo,
        isPrivate,
        principal,
        principalName,
        userIds,
        userIdNames,
      },
      props: {
        navigation: { navigate },
      },
    } = this;

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
                  endTime: `${formatDate(date, formatDateType)}`,
                })
            }
          >
            <NavInputItem
              leftText="截止时间"
              needPress={false}
              center={
                <CenterText active={endTime}>
                  {endTime || TaskEnum.endTime}
                </CenterText>
              }
              {...theme.navItemStyle}
            />
          </DateTimePicker>
          <Divder height={10} />
          <FormActionSheet
            typeEnum={NoticeTypes}
            onConfirm={(item) => {
              this.setState({
                noticeTime: item.key,
                noticeTimeName: item.value,
              });
            }}
          >
            <NavInputItem
              leftText="提醒"
              needPress={false}
              center={
                <CenterText active={noticeTime && noticeTimeName}>
                  {(noticeTime && noticeTimeName) ? noticeTimeName : TaskEnum.noticeTime}
                </CenterText>
              }
              {...theme.navItemStyle}
            />
          </FormActionSheet>
          <Divder height={1} />
          <NavInputItem
            leftText="关联业务"
            onPress={() => {
              navigate(routers.moduleTypePicker, {
                selectedKey: moduleType,
                callback: (key, value) => {
                  this.setState({
                    moduleType: key,
                    moduleTypeName: value,
                  });
                },
              });
            }}
            center={
              <CenterText active={moduleType && moduleTypeName}>
                {(moduleType && moduleTypeName) ? moduleTypeName : TaskEnum.moduleType}
              </CenterText>
            }
            isLast
            {...theme.navItemStyle}
          />
          <NavView
            leftText="负责人"
            onPress={() => {
              navigate(routers.teamMembers);
            }}
            center={
              <CenterText active={principal && principalName}>
                {(principal && principalName) ? principalName : TaskEnum.principal}
              </CenterText>
          }
            {...theme.navItemStyle}
          />
          <Divder height={1} marginHorizontal={15} />
          <NavView
            leftText="参与人"
            center={
              <CenterText active={userIds && userIdNames}>
                {(userIds && userIdNames) ? userIdNames : TaskEnum.userIds}
              </CenterText>
          }
            {...theme.navItemStyle}
          />
          <Divder height={1} marginHorizontal={15} />
          <ItemTitle>描述</ItemTitle>
          <RemarkInput />
          <ItemTitle>图片</ItemTitle>
          <ImageCollector onConfirm={() => {}} />
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
