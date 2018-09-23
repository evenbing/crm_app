import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { Header, Left, Button, Body, Right, Title } from 'native-base';

import closeicon from '../../../img/close.png';
import deleteicon from '../../../img/delete.png';
import { theme } from '../../../constants';

const CloseImage = styled.Image.attrs({
  source: closeicon,
})`
  width: 20;
  height: 20;
`;

const DeleteImage = styled.Image.attrs({
  source: deleteicon,
})`
  width: 20;
  height: 20;
`;

const HeaderComponent = ({
  onLeftPress,
  onRightPress,
}) => (
  <Header
    androidStatusBarColor={theme.headerBackgroundColor}
    style={{ backgroundColor: theme.headerBackgroundColor }}
  >
    <Left>
      <Button transparent onPress={onLeftPress} >
        <CloseImage />
      </Button>
    </Left>
    <Body>
      <Title />
    </Body>
    <Right>
      <Button transparent onPress={onRightPress} >
        <DeleteImage />
      </Button>
    </Right>
  </Header>
);

HeaderComponent.propTypes = {
  onLeftPress: PropTypes.func.isRequired,
  onRightPress: PropTypes.func.isRequired,
};

export default HeaderComponent;
