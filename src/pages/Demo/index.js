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
class Demo extends React.Component {
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

Demo.navigationOptions = ({ navigation, screenProps }) => ({
  title: 'Demo',
  headerLeft: (
    <LeftBackIcon
      onPress={navigation.state.params ? navigation.state.params._close : null}
    />
  ),
});

Demo.defaultProps = {};

Demo.propTypes = {};

export default Demo;
