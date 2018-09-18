import React from 'react';
import PropTypes from 'prop-types';
import { Container, List, ListItem, Left, Right, Icon, Text } from 'native-base';

const TypePicker = ({
  data,
  onSelectItem,
}) => (
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

TypePicker.propTypes = {
  data: PropTypes.instanceOf(Object).isRequired,
  onSelectItem: PropTypes.func.isRequired,
};

export default TypePicker;
