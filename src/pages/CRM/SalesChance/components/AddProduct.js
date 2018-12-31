/**
 * @component AddProduct.js
 * @description 增加产品组件
 * @time 2018/9/4
 * @author JUSTIN XU
 */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { DevicesUtil } from 'xn-react-native-applets';

// constants
import theme from 'constants/theme';

// utils
import { formatMoney } from 'utils/base';
import { moderateScale } from 'utils/scale';

const { getFooterBottom } = DevicesUtil;

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
  color: ${theme.primaryColor};
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

const TotalPriceValue = styled.Text.attrs({
  numberOfLines: 3,
})`
  padding-left: 8px;
  max-width: ${theme.moderateScale(80)};
  font-size: ${moderateScale(16)}px;
  color: #D13031;
`;

const ButtonAdd = styled.TouchableOpacity`
  width: ${moderateScale(83)}px;
  height: ${moderateScale(49)}px;
  background-color: ${theme.primaryColor};
  justify-content: center;
  align-items: center;
`;

const ButtonAddText = styled.Text`
  color: white;
  font-size: ${moderateScale(14)}px;
`;

class AddProduct extends React.PureComponent {
  render() {
    const {
      props: {
        count,
        totalPrice,
        onPress,
      },
    } = this;
    return (
      <Container>
        <CountView>
          <CountLabel>产品：</CountLabel>
          <CountValue> {formatMoney(count)}  </CountValue>
        </CountView>
        <TotalPriceView>
          <TotalPriceLabel>总金额：</TotalPriceLabel>
          <TotalPriceValue> {formatMoney(totalPrice)} </TotalPriceValue>
        </TotalPriceView>
        <ButtonAdd onPress={onPress}>
          <ButtonAddText>添加产品</ButtonAddText>
        </ButtonAdd>
      </Container>
    );
  }
}

AddProduct.defaultProps = {
  count: 0,
  totalPrice: 0,
  onPress: () => null,
};

AddProduct.propTypes = {
  count: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  totalPrice: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  onPress: PropTypes.func,
};

export default AddProduct;
