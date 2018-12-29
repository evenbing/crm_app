import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Thumbnail } from 'xn-react-native-applets';

// constants
import { theme } from 'constants';

// utils
import { formatMoney } from 'utils/base';

const Container = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  background-color: ${theme.whiteColor};
`;

const ProductImage = styled(Thumbnail)`
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

const LeftIconView = styled.View`
  align-items: center;
  padding-left: ${theme.moderateScale(10)};
  padding-right: ${theme.moderateScale(5)};
`;

const ProductListItem = ({
  item,
  onPressItem,
}) => {
  const {
    productName,
    standardPrice,
    checked,
    productImage,
  } = item;
  return (
    <Container onPress={() => onPressItem(item)}>
      <LeftIconView>
        <Thumbnail
          source={checked ? require('../../../img/company/selected.png') : require('../../../img/company/unselected.png')}
          size={20}
        />
      </LeftIconView>
      <ProductImage
        imgUri={productImage}
      />
      <ContentView>
        <Name>
          {productName}
        </Name>
        <Price>
          {`价格：${formatMoney(standardPrice)}`}
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
