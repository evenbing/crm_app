import React, { Component } from 'react';
import styled from 'styled-components';

import NavView from '../../components/NavItem';
import { CommStatusBar, LeftBackIcon } from '../../components/Layout';
import { moderateScale } from '../../utils/scale';
import { theme } from '../../constants';
import RemarkInput from '../../components/RemarkInput';
import NavInputItem from '../../components/NavInputItem';
import DateTimePicker from '../../components/DateTimePicker';
import { CenterText } from '../../components/Styles/Form';
import { formatDate } from '../../utils/base';
import { TaskEnum } from '../../constants/form';
import { FormActionSheet } from '../../components/Modal';
import { NoticeTypes } from '../../constants/enum';

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

class AddSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: 'SCHEDULE',
      name: null,
      startTime: null,
      endTime: null,
      moduleType: null,
      moduleId: null,
      comment: null,
      needNotice: null,
      noticeTime: null,
      longitudeAndLatitude: null,
      locationInfo: null,
      isPrivate: null,
      principal: null,
      userIds: null,
    };
  }

  getLeftStyle = (inputProps, width = 80) => {
    return {
      inputProps: {
        ...inputProps,
        fontSize: moderateScale(16),
      },
      leftTextStyle: {
        color: theme.textFormColor,
        width: moderateScale(width),
      },
      height: 44,
    };
  };

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
        navigation: {
          navigate,
        },
      },
    } = this;
    return (
      <ContainerView>
        <CommStatusBar />
        <ScrollView>
          <Divder height={9} />
          <NavInputItem
            leftText="日程主题"
            {...theme.getLeftStyle({
              placeholder: '请输入日程主题',
              value: name,
              onChangeText: name => this.setState({ name }),
            })}
          />
          <Divder height={10} />
          <DateTimePicker
            onConfirm={
              date =>
                this.setState({
                  startTime: `${formatDate(date, formatDateType)}`,
                })
            }
          >
            <NavInputItem
              leftText="开始时间"
              needPress={false}
              center={
                <CenterText active={startTime}>
                  {startTime || TaskEnum.startTime}
                </CenterText>
              }
              {...theme.navItemStyle}
            />
          </DateTimePicker>
          <Divder height={1} marginHorizontal={15} />
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
          <Divder height={1} marginHorizontal={15} />
          <NavView leftText="位置" rightText="江苏 苏州" />
          <Divder height={1} marginHorizontal={15} />
          <NavView leftText="参与人" rightText="无" />
          <Divder height={10} />
          <NavInputItem
            leftText="关联业务"
            onPress={() => {
              navigate(routers.typePicker, {
                selectedKey: moduleType,
                typeEnum: ModuleTypes,
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
          <Divder height={1} marginHorizontal={15} />
          <NavView leftText="重复规则" rightText="不重复" />
          <Divder height={1} marginHorizontal={15} />
          <ItemTitle>描述</ItemTitle>
          <RemarkInput />
          <ItemTitle>图片</ItemTitle>
        </ScrollView>
      </ContainerView>
    );
  }
}

AddSchedule.navigationOptions = () => ({
  title: '新增日程',
  headerLeft: (
    <LeftBackIcon />
  ),
});

export default AddSchedule;
