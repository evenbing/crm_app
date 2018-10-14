/*
 * @Author: ShiQuan
 * @Date: 2018-09-09 21:19:28
 * @Last Modified by: Edmond.Shi
 * @Last Modified time: 2018-10-10 16:07:33
 */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { observer } from 'mobx-react/native';

import ListItem from './ListItem';
import { moderateScale } from '../../../utils/scale';
import { theme } from '../../../constants';

const List = styled.FlatList`
  background-color: ${theme.pageBackColor};
  padding: ${moderateScale(10)}px ${moderateScale(15)}px 0px ${moderateScale(15)}px;
`;

const ListItemSeparatorComponent = styled.View`
  background-color: transparent;
  height: ${moderateScale(10)}px;
`;

@observer
class taskScheduleList extends React.Component {
  keyExtractor = item => item.id;

  renderItem = ({ item }) => {
    const {
      id,
      duration,
      type,
      name,
      comment = '',
      operateList,
      startTime,
      endTime,
      moduleId,
      moduleType,
      rowVersion,
      onPressItem,
    } = item;
    return (
      <ListItem
        id={id}
        duration={duration}
        type={type}
        name={name}
        comment={comment}
        startTime={startTime}
        endTime={endTime}
        moduleId={moduleId}
        moduleType={moduleType}
        rowVersion={rowVersion}
        operateList={operateList}
        onPressItem={onPressItem}
      />
    );
  }

  renderItemSeparatorComponent = () => <ListItemSeparatorComponent />

  render() {
    const { data } = this.props;
    return (
      <List
        data={data}
        keyExtractor={this.keyExtractor}
        renderItem={this.renderItem}
        ItemSeparatorComponent={this.renderItemSeparatorComponent}
      />
    );
  }
}

taskScheduleList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    duration: PropTypes.string,
    type: PropTypes.string,
    name: PropTypes.string,
    comment: PropTypes.string,
    startTime: PropTypes.string,
    endTime: PropTypes.string.isRequired,
    moduleId: PropTypes.string.isRequired,
    moduleType: PropTypes.string.isRequired,
    rowVersion: PropTypes.string.isRequired,
    operateList: PropTypes.arrayOf(PropTypes.shape({
      key: PropTypes.string,
      text: PropTypes.string,
      onPress: PropTypes.func,
    })),
    onPressItem: PropTypes.func,
  })).isRequired,
};

export default taskScheduleList;
