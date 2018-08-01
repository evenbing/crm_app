import React from 'react';
import { Text } from 'react-native';
// import PropTypes from 'prop-types';
import styled from 'styled-components';

// components
import CommStatusBar from '../../components/Layout/CommStatusBar';
import LeftBackIcon from '../../components/Layout/LeftBackIcon';

const ContainerView = styled.View``;

class Home extends React.Component {
  render() {
    return (
      <ContainerView>
        <CommStatusBar />
        <Text>Home</Text>
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

Home.propTypes = {};

export default Home;
