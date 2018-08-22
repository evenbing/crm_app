import React from 'react';
import styled from 'styled-components';
import { moderateScale } from '../../../../utils/scale';

const Container = styled.View`
  flex-direction: row;
  padding: ${moderateScale(11)}px ${moderateScale(15)}px;
`;

const Image = styled.Image`
  width: ${moderateScale(109)}px;
  height: ${moderateScale(109)}px;
  margin-right: ${moderateScale(15)}px;
`;

const DiscountView = styled.View`
  justify-content: center;
  align-items: center;
  width: ${moderateScale(109)}px;
  height: ${moderateScale(24)}px;
  position: absolute;
  bottom: ${moderateScale(11)}px;
  left: ${moderateScale(15)}px;
  background-color: #DB0E0EC1;
`;

const Discount = styled.Text`
  justify-content: center;
  align-items: center;
  color: #FBF3F3;
  font-size: ${moderateScale(14)}px;
`;
const ContentView = styled.View`
  justify-content: space-around;
`;

const Name = styled.Text`
  color: #373737;
  font-size: ${moderateScale(16)}px;
`;

const Price = styled.Text`
  color: #858585;
  font-size: ${moderateScale(14)}px;
`;

const Count = styled.Text`
  color: #858585;
  font-size: ${moderateScale(14)}px;
`;

const Remark = styled.Text`
  color: #858585;
  font-size: ${moderateScale(14)}px;
`;

const TotalPrice = styled.View`
  flex-direction: row;
`;

const TotalPriceLabel = styled.Text`
  color: #858585;
  font-size: ${moderateScale(14)}px;
`;

const TotalPriceValue = styled.Text`
  color: #D13031;
  font-size: ${moderateScale(14)}px;
`;

const ProductItem = ({
  image,
  discount,
  name,
  price,
  count,
  remark,
  totalPrice,
}) => (
  <Container>
    <Image source={image} />
    <DiscountView>
      <Discount>{discount}</Discount>
    </DiscountView>
    <ContentView>
      <Name> {name} </Name>
      <Price> {price} </Price>
      <Count> {count} </Count>
      <Remark> {remark} </Remark>
      <TotalPrice>
        <TotalPriceLabel> 总价： </TotalPriceLabel>
        <TotalPriceValue> {totalPrice} </TotalPriceValue>
      </TotalPrice>
    </ContentView>
  </Container>
);

export default ProductItem;
