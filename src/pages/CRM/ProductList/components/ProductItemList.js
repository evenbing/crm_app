
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
import ProductItem from './ProductItem'

const ContainerView = styled(View)`
padding: 0 ${moderateScale(15)}px;
background-color: #fff;
margin-bottom: ${moderateScale(10)};
`;

const HeadView = styled(View)`
height: ${moderateScale(44)};
alignItems: center;
justifyContent: space-between;
flexDirection: row;
`
const LeftView = styled(View)`

`;

const LeftText = styled(Text)`
font-family: ${theme.fontMedium};
font-size: ${moderateScale(16)};
color: #18B548;
`

const RightView = styled(View)`
flexDirection: row;
`;

const ItemView = styled(View)`
flexDirection: row;
`
const ItemIcon = styled(Image)`

`
const ItemText = styled(Text)`
font-family: ${theme.fontMedium};
font-size: ${moderateScale(14)};
color: #18B548;
background-color: transparent;
margin-left: ${moderateScale(5)};
`
const ListView = styled(View)``

class ProductItemList extends React.PureComponent {

  render() {
    const { list } = this.props.data;
    return (
      <ContainerView>
        <HeadView>
          <LeftView><LeftText>耗材（{list.length}）</LeftText></LeftView>
          <RightView>
            <ItemView>
              <ItemIcon />
              <ItemText>消耗</ItemText>
            </ItemView>
            <ItemView style={{marginLeft: moderateScale(20)}}>
              <ItemIcon />
              <ItemText>单品</ItemText>
            </ItemView>
          </RightView>
        </HeadView>
        <ListView>
          { list.map((item, index) => <ProductItem key={index} data={item} />) }
        </ListView>
      </ContainerView>
    );
  }
}

ProductItemList.defaultProps = {
  data: {},
  isLast: false,
  onPress: () => null,
};

ProductItemList.propTypes = {
  data: PropTypes.object.isRequired,
  isLast: PropTypes.bool,
  onPress: PropTypes.func,
};

export default ProductItemList;
