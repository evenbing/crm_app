/**
 * @component ScheduleDetails.js
 * @description 日程详情
 * @time 2018/11/18
 * @author JUSTIN XU
 */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useStrict } from 'mobx';
import { observer } from 'mobx-react/native';
import { Alert } from 'react-native';

// constants
import { routers, theme } from 'constants';
import { NoticeTypes, RepeatTypes } from 'constants/enum';

// utils
import { formatDateByMoment } from 'utils/base';

// logicStores
import TaskScheduleStore from 'logicStores/taskSchedule';

// components
import { CommStatusBar, LeftBackIcon } from 'components/Layout';
import { ContainerView, ContainerScrollView } from 'components/Styles/Layout';
import { HorizontalDivider } from 'components/Styles/Divider';
import { renderBasicItem, RemarkView, RemarkText, ImageTitleView } from 'components/Details/Styles';
import TitleItemComponent from 'components/Details/TitleItem';
import DetailFooter from './components/DetailFooter';

const formatDateType = 'YYYY-MM-DD HH:mm';

const ImageView = styled.Image`
  width: ${theme.moderateScale(75)};
  height: ${theme.moderateScale(75)};
  margin-right: ${theme.moderateScale(8)};
  margin-bottom: ${theme.moderateScale(8)};
  border-width: 1px;
  border-color: ${theme.borderColor};
`;

useStrict(true);

@observer
class ScheduleDetails extends React.Component {
  componentDidMount() {
    this.getData();
  }
  onPressEditor = () => {
    const {
      scheduleDetailMap,
    } = TaskScheduleStore;
    const {
      navigation: {
        navigate,
      },
    } = this.props;
    if (!Object.keys(scheduleDetailMap).length) return null;
    navigate(routers.addSchedule, { item: scheduleDetailMap });
  };
  onPressDelete = () => {
    const {
      navigation: {
        state: {
          params: {
            item,
          } = {},
        },
        goBack,
      },
    } = this.props;
    Alert.alert(
      '提示',
      '确定删除吗？',
      [
        {
          text: '取消',
          onPress: () => { },
          style: 'cancel',
        },
        {
          text: '确定',
          onPress: () => {
            TaskScheduleStore.deleteTaskScheduleRelatedToMeReq(item, () => {
              goBack();
            });
          },
        },
      ],
      { cancelable: false },
    );
  };
  getData = () => {
    const {
      navigation: {
        state: {
          params: {
            item,
          } = {},
        },
      },
    } = this.props;
    if (!Object.keys(item).length) return null;
    TaskScheduleStore.getScheduleDetailMapReq(item);
  };
  render() {
    const {
      scheduleDetailMap: {
        attachmentList = [],
        name,
        startTime,
        endTime,
        noticeTime,
        locationOutputName,
        sourceType,
        sourceName,
        repeatType,
        participatePeopleList = [],
        comment,
      },
    } = TaskScheduleStore;
    const source = (sourceType && sourceName) ? `${sourceType}${sourceName}` : null;
    return (
      <ContainerView
        bottomPadding
      >
        <CommStatusBar />
        <ContainerScrollView
          backgroundColor={theme.whiteColor}
        >
          {renderBasicItem('日程主题', name)}
          {renderBasicItem('开始时间', formatDateByMoment(startTime, formatDateType))}
          {renderBasicItem('截止时间', formatDateByMoment(endTime, formatDateType))}
          {renderBasicItem('提醒', NoticeTypes[noticeTime])}
          {renderBasicItem('位置', locationOutputName)}
          {renderBasicItem('关联业务', source)}
          {renderBasicItem('重复规则', RepeatTypes[repeatType])}
          {renderBasicItem('参与人', participatePeopleList.join(','))}
          <TitleItemComponent
            text="描述"
            color="#373737"
            fontSize={16}
          />
          <RemarkView>
            <RemarkText>
              {comment}
            </RemarkText>
          </RemarkView>
          <TitleItemComponent
            text="图片"
            color="#373737"
            fontSize={16}
          />
          <ImageTitleView>
            {
              attachmentList.length ? (
                attachmentList.map((v, i) => (
                  <ImageView
                    key={i}
                    source={v.filePath ? { uri: v.filePath } : null}
                  />
                ))
              ) : null
            }
          </ImageTitleView>
        </ContainerScrollView>
        <HorizontalDivider
          height={50}
          backgroundColor={theme.whiteColor}
        />
        {
          Object.keys(TaskScheduleStore.scheduleDetailMap).length ? (
            <DetailFooter
              onPressEditor={this.onPressEditor}
              onPressDelete={this.onPressDelete}
            />
          ) : null
        }
      </ContainerView>
    );
  }
}

ScheduleDetails.navigationOptions = ({ navigation }) => ({
  title: '日程详情',
  headerLeft: (
    <LeftBackIcon
      onPress={() => navigation.goBack()}
    />
  ),
});

ScheduleDetails.defaultProps = {};

ScheduleDetails.propTypes = {
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

export default ScheduleDetails;
