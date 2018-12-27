/**
 * @component RightView.js
 * @description 右侧容器
 * @time 2018/8/6
 * @author JUSTIN XU
 */
import React from 'react';
import PropTypes from 'prop-types';
// import PropTypes from 'prop-types';
import styled from 'styled-components';
import { theme } from '../../constants';

import TouchableView from '../TouchableView';
import Thumbnail from '../Thumbnail';
import { VerticalDivider } from '../Styles/Divider';

const ContainerView = styled.View`
  flex-direction: row;
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const RightText = styled.Text`
  font-size: ${theme.moderateScale(16)};
  color: ${theme.headerColor};
  background-color: transparent;
`;

const ContainerListView = styled.View`
  padding: ${theme.moderateScale(4)}px ${theme.moderateScale(8)}px;
  margin-right: ${theme.moderateScale(15)};
  border: 1px ${theme.borderColor};
  border-radius: ${theme.moderateScale(30)};
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const ListItemTouch = styled.TouchableOpacity``;

class RightView extends React.PureComponent {
  renderListItem = () => {
    const {
      props: {
        list,
      },
    } = this;
    const listLen = list.length - 1;
    return list.map((v, i) => {
      if (listLen !== i) {
        return ([
          <ListItemTouch
            key={`listItemTouch.${i}`}
            onPress={v.onPress}
          >
            <Thumbnail
              source={v.image}
              size={20}
            />
          </ListItemTouch>,
          <VerticalDivider
            key={`verticalDivider.${i}`}
            height={12}
            marginLeft={4}
            marginRight={4}
          />,
        ]);
      }
      return (
        <ListItemTouch
          key={`listItemTouch.${i}`}
          onPress={v.onPress}
        >
          <Thumbnail
            source={v.image}
            size={20}
          />
        </ListItemTouch>
      );
    });
  };
  renderText = () => {
    const {
      props: {
        right,
        rightStyle,
      },
    } = this;
    if (React.isValidElement(right)) return right;
    return (
      <RightText style={rightStyle}>{right}</RightText>
    );
  };
  render() {
    const {
      props: {
        list,
        onPress,
        rightViewStyle,
      },
    } = this;
    return (
      <ContainerView>
        {
          list.length ? (
            <ContainerListView>
              {this.renderListItem()}
            </ContainerListView>
          ) : (
            <TouchableView
              onPress={onPress}
              style={{
                paddingLeft: theme.moderateScale(15),
                paddingRight: theme.moderateScale(15),
                justifyContent: 'center',
                ...rightViewStyle,
              }}
            >
              {this.renderText()}
            </TouchableView>
          )
        }
      </ContainerView>
    );
  }
}

RightView.defaultProps = {
  onPress: () => null,
  right: null,
  list: [],
  rightStyle: {},
  rightViewStyle: {},
};

RightView.propTypes = {
  onPress: PropTypes.func,
  list: PropTypes.arrayOf(PropTypes.any),
  right: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.string,
    PropTypes.number,
  ]),
  rightStyle: PropTypes.oneOf(PropTypes.object),
  rightViewStyle: PropTypes.oneOf(PropTypes.object),
};

export default RightView;
