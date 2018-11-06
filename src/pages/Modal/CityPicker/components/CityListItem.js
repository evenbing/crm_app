import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { theme } from '../../../../constants';

const NameView = styled.TouchableOpacity`
  padding: ${theme.moderateScale(10)}px;
  justify-content: center;
  align-items: center;
  background-color: ${props => [props.selected ? theme.primaryColor : theme.whiteColor]};
`;

const NameText = styled.Text`
  background-color: transparent;
`;

const CityListItem = ({
  item,
  onPressItem,
}) => {
  const {
    label,
    selected,
  } = item;
  return (
    <NameView
      selected={selected}
      onPress={onPressItem(item)}
    >
      <NameText>{label}</NameText>
    </NameView>
  );
};

CityListItem.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string,
    selected: PropTypes.bool,
  }).isRequired,
  onPressItem: PropTypes.func.isRequired,
};

export default CityListItem;
