/**
 * @component MobxDemo.js
 * @description 首页
 * @time 2018/8/5
 * @author JUSTIN XU
 */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import LinearGradient from 'react-native-linear-gradient';
import uuidv1 from 'uuid/v1';
import Toast from '../../utils/toast';
import ListItem from './components/ListItem';
import NoticeView from './components/NotiveView';

// components
import { CommStatusBar, LeftBackIcon } from '../../components/Layout';
import { ActionSheet } from '../../components/Modal';
import { moderateScale } from '../../utils/scale';
import CalendarIcon from '../../img/home/ico_header_calendar.png';
import AddButtonImage from '../../img/home/add.png';
import { routers } from '../../constants';
// import TouchableView from '../../components/TouchableView';

const data = [
  {
    key: '1',
    duration: '20:00-22:00',
    type: '日程',
    title: '拜访李总',
    time: '2小时',
    operateList: [
      { key: uuidv1(), text: '下一步', onPress: () => Toast.showSuccess('下一步') },
      { key: uuidv1(), text: '延时', onPress: () => Toast.showSuccess('延时') },
      { key: uuidv1(), text: '删除', onPress: () => Toast.showSuccess('删除') },
    ],
  },
  {
    key: '2',
    duration: '20:00-22:00',
    type: '任务',
    title: '讲解产品信息',
    time: '2小时',
    operateList: [
      { key: uuidv1(), text: '下一步', onPress: () => Toast.showSuccess('下一步') },
      { key: uuidv1(), text: '延时', onPress: () => Toast.showSuccess('延时') },
      { key: uuidv1(), text: '删除', onPress: () => Toast.showSuccess('删除') },
    ],
  },
  {
    key: '3',
    duration: '20:00-22:00',
    type: '日程',
    title: '拜访李总',
    time: '2小时',
    operateList: [
      { key: uuidv1(), text: '下一步', onPress: () => Toast.showSuccess('下一步') },
      { key: uuidv1(), text: '延时', onPress: () => Toast.showSuccess('延时') },
      { key: uuidv1(), text: '删除', onPress: () => Toast.showSuccess('删除') },
    ],
  },
  {
    key: '4',
    duration: '20:00-22:00',
    type: '日程',
    title: '拜访李总',
    time: '2小时',
    operateList: [
      { key: uuidv1(), text: '下一步', onPress: () => Toast.showSuccess('下一步') },
      { key: uuidv1(), text: '延时', onPress: () => Toast.showSuccess('延时') },
      { key: uuidv1(), text: '删除', onPress: () => Toast.showSuccess('删除') },
    ],
  },
  {
    key: '5',
    duration: '20:00-22:00',
    type: '日程',
    title: '拜访李总',
    time: '2小时',
    operateList: [
      { key: uuidv1(), text: '下一步', onPress: () => Toast.showSuccess('下一步') },
      { key: uuidv1(), text: '延时', onPress: () => Toast.showSuccess('延时') },
      { key: uuidv1(), text: '删除', onPress: () => Toast.showSuccess('删除') },
    ],
  },
];

const ContainerView = styled.View``;

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

const CalendarView = styled.View`
  margin: -${moderateScale(30)}px ${moderateScale(15)}px 0px ${moderateScale(15)}px;
  background-color: blue;
  height: ${moderateScale(126)};
  border-radius: ${moderateScale(4)};
`;

const AddButton = styled.TouchableOpacity``;

const AddButtonIcon = styled.Image.attrs({
  source: AddButtonImage,
})`
  width: ${moderateScale(30)};
  height: ${moderateScale(30)};
  position: absolute;
  right: ${moderateScale(10)};
  top: ${moderateScale(10)};
`;

const List = styled.FlatList`
  background-color: white;
  padding: ${moderateScale(10)}px ${moderateScale(15)}px 0px ${moderateScale(15)}px;
`;

class Home extends React.Component {
  state = {
    isVisible: false,
  };

  onToggleTaskVisible = () => {
    this.setState({
      isVisible: !this.state.isVisible,
    });
  };

  showMessage = () => {
    const {
      navigation: { navigate },
    } = this.props;

    navigate(routers.messageList);
  }

  keyExtractor = item => item.key;

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

  render() {
    const {
      state: {
        isVisible,
      },
      props: {
        navigation: {
          navigate,
        },
      },
    } = this;
    const taskActionSheetProps = {
      isVisible,
      onPressClose: this.onToggleTaskVisible,
      onPressItem: ({ item }) => {
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
      },
      list: [
        { leftText: '新建日程' },
        { leftText: '新建任务' },
      ],
    };
    return (
      <ContainerView>
        <CommStatusBar />
        <ActionSheet {...taskActionSheetProps} />
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1.0, y: 1.0 }}
          colors={['#169C58', '#8EC963']}
        >
          <HeaderView>
            <HeaderViewLeft>
              <HeaderCalendarIcon />
              <HeaderCalendarText>
                25
              </HeaderCalendarText>
            </HeaderViewLeft>
            <HeaderViewMiddle>
              <YearAndMonth>2012年5月</YearAndMonth>
              <WeekDay>星期四</WeekDay>
            </HeaderViewMiddle>
            <HeaderViewRight>
              <NoticeView yes onPress={this.showMessage} />
            </HeaderViewRight>
          </HeaderView>
        </LinearGradient>
        <CalendarView>
          <AddButton onPress={this.onToggleTaskVisible}>
            <AddButtonIcon />
          </AddButton>
        </CalendarView>
        <List
          data={data}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderItem}
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
