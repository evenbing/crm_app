
/**
 * @component ProductItem.jsm.js
 * @description ProductItem
 * @time 2018/8/07
 * @author zhao
 */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { theme } from '../../../../constants';
import { moderateScale } from '../../../../utils/scale';

// components
import TouchableView from '../../../../components/TouchableView';
import Thumbnail from '../../../../components/Thumbnail';

const ContainerView = styled(TouchableView)`
  height: ${moderateScale(100)};
`;

const BorderView = styled.View`
  flex: 1;
  height: 100%;
  borderTopWidth: 1px;
  borderTopColor: #F6F6F6;
  flexDirection: row;
  alignItems: center;
`;

const LeftView = styled.View`
  width: ${moderateScale(80)};
  height: ${moderateScale(80)};
`;


const RightView = styled.View`
  flex: 1;
  height: ${moderateScale(80)};
  justifyContent: center;
  padding-left: ${moderateScale(15)};
`;

const TitleText = styled.Text`
  font-family: ${theme.fontMedium};
  font-size: ${moderateScale(16)};
  color: #373737;
  background-color: transparent;
`;

const PriceText = styled.Text`
  font-family: ${theme.fontRegular};
  font-size: ${moderateScale(14)};
  color: #858585;
  background-color: transparent;
  margin-top: ${moderateScale(5)};
`;

class ProductItem extends React.PureComponent {
  render() {
    const {
      onPressItem,
      isLast,
      item,
    } = this.props;

    const attList = item.attachmentList || [];

    return (
      <ContainerView onPress={onPressItem}>
        <BorderView isLast={isLast}>
          <LeftView>
            <Thumbnail
              imgUri={attList.length ? attList[0].filePath : null}
              size={80}
            />
          </LeftView>
          <RightView>
            <TitleText>{item.name || '--'}</TitleText>
            <PriceText>{`标准价格：¥${item.price}`}</PriceText>
          </RightView>
        </BorderView>
      </ContainerView>
    );
  }
}

ProductItem.defaultProps = {
  item: {},
  isLast: false,
  onPressItem: () => null,
};

ProductItem.propTypes = {
  item: PropTypes.objectOf(PropTypes.any),
  isLast: PropTypes.bool,
  onPressItem: PropTypes.func,
};

export default ProductItem;
