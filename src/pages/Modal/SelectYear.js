import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import uuidv1 from 'uuid/v1';
import { ListItem, Left, Right, Text } from 'native-base';
import { CommStatusBar, LeftBackIcon } from '../../components/Layout';
import { theme } from '../../constants';
import Thumbnail from '../../components/Thumbnail';
import RightIcon from '../../img/ico_right_arrow.png';

const ContainerView = styled.View`
  flex: 1;
  background-color: ${theme.whiteColor};
`;

const FlatList = styled.FlatList``;

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

  onScrollToIndex = () => {
    const randomIndex = Math.floor(Math.random() * this.state.years.length);
    this.flatListRef.scrollToIndex({
      animated: true,
      index: randomIndex,
      viewPosition: 0.3,
    });
  }

  getItemLayout = index => ({
    length: 50.5,
    offset: 50.5 * index,
    index,
  })

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

  generateKeyExtractor = item => item.key;

  renderItem = ({ item }) => {
    const {
      value,
      selected,
    } = item;

    return (
      <ListItem
        selected={selected}
        onPress={this.onPress(item)}
      >
        <Left>
          <Text> {value} </Text>
        </Left>
        <Right>
          <Thumbnail source={RightIcon} size={12} />
        </Right>
      </ListItem>
    );
  }

  render() {
    return (
      <ContainerView>
        <CommStatusBar />
        {/* <TouchableOpacity
          style={{
            padding: 10,
            borderColor: 'red',
            borderWidth: 2,
            alignItems: 'center',
          }}
          onPress={this.onScrollToIndex}
        >
          <Text>123</Text>
        </TouchableOpacity> */}
        <FlatList
          ref={(ref) => { this.flatListRef = ref; }}
          data={this.state.years}
          getItemLayout={(data, index) => {
            return { length: 50.5, index, offset: 50.5 * index };
          }}
          keyExtractor={this.generateKeyExtractor}
          renderItem={this.renderItem}
          // ItemSeparatorComponent={this.renderItemSeparatorComponent}
        />
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

SelectYear.defaultProps = {};

SelectYear.propTypes = {
  navigation: PropTypes.shape({
    dispatch: PropTypes.func,
    goBack: PropTypes.func,
    navigate: PropTypes.func,
    setParams: PropTypes.func,
    state: PropTypes.shape({
      key: PropTypes.string,
      routeName: PropTypes.string,
      params: PropTypes.object,
    }),
  }).isRequired,
};

export default SelectYear;
