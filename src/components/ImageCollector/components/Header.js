import React from 'react';
import { Text, View } from 'react-native';
import { Header, Left, Button, Body, Right, Title } from 'native-base';

const Header = ({
  onLeftPress,
  onRightPress,
}) => (
  <Header>
    <Left>
      <Button transparent>
        <Icon name="arrow-back" />
      </Button>
    </Left>
    <Body>
      <Title>Header</Title>
    </Body>
    <Right>
      <Button transparent>
        <Icon name="menu" />
      </Button>
    </Right>
  </Header>
);

export default Header;
