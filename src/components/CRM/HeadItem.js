/**
 * @component HeadItem.js
 * @description CRM headerItem
 * @time 2018/8/5
 * @author zhao
 */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { View, Text, Image } from 'react-native';
import { TouchableView } from 'xn-react-native-applets';

import { theme } from '../../constants';

const Container = styled(View)`
  flex: 1;
  alignItems: center;
  justifyContent: center;
`;

const ContentView = styled(TouchableView)`
alignItems: center;
`;
const IconView = styled(View)`
width: 36px;
height: 36px;
alignItems: center;
justifyContent: center;
`;

const ItemText = styled(Text)`
font-family: ${theme.fontMedium};
font-size: 16px;
color: #FFFFFF;
background-color: transparent;
`;

const LineView = styled(View)`
position: absolute;
right: 0;
width: 1px;
`;

const LineBorder = styled(View)`
borderWidth: 1px;
borderColor: #A1D6B7;
height: 28px;
`;
class HeadItem extends PureComponent {
  state = {}

  render() {
    const {
      data,
      isLast,
      onPress,
    } = this.props;

    const { icon, text, width, height } = data;
    return (
      <Container>
        <ContentView onPress={onPress}>
          <IconView><Image source={icon} /></IconView>
          <ItemText>{text}</ItemText>
        </ContentView>
        { !isLast ? <LineView><LineBorder /></LineView> : null }
      </Container>
    );
  }
}

HeadItem.defaultProps = {
  data: {},
  isLast: false,
  onPress: () => null,
};

HeadItem.propTypes = {
  data: PropTypes.objectOf(PropTypes.any),
  isLast: PropTypes.bool,
  onPress: PropTypes.func,
};

export default HeadItem;
