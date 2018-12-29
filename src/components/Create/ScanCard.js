/**
 * @component ScanCard.js
 * @description 扫描名片组合
 * @time 2018/8/15
 * @author JUSTIN XU
 */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Platform } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import { ToastUtil, TouchableView } from 'xn-react-native-applets';

// constants
import { theme } from 'constants';

// components
import { ActionSheet } from 'components/Modal';

const ContainerView = styled.View`
  padding-top: ${theme.moderateScale(11)};
  padding-left: ${theme.moderateScale(15)};
  padding-right: ${theme.moderateScale(15)};
  padding-bottom: ${theme.moderateScale(17)};
`;

const BackImage = styled.ImageBackground`
  width: 100%;
  height: ${theme.moderateScale(184)};
  display: flex;
  border-radius: ${theme.moderateScale(8)};
  justify-content: center;
  align-items: center;
`;

const ButtonView = styled(TouchableView)`
  width: ${theme.moderateScale(280)};
  height: ${theme.moderateScale(53)};
  border: 1px solid ${theme.primaryColor};
  border-radius: ${theme.moderateScale(8)};
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
`;

const ButtonText = styled.Text`
  font-size: ${theme.moderateScale(16)};
  color: ${theme.primaryColor};
`;

const config = {
  width: 400,
  height: 400,
  cropping: true,
};

class ScanCard extends React.PureComponent {
  state = {
    isVisible: false,
  };
  onToggleVisible = () => {
    this.setState({
      isVisible: !this.state.isVisible,
    });
  };
  onPressImagePicker = async ({ index }) => {
    // const {
    //   props: {
    //     onPress,
    //   },
    // } = this;
    let image;
    if (index === 0) {
      image = await ImagePicker.openCamera(config);
    }
    if (index === 1) {
      image = await ImagePicker.openPicker(config);
    }
    const file = this.getFile(image);
    // TODO
    ToastUtil.showSuccess(`image: ${JSON.stringify(file)}`);
    // await updateImage(file);
    // onPress();
  };
  getFile = image => ({
    uri: Platform.OS === 'android' ? image.path : image.path.replace('file://', ''),
    type: 'image/jpeg',
    name: 'photo',
  });
  render() {
    const {
      state: {
        isVisible,
      },
    } = this;
    const actionSheetProps = {
      isVisible,
      onPressClose: this.onToggleVisible,
      onPressItem: this.onPressImagePicker,
      list: [
        { leftText: '相机' },
        { leftText: '相册' },
      ],
    };
    return (
      <ContainerView>
        <ActionSheet {...actionSheetProps} />
        <BackImage
          source={require('../../img/crm/create/cardBack.png')}
        >
          <ButtonView onPress={this.onToggleVisible}>
            <ButtonText>扫描名片</ButtonText>
          </ButtonView>
        </BackImage>
      </ContainerView>
    );
  }
}

ScanCard.defaultProps = {
  onPress: () => null,
};

ScanCard.propTypes = {
  onPress: PropTypes.func,
};

export default ScanCard;
