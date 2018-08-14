import React, { Component } from 'react';
import { View, Text } from 'react-native';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import { CommStatusBar, LeftBackIcon } from '../../components/Layout';


const Container = styled.View`
  flex: 1;
  background-color: white;
`;

const List = styled.FlatList`

`;

class NotificationList extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <Container>
        <CommStatusBar />
        <List
          data={data}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderItem}
        />
      </Container>
    );
  }
}

NotificationList.navigationOptions = ({ navigation }) => ({
  title: '消息提醒',
  headerLeft: (
    <LeftBackIcon
      onPress={navigation.state.params ? navigation.state.params._close : null}
    />
  ),
});

export default NotificationList;
