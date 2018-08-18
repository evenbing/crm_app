import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { LeftBackIcon } from '../../../components/Layout';

class AddTask extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View>
        <Text> textInComponent </Text>
      </View>
    );
  }
}

AddTask.navigationOptions = () => ({
  title: '新增日程',
  headerLeft: (
    <LeftBackIcon />
  ),
});


export default AddTask;
