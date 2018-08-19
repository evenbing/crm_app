import React from 'react';
import styled from 'styled-components';
import { moderateScale } from '../../../../utils/scale';

const Container = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: white;
  padding-top: ${moderateScale(11)};
  padding-bottom: ${moderateScale(10)};
  border-bottom-width: ${moderateScale(1)};
  border-bottom-color: #F6F6F6;
`;

const ProductImage = styled.Image`
  width: ${moderateScale(80)};
  height: ${moderateScale(80)};
`;

const Content = styled.View`
  flex: 1;
  justify-content: center;
  margin-left: ${moderateScale(15)}px;
`;

const Title = styled.Text`
  font-size: ${moderateScale(16)}px;
  color: #373737;
  margin-bottom: ${moderateScale(10)}px;
`;

const Price = styled.Text`
  font-size: ${moderateScale(14)}px;
  color: #858585;
`;

const Status = styled.Text`
  font-size: ${moderateScale(16)}px;
  color: #18B548;
`;

const ProductItem = ({
  image,
  title,
  price,
  status,
}) => (
  <Container>
    <ProductImage source={image} />
    <Content>
      <Title> {title} </Title>
      <Price> {price} </Price>
    </Content>
    <Status> {status} </Status>
  </Container>
);

export default ProductItem;
