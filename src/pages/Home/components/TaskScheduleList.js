/*
 * @Author: ShiQuan
 * @Date: 2018-09-09 21:19:28
 * @Last Modified by: Edmond.Shi
 * @Last Modified time: 2018-09-09 21:44:18
 */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import uuidv1 from 'uuid/v1';

import Toast from '../../../utils/toast';
import ListItem from './ListItem';
import { moderateScale } from '../../../utils/scale';
import { theme } from '../../../constants';

const List = styled.FlatList`
  height: 300;
  background-color: ${theme.pageBackColor};
  padding: ${moderateScale(10)}px ${moderateScale(15)}px 0px ${moderateScale(15)}px;
`;

const ListItemSeparatorComponent = styled.View`
  background-color: transparent;
  height: ${moderateScale(10)}px;
`;

class taskScheduleList extends React.Component {
  keyExtractor = item => item.key;

  renderItem = ({ item }) => {
    const {
      duration,
      type,
      name,
      comment,
    } = item;
    return (
      <ListItem
        duration={duration}
        type={type}
        name={name}
        comment={comment}
        operateList={[
          { key: uuidv1(), text: '下一步', onPress: () => Toast.showSuccess('下一步') },
          { key: uuidv1(), text: '延时', onPress: () => Toast.showSuccess('延时') },
          { key: uuidv1(), text: '删除', onPress: () => Toast.showSuccess('删除') },
        ]}
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
    key: PropTypes.key,
    duration: PropTypes.string,
    type: PropTypes.string,
    name: PropTypes.string,
    comment: PropTypes.string,
    operateList: PropTypes.arrayOf(PropTypes.shape({
      key: PropTypes.string,
      text: PropTypes.string,
      onPress: PropTypes.func,
    })),
  })).isRequired,
};

export default taskScheduleList;
