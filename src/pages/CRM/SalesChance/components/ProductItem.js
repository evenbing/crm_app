import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { moderateScale } from '../../../../utils/scale';
import { theme } from '../../../../constants';
import productImage from '../../../../img/crm/ico_product.png';

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

const InputView = styled.View`
  flex-direction: row;
`;

const InputViewTitle = styled.Text`
  color: #858585;
  font-size: ${moderateScale(14)}px;
`;

const InputViewContentEdit = styled.TextInput`
  color: ${theme.textFormColor};
  font-size: ${moderateScale(14)}px;
`;

const InputViewContent = styled.TextInput`
  color: ${theme.textFormColor};
  font-size: ${moderateScale(14)}px;
`;

class ProductItem extends React.PureComponent {
  constructor(props) {
    super(props);
    const {
      id = null,
      opportunityId = null,
      priceId = null,
      productId = null,
      productName = null,
      rowVersion = null,
      standardPrice = null,
      salesPrice = '',
      salesNumber = '',
      tenantId = null,
      comment,
      salesTotalPrice,
    } = props;
    this.state = {
      id,
      opportunityId,
      priceId,
      productId,
      productName,
      rowVersion,
      standardPrice,
      salesPrice,
      salesNumber,
      tenantId,
      comment,
      salesTotalPrice,
    };
  }

  render() {
    const {
      id,
      opportunityId,
      priceId,
      productId,
      productName,
      rowVersion,
      standardPrice,
      salesPrice,
      salesNumber,
      salesTotalPrice,
      tenantId,
      comment,
    } = this.state;
    const rate = ((Number(standardPrice) - Number(salesPrice)) / Number(standardPrice)).toFixed(0);
    return (
      <Container>
        <Image source={{ uri: 'iamge' }} defaultSource={productImage} />
        <DiscountView>
          <Discount>{`折扣:${rate}%`}</Discount>
        </DiscountView>
        <ContentView>
          <Name> {productName} </Name>
          <InputView>
            <InputViewTitle>标准价格:</InputViewTitle>
            <InputViewContent>{standardPrice}</InputViewContent>
          </InputView>
          <InputView>
            <InputViewTitle>销售价格:</InputViewTitle>
            <InputViewContentEdit
              keyboardType="numeric"
              placeholder="请输入销售价格"
              value={salesPrice}
              onChangeText={() => {
                this.setState({ salesPrice });
              }}
            />
          </InputView>
          <InputView>
            <InputViewTitle>数量:</InputViewTitle>
            <InputViewContentEdit
              keyboardType="numeric"
              placeholder="请输入数量"
              value={salesNumber}
              onChangeText={() => {
                this.setState({ salesNumber });
              }}
            />
          </InputView>
          <InputView>
            <InputViewTitle>备注:</InputViewTitle>
            <InputViewContentEdit
              placeholder="请输入备注"
              value={comment}
              onChangeText={() => {
                this.setState({ comment });
              }}
            />
          </InputView>
          <TotalPrice>
            <TotalPriceLabel> 总价: </TotalPriceLabel>
            <TotalPriceValue> {`¥${salesTotalPrice}`} </TotalPriceValue>
          </TotalPrice>
        </ContentView>
      </Container>
    );
  }
}

ProductItem.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  productsExtra: PropTypes.arrayOf(PropTypes.shape({
    salesPrice: PropTypes.number,
    discount: PropTypes.number,
    salesNumber: PropTypes.number,
    salesTotalPrice: PropTypes.number,
    comment: PropTypes.number,
  })).isRequired,
};

export default ProductItem;
