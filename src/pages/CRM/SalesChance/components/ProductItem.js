/**
 * @component ProductItem.js
 * @description 产品列表组件
 * @time 2018/9/4
 * @author JUSTIN XU
 */
import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { Thumbnail } from 'xn-react-native-applets';

// constants
import { theme } from 'constants';

// static source
import EditorIcon from 'img/editor.png';

// utils
import { moderateScale } from 'utils/scale';
import { formatMoney } from 'utils/base';

const ContainerCss = css`
  flex-direction: row;
  padding: ${moderateScale(11)}px ${moderateScale(15)}px;
  justify-content: space-between;
  align-items: center;
`;

const ContainerTouch = styled.TouchableOpacity`
  ${ContainerCss};
`;

const ContainerView = styled.View`
  ${ContainerCss};
`;

const ImageView = styled(Thumbnail)`
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
  flex: 1;
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

class ProductItem extends React.PureComponent {
  render() {
    const {
      props: {
        item: {
          attachmentList = [],
          productName = '',
          standardPrice = '',
          salesPrice = '',
          salesNumber = '',
          comment,
          discount,
          salesTotalPrice,
        },
        onPress,
        showEditor,
      },
    } = this;
    const ContainerType = onPress ? ContainerTouch : ContainerView;
    return (
      <ContainerType
        onPress={onPress}
      >
        <ImageView
          imgUri={attachmentList.length ? attachmentList[0].filePath : null}
          size={109}
        />
        <DiscountView>
          <Discount>{discount ? `折扣:${discount}%` : ''}</Discount>
        </DiscountView>
        <ContentView>
          <Name> {productName} </Name>
          <InputView>
            <InputViewTitle>标准价格:</InputViewTitle>
            <InputViewContent>{`¥${formatMoney(standardPrice)}`}</InputViewContent>
          </InputView>
          <InputView>
            <InputViewTitle>销售价格:</InputViewTitle>
            <InputViewContent>{salesPrice ? `¥${formatMoney(salesPrice)}` : ''}</InputViewContent>
          </InputView>
          <InputView>
            <InputViewTitle>数量:</InputViewTitle>
            <InputViewContent>{formatMoney(salesNumber) || ''}</InputViewContent>
          </InputView>
          <InputView>
            <InputViewTitle>备注:</InputViewTitle>
            <InputViewContent>{comment}</InputViewContent>
          </InputView>
          <TotalPrice>
            <TotalPriceLabel>总价: </TotalPriceLabel>
            <TotalPriceValue> {salesTotalPrice ? `¥${formatMoney(salesTotalPrice)}` : ''} </TotalPriceValue>
          </TotalPrice>
        </ContentView>
        {
          showEditor ? (
            <Thumbnail
              source={EditorIcon}
              size={26}
            />
          ) : null
        }
      </ContainerType>
    );
  }
}

ProductItem.defaultProps = {
  item: {},
  onPress: null,
  showEditor: true,
};

ProductItem.propTypes = {
  item: PropTypes.objectOf(PropTypes.any),
  onPress: PropTypes.func,
  showEditor: PropTypes.bool,
};

export default ProductItem;
