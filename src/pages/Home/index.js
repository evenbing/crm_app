import React from 'react';
import { Text } from 'react-native';
// import PropTypes from 'prop-types';
import styled from 'styled-components';

const ContainerView = styled.View`
  padding-top: 60px;
`;

class Home extends React.Component {
  render() {
    return (
      <ContainerView>
        <Text>Home</Text>
      </ContainerView>
    );
  }
}

Home.defaultProps = {};

Home.propTypes = {};

export default Home;
