
/**
 * @component DetailItem.jsm.js
 * @description ProductItem
 * @time 2018/8/07
 * @author zhao
 */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { theme } from '../../../../constants';
import { moderateScale } from '../../../../utils/scale';
import TouchableView from '../../../../components/TouchableView'

const ContainerView = styled(TouchableView)`
height: ${moderateScale(100)};
`;

class DetailItem extends React.PureComponent {
  render() {
    const { onPress, isLast, data } = this.props

    return (
      <ContainerView onPress={onPress}>
      </ContainerView>
    );
  }
}

DetailItem.defaultProps = {
  data: {},
  isLast: false,
  onPress: () => null,
};

DetailItem.propTypes = {
  data: PropTypes.object.isRequired,
  isLast: PropTypes.bool,
  onPress: PropTypes.func,
};

export default DetailItem;
