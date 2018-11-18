/**
 * @component ScheduleDetails.js
 * @description 日程详情
 * @time 2018/11/18
 * @author JUSTIN XU
 */
import React from 'react';
import PropTypes from 'prop-types';
import { useStrict, toJS } from 'mobx';
// import styled from 'styled-components';

// constants
import { theme } from '../../constants';
import { NoticeTypes, RepeatTypes, ModuleType } from '../../constants/enum';

// utils
import { formatDateByMoment, formatLocationMap } from '../../utils/base';

// components
import { CommStatusBar, LeftBackIcon } from '../../components/Layout';
import { ContainerView, ContainerScrollView } from '../../components/Styles/Layout';
import { HorizontalDivider } from '../../components/Styles/Divider';
import { renderBasicItem, RemarkView, RemarkText } from '../../components/Details/Styles';
// import DetailFooter from './components/DetailFooter';
import TitleItemComponent from '../../components/Details/TitleItem';

const formatDateType = 'YYYY-MM-DD HH:mm';

useStrict(true);

class ScheduleDetails extends React.Component {
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
          {renderBasicItem('日程主题', item.name)}
          {renderBasicItem('开始时间', formatDateByMoment(item.startTime, formatDateType))}
          {renderBasicItem('截止时间', formatDateByMoment(item.endTime, formatDateType))}
          {renderBasicItem('提醒', NoticeTypes[item.noticeTime])}
          {renderBasicItem('位置', formatLocationMap(item.location))}
          {renderBasicItem('关联业务', ModuleType[item.moduleType])}
          {renderBasicItem('重复规则', RepeatTypes[item.repeatTypeName])}
          {renderBasicItem('参与人', item.userIdNames ? item.userIdNames.join(',') : null)}
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
