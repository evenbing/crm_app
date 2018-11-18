/**
 * @component TaskDetails.js
 * @description 任务详情
 * @time 2018/11/18
 * @author JUSTIN XU
 */
import React from 'react';
import PropTypes from 'prop-types';
import { useStrict, toJS } from 'mobx';
// import styled from 'styled-components';

// constants
import { theme } from '../../constants';
import { NoticeTypes, ModuleType } from '../../constants/enum';

// utils
import { formatDateByMoment } from '../../utils/base';

// components
import { CommStatusBar, LeftBackIcon } from '../../components/Layout';
import { ContainerView, ContainerScrollView } from '../../components/Styles/Layout';
import { HorizontalDivider } from '../../components/Styles/Divider';
import { renderBasicItem, RemarkView, RemarkText } from '../../components/Details/Styles';
// import DetailFooter from './components/DetailFooter';
import TitleItemComponent from '../../components/Details/TitleItem';

const formatDateType = 'YYYY-MM-DD HH:mm';

useStrict(true);

class TaskDetails extends React.Component {
  render() {
    const {
      navigation: {
        state: {
          params: {
            item,
          } = {},
        },
      },
    } = this.props;
    console.log(toJS(item));
    return (
      <ContainerView
        bottomPadding
        backgroundColor={theme.whiteColor}
      >
        <CommStatusBar />
        <ContainerScrollView>
          {renderBasicItem('任务主题', item.name)}
          {renderBasicItem('截止时间', formatDateByMoment(item.endTime, formatDateType))}
          {renderBasicItem('提醒', NoticeTypes[item.noticeTime])}
          {renderBasicItem('关联业务', ModuleType[item.moduleType])}
          {renderBasicItem('负责人', item.ownerUserName)}
          {renderBasicItem('参与人', item.userIdNames ? item.userIdNames.join(','): null)}
          <TitleItemComponent
            text="描述"
            color="#373737"
          />
          <RemarkView>
            <RemarkText>
              {item.comment}
            </RemarkText>
          </RemarkView>
        </ContainerScrollView>
        <HorizontalDivider height={50} />
        {/* <DetailFooter /> */}
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
