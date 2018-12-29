/**
 * @component index.js
 * @description 相关文档页面
 * @time 2018/8/12
 * @author JUSTIN XU
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { observer } from 'mobx-react/native';
import { ListItem, Left, Body, Text, Right } from 'native-base';
import { CommStatusBar, LeftBackIcon, Thumbnail } from 'xn-react-native-applets';

// constants
import { theme } from 'constants';

// utils
import { formatDateByMoment, getAppModuleType } from 'utils/base';
import { getIamgeByFileExtension } from 'utils/fileExtension';
import { moderateScale } from 'utils/scale';

// static source
import navIcon from 'img/nav.png';

// logicStores
import RelatedDocsModel from 'logicStores/relatedDocs';

// components
import { ContainerView } from 'components/Styles/Layout';
import FlatListTable from 'components/FlatListTable';

const NavIconView = styled.Image`
  width: ${moderateScale(6)};
  height: ${moderateScale(11)};
`;

const WrapperView = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-bottom-width: 1px;
  border-bottom-color: ${theme.borderColor};
`;

@observer
class RelatedDocs extends Component {
  componentDidMount() {
    this.getData();
  }

  componentWillUnmount() {
    RelatedDocsModel.clearAttachmentList();
  }

  getData = (pageNumber = 1) => {
    const { item, moduleType } = this.props.navigation.state.params || {};
    RelatedDocsModel.getAttachmentList({
      pageNumber,
      businessType: getAppModuleType(moduleType),
      businessId: item.id,
    });
  };

  renderItem = ({ item }) => {
    const {
      filePath,
      displayName,
      createTime,
    } = item;
    const {
      item: {
        customerName,
      },
    } = this.props.navigation.state.params || {};
    return (
      <ListItem
        thumbnail
        noBorder
        style={{
          backgroundColor: 'white',
          paddingLeft: moderateScale(14),
          marginLeft: 0,
          paddingRight: moderateScale(14),
        }}
      >
        <WrapperView>
          <Left>
            <Thumbnail
              imgUri={filePath ? filePath.trim() : null}
              source={getIamgeByFileExtension(filePath)}
            />
          </Left>
          <Body>
            <Text>{displayName}</Text>
            <Text note numberOfLines={1}> {customerName} </Text>
            <Text note numberOfLines={1}> {formatDateByMoment(createTime, 'YYYY-MM-DD HH:mm')} </Text>
          </Body>
          <Right
            style={{
              paddingRight: 0,
            }}
          >
            <NavIconView
              source={navIcon}
              resizeMode="contain"
            />
          </Right>
        </WrapperView>
      </ListItem>
    );
  }

  render() {
    const {
      relatedDocsList: {
        list = [],
        refreshing,
      },
    } = RelatedDocsModel;
    const flatProps = {
      data: list,
      renderItem: this.renderItem,
      onRefresh: this.getData,
      refreshing,
      noDataBool: !refreshing && list.length === 0,
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
