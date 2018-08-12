/**
 * @component RankItem.js
 * @description 排行榜条目组件
 * @time 2018/8/12
 * @author JUSTIN XU
 */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Image, View } from 'react-native';
import { theme } from '../../../constants';
import Thumbnail from '../../../components/Thumbnail';

const CardItemGroup = styled.View`
  padding: 0 ${theme.moderateScale(15)}px;
  background-color: ${theme.whiteColor};
`;

const CardItemWrapper = styled.View`
  height: ${theme.moderateScale(74)};
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-bottom-width: 1px;
  border-bottom-color: ${props => (props.border ? theme.borderColor : 'transparent')};
  margin-top: ${props => (props.border ? '-1px' : 0)};
  overflow: hidden;
`;

const LeftItem = styled.View`
  flex-direction: row;
  align-items: center;
  width: 40%;
`;

const RankView = styled.View`
  width: 29px;
  height: 29px;
  margin-right: 9px;
`;

const RankText = styled.Text`
  font-family: ${theme.fontMedium};
  font-size: 14px;
  color: #515151;
  letter-spacing: -0.43px;
`;

const NameText = styled.Text`
  font-family: ${theme.fontRegular};
  font-size: 14px;
  margin-left: 29px;
  color: #414141;
  letter-spacing: -0.43px;
`;

const RightItem = styled.View`
  width: 40%;
  align-items: baseline;
  justify-content: flex-end;
  flex-direction: row;
`;

const RightText = styled.Text`
  font-family: ${theme.fontMedium};
  font-size: 20px;
  color: ${props => props.front ? '#E7973E' : theme.primaryColor};
  letter-spacing: -0.43px;
  background-color: transparent;
`;

class RankItem extends React.PureComponent {
  renderRankItem = (index) => {
    if (index === 0) {
      return (
        <Image
          source={require('../../../img/crm/perfStatist/first.png')}
        />
      );
    }
    if (index === 1) {
      return (
        <Image
          source={require('../../../img/crm/perfStatist/second.png')}
        />
      );
    }
    if (index === 2) {
      return (
        <Image
          source={require('../../../img/crm/perfStatist/third.png')}
        />
      );
    }
    return (
      <RankText>{index + 1}</RankText>
    );
  };
  render() {
    const {
      item,
      index,
      isLast,
    } = this.props;
    return (
      <View>
        <CardItemGroup>
          <CardItemWrapper
            border={!isLast}
          >
            <LeftItem>
              <RankView>
                {this.renderRankItem(index)}
              </RankView>
              <Thumbnail
                imgUri={item.avatar ? item.avatar.trim() : null}
                size={52}
                round
              />
              <NameText>{item.shoppingGuideName}</NameText>
            </LeftItem>
            <RightItem>
              <RightText
                front={index < 2}
              >
                {item.achievement}
              </RightText>
            </RightItem>
          </CardItemWrapper>
        </CardItemGroup>
      </View>
    );
  }
}

RankItem.defaultProps = {
  item: {},
  index: 0,
  isLast: false,
};

RankItem.propTypes = {
  item: PropTypes.objectOf(PropTypes.any),
  index: PropTypes.number,
  isLast: PropTypes.bool,
};

export default RankItem;
