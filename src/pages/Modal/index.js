import React from 'react';
import PropTypes from 'prop-types';
import { List, ListItem, Left, Right, Text } from 'native-base';
import { CommStatusBar, LeftBackIcon } from '../../../components/Layout';
import Thumbnail from '../../../components/Thumbnail';
import { ContainerView } from '../../../components/Drawer/Styles';
import { ModuleTypes } from '../../../constants/enum';

const ModuleTypePicker = (props) => {
  const {
    navigation: {
      state: {
        params: {
          selectedKey,
          callback,
        },
      },
      goBack,
    },
  } = props;
  return (
    <ContainerView bottomPadding >
      <CommStatusBar />
      <List>
        {
          Object.keys(ModuleTypes).map((key) => {
            const value = ModuleTypes[key];
            return (
              <ListItem
                selected={key === selectedKey}
                key={key}
                onPress={() => {
                  goBack();
                  callback(key, value);
                }}
              >
                <Left>
                  <Text>{value}</Text>
                </Left>
                <Right>
                  <Thumbnail
                    source={require('../../img/ico_right_arrow.png')}
                    size={16}
                  />
                </Right>
              </ListItem>
            );
          })
        }
      </List>
    </ContainerView>
  );
};

ModuleTypePicker.propTypes = {
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

ModuleTypePicker.navigationOptions = ({ navigation }) => {
  const { title = '请选择' } = navigation.state.params || {};
  return ({
    title,
    headerLeft: (
      <LeftBackIcon
        onPress={() => navigation.pop()}
      />
    ),
  });
};

export default ModuleTypePicker;
