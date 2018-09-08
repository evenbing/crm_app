import React, { Component } from 'react';
import { Text } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Bar as ReceivableProgress } from 'react-native-progress';
import styled from 'styled-components';

import { ContainerView } from '../../../components/Styles/Layout';
import { CommStatusBar, LeftBackIcon } from '../../../components/Layout';
import { moderateScale, width } from '../../../utils/scale';
import { theme } from '../../../constants';
import ReceivableTitle from './components/ReceivableTitle';

const SectionList = styled.SectionList`

`;

class Receivable extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <ContainerView>
        <CommStatusBar />
        <ReceivableTitle />
        <SectionList
          renderItem={({ item }) => <Text> {item} </Text>}
          renderSectionHeader={({ section }) => <Text>{section.title} </Text>}
          keyExtractor={item => item.title}
          sections={[ // homogenous rendering between sections
            { data: ['data...'], title: 'title...1' },
            { data: ['data...'], title: 'title...2' },
            { data: ['data...'], title: 'title...3' },
          ]}
        />

      </ContainerView>
    );
  }
}

Receivable.navigationOptions = ({ navigation }) => ({
  title: '回款',
  headerLeft: (
    <LeftBackIcon
      onPress={() => navigation.goBack()}
    />
  ),
});

export default Receivable;
