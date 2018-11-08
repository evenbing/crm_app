/**
 * @component FollowUpItem.js
 * @description 跟进统计页面
 * @time 2018/11/9
 * @author JUSTIN XU
 */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import LinearGradient from 'react-native-linear-gradient';

import { theme } from '../../../../constants';

const ContainerView = styled.View`
  padding-left: ${theme.moderateScale(15)};
  padding-right: ${theme.moderateScale(15)};
  padding-top: ${props => theme.moderateScale(props.isFirst ? 20 : 16)};
  flex-direction: row;
  align-items: center;
`;

const LeftText = styled.Text.attrs({
  numberOfLines: 1,
})`
  color: #3C3C3C;
  width: ${theme.moderateScale(70)};
`;

const RightView = styled.View`
  flex: 1;
`;

const LinearView = styled(LinearGradient)`
  width: ${props => props.width || '50%'};
  height: ${theme.moderateScale(20)};
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
`;
const TextView = styled.Text`
  height: ${theme.moderateScale(19)};
  background-color: transparent;
  color: ${theme.whiteColor};
  font-size: ${theme.moderateScale(14)};
`;

class FollowUpItem extends React.PureComponent {
  render() {
    const {
      props: {
        index,
        item,
        maxValue,
      },
    } = this;
    return (
      <ContainerView
        isFirst={index === 0}
      >
        <LeftText>{item.moduleName || '--'}</LeftText>
        <RightView>
          <LinearView
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            colors={['#7ADFD6', '#5374C7']}
            width={(Number(item.followUpCount) / maxValue) * 100}
          >
            <TextView>
              {item.followUpCount}
            </TextView>
          </LinearView>
        </RightView>
      </ContainerView>
    );
  }
}

FollowUpItem.defaultProps = {
  index: 0,
  isLast: false,
  item: {},
  maxValue: 1,
};

FollowUpItem.propTypes = {
  index: PropTypes.number,
  isLast: PropTypes.bool,
  item: PropTypes.objectOf(PropTypes.any),
  maxValue: PropTypes.number,
};

export default FollowUpItem;
