import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { moderateScale } from '../../../../utils/scale';
import { theme } from '../../../../constants';

// components
import Thumbnail from '../../../../components/Thumbnail';

const ContainerView = styled.View`
  padding: 0 ${moderateScale(15)}px;
  background-color: ${theme.whiteColor};
`;

const WrapperView = styled.View`
  flex-direction: row;
  align-items: center;
  padding-top: ${moderateScale(11)};
  padding-bottom: ${moderateScale(10)};
  border-bottom-width: ${moderateScale(1)};
  border-bottom-color: ${theme.borderColor};
`;

const ContentView = styled.View`
  flex: 1;
  justify-content: center;
  margin-left: ${moderateScale(15)}px;
`;

const TitleText = styled.Text`
  font-size: ${moderateScale(16)}px;
  color: ${theme.textFormColor};
  margin-bottom: ${moderateScale(10)}px;
`;

const PriceText = styled.Text`
  font-size: ${moderateScale(14)}px;
  color: #858585;
`;

const StatusText = styled.Text`
  font-size: ${moderateScale(16)}px;
  color: ${props => props.color};
`;

const ProductItem = ({
  item,
}) => (
  <ContainerView>
    <WrapperView>
      <Thumbnail
        imgUri={item.image}
        size={80}
      />
      <ContentView>
        <TitleText>{item.productName || '--'}</TitleText>
        <PriceText>标准价格：¥{item.setPrice}</PriceText>
      </ContentView>
      <StatusText
        color={item.isActive ? theme.primaryColor : theme.borderColor}
      >
        {item.isActive ? '已启用' : '未启用'}
      </StatusText>
    </WrapperView>
  </ContainerView>
);

ProductItem.defaultProps = {
  item: {},
};

ProductItem.propTypes = {
  item: PropTypes.objectOf(PropTypes.any),
};

export default ProductItem;
