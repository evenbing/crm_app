import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react/native';
import { List, ListItem, Left, Right, Text } from 'native-base';

import { ContainerView } from '../../components/Drawer/Styles';
import { CommStatusBar } from '../../components/Layout';
import Thumbnail from '../../components/Thumbnail';
import SalesChanceStore from '../../logicStores/salesChance';

@observer
class SalesPhasePicker extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  componentDidMount() {
    SalesChanceStore.findSalesPhaseReq({
      isActive: true,
    });
  }

  render() {
    return null;
    // const { callback } = this.props.navigation.state.params;
    // return (
    //   <ContainerView bottomPadding >
    //     <CommStatusBar />
    //     <List>
    //       {
    //         Object.keys(typeEnum).map(key => (
    //           <ListItem
    //             key={key}
    //             onPress={() => {
    //               goBack();
    //               callback(key, typeEnum[key]);
    //             }}
    //           >
    //             <Left>
    //               <Text>{typeEnum[key]}</Text>
    //             </Left>
    //             <Right>
    //               {
    //                 key === selectedKey &&
    //                 <Thumbnail
    //                   source={require('../../img/modal/ok.png')}
    //                   size={16}
    //                 />
    //               }
    //             </Right>
    //           </ListItem>
    //         ))
    //       }
    //     </List>
    //   </ContainerView>
    // );
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

export default SalesPhasePicker;
