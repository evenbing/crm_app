import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { ListItem, Left, Text, Right } from 'native-base';
import { useStrict } from 'mobx';
import { observer } from 'mobx-react/native';
import { Thumbnail, LeftBackIcon, CommStatusBar } from 'xn-react-native-applets';

// static source
import okIcon from 'img/modal/ok.png';

// constants
import { ModuleTypes } from 'constants/enum';

// logicStores
import CustomerStore from 'logicStores/customer';
import ContactStore from 'logicStores/contacts';
import MarkActivityStore from 'logicStores/markActivity';
import SalesClueStore from 'logicStores/salesClues';
import SalesChanceStore from 'logicStores/salesChance';

// components
import { ContainerView } from 'components/Styles/Layout';
import FlatListTable from 'components/FlatListTable';

useStrict(true);

@observer
class ModuleList extends Component {
  constructor(props) {
    super(props);
    const { moduleType } = this.props.navigation.state.params;
    this.moduleType = moduleType;
  }

  componentDidMount() {
    this.getData();
    this.props.navigation.setParams({
      title: ModuleTypes[this.moduleType],
    });
  }

  onEndReached = () => {
    const { total, list, pageNumber, loadingMore } = MarkActivityStore.markActivityList;
    if (list.length < total && loadingMore === false) {
      this.getData(pageNumber + 1);
    }
  };

  getData = (pageNumber = 1) => {
    switch (this.moduleType) {
      case 'CUSTOMER':
        CustomerStore.getCustomerListReq({ pageNumber });
        break;
      case 'CONTACT':
        ContactStore.getContactListReq({ pageNumber });
        break;
      case 'ACTIVITY':
        MarkActivityStore.getMarkActivityListReq({ pageNumber });
        break;
      case 'LEADS':
        SalesClueStore.getSalesClueListReq({ pageNumber });
        break;
      case 'OPPORTUNITY':
        SalesChanceStore.getSalesChanceListReq({ pageNumber });
        break;
      default:
        break;
    }
  };

  keyExtractor = item => item.id;

  renderItem = ({ item }) => {
    const { id, name } = item;
    const {
      navigation: {
        pop,
        state: {
          params: {
            moduleType,
            moduleTypeName,
            selectedModuleId,
            callback,
          },
        },
      },
    } = this.props;
    return (
      <ListItem
        key={id}
        onPress={() => {
          callback({ id, name, moduleType, moduleTypeName });
          pop(2);
        }}
      >
        <Left>
          <Text>{name}</Text>
        </Left>
        <Right>
          {
            id === selectedModuleId &&
            <Thumbnail
              source={okIcon}
              size={16}
            />
          }
        </Right>
      </ListItem>
    );
  }

  render() {
    let obj = null;
    console.log(this.moduleType);

    switch (this.moduleType) {
      case 'CUSTOMER':
        obj = CustomerStore.customerList;
        break;
      case 'CONTACT':
        obj = ContactStore.contactList;
        break;
      case 'ACTIVITY':
        obj = MarkActivityStore.markActivityList;
        break;
      case 'LEADS':
        obj = SalesClueStore.salesClueList;
        break;
      case 'OPPORTUNITY':
        obj = SalesChanceStore.salesChanceList;
        break;
      default:
        break;
    }

    const { list, refreshing, loadingMore } = obj;

    const data = list.map((item) => {
      const {
        id,
        name,
      } = item;
      return ({
        id,
        name,
      });
    });
    const flatProps = {
      data,
      renderItem: this.renderItem,
      keyExtractor: this.keyExtractor,
      onRefresh: this.getData,
      onEndReached: this.onEndReached,
      refreshing,
      noDataBool: !refreshing && list.length === 0,
      loadingMore,
    };
    return (
      <ContainerView bottomPadding>
        <CommStatusBar />
        <FlatListTable {...flatProps} />
      </ContainerView>
    );
  }
}

ModuleList.navigationOptions = ({ navigation }) => {
  const { title } = navigation.state.params;
  return ({
    title,
    headerLeft: (
      <LeftBackIcon />
    ),
  });
};

ModuleList.propTypes = {
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

export default ModuleList;
