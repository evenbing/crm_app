import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { moderateScale } from '../../../../utils/scale';
import { theme } from '../../../../constants';
import productImage from '../../../../img/crm/ico_product.png';

const Container = styled.TouchableOpacity`
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

const Discount = styled.Text.attrs({
  numberOfLines: 1,
})`
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

const InputView = styled.View`
  flex-direction: row;
`;

const InputViewTitle = styled.Text`
  color: #858585;
  font-size: ${moderateScale(14)}px;
`;

const InputViewContent = styled.Text.attrs({
  numberOfLines: 1,
})`
  color: ${theme.textFormColor};
  font-size: ${moderateScale(14)}px;
`;

const ProductItem = (props) => {
  const {
    attachmentList = [],
    productName = null,
    standardPrice = null,
    salesPrice = '',
    salesNumber = '',
    comment,
    discount,
    salesTotalPrice,
    onPress,
  } = props;
  console.log({ props });

  console.log({ attachmentList });

  let url = 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1540205823&di=de0e73b2da3a8c2f8cd28b6edff8d6f6&imgtype=jpg&er=1&src=http%3A%2F%2Fs16.sinaimg.cn%2Fmw690%2F003gRgrCzy73OGZAV434f%26amp%3B690';
  if (attachmentList.length > 0) {
    const { filePath } = attachmentList[0];
    url = filePath;
  }
  return (
    <Container onPress={onPress}>
      <Image source={{ uri: url }} defaultSource={productImage} />
      <DiscountView>
        <Discount>{discount ? `折扣:${discount}%` : ''}</Discount>
      </DiscountView>
      <ContentView>
        <Name> {productName} </Name>
        <InputView>
          <InputViewTitle>标准价格:</InputViewTitle>
          <InputViewContent>{`¥${standardPrice}`}</InputViewContent>
        </InputView>
        <InputView>
          <InputViewTitle>销售价格:</InputViewTitle>
          <InputViewContent>{salesPrice ? `¥${salesPrice}` : ''}</InputViewContent>
        </InputView>
        <InputView>
          <InputViewTitle>数量:</InputViewTitle>
          <InputViewContent>{salesNumber || ''}</InputViewContent>
        </InputView>
        <InputView>
          <InputViewTitle>备注:</InputViewTitle>
          <InputViewContent>{comment}</InputViewContent>
        </InputView>
        <TotalPrice>
          <TotalPriceLabel> 总价: </TotalPriceLabel>
          <TotalPriceValue> {salesTotalPrice ? `¥${salesTotalPrice}` : ''} </TotalPriceValue>
        </TotalPrice>
      </ContentView>
    </Container>
  );
};

ProductItem.defaultProps = {
  id: '',
  opportunityId: '',
  priceId: '',
  productId: '',
  productName: '',
  rowVersion: '',
  standardPrice: '',
  salesPrice: '',
  salesNumber: '',
  tenantId: '',
  comment: '',
  discount: '',
  salesTotalPrice: '',
};

ProductItem.defaultProps = {
  attachmentList: [],
};

ProductItem.propTypes = {
  id: PropTypes.string,
  opportunityId: PropTypes.string,
  priceId: PropTypes.string,
  productId: PropTypes.string,
  productName: PropTypes.string,
  rowVersion: PropTypes.string,
  standardPrice: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  salesPrice: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  salesNumber: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  discount: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  tenantId: PropTypes.string,
  comment: PropTypes.string,
  salesTotalPrice: PropTypes.string,
  onPress: PropTypes.func.isRequired,
  attachmentList: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    uri: PropTypes.string,
  })),
};

export default ProductItem;
