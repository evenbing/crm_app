import React from 'react';
import PropTypes from 'prop-types';
import { Container, List, ListItem, Left, Right, Icon, Text } from 'native-base';

const TypePicker = (props) => {
  const {
    navigation: {
      state: {
        params: {
          selectedKey,
          typeEnum,
          callback,
        },
      },
      goBack,
    },
  } = props;
  return (
    <Container>
      <List>
        {
          Object.keys(typeEnum).map(key => (
            <ListItem
              key={key}
              selected={key === selectedKey}
              onPress={() => {
                goBack();
                callback(key, typeEnum[key]);
              }}
            >
              <Left>
                <Text>{typeEnum[key]}</Text>
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
};

export default TypePicker;
