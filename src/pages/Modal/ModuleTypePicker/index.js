import React from 'react';
import PropTypes from 'prop-types';
import { List, ListItem, Left, Right, Text } from 'native-base';
import { CommStatusBar, LeftBackIcon, Thumbnail } from 'xn-react-native-applets';

// static source
import rightArrowIcon from 'img/ico_right_arrow.png';

// constants
import { ModuleTypes } from 'constants/enum';
import { routers } from 'constants';

// components
import { ContainerView } from 'components/Drawer/Styles';

const ModuleTypePicker = (props) => {
  const {
    navigation: {
      navigate,
      state: {
        params: {
          selectedModuleType,
          selectedModuleId,
          callback,
        },
      },
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
                selected={key === selectedModuleType}
                key={key}
                onPress={() => {
                  navigate(routers.moduleList, {
                    callback,
                    moduleType: key,
                    moduleTypeName: value,
                    selectedModuleId,
                  });
                }}
              >
                <Left>
                  <Text>{value}</Text>
                </Left>
                <Right>
                  <Thumbnail
                    source={rightArrowIcon}
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
