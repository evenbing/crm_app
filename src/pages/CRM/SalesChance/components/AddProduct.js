import React from 'react';
import styled from 'styled-components';
import { moderateScale } from '../../../../utils/scale';
import { getFooterBottom } from '../../../../utils/utils';

const Container = styled.View`
  flex-direction: row;
  align-items: center;
  border-top-width: ${moderateScale(1)}px;
  border-top-color: #DDDDDD;
  padding-bottom: ${getFooterBottom()};
`;

const CountView = styled.View`
  flex-direction: row;
  align-items: center;
  padding: 0px ${moderateScale(15)}px;
`;

const CountLabel = styled.Text`
  font-size: ${moderateScale(12)}px;
  color: #888888;
`;

const CountValue = styled.Text`
  font-size: ${moderateScale(16)}px;
  color: #26B34E;
`;

const TotalPriceView = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
`;

const TotalPriceLabel = styled.Text`
  font-size: ${moderateScale(12)}px;
  color: #888888;
`;

const TotalPriceValue = styled.Text`
  font-size: ${moderateScale(16)}px;
  color: #D13031;
`;

const ButtonAdd = styled.TouchableOpacity`
  width: ${moderateScale(83)}px;
  height: ${moderateScale(49)}px;
  background-color: #26B34E;
  justify-content: center;
  align-items: center;
`;

const ButtonAddText = styled.Text`
  color: white;
  font-size: ${moderateScale(14)}px;
`;

const AddProduct = ({
  count,
  totalPrice,
  onPress,
}) => (
  <Container>
    <CountView>
      <CountLabel>产品：</CountLabel>
      <CountValue> {count}  </CountValue>
    </CountView>
    <TotalPriceView>
      <TotalPriceLabel>总金额：</TotalPriceLabel>
      <TotalPriceValue> {totalPrice} </TotalPriceValue>
    </TotalPriceView>
    <ButtonAdd onPress={onPress}>
      <ButtonAddText>添加产品</ButtonAddText>
    </ButtonAdd>
  </Container>
);

export default AddProduct;
