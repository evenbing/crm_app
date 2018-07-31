import React from 'react';
import { Text } from 'react-native';
// import PropTypes from 'prop-types';
import styled from 'styled-components';

const ContainerView = styled.View`
  padding-top: 60px;
`;

class Demo extends React.Component {
  render() {
    return (
      <ContainerView>
        <Text>Demo</Text>
      </ContainerView>
    );
  }
}

Demo.defaultProps = {};

Demo.propTypes = {};

export default Demo;
