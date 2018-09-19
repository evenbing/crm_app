/**
 * @component index.js
 * @description 选择部门容器
 * @time 2018/9/13
 * @author JUSTIN XU
 */
import React from 'react';
import PropTypes from 'prop-types';
import { useStrict } from 'mobx/';
import { observer } from 'mobx-react/native';
import { ListItem, Left, Text, Right, Icon } from 'native-base';
import { theme } from '../../../constants';

// components
import { CommStatusBar, LeftBackIcon } from '../../../components/Layout';
import { ContainerView } from '../../../components/Styles/Layout';
import { HorizontalDivider } from '../../../components/Styles/Divider';
// import TouchableView from '../../../components/TouchableView';
import FlatListTable from '../../../components/FlatListTable';
// import Thumbnail from '../../../components/Thumbnail';

import OrganizationModel from '../../../logicStores/organization';

// const ListItemView = styled(TouchableView)`
//   padding: ${theme.moderateScale(11)}px 0;
//   flex-direction: row;
//   justify-content: space-between;
//   border-bottom-width: 1px;
//   border-bottom-color: ${theme.borderColor};
// `;

// const TextView = styled.Text`
//   font-size: ${theme.moderateScale(16)};
//   color: ${theme.textColor};
// `;

useStrict(true);

@observer
class SelectionDepartment extends React.Component {
  state = {
    id: null,
  };
  componentDidMount() {
    this.getData();
    this.initState();
  }
  onPressItem = ({ item }) => {
    const {
      props: {
        navigation: { state, goBack },
      },
    } = this;
    state.params.callback(item);
    goBack();
  };
  onEndReached = () => {
    const { total, list, pageNumber, loadingMore } = OrganizationModel.organizationList;
    if (list.length < total && loadingMore === false) {
      this.getData(pageNumber + 1);
    }
  };
  getData = (pageNumber = 1) => {
    OrganizationModel.getOrganizationListReq({ pageNumber });
  };
  initState = () => {
    const {
      props: {
        navigation: { state },
      },
    } = this;
    const { id } = state.params || {};
    if (!id) return;
    this.setState({ id });
  };
  renderItem = (itemProps) => {
    const { id } = this.state;
    const { item, index } = itemProps;
    return (
      <ListItem
        selected={id === item.id}
        onPress={() => this.onPressItem({ item, index })}
      >
        <Left>
          <Text>{item.name}</Text>
        </Left>
        <Right>
          <Icon name="arrow-forward" />
        </Right>
      </ListItem>
      // <ListItemView
      //   key={item.id}
      //   onPress={() => this.onPressItem({ item, index })}
      // >
      //   <TextView>{item.name}</TextView>
      //   {
      //     id === item.id ? (
      //       <Thumbnail
      //         source={require('../../../img/modal/ok.png')}
      //         size={16}
      //       />
      //     ) : null
      //   }
      // </ListItemView>
    );
  };
  render() {
    const {
      organizationList: { list, refreshing, loadingMore },
    } = OrganizationModel;
    const flatProps = {
      data: list,
      renderItem: this.renderItem,
      onRefresh: this.getData,
      onEndReached: this.onEndReached,
      refreshing,
      noDataBool: !refreshing && list.length === 0,
      loadingMore,
      flatListStyle: {
        backgroundColor: theme.whiteColor,
        // paddingLeft: theme.moderateScale(14),
        // paddingRight: theme.moderateScale(14),
      },
    };
    return (
      <ContainerView
        bottomPadding
      >
        <CommStatusBar />
        <HorizontalDivider height={9} />
        <FlatListTable {...flatProps} />
      </ContainerView>
    );
  }
}

SelectionDepartment.navigationOptions = ({ navigation }) => ({
  title: '选择部门',
  headerLeft: (
    <LeftBackIcon
      onPress={() => navigation.goBack()}
    />
  ),
});

SelectionDepartment.defaultProps = {};

SelectionDepartment.propTypes = {
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

export default SelectionDepartment;
