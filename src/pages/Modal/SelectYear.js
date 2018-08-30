import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components';
import uuidv1 from 'uuid/v1';
import { Content, List, ListItem, Left, Right, Icon, Text } from 'native-base';
import { CommStatusBar, LeftBackIcon } from '../../components/Layout';
import { theme } from '../../constants';

const ContainerView = styled.View`
  flex: 1;
  background-color: ${theme.whiteColor};
`;

class SelectYear extends Component {
  constructor(props) {
    super(props);
    this.state = {
      years: this.generateYears(),
    };
  }

  onPress = year => () => {
    const { navigation } = this.props;
    const { onSelectYear } = navigation.state.params;
    onSelectYear(year.value);

    navigation.goBack();
  }

  generateYears = () => {
    const ys = [];
    const { selectedYear } = this.props.navigation.state.params;
    for (let index = 2000; index <= 2099; index++) {
      ys.push({
        key: uuidv1(),
        value: index,
        selected: selectedYear === index,
      });
    }
    return ys;
  }

  render() {
    return (
      <ContainerView>
        <CommStatusBar />
        <Content>
          <List>
            {
              this.state.years.map(item => (
                <ListItem
                  key={item.key}
                  selected={item.selected}
                  onPress={this.onPress(item)}
                >
                  <Left>
                    <Text> {item.value} </Text>
                  </Left>
                  <Right>
                    <Icon name="arrow-forward" />
                  </Right>
                </ListItem>
              ))
            }
          </List>
        </Content>
      </ContainerView>
    );
  }
}

SelectYear.navigationOptions = () => ({
  title: '选择年份',
  headerLeft: (
    <LeftBackIcon />
  ),
});

export default SelectYear;
