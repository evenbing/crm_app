import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react/native';
import { List, ListItem, Left, Right, Text } from 'native-base';
import { CommStatusBar, LeftBackIcon, Thumbnail } from 'xn-react-native-applets';

// components
import { ContainerView } from 'components/Drawer/Styles';

// logicStores
import SalesChanceStore from 'logicStores/salesChance';

@observer
class SalesPhasePicker extends Component {
  componentDidMount() {
    SalesChanceStore.findSalesPhaseReq();
  }

  render() {
    const {
      goBack,
      state: { params: {
        callback,
        selectedKey = null,
      } },
    } = this.props.navigation;

    return (
      <ContainerView bottomPadding >
        <CommStatusBar />
        <List>
          {
            SalesChanceStore.salesPhaseList.list.map(({ id, name }) => (
              <ListItem
                key={id}
                onPress={() => {
                  goBack();
                  callback && callback(id, name);
                }}
              >
                <Left>
                  <Text>{name}</Text>
                </Left>
                <Right>
                  {
                    id === selectedKey &&
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
      </ContainerView>
    );
  }
}

SalesPhasePicker.propTypes = {
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

SalesPhasePicker.navigationOptions = ({ navigation }) => {
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

export default SalesPhasePicker;
