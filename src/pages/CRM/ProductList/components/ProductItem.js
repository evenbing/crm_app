
/**
 * @component ProductItem.jsm.js
 * @description ProductItem
 * @time 2018/8/07
 * @author zhao
 */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { View, Text, Image } from 'react-native';
import { theme } from '../../../../constants';
import { moderateScale } from '../../../../utils/scale';
import TouchableView from '../../../../components/TouchableView'

const ContainerView = styled(TouchableView)`
height: ${moderateScale(100)};
`;

const BorderView = styled(View)`
flex: 1;
height: 100%;
borderTopWidth: 1px;
borderTopColor: #F6F6F6;
flexDirection: row;
alignItems: center;
`;

const LeftView = styled(View)`
width: ${moderateScale(80)};
height: ${moderateScale(80)};
`;

const ProductImage = styled(View)`
width: 100%;
height: 100%;
background-color: #ff0;
`

const RightView = styled(View)`
flex: 1;
height: ${moderateScale(80)};
justifyContent: center;
padding-left: ${moderateScale(15)};
`;

const TitleText = styled(Text)`
font-family: ${theme.fontMedium};
font-size: ${moderateScale(16)};
color: #373737;
background-color: transparent;
`

const PriceText = styled(Text)`
font-family: ${theme.fontRegular};
font-size: ${moderateScale(14)};
color: #858585;
background-color: transparent;
margin-top: ${moderateScale(5)};
`

class ProductItem extends React.PureComponent {
  render() {
    const { onPress, isLast, data } = this.props

    return (
      <ContainerView onPress={onPress}>
        <BorderView isLast={isLast}>
          <LeftView>
            <ProductImage />
          </LeftView>
          <RightView>
            <TitleText>{`电脑主机`}</TitleText>
            <PriceText>{`标准价格：¥9000.00`}</PriceText>
          </RightView>
        </BorderView>
      </ContainerView>
    );
  }
}

ProductItem.defaultProps = {
  data: {},
  isLast: false,
  onPress: () => null,
};

ProductItem.propTypes = {
  data: PropTypes.object.isRequired,
  isLast: PropTypes.bool,
  onPress: PropTypes.func,
};

export default ProductItem;
