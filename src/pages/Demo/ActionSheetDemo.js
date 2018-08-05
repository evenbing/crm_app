/**
 * @component ActionSheetDemo.js
 * @description actionSheetDemo
 * @time 2018/8/5
 * @author JUSTIN XU
 */
import React from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';
import Toast from '../../utils/toast';
import { theme } from '../../constants/index';

// components
import CommStatusBar from '../../components/Layout/CommStatusBar';
import LeftBackIcon from '../../components/Layout/LeftBackIcon';
import ActionSheet from '../../components/Modal/ActionSheet';
// import TouchableView from '../../components/TouchableView';

const ContainerView = styled.View``;

const ButtonText = styled.Button``;

const RightImage = styled.Text`
  width: 12px;
  height: 12px;
  border: 1px solid ${theme.dangerColor};
`;

class ActionSheetDemo extends React.Component {
  state = {
    taskVisible: false,
    amountVisible: false,
    activityVisible: false,
    activityIndex: 0,
  };
  onToggleTaskVisible = () => {
    this.setState({
      taskVisible: !this.state.taskVisible,
    });
  };
  onToggleAmountVisible = () => {
    this.setState({
      amountVisible: !this.state.amountVisible,
    });
  };
  onToggleActivityVisible = () => {
    this.setState({
      activityVisible: !this.state.activityVisible,
    });
  };
  render() {
    const {
      state: {
        taskVisible,
        amountVisible,
        activityVisible,
        activityIndex,
      },
    } = this;
    const taskActionSheetProps = {
      isVisible: taskVisible,
      onPressClose: this.onToggleTaskVisible,
      onPressItem: ({ index, item }) => Toast.showSuccess(`${index}: ${JSON.stringify(item)}`),
      list: [
        { leftText: '新建日程' },
        { leftText: '新建任务' },
      ],
    };
    const amountActionSheetProps = {
      isVisible: amountVisible,
      onPressClose: this.onToggleAmountVisible,
      itemNeedPress: false,
      list: [
        { leftText: '总金额', rightText: '¥100,000,00', rightStyle: { color: theme.dangerColor } },
        { leftText: '计划回款金额', rightText: '¥90,000,00' },
        { leftText: '实际回款金额', rightText: '¥70,000,00' },
        { leftText: '未回款金额', rightText: '¥100,000,00' },
        { leftText: '逾期未回款金额', rightText: '¥100,000,00' },
      ],
    };
    function getRightElem(index) {
      if (activityIndex !== index) return null;
      return <RightImage />;
    }
    const activityActionSheetProps = {
      isVisible: activityVisible,
      onPressClose: this.onToggleActivityVisible,
      onPressItem: ({ index }) => {
        this.setState({ activityIndex: index });
        Toast.showSuccess(index);
      },
      list: [
        { leftText: '计划中', rightText: getRightElem(0) },
        { leftText: '执行中', rightText: getRightElem(1) },
        { leftText: '意外终止', rightText: getRightElem(2) },
      ],
    };
    return (
      <ContainerView>
        <CommStatusBar />
        <ActionSheet {...taskActionSheetProps} />
        <ActionSheet {...amountActionSheetProps} />
        <ActionSheet {...activityActionSheetProps} />
        <ButtonText
          onPress={this.onToggleTaskVisible}
          title="日程"
        />
        <ButtonText
          onPress={this.onToggleAmountVisible}
          title="回款计划"
        />
        <ButtonText
          onPress={this.onToggleActivityVisible}
          title="活动状态"
        />
      </ContainerView>
    );
  }
}

ActionSheetDemo.navigationOptions = ({ navigation, screenProps }) => ({
  title: 'ActionSheetDemo',
  headerLeft: (
    <LeftBackIcon
      onPress={navigation.state.params ? navigation.state.params._close : null}
    />
  ),
});

ActionSheetDemo.defaultProps = {};

ActionSheetDemo.propTypes = {};

export default ActionSheetDemo;
