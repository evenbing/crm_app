/**
 * @component MobxDemo.js
 * @description 首页
 * @time 2018/8/5
 * @author JUSTIN XU
 */
import React from 'react';
import { observer } from 'mobx-react/native';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import LinearGradient from 'react-native-linear-gradient';
import uuidv1 from 'uuid/v1';

import Toast from '../../utils/toast';
import ListItem from './components/ListItem';
import NoticeView from './components/NotiveView';
import TaskScheduleStore from '../../logicStores/taskSchedule';

// components
import { CommStatusBar, LeftBackIcon } from '../../components/Layout';
import { ActionSheet } from '../../components/Modal';
import { moderateScale } from '../../utils/scale';
import CalendarIcon from '../../img/home/ico_header_calendar.png';
import { routers, theme } from '../../constants';
import Calendar from './components/Calendar';
import { getDayOfWeek } from '../../utils/date';
// import TouchableView from '../../components/TouchableView';

const createTypes = [
  { leftText: '新建日程' },
  { leftText: '新建任务' },
];

const delayTypes = [
  { leftText: '1小时以后' },
  { leftText: '3小时以后' },
  { leftText: '明天' },
  { leftText: '后天' },
  { leftText: '自定义' },
];

const ContainerView = styled.View`
  background-color: ${theme.pageBackColor};
`;

const HeaderView = styled.View`
  height: ${moderateScale(134)};
  padding-top: ${moderateScale(9)};
  padding-bottom: ${moderateScale(30)};
  flex-direction: row;
  padding-left: ${moderateScale(9)};
  padding-right: ${moderateScale(18)};
`;

const HeaderViewLeft = styled.View`

`;

const HeaderCalendarIcon = styled.Image.attrs({
  source: CalendarIcon,
})`
  width: ${moderateScale(79)};
  height: ${moderateScale(79)};
`;

const HeaderCalendarText = styled.Text`
  color: white;
  background-color: transparent;
  position: absolute;
  bottom: ${moderateScale(25)};
  left: ${moderateScale(22)};
  font-size: ${moderateScale(26)};
`;

const HeaderViewMiddle = styled.View`
  flex: 1;
  margin-top: ${moderateScale(19)};
`;

const YearAndMonth = styled.Text`
  color: white;
  background-color: transparent;
  font-size: ${moderateScale(18)};
  margin-bottom: ${moderateScale(10)};
`;

const WeekDay = styled.Text`
  color: white;
  background-color: transparent;
  font-size: ${moderateScale(18)};
`;

const HeaderViewRight = styled.View`
  padding-top: ${moderateScale(10)};
`;

const List = styled.FlatList`
  background-color: ${theme.pageBackColor};
  padding: ${moderateScale(10)}px ${moderateScale(15)}px 0px ${moderateScale(15)}px;
`;

const ListItemSeparatorComponent = styled.View`
  background-color: transparent;
  height: ${moderateScale(10)}px;
`;

@observer
class Home extends React.Component {
  state = {
    createActionSheetVisible: false,
    delayActionSheetVisible: false,
  };

  componentDidMount() {
    TaskScheduleStore.getTaskScheduleRelatedToMeReq();
  }

  onSelectCreateType = ({ item }) => {
    const { navigate } = this.props.navigation;
    switch (item.leftText) {
      case '新建日程':
        navigate(routers.addSchedule);
        break;
      case '新建任务':
        navigate(routers.addTask);
        break;
      default:
        break;
    }
  }

  onSelectDelayType = ({ item }) => {
    const { navigate } = this.props.navigation;
    switch (item.leftText) {
      case '1小时之后':
        navigate(routers.addSchedule);
        break;
      case '3小时之后':
        navigate(routers.addTask);
        break;
      case '明天':
        navigate(routers.addTask);
        break;
      case '后天':
        navigate(routers.addTask);
        break;
      case '自定义':
        navigate(routers.addTask);
        break;
      default:
        break;
    }
  }

  onSelectedDayChange = () => {}

  showMessage = () => {
    const {
      navigation: { navigate },
    } = this.props;

    navigate(routers.messageList);
  }

  generateData = () => {
    const data = [];
    for (let index = 0; index < 10; index++) {
      data.push({
        key: index,
        duration: '20:00-22:00',
        type: '日程',
        title: '拜访李总',
        time: '2小时',
        operateList: [
          { key: uuidv1(), text: '下一步', onPress: this.selectCreateType },
          { key: uuidv1(), text: '延时', onPress: this.selectDelayType },
          { key: uuidv1(), text: '删除', onPress: () => Toast.showSuccess('删除') },
        ],
      });
    }
    return data;
  }

  keyExtractor = item => item.key;

  selectCreateType = () => {
    this.setState({
      createActionSheetVisible: !this.state.createActionSheetVisible,
    });
  }

  selectDelayType = () => {
    this.setState({
      delayActionSheetVisible: !this.state.delayActionSheetVisible,
    });
  }

  renderItem = ({ item }) => {
    const {
      duration,
      type,
      title,
      time,
      operateList,
    } = item;
    return (<ListItem
      duration={duration}
      type={type}
      title={title}
      time={time}
      operateList={operateList}
    />);
  }

  renderItemSeparatorComponent = () => <ListItemSeparatorComponent />

  render() {
    const {
      state: {
        createActionSheetVisible,
        delayActionSheetVisible,
      },
      props: {
        navigation: {
          navigate,
        },
      },
    } = this;
    const createActionSheetProps = {
      isVisible: createActionSheetVisible,
      onPressClose: this.selectCreateType,
      onPressItem: this.onSelectCreateType,
      list: createTypes,
    };
    const delayActionSheetProps = {
      isVisible: delayActionSheetVisible,
      onPressClose: this.selectDelayType,
      onPressItem: this.onSelectDelayType,
      list: delayTypes,
    };
    const curYear = new Date().getFullYear();
    const curMonth = new Date().getMonth() + 1;
    const curDay = new Date().getDate();
    return (
      <ContainerView>
        <CommStatusBar />
        <ActionSheet {...createActionSheetProps} />
        <ActionSheet {...delayActionSheetProps} />
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1.0, y: 1.0 }}
          colors={['#169C58', '#8EC963']}
        >
          <HeaderView>
            <HeaderViewLeft>
              <HeaderCalendarIcon />
              <HeaderCalendarText>
                {curDay}
              </HeaderCalendarText>
            </HeaderViewLeft>
            <HeaderViewMiddle>
              <YearAndMonth>{`${curYear}年${curMonth}月`}</YearAndMonth>
              <WeekDay> {getDayOfWeek(curYear, curMonth, curDay, '星期')} </WeekDay>
            </HeaderViewMiddle>
            <HeaderViewRight>
              <NoticeView yes onPress={this.showMessage} />
            </HeaderViewRight>
          </HeaderView>
        </LinearGradient>
        <Calendar
          navigate={navigate}
          selectCreateType={this.selectCreateType}
          onSelectedDayChange={this.onSelectedDayChange}
        />
        <List
          data={this.generateData()}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderItem}
          ItemSeparatorComponent={this.renderItemSeparatorComponent}
        />
      </ContainerView>
    );
  }
}

Home.navigationOptions = () => ({
  title: '首页',
  headerLeft: (
    <LeftBackIcon />
  ),
});

Home.defaultProps = {};

Home.propTypes = {
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

export default Home;
