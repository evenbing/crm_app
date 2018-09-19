
/**
 * @component ProductItem.js
 * @description 产品条目组件
 * @time 2018/8/07
 * @author zhao
 */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { View, Text } from 'react-native';
import { theme } from '../../../../constants';
import { moderateScale } from '../../../../utils/scale';

// components
import Thumbnail from '../../../../components/Thumbnail';
import ProductItem from './ProductItem';

const ContainerView = styled(View)`
  padding: 0 ${moderateScale(15)}px;
  background-color: ${theme.whiteColor};
  margin-bottom: ${moderateScale(10)};
`;

const HeadView = styled(View)`
  height: ${moderateScale(44)};
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
`;
const LeftView = styled(View)`

`;

const LeftText = styled(Text)`
  font-family: ${theme.fontMedium};
  font-size: ${moderateScale(16)};
  color: ${theme.primaryColor};
`;

const RightView = styled.View`
  flex-direction: row;
`;

const ItemView = styled.View`
  flex-direction: row;
  align-items: center;
`;

const ItemText = styled.Text`
  font-family: ${theme.fontMedium};
  font-size: ${moderateScale(14)};
  color: ${theme.primaryColor};
  background-color: transparent;
  margin-left: ${moderateScale(5)};
`;
const ListView = styled.View``;

class ProductItemList extends React.PureComponent {
  render() {
    const {
      item: {
        name = null,
        parentId = null,
        products = [],
        children = [],
      },
    } = this.props;
    return (
      <ContainerView>
        <HeadView>
          <LeftView><LeftText>{name}（{products.length}）</LeftText></LeftView>
          <RightView>
            {
              parentId ? (
                <ItemView>
                  <Thumbnail
                    source={require('../../../../img/productList/next.png')}
                    size={16}
                  />
                  <ItemText>消耗</ItemText>
                </ItemView>
            ) : null
            }
            <ItemView>
              <Thumbnail
                source={require('../../../../img/productList/next.png')}
                size={16}
              />
              <ItemText>消耗</ItemText>
            </ItemView>
            {
              children.length ? (
                <ItemView style={{ marginLeft: moderateScale(20) }}>
                  <Thumbnail
                    source={require('../../../../img/productList/prev.png')}
                    size={16}
                  />
                  <ItemText>单品</ItemText>
                </ItemView>
              ) : null
            }
          </RightView>
        </HeadView>
        <ListView>
          { products.map((item, index) => <ProductItem key={index} data={item} />) }
        </ListView>
      </ContainerView>
    );
  }
}

ProductItemList.defaultProps = {
  item: {},
  isLast: false,
  onPress: () => null,
};

ProductItemList.propTypes = {
  item: PropTypes.objectOf(PropTypes.any),
  isLast: PropTypes.bool,
  onPress: PropTypes.func,
};

export default ProductItemList;
