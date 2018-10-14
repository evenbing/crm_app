import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { CheckBox } from 'native-base';

import { theme } from '../../../constants';
import productImage from '../../../img/test/mine_head.png';

const Container = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  background-color: ${theme.whiteColor};
`;

const ProductImage = styled.Image`
  width: ${theme.moderateScale(80)}px;
  height: ${theme.moderateScale(80)}px;
  margin-left: ${theme.moderateScale(15)}px;
  margin-right: ${theme.moderateScale(50)}px;
`;

const ContentView = styled.View``;

const Name = styled.Text`
  font-size: ${theme.moderateScale(16)}px;
  color: ${theme.textFormColor};
  margin-bottom: ${theme.moderateScale(5)}px;
`;

const Price = styled.Text`
  font-size: ${theme.moderateScale(14)}px;
  color: ${theme.textColor};
`;

const ProductListItem = ({
  item,
  onPressItem,
}) => {
  const {
    name,
    price,
    checked,
  } = item;
  return (
    <Container onPress={() => onPressItem(item)}>
      <CheckBox checked={checked} color="green" />
      <ProductImage source={productImage} />
      <ContentView>
        <Name>
          {name}
        </Name>
        <Price>
          {`价格：${price}`}
        </Price>
      </ContentView>
    </Container>
  );
};

ProductListItem.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string,
  }).isRequired,
  onPressItem: PropTypes.func.isRequired,
};

export default ProductListItem;
