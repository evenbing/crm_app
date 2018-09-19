import React from 'react';
import PropTypes from 'prop-types';
import { Container, List, ListItem, Left, Right, Icon, Text } from 'native-base';

const TypePicker = (props) => {
  const {
    state: {
      data,
      onSelectItem,
    },
  } = props.navigation.state.params;
  return (
    <Container>
      <List>
        {
          Object.keys(data).map(key => (
            <ListItem onPress={() => onSelectItem(key, data[key])}>
              <Left>
                <Text>{data[key]}</Text>
              </Left>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
            </ListItem>
          ))
        }
      </List>
    </Container>
  );
};

TypePicker.propTypes = {
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
  data: PropTypes.instanceOf(Object).isRequired,
  onSelectItem: PropTypes.func.isRequired,
};

export default TypePicker;
