/**
 * @component ListItem.js
 * @description 列表条目组件
 * @time 2018/8/7
 * @author JUSTIN XU
 */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { TouchableView } from 'xn-react-native-applets';

import { theme } from 'constants';

const ContainerView = styled(TouchableView)`
  padding-left: ${theme.moderateScale(15)};
  padding-right: ${theme.moderateScale(15)};
  height: ${theme.moderateScale(88)};
  width: 100%;
  background-color: #ffffff;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  position: relative;
`;

const LeftView = styled.View`
  flex: 1;
  justify-content: center;
`;

const TitleView = styled.Text.attrs({
  numberOfLines: 1,
})`
  font-size: ${theme.moderateScale(16)};
  font-family: ${theme.fontMedium};
  color: ${theme.listTitleColor};
  margin-bottom: ${theme.moderateScale(10)};
`;

const TipText = styled.Text`
  color: ${props => props.color || theme.textGrayColor};
`;

const BoardView = styled.View`
  position: absolute;
  bottom: 0;
  left: ${theme.moderateScale(15)};
  height: 1px;
  width: 100%;
  background-color: ${theme.borderColor};
`;

const RightView = styled.View`
  padding-left: ${theme.moderateScale(17)};
  justify-content: center;
  height: ${theme.moderateScale(36)};
  border-left-width: 1px;
  min-width: ${theme.moderateScale(60)};
  border-left-color: ${theme.borderColor};
`;

const RightText = styled.Text`
  color: ${props => props.color || theme.primaryColor};
`;

class ListItem extends React.PureComponent {
  renderLeft = () => {
    const {
      item: { title, tipList = [] },
      left,
      titleStyle,
    } = this.props;
    if (React.isValidElement(left)) return left;
    if (left === 'hidden') return null;
    return (
      <LeftView>
        <TitleView style={titleStyle}>{title}</TitleView>
        {
          (Array.isArray(tipList) && tipList.length) ?
            tipList.map((_, i) => (
              <TipText
                key={_}
                color={i === 0 && theme.listTipColor}
              >
                {_}
              </TipText>
            )) : null
        }
      </LeftView>
    );
  };
  renderRight = () => {
    const {
      item: { statusText, statusColor },
      right,
    } = this.props;
    if (React.isValidElement(right)) return right;
    if (right === 'hidden') return null;
    return (
      <RightView>
        <RightText
          color={statusColor || '#5374C7'}
        >
          {statusText}
        </RightText>
      </RightView>
    );
  };
  render() {
    const {
      props: {
        containerStyle,
        onPress,
      },
    } = this;
    return (
      <ContainerView
        style={containerStyle}
        onPress={onPress}
      >
        {this.renderLeft()}
        {this.renderRight()}
        <BoardView />
      </ContainerView>
    );
  }
}

ListItem.defaultProps = {
  item: {},
  left: null,
  right: null,
  titleStyle: {},
  containerStyle: {},
  onPress: () => null,
};

ListItem.propTypes = {
  item: PropTypes.objectOf(PropTypes.any),
  left: PropTypes.node,
  right: PropTypes.node,
  titleStyle: PropTypes.objectOf(PropTypes.any),
  containerStyle: PropTypes.objectOf(PropTypes.any),
  onPress: PropTypes.func,
};

export default ListItem;
