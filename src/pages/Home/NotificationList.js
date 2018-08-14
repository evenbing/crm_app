import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { LeftBackIcon } from '../../components/Layout';

class NotificationList extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View>
        <Text> NotificationList </Text>
      </View>
    );
  }
}

NotificationList.navigationOptions = ({ navigation }) => ({
  title: '通知',
  headerLeft: (
    <LeftBackIcon
      onPress={navigation.state.params ? navigation.state.params._close : null}
    />
  ),
});

export default NotificationList;
