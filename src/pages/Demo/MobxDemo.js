/**
 * @component MobxDemo.js
 * @description MobxDemo
 * @time 2018/8/5
 * @author JUSTIN XU
 */
import React from 'react';
import { Text, Button } from 'react-native';
// import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useStrict } from 'mobx';
import { observer } from 'mobx-react/native';
import DemoModel from '../../logicStores/demo';

// components
import CommStatusBar from '../../components/Layout/CommStatusBar';
import LeftBackIcon from '../../components/Layout/LeftBackIcon';
import { Drawer } from '../../components/Drawer';

const ContainerView = styled.View``;
const TouchView = styled.TouchableOpacity`
  background-color: red;
  height: 40px;
  width: 100%;
`;
const TextView = styled.Text``;

useStrict(true);

@observer
class MobxDemo extends React.Component {
  state = {
    isVisible: false,
  };
  onOpenDrawer = () => {
    this.setState({ isVisible: true });
  };
  onCloseDrawer = () => {
    this.setState({ isVisible: false });
  };
  render() {
    const {
      state: {
        isVisible,
      },
    } = this;
    const drawerProps = {
      isVisible,
      onPressClose: this.onCloseDrawer,
      content: (
        <TouchView onPress={this.onCloseDrawer}>
          <TextView>Click Demo</TextView>
        </TouchView>
      ),
    };
    return (
      <ContainerView>
        <CommStatusBar />
        <Text>Counter: {DemoModel.counter}</Text>
        <Text>Total clicks: {DemoModel.total}</Text>
        <Button onPress={DemoModel.increase} title="+" />
        <Button onPress={DemoModel.decrease} title="-" />
        <Button onPress={this.onOpenDrawer} title="open Drawer" />
        <Drawer {...drawerProps} />
      </ContainerView>
    );
  }
}

MobxDemo.navigationOptions = ({ navigation, screenProps }) => ({
  title: 'MobxDemo',
  headerLeft: (
    <LeftBackIcon
      onPress={() => navigation.goBack()}
    />
  ),
});

MobxDemo.defaultProps = {};

MobxDemo.propTypes = {};

export default MobxDemo;
