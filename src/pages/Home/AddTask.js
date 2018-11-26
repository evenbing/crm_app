/*
 * @Author: ShiQuan
 * @Date: 2018-09-13 23:12:01
 * @Last Modified by: Edmond.Shi
 * @Last Modified time: 2018-10-09 14:51:07
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import styled from 'styled-components';
import { observer } from 'mobx-react/native';
import uuidv1 from 'uuid/v1';

// utils
import { delay, formatDateByMoment, formatNumberToString } from 'utils/base';
import { moderateScale } from 'utils/scale';
import Toast from 'utils/toast';
import { isIos } from 'utils/utils';

// constants
import { theme, routers } from 'constants';
import { NoticeTypes } from 'constants/enum';
import { TaskEnum } from 'constants/form';

// components
import DateTimePicker from 'components/DateTimePicker';
import { LeftBackIcon, CommStatusBar, RightView } from 'components/Layout';
import NavInputItem from 'components/NavInputItem';
import { FormActionSheet } from 'components/Modal';
import { CenterText } from 'components/Styles/Form';
import ImageCollector from 'components/ImageCollector';
import { TextareaGroup, TextareaView } from 'components/Styles/Editor';
import { ContainerView } from 'components/Drawer/Styles';

import TaskScheduleModel from 'logicStores/taskSchedule';
import AttachmentModel from 'logicStores/attachment';
import { getNewId } from '../../service/app';

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
class AddTask extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: 'TASK', // 'TASK',
      name: null, // 'new task',
      // startTime: null, // '2018-09-09 11:12:12',
      endTime: null, // '2019-09-19 12:12:12',
      moduleType: null,
      moduleTypeName: null,
      moduleId: null,
      moduleName: null,
      comment: null,
      needNotice: false,
      noticeTime: null,
      // longitudeAndLatitude: null,
      // locationInfo: null,
      isPrivate: 1, // 先默认写1
      principal: null,
      principalName: null,
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
        // startTime,
        endTime,
        moduleType,
        moduleId,
        comment,
        needNotice,
        noticeTime,
        // longitudeAndLatitude,
        // locationInfo,
        isPrivate,
        principal,
        userIds,
        images,
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
      if (!endTime) throw new Error(TaskEnum.endTime);

      // 处理新建
      if (!Object.keys(item).length) {
        if (this.createBool) return;
        this.createBool = true;
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
        }, () => {
          pop(2);
        });
        return;
      }

      TaskScheduleModel.createTaskScheduleRelatedToMeReq({
        id: businessId,
        oldTaskScheduleId,
        type,
        name,
        // startTime,
        endTime,
        moduleType,
        moduleId,
        comment,
        needNotice,
        noticeTime,
        // longitudeAndLatitude,
        // locationInfo,
        isPrivate,
        principal,
        userIds,
        successMsg: '任务创建成功',
      }, (result) => {
        this.createBool = true;
        if (result) return;
        goBack();
      });
    } catch (e) {
      Toast.showError(e.message);
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
      endTime,
      endTimeShow,
    } = item;
    if (endTime) {
      endTimeShow = formatDateByMoment(endTime, formatDateType);
      endTime = formatDateByMoment(endTime);
    }
    this.setState({
      ...formatNumberToString(item),
      endTime,
      endTimeShow,
      moduleTypeName: item.sourceType,
      moduleName: item.sourceName,
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
        endTimeShow,
        moduleType,
        moduleTypeName,
        moduleId,
        moduleName,
        comment,
        // needNotice,
        noticeTime,
        // longitudeAndLatitude,
        // locationInfo,
        // isPrivate,
        principal,
        principalName,
        userIds,
        userIdNames,
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
            leftText="任务主题"
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
                  endTime: `${formatDateByMoment(date)}`,
                  endTimeShow: `${formatDateByMoment(date, formatDateType)}`,
                })
            }
          >
            <NavInputItem
              leftText="截止时间"
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
          <Divder height={1} />
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
                    moduleTypeName: `${moduleTypeName}:`,
                  });
                },
              });
            }}
            center={
              <CenterText active={moduleType && moduleTypeName}>
                {
                  moduleId && moduleName && moduleType && moduleTypeName
                  ? `${moduleTypeName}${moduleName}` : TaskEnum.moduleType
                }
              </CenterText>
            }
            {...theme.navItemStyle}
          />
          <Divder height={1} />
          <NavInputItem
            leftText="负责人"
            onPress={() => {
              if (!(moduleId && moduleType)) {
                Toast.showError('请先选择关联业务');
                return;
              }
              navigate(routers.teamMembers, {
                moduleId,
                moduleType,
                callback: ({ userId, userName }) => {
                  this.setState({
                    principal: userId,
                    principalName: userName,
                  });
                },
              });
            }}
            center={
              <CenterText active={principal && principalName}>
                {
                  principal && principalName
                  ? principalName : TaskEnum.principal
                }
              </CenterText>
            }
            {...theme.navItemStyle}
          />
          <Divder height={1} marginHorizontal={15} />
          <NavInputItem
            leftText="参与人"
            onPress={() => {
              if (!(moduleId && moduleType)) {
                Toast.showError('请先选择关联业务');
                return;
              }
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
              onFocus={() => this.onFocus(220)}
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

AddTask.navigationOptions = ({ navigation }) => ({
  title: '新增任务',
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
