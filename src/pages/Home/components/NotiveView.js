import React from 'react';
import styled from 'styled-components';
import { moderateScale } from '../../../utils/scale';
import AlarmIcon from '../../../img/home/alarm.png';

const Container = styled.TouchableOpacity`
  width: ${moderateScale(30)};
  height: ${moderateScale(30)};
  justify-content: center;
  align-items: center;
  border-radius: ${moderateScale(15)};
  background-color: #4B8442;
`;

const Icon = styled.Image.attrs({
  source: AlarmIcon,
})`
  width: ${moderateScale(25)};
  height: ${moderateScale(25)};
`;

const Point = styled.View`
  width: ${moderateScale(10)};
  height: ${moderateScale(10)};
  border-radius: ${moderateScale(5)};
  background-color: red;
  position: absolute;
  top: ${moderateScale(0)};
  right: ${moderateScale(0)};
`;

const NoticeView = ({
  onPress = null,
  yes,
}) => (
  <Container onPress={onPress}>
    <Icon />
    {yes && <Point />}
  </Container>
);

export default NoticeView;
