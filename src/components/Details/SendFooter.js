/**
 * @component SendFooter.js
 * @description 发送底部组件
 * @time 2018/8/14
 * @author JUSTIN XU
 */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { StatusBar, KeyboardAvoidingView } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';

// utils
import { moderateScale } from '../../utils/scale';
import { getFooterBottom, isIos, isIphoneX } from '../../utils/utils';
import { mapToArray, formatPickerImage } from '../../utils/base';
import Toast from '../../utils/toast';

// constants
import { theme } from '../../constants';
import { DynamicRecordType, CameraOrPickerType } from '../../constants/enum';

// components
import Thumbnail from '../Thumbnail';
import TouchableView from '../TouchableView';
import { SendFilterList, FormActionSheet } from '../Modal';
import TextInput from '../TextInput';

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

const RecordType = styled.TouchableOpacity``;

const RecordText = styled.Text`
  font-family: ${theme.fontRegular};
  font-size: ${moderateScale(12)};
  color: ${theme.primaryColor};
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

const IconView = styled.View`
  width: ${moderateScale(30)};
  height: ${moderateScale(30)};
  margin-left: ${props => moderateScale(props.marginLeft || 0)};
  margin-right: ${props => moderateScale(props.marginRight || 0)};
  justify-content: center;
  align-items: center;
`;

const configOptions = {
  width: 400,
  height: 400,
  cropping: true,
};

class SendFooter extends React.PureComponent {
  state = {
    isVisible: false,
    selectedIndex: 0,
    content: null,
  };

  componentWillMount() {
    this.setState({ content: null });
  }

  onPressFilterItem = ({ index }) => {
    this.setState({ selectedIndex: index });
  };

  onPickImage = async ({ value }) => {
    const {
      props: {
        onPressImage,
      },
    } = this;
    StatusBar.setBarStyle('dark-content');
    try {
      let image;
      if (value === '相机') {
        image = await ImagePicker.openCamera(configOptions);
      }
      if (value === '相册') {
        image = await ImagePicker.openPicker(configOptions);
      }
      if (!Object.keys(image).length) return;
      onPressImage(formatPickerImage(image));
    } catch (e) {
      //
    } finally {
      StatusBar.setBarStyle('light-content');
    }
  }

  onPressSend = () => {
    const {
      state: {
        content,
        selectedIndex,
      },
      props: {
        recordTypeList,
        onPressSend,
      },
    } = this;
    try {
      // if (!content) throw new Error('请输入内容');
      const contentType = recordTypeList[selectedIndex].key;
      onPressSend({ content, contentType }, () => {
        this.setState({ content: null });
      });
    } catch (err) {
      Toast.showError(err.message);
    }
  };

  getKeyboardVerticalOffset = () => {
    if (isIphoneX()) return 85;
    if (isIos()) return 60;
  };

  selectRecordType= () => {
    this.setState({
      isVisible: !this.state.isVisible,
    });
  };

  render() {
    const {
      state: {
        isVisible,
        selectedIndex,
        content,
      },
      props: {
        recordTypeList,
        cacheImageMap,
      },
    } = this;
    return (
      <KeyboardAvoidingView
        behavior={isIos ? 'position' : null}
        keyboardVerticalOffset={this.getKeyboardVerticalOffset()}
      >
        <ContainerView>
          <SendFilterList
            isVisible={isVisible}
            onPressClose={this.selectRecordType}
            selectedIndex={selectedIndex}
            onPressItem={this.onPressFilterItem}
            // marginTop={getHeaderHeight() + getHeaderPadding() + 88}
            marginBottom={50 + getFooterBottom()}
            flexDirection="column-reverse"
            list={recordTypeList}
          />
          <RecordType onPress={this.selectRecordType}>
            <RecordText>记录类型</RecordText>
          </RecordType>
          <Thumbnail
            source={require('../../img/crm/details/triangleUp.png')}
            size={8}
          />
          <SendView>
            <TextInput
              value={content}
              onChangeText={content => this.setState({ content })}
            />
            <SendTextView
              onPress={this.onPressSend}
            >
              <SendText>发送</SendText>
            </SendTextView>
          </SendView>
          {/*
         <IconView
          marginLeft={3}
        >
          <Thumbnail
            source={require('../../img/voice.png')}
            size={27}
          />
        </IconView>
         */}
          <FormActionSheet
            onConfirm={this.onPickImage}
            typeEnum={CameraOrPickerType}
          >
            <IconView
              marginLeft={8}
              marginRight={13}
            >
              <Thumbnail
                imgUri={cacheImageMap.filePath}
                source={require('../../img/picture.png')}
                size={27}
              />
            </IconView>
          </FormActionSheet>
        </ContainerView>
      </KeyboardAvoidingView>
    );
  }
}

SendFooter.defaultProps = {
  recordTypeList: mapToArray(DynamicRecordType, 'leftText'),
  onPressSend: () => null,
  onPressImage: () => null,
  cacheImageMap: {},
};

SendFooter.propTypes = {
  recordTypeList: PropTypes.arrayOf(PropTypes.any),
  onPressSend: PropTypes.func,
  onPressImage: PropTypes.func,
  cacheImageMap: PropTypes.objectOf(PropTypes.any),
};

export default SendFooter;
