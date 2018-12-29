/*
 * @Author: ShiQuan
 * @Date: 2018-09-24 20:50:41
 * @Last Modified by: Edmond.Shi
 * @Last Modified time: 2018-10-10 16:44:36
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import styled from 'styled-components';
import { observer } from 'mobx-react/native';
import { CommStatusBar, DevicesUtil, LeftBackIcon, RightView, ToastUtil } from 'xn-react-native-applets';

// utils
import { moderateScale } from 'utils/scale';
import { formatDateByMoment, formatNumberToString, delay } from 'utils/base';

// constants
import { theme, routers } from 'constants';
import { NoticeTypes, RepeatTypes } from 'constants/enum';
import { TaskEnum } from 'constants/form';

// service
import { getNewId, createLocationId } from 'service/app';

// logicStores
import TaskScheduleModel from 'logicStores/taskSchedule';
import AttachmentModel from 'logicStores/attachment';

// components
import DateTimePicker from 'components/DateTimePicker';
import NavInputItem from 'components/NavInputItem';
import { FormActionSheet } from 'components/Modal';
import { CenterText } from 'components/Styles/Form';
import ImageCollector from 'components/ImageCollector';
import { TextareaGroup, TextareaView } from 'components/Styles/Editor';
import { ContainerView } from 'components/Drawer/Styles';

const { isIos } = DevicesUtil;
const formatDateType = 'YYYY-MM-DD HH:mm';

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
      longitudeAndLatitude: null,
      locationInfo: null,
      provinceId: null,
      cityId: null,
      districtId: null,
      isPrivate: 1, // 先默认写1
      principal: null,
      // principalName: null,
      repeatType: null,
      repeatTypeName: '',
      userIds: [],
      userIdNames: [],
      images: [],
    };

    this.createBool = false;
  }

  componentDidMount() {
    this.props.navigation.setParams({
      onPressRight: this.onPressRight,
    });
    this.initState();
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
        repeatType,
      },
      props: {
        navigation: {
          goBack,
          pop,
          state: { params: { oldTaskScheduleId, item = {} } },
        },
      },
    } = this;
    try {
      const bool = Object.keys(item).length;
      if (!name) throw new Error(TaskEnum.name);
      if (name.length > 100) throw new Error(TaskEnum.nameError);
      if (!startTime) throw new Error(TaskEnum.startTime);
      if (!endTime) throw new Error(TaskEnum.endTime);
      // 处理新建
      if (!Object.keys(item).length) {
        if (this.createBool) return;
        this.createBool = true;
      }
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
      let businessId = item.id;
      if (!bool) {
        businessId = await getNewId();
      }
      // 上传图片
      for (let index = 0; index < images.length; index++) {
        const { image: { path } = {}, filePath } = images[index];
        if (filePath) continue;
        AttachmentModel.uploadImageReq({
          file: {
            uri: path,
            type: 'multipart/form-data',
            name: path.substring(path.lastIndexOf('/') + 1),
          },
          businessId,
          businessType: 'TASK',
        });
      }
      // 更新逻辑
      if (Object.keys(item).length) {
        TaskScheduleModel.updateTaskScheduleRelatedToMeReq({
          ...this.state,
          id: businessId,
          locationInfo,
          locationId,
        }, () => {
          pop(2);
        });
        return;
      }
      // 创建逻辑
      TaskScheduleModel.createTaskScheduleRelatedToMeReq({
        id: businessId,
        oldTaskScheduleId,
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
        locationId,
        isPrivate,
        principal,
        userIds,
        repeatType,
        successMsg: '日程创建成功',
      }, (result) => {
        this.createBool = true;
        if (result) return;
        goBack();
      });
    } catch (e) {
      ToastUtil.showError(e.message);
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
      startTime,
      startTimeShow,
      endTime,
      endTimeShow,
    } = item;
    if (startTime) {
      startTimeShow = formatDateByMoment(startTime, formatDateType);
      startTime = formatDateByMoment(startTime);
    }
    if (endTime) {
      endTimeShow = formatDateByMoment(endTime, formatDateType);
      endTime = formatDateByMoment(endTime);
    }
    this.setState({
      ...formatNumberToString(item),
      startTime,
      startTimeShow,
      endTime,
      endTimeShow,
      moduleTypeName: item.sourceType,
      moduleName: item.sourceName,
      locationInfo: item.locationOutputName,
      principalName: item.ownerUserName,
      userIds: [...item.userIdsStr],
      userIdNames: item.participatePeopleList,
      images: [...item.attachmentList],
    });
  };
  render() {
    const {
      state: {
        name,
        startTimeShow,
        endTimeShow,
        moduleType,
        moduleTypeName,
        moduleId,
        moduleName,
        comment,
        // needNotice,
        noticeTime,
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
        repeatType,
        images,
      },
      props: {
        navigation: { navigate },
      },
    } = this;

    return (
      <ContainerView bottomPadding >
        <CommStatusBar />
        <ScrollView
          innerRef={(ref) => { this.scrollViewRef = ref; }}
        >
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
                  startTime: `${formatDateByMoment(date)}`,
                  startTimeShow: `${formatDateByMoment(date, formatDateType)}`,
                })
            }
          >
            <NavInputItem
              leftText="开始时间"
              needPress={false}
              center={
                <CenterText active={startTimeShow}>
                  {startTimeShow || TaskEnum.startTime}
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
                  endTime: `${formatDateByMoment(date)}`,
                  endTimeShow: `${formatDateByMoment(date, formatDateType)}`,
                })
            }
          >
            <NavInputItem
              leftText="结束时间"
              needPress={false}
              center={
                <CenterText active={endTimeShow}>
                  {endTimeShow || TaskEnum.endTime}
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
              } = item;
              this.setState({
                needNotice: key !== 0,
                noticeTime: key,
              });
            }}
          >
            <NavInputItem
              leftText="提醒"
              needPress={false}
              center={
                <CenterText active={noticeTime}>
                  {(noticeTime) ? NoticeTypes[noticeTime] : TaskEnum.noticeTime}
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
              //   ToastUtil.showError('请先选择关联业务');
              //   return;
              // }
              navigate(routers.selectEmployee, {
                moduleId,
                moduleType,
                title: '请选择参与人',
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
              } = item;
              this.setState({
                repeatType: key,
              });
            }}
          >
            <NavInputItem
              leftText="重复规则"
              needPress={false}
              center={
                <CenterText active={repeatType}>
                  {repeatType ? RepeatTypes[repeatType] : TaskEnum.repeatType}
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
              onFocus={() => this.onFocus(320)}
              onBlur={() => this.onFocus(0)}
            />
          </TextareaGroup>
          <NavInputItem
            leftText="图片"
            height={44}
            center={<View />}
          />
          <ImageCollector
            data={images}
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

AddSchedule.navigationOptions = ({ navigation }) => {
  const {
    state: { params: { item = {} } = {} },
  } = navigation;
  const bool = Object.keys(item).length;
  return {
    title: bool ? '更新日程' : '新增日程',
    headerLeft: (
      <LeftBackIcon />
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
  };
};

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
