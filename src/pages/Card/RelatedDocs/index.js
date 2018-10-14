/**
 * @component index.js
 * @description 相关文档页面
 * @time 2018/8/12
 * @author JUSTIN XU
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react/native';
import { ListItem, Left, Thumbnail, Body, Text, Right, Icon } from 'native-base';

import { LeftBackIcon, CommStatusBar } from '../../../components/Layout';
import { ContainerView } from '../../../components/Styles/Layout';
import FlatListTable from '../../../components/FlatListTable';

import RelatedDocsModel from '../../../logicStores/relatedDocs';

@observer
class RelatedDocs extends Component {
  componentDidMount() {
    this.getData();
  }

  componentWillUnmount() {
    RelatedDocsModel.clearAttachmentList();
  }

  onEndReached = () => {
    const {
      relatedDocsList: { total = 0, list = [], pageNumber = 1, loadingMore },
    } = RelatedDocsModel;
    if (list.length < total && loadingMore === false) {
      this.getDynamicList(pageNumber + 1);
    }
  };

  getData = (pageNumber = 1) => {
    const { item, moduleType } = this.props.navigation.state.params || {};
    RelatedDocsModel.getAttachmentList({
      pageNumber,
      businessType: moduleType,
      businessId: item.id,
    });
  };

  renderItem = ({ item }) => {
    const {
      docIcon,
      docName,
      company,
      time,
    } = item;
    return (
      <ListItem thumbnail noBorder style={{ backgroundColor: 'white' }}>
        <Left>
          <Thumbnail square source={docIcon} />
        </Left>
        <Body>
          <Text>{docName}</Text>
          <Text note numberOfLines={1}> {company} </Text>
          <Text note numberOfLines={1}> {time} </Text>
        </Body>
        <Right>
          <Icon name="arrow-forward" />
        </Right>
      </ListItem>
    );
  }

  render() {
    const {
      relatedDocsList: {
        list = [],
        loadingMore,
        refreshing,
      },
    } = RelatedDocsModel;
    const flatProps = {
      data: list,
      renderItem: this.renderItem,
      onRefresh: this.getData,
      onEndReached: this.onEndReached,
      refreshing,
      noDataBool: !refreshing && list.length === 0,
      loadingMore,
    };
    return (
      <ContainerView>
        <CommStatusBar />
        <FlatListTable {...flatProps} />
      </ContainerView>
    );
  }
}

RelatedDocs.navigationOptions = ({ navigation }) => ({
  title: '相关文档',
  headerLeft: (
    <LeftBackIcon
      onPress={() => navigation.goBack()}
    />
  ),
});

RelatedDocs.propTypes = {
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

export default RelatedDocs;
