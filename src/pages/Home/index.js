/**
 * @component MobxDemo.js
 * @description 首页
 * @time 2018/8/5
 * @author JUSTIN XU
 */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Toast from '../../utils/toast';
import { routers } from '../../constants';

// components
import { CommStatusBar, LeftBackIcon } from '../../components/Layout';
import { ActionSheet } from '../../components/Modal';
// import TouchableView from '../../components/TouchableView';

const ContainerView = styled.View``;

const ButtonText = styled.Button``;

class Home extends React.Component {
  state = {
    isVisible: false,
  };
  onToggleTaskVisible = () => {
    this.setState({
      isVisible: !this.state.isVisible,
    });
  };
  render() {
    const {
      state: {
        isVisible,
      },
      props: {
        navigation: { navigate },
      },
    } = this;
    const taskActionSheetProps = {
      isVisible,
      onPressClose: this.onToggleTaskVisible,
      onPressItem: ({ index, item }) => Toast.showSuccess(`${index}: ${JSON.stringify(item)}`),
      list: [
        { leftText: '新建日程' },
        { leftText: '新建任务' },
      ],
    };
    return (
      <ContainerView>
        <CommStatusBar />
        <ActionSheet {...taskActionSheetProps} />
        <ButtonText
          onPress={this.onToggleTaskVisible}
          title="日程"
        />
        <ButtonText
          onPress={() => navigate(routers.actionSheetDemo)}
          title="ActionSheetDemo"
        />
        <ButtonText
          onPress={() => navigate(routers.mobxDemo)}
          title="MobxDemo"
        />
      </ContainerView>
    );
  }
}

Home.navigationOptions = ({ navigation, screenProps }) => ({
  title: '首页',
  headerLeft: (
    <LeftBackIcon
      onPress={navigation.state.params ? navigation.state.params._close : null}
    />
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
