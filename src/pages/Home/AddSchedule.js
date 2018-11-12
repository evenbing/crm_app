/*
 * @Author: ShiQuan
 * @Date: 2018-09-24 20:50:41
 * @Last Modified by: Edmond.Shi
 * @Last Modified time: 2018-10-10 16:44:36
 */

import React, { Component } from 'react';
import { View } from 'react-native';
import styled from 'styled-components';
import { observer } from 'mobx-react/native';
import PropTypes from 'prop-types';
import moment from 'moment';

import DateTimePicker from '../../components/DateTimePicker';
import { LeftBackIcon, CommStatusBar, RightView } from '../../components/Layout';
import { moderateScale } from '../../utils/scale';
import { theme, routers } from '../../constants';
import NavInputItem from '../../components/NavInputItem';
import { formatDate } from '../../utils/base';
import { FormActionSheet } from '../../components/Modal';
import { NoticeTypes, RepeatTypes } from '../../constants/enum';
import { TaskEnum } from '../../constants/form';
import { CenterText } from '../../components/Styles/Form';
import ImageCollector from '../../components/ImageCollector';
import { TextareaGroup, TextareaView } from '../../components/Styles/Editor';
import TaskScheduleModel from '../../logicStores/taskSchedule';
import AttachmentModel from '../../logicStores/attachment';
import Toast from '../../utils/toast';
import { ContainerView } from '../../components/Drawer/Styles';
import { getNewId, createLocationId } from '../../service/app';

const formatDateType = 'yyyy-MM-dd hh:mm';

const ScrollView = styled.ScrollView`
  background-color: white;
  flex: 1;
`;

const Divder = styled.View`
  height: ${props => moderateScale(props.height)};
  ${props => props.marginHorizontal ? `margin: 0px ${moderateScale(props.marginHorizontal)}px` : ''};
  background-color: #F6F6F6;
`;

@observer
class AddSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: 'SCHEDULE', // 'TASK',
      name: null, // 'new task',
      startTime: null, // '2018-09-09 11:12:12',
      endTime: null, // '2019-09-19 12:12:12',
      moduleType: null,
      moduleTypeName: null,
      moduleId: null,
      moduleName: null,
      comment: null,
      needNotice: false,
      noticeTime: null,
      noticeTimeName: null,
      longitudeAndLatitude: null,
      locationInfo: null,
      provinceId: null,
      cityId: null,
      districtId: null,
      isPrivate: 1, // 先默认写1
      principal: null,
      // principalName: null,
      repeatTypeId: null,
      repeatTypeName: '',
      userIds: [],
      userIdNames: [],
      images: [],
    };
  }

  componentDidMount() {
    this.props.navigation.setParams({
      onPressRight: this.onPressRight,
    });
  }

  onPressRight = async () => {
    const {
      state: {
        type,
        name,
        startTime,
        endTime,
        moduleType,
        moduleId,
        comment,
        needNotice,
        noticeTime,
        longitudeAndLatitude,
        locationInfo,
        provinceId,
        cityId,
        districtId,
        isPrivate,
        principal,
        userIds,
        images,
      },
      props: {
        navigation: {
          goBack,
          state: { params: { oldTaskScheduleId } },
        },
      },
    } = this;
    try {
      if (!name) throw new Error(TaskEnum.name);
      if (name.length > 100) throw new Error(TaskEnum.nameError);
      if (!startTime) throw new Error(TaskEnum.startTime);
      if (!endTime) throw new Error(TaskEnum.endTime);
      // if (startTime >= endTime) throw new Error(TaskEnum.timeError);
      // if (!(moduleId)) throw new Error(TaskEnum.moduleId);

      // 获取位置信息
      let locationId = null;
      if (locationInfo) {
        const { location: { id } } = await createLocationId({
          provinceId,
          cityId,
          districtId,
        });
        locationId = id;
      }

      const businessId = await getNewId();
      // 上传图片
      for (let index = 0; index < images.length; index++) {
        const { image: { path } } = images[index];
        AttachmentModel.uploadImageReq({
          file: {
            uri: path,
            type: 'multipart/form-data',
            name: path.substring(path.lastIndexOf('/') + 1),
          },
          businessId,
        });
      }
      TaskScheduleModel.createTaskScheduleRelatedToMeReq({
        id: businessId,
        oldTaskScheduleId,
        type,
        name,
        startTime: moment(startTime).format('YYYY-MM-DD HH:mm:ss'),
        endTime: moment(endTime).format('YYYY-MM-DD HH:mm:ss'),
        moduleType,
        moduleId,
        comment,
        needNotice,
        noticeTime,
        longitudeAndLatitude,
        locationInfo,
        locationId,
        isPrivate,
        principal,
        userIds,
        successMsg: '日程创建成功',
      }, () => {
        goBack();
      });
    } catch (e) {
      Toast.showError(e.message);
    }
  };

  onChangeTaskName = (name) => {
    this.setState({ name });
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
        moduleName,
        comment,
        // needNotice,
        noticeTime,
        noticeTimeName,
        // longitudeAndLatitude,
        locationInfo,
        // provinceId,
        // cityId,
        // districtId,
        // isPrivate,
        // principal,
        // principalName,
        userIds,
        userIdNames,
        repeatTypeId,
        repeatTypeName,
      },
      props: {
        navigation: { navigate },
      },
    } = this;

    return (
      <ContainerView bottomPadding >
        <CommStatusBar />
        <ScrollView>
          <Divder height={9} />
          <NavInputItem
            leftText="日程主题"
            {...theme.getLeftStyle({
              placeholder: TaskEnum.name,
              value: name,
              onChangeText: name => this.setState({ name }),
            })}
          />
          <Divder height={10} />
          <DateTimePicker
            minuteInterval={30}
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
          <DateTimePicker
            isEnd
            minuteInterval={30}
            onConfirm={
              date =>
                this.setState({
                  endTime: `${formatDate(date, formatDateType)}`,
                })
            }
          >
            <NavInputItem
              leftText="结束时间"
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
              const {
                key,
                value,
              } = item;
              this.setState({
                needNotice: key !== 0,
                noticeTime: key,
                noticeTimeName: value,
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
          <NavInputItem
            leftText="位置"
            onPress={() => {
              navigate(routers.cityPicker, {
                callback: ({ formatLocation, provinceId, cityId, districtId }) => {
                  this.setState({
                    locationInfo: formatLocation,
                    provinceId,
                    cityId,
                    districtId,
                  });
                },
              });
            }}
            center={
              <CenterText active={locationInfo}>
                { locationInfo || TaskEnum.locationInfo }
              </CenterText>
            }
            {...theme.navItemStyle}
          />
          <Divder height={1} />
          <NavInputItem
            leftText="参与人"
            onPress={() => {
              // if (!(moduleId && moduleType)) {
              //   Toast.showError('请先选择关联业务');
              //   return;
              // }
              navigate(routers.teamMembers, {
                moduleId,
                moduleType,
                radio: true,
                callback: (list) => {
                  this.setState({
                    userIds: list.map(user => user.userId),
                    userIdNames: list.map(user => user.userName),
                  });
                },
              });
            }}
            center={
              <CenterText active={userIds.length && userIdNames.length}>
                {
                  userIds.length && userIdNames.length
                    ? userIdNames.reduce((a, c) => `${a},${c}`) : TaskEnum.userIds
                }
              </CenterText>
            }
            {...theme.navItemStyle}
          />
          <Divder height={10} />
          <NavInputItem
            leftText="关联业务"
            onPress={() => {
              navigate(routers.moduleTypePicker, {
                selectedModuleType: moduleType,
                selectedModuleId: moduleId,
                callback: ({ id, name, moduleType, moduleTypeName }) => {
                  this.setState({
                    moduleId: id,
                    moduleName: name,
                    moduleType,
                    moduleTypeName,
                  });
                },
              });
            }}
            center={
              <CenterText active={moduleType && moduleTypeName}>
                {
                  moduleId && moduleName && moduleType && moduleTypeName
                    ? `${moduleTypeName},${moduleName}` : TaskEnum.moduleType
                }
              </CenterText>
            }
            {...theme.navItemStyle}
          />
          <FormActionSheet
            typeEnum={RepeatTypes}
            onConfirm={(item) => {
              const {
                key,
                value,
              } = item;
              this.setState({
                repeatTypeId: key,
                repeatTypeName: value,
              });
            }}
          >
            <NavInputItem
              leftText="重复规则"
              needPress={false}
              center={
                <CenterText active={repeatTypeId && repeatTypeName}>
                  {(repeatTypeId && repeatTypeName) ? repeatTypeName : TaskEnum.repeatType}
                </CenterText>
              }
              {...theme.navItemStyle}
            />
          </FormActionSheet>
          <Divder height={1} marginHorizontal={15} />
          <NavInputItem
            leftText="描述"
            height={44}
            center={<View />}
          />
          <TextareaGroup>
            <TextareaView
              rowSpan={5}
              bordered
              value={comment}
              onChangeText={comment => this.setState({ comment })}
              placeholder="请输入备注说明"
              placeholderTextColor={theme.textPlaceholderColor}
            />
          </TextareaGroup>
          <NavInputItem
            leftText="图片"
            height={44}
            center={<View />}
          />
          <ImageCollector
            onConfirm={(images) => {
              console.log(images);
              this.setState({ images });
            }}
          />
          <View style={{ height: 50 }} />
        </ScrollView>
      </ContainerView>
    );
  }
}

AddSchedule.navigationOptions = ({ navigation }) => ({
  title: '新增日程',
  headerLeft: (
    <LeftBackIcon />
  ),
  headerRight: (
    <RightView
      onPress={navigation.state.params ? navigation.state.params.onPressRight : () => {}}
      right="完成"
      rightStyle={{
        color: theme.primaryColor,
      }}
    />
  ),
});

AddSchedule.propTypes = {
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

export default AddSchedule;
