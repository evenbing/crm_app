/**
 * @component EditorFooter.js
 * @description 编辑底部
 * @time 2018/8/15
 * @author JUSTIN XU
 */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { moderateScale } from '../../utils/scale';
import { theme } from '../../constants';

// components
import TouchableView from '../TouchableView';

const FooterView = styled(TouchableView)`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: ${moderateScale(50)};
  border-top-width: 1px;
  border-top-color: #F6F6F6;
  background-color: ${theme.whiteColor};
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const FooterText = styled.Text`
  color: ${theme.primaryColor};
  font-size: ${moderateScale(18)};
`;


class EditorFooter extends React.PureComponent {
  render() {
    const {
      onPress,
    } = this.props;
    return (
      <FooterView onPress={onPress}>
        <FooterText>编辑资料</FooterText>
      </FooterView>
    );
  }
}

EditorFooter.defaultProps = {
  onPress: () => null,
};

EditorFooter.propTypes = {
  onPress: PropTypes.func,
};

export default EditorFooter;
