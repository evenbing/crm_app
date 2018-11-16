import React from 'react';
import PropTypes from 'prop-types';
import { List, ListItem, Left, Right, Text } from 'native-base';
import { CommStatusBar, LeftBackIcon } from '../../components/Layout';
import Thumbnail from '../../components/Thumbnail';
import { ContainerScrollView } from '../../components/Styles/Layout';

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
    <ContainerScrollView bottomPadding >
      <CommStatusBar />
      <List>
        {
          Object.keys(typeEnum).map(key => (
            <ListItem
              key={key}
              onPress={() => {
                goBack();
                callback(key, typeEnum[key]);
              }}
            >
              <Left>
                <Text>{typeEnum[key]}</Text>
              </Left>
              <Right>
                {
                  key === selectedKey &&
                  <Thumbnail
                    source={require('../../img/modal/ok.png')}
                    size={16}
                  />
                }
              </Right>
            </ListItem>
          ))
        }
      </List>
    </ContainerScrollView>
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

TypePicker.navigationOptions = ({ navigation }) => {
  const { title = '请选择' } = navigation.state.params;
  return ({
    title,
    headerLeft: (
      <LeftBackIcon
        onPress={() => navigation.pop()}
      />
    ),
  });
};

export default TypePicker;
