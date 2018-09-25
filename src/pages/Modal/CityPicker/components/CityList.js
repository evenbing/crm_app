import React from 'react';
import { ViewPropTypes } from 'react-native';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import CityListItem from './CityListItem';

const CityFlatList = styled.FlatList`
  flex: 1;
`;

const CityList = ({
  data,
  onPressItem,
  style,
}) => (
  <CityFlatList
    style={style}
    data={data}
    renderItem={({ item }) => (
      <CityListItem 
        item={item}
        onPressItem={onPressItem}
      />
    )}
    keyExtractor={item => item.value}
  />
);

CityList.defaultProps = {
  style: {},
};

CityList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    selected: PropTypes.bool,
  })).isRequired,
  onPressItem: PropTypes.func.isRequired,
  style: ViewPropTypes.style,
};

export default CityList;
