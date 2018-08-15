/**
 * @component ButtonList.js
 * @description 滑动按钮list组件
 * @time 2018/8/7
 * @author JUSTIN XU
 */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { theme } from '../../constants/index';
import TouchableView from '../TouchableView';

import Thumbnail from '../Thumbnail';

const ContainerView = styled.View`
  background-color: ${theme.pageBackColor};
  height: ${theme.moderateScale(88)};
  padding-left: ${theme.moderateScale(15)};
  padding-right: ${theme.moderateScale(15)};
  flex-direction: row;
`;

const ButtonView = styled(TouchableView)`
  width: ${theme.moderateScale(44)};
  flex: 1;
  justify-content: center;
  align-items: center;
`;

class ButtonList extends React.PureComponent {
  renderListItem = () => {
    const {
      list,
      onPressItem,
    } = this.props;
    if (!(list && list.length)) return null;
    return list.map((item, index) => (
      <ButtonView
        key={item}
        onPress={() => onPressItem({ item, index })}
      >
        <Thumbnail
          source={item}
          size={28}
        />
      </ButtonView>
    ));
  };
  render() {
    return (
      <ContainerView>
        {this.renderListItem()}
      </ContainerView>
    );
  }
}

ButtonList.defaultProps = {
  list: [],
  onPressItem: () => null,
};

ButtonList.propTypes = {
  list: PropTypes.arrayOf(PropTypes.any),
  onPressItem: PropTypes.func,
};

export default ButtonList;
