/**
 * @component TaskDetails.js
 * @description 任务详情
 * @time 2018/11/18
 * @author JUSTIN XU
 */
import React from 'react';
import PropTypes from 'prop-types';
import { useStrict } from 'mobx';
import { observer } from 'mobx-react/native';
import { Alert } from 'react-native';

// constants
import { routers, theme } from 'constants';
import { NoticeTypes } from 'constants/enum';

// utils
import { formatDateByMoment } from 'utils/base';

// logicStores
import TaskScheduleStore from 'logicStores/taskSchedule';

// components
import { CommStatusBar, LeftBackIcon } from 'components/Layout';
import { ContainerView, ContainerScrollView } from 'components/Styles/Layout';
import { HorizontalDivider } from 'components/Styles/Divider';
import { renderBasicItem, RemarkView, RemarkText } from 'components/Details/Styles';
import TitleItemComponent from 'components/Details/TitleItem';
import DetailFooter from './components/DetailFooter';

const formatDateType = 'YYYY-MM-DD HH:mm';

useStrict(true);

@observer
class TaskDetails extends React.Component {
  componentDidMount() {
    this.getData();
  }
  onPressEditor = () => {
    const {
      taskDetailMap,
    } = TaskScheduleStore;
    const {
      navigation: {
        navigate,
      },
    } = this.props;
    if (!Object.keys(taskDetailMap).length) return null;
    navigate(routers.addTask, { item: taskDetailMap });
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
    TaskScheduleStore.getTaskDetailMapReq(item);
  };
  render() {
    const {
      taskDetailMap: {
        name,
        endTime,
        noticeTime,
        sourceType,
        sourceName,
        ownerUserName,
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
          {renderBasicItem('任务主题', name)}
          {renderBasicItem('截止时间', formatDateByMoment(endTime, formatDateType))}
          {renderBasicItem('提醒', NoticeTypes[noticeTime])}
          {renderBasicItem('关联业务', source)}
          {renderBasicItem('负责人', ownerUserName)}
          {renderBasicItem('参与人', participatePeopleList.join(','))}
          <TitleItemComponent
            text="描述"
            color="#373737"
          />
          <RemarkView>
            <RemarkText>
              {comment}
            </RemarkText>
          </RemarkView>
        </ContainerScrollView>
        <HorizontalDivider
          height={50}
          backgroundColor={theme.whiteColor}
        />
        {
          Object.keys(TaskScheduleStore.taskDetailMap).length ? (
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

TaskDetails.navigationOptions = ({ navigation }) => ({
  title: '任务详情',
  headerLeft: (
    <LeftBackIcon
      onPress={() => navigation.goBack()}
    />
  ),
});

TaskDetails.defaultProps = {};

TaskDetails.propTypes = {
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

export default TaskDetails;
