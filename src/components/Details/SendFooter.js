/**
 * @component SendFooter.js
 * @description 发送底部
 * @time 2018/8/14
 * @author JUSTIN XU
 */
import React from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Input } from 'native-base';
import { moderateScale } from '../../utils/scale';
import { theme } from '../../constants';

// components
import Thumbnail from '../Thumbnail';
import TouchableView from '../TouchableView';

const ContainerView = styled.View`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: ${moderateScale(50)};
  border-top-width: 1px;
  border-top-color: #F6F6F6;
  background-color: #fff;
  flex-direction: row;
  align-items: center;
`;

const RecordText = styled.Text`
  font-family: ${theme.fontRegular};
  font-size: ${moderateScale(12)};
  color: #18B548;
  margin-left: ${moderateScale(15)};
`;

const SendView = styled.View`
  flex: 1;
  height: ${moderateScale(30)};
  border-width: 1px;
  border-color: #DDDDDD;
  border-radius: 4;
  margin-left: ${moderateScale(10)};
  position: relative;
`;

const SendTextView = styled(TouchableView)`
  height: 100%;
  position: absolute;
  top: 0;
  right: 0;
  align-items: center;
  justify-content: center;
`;

const SendText = styled.Text`
  color: ${theme.primaryColor};
  padding-right: ${moderateScale(8)};
`;

const InputView = styled(Input)`
  height: ${moderateScale(30)};
`;

const IconView = styled.View`
  width: ${moderateScale(30)};
  height: ${moderateScale(30)};
  margin-left: ${props => moderateScale(props.marginLeft || 0)};
  margin-right: ${props => moderateScale(props.marginRight || 0)};
`;

class SendFooter extends React.PureComponent {
  render() {
    return (
      <ContainerView>
        <RecordText>记录类型</RecordText>
        <Thumbnail
          source={require('../../img/crm/details/triangleUp.png')}
          size={8}
        />
        <SendView>
          <InputView />
          <SendTextView onPress={() => alert('send')}>
            <SendText>发送</SendText>
          </SendTextView>
        </SendView>
        <IconView
          marginLeft={3}
        >
          <Thumbnail
            source={require('../../img/voice.png')}
            size={27}
          />
        </IconView>
        <IconView
          marginLeft={8}
          marginRight={13}
        >
          <Thumbnail
            source={require('../../img/picture.png')}
            size={27}
          />
        </IconView>
      </ContainerView>
    );
  }
}

SendFooter.defaultProps = {};

SendFooter.propTypes = {};

export default SendFooter;
