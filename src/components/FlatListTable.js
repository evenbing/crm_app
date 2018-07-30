/**
 * @component FlatListTable.js
 * @description flatList 组件
 * @time 2018/6/28
 * @author JUSTIN XU
 */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import uuidv1 from 'uuid/v1';
import { FlatList, ActivityIndicator } from 'react-native';

const TableBody = styled.View`
  background-color: #ffffff;
  flex: 1;
`;

const ItemSeparator = styled.View`
  width: 100%;
  height: 1px;
  background-color: #F6F6F6;
`;

const ListEmptyView = styled.View`
  height: ${props => props.height};
  width: 100%;
  align-items: center;
  justify-content: center;
`;

const EmptyText = styled.Text`
  font-size: 16px;
  color: #999;
`;

const FooterView = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0;
  height: 44px;
`;

class FlatListTable extends React.PureComponent {
  state = {
    listHeight: 0,
  };
  render() {
    const {
      state: {
        listHeight,
      },
      props: {
        renderHeader,
        flatListStyle,
        tableBodyStyle,
        ItemSeparatorComponent,
        ListEmptyComponent,
        data,
        refreshing,
        numColumns,
        onRefresh,
        onEndReached,
        onEndReachedThreshold,
        ListHeaderComponent,
        ListFooterComponent,
        noDataBool,
        noDataText,
        loadingMore,
        renderItem,
        renderItemElem,
        ...restProps
      },
    } = this;
    return (
      <TableBody
        style={tableBodyStyle}
      >
        { renderHeader }
        <FlatList
          ref="flatList"
          data={data}
          onLayout={(e) => {
            const { height } = e.nativeEvent.layout;
            if (listHeight < height) {
              this.setState({ listHeight: height });
            }
          }}
          onRefresh={onRefresh}
          refreshing={refreshing}
          numColumns={numColumns}
          onEndReached={onEndReached}
          onEndReachedThreshold={onEndReachedThreshold}
          ListHeaderComponent={ListHeaderComponent}
          keyExtractor={() => uuidv1()}
          style={{
            ...flatListStyle,
          }}
          renderItem={
            renderItemElem ?
              (
                props => (
                  React.cloneElement(renderItemElem, { ...props, ...restProps, isLast: data.length - 1 === props.index })
                )
              )
              :
              renderItem
          }
          ItemSeparatorComponent={ItemSeparatorComponent}
          ListEmptyComponent={
            noDataBool ? (
              ListEmptyComponent || (
                <ListEmptyView height={listHeight}>
                  <EmptyText>{ noDataText }</EmptyText>
                </ListEmptyView>
              ))
              : null
          }
          ListFooterComponent={
            loadingMore ? (
              ListFooterComponent || (
                <FooterView>
                  <ActivityIndicator size="small" color="#888888" />
                </FooterView>
              )
            ) : null
          }
        />
      </TableBody>
    );
  }
}

FlatListTable.defaultProps = {
  renderHeader: null,
  flatListStyle: null,
  tableBodyStyle: null,
  ItemSeparatorComponent: () => <ItemSeparator />,
  onRefresh: null,
  refreshing: false,
  onEndReached: null,
  onEndReachedThreshold: 0.1,
  ListHeaderComponent: null,
  ListEmptyComponent: null,
  noDataBool: false,
  noDataText: '没有数据',
  loadingMore: false,
  ListFooterComponent: null,
  renderItem: () => null,
  renderItemElem: null,
  numColumns: 1
};

FlatListTable.propTypes = {
  data: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array,
  ]).isRequired,
  renderHeader: PropTypes.element,
  renderItem: PropTypes.func,
  renderItemElem: PropTypes.element,
  ItemSeparatorComponent: PropTypes.func,
  flatListStyle: PropTypes.objectOf(PropTypes.any),
  tableBodyStyle: PropTypes.objectOf(PropTypes.any),
  onRefresh: PropTypes.func,
  refreshing: PropTypes.bool,
  onEndReached: PropTypes.func,
  onEndReachedThreshold: PropTypes.number,
  ListHeaderComponent: PropTypes.element,
  ListEmptyComponent: PropTypes.element,
  noDataBool: PropTypes.bool,
  noDataText: PropTypes.string,
  loadingMore: PropTypes.bool,
  ListFooterComponent: PropTypes.element,
  numColumns: PropTypes.number,
};

export default FlatListTable;

