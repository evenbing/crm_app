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


const ContainerView = styled.View``;

useStrict(true);

@observer
class MobxDemo extends React.Component {
  render() {
    return (
      <ContainerView>
        <CommStatusBar />
        <Text>Counter: {DemoModel.counter}</Text>
        <Text>Total clicks: {DemoModel.total}</Text>
        <Button onPress={DemoModel.increase} title="+" />
        <Button onPress={DemoModel.decrease} title="-" />
      </ContainerView>
    );
  }
}

MobxDemo.navigationOptions = ({ navigation, screenProps }) => ({
  title: 'MobxDemo',
  headerLeft: (
    <LeftBackIcon
      onPress={navigation.state.params ? navigation.state.params._close : null}
    />
  ),
});

MobxDemo.defaultProps = {};

MobxDemo.propTypes = {};

export default MobxDemo;
