/**
 * @component SendFooter.js
 * @description 发送底部
 * @time 2018/8/14
 * @author JUSTIN XU
 */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ImagePicker from 'react-native-image-picker';
import { moderateScale } from '../../utils/scale';
import { theme } from '../../constants';
import { getFooterBottom } from '../../utils/utils';
import { mapToArray } from '../../utils/base';
import Toast from '../../utils/toast';
import { DynamicRecordType } from '../../constants/enum';

// components
import Thumbnail from '../Thumbnail';
import TouchableView from '../TouchableView';
import { SendFilterList } from '../Modal';
import TextInput from '../TextInput';

const ContainerView = styled.View`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: ${moderateScale(50 + getFooterBottom())};
  padding-bottom: ${getFooterBottom()};
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

const IconView = styled(TouchableView)`
  width: ${moderateScale(30)};
  height: ${moderateScale(30)};
  margin-left: ${props => moderateScale(props.marginLeft || 0)};
  margin-right: ${props => moderateScale(props.marginRight || 0)};
  justify-content: center;
  align-items: center;
`;

const options = {
  title: 'Select Avatar',
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
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

  onPickImage =() => {
    const {
      props: {
        onPressImage,
      },
    } = this;
    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const { uri, path = '' } = response;
        onPressImage({
          file: {
            uri,
            type: 'multipart/form-data',
            name: path.substr(path.lastIndexOf('/') + 1),
          },
          path,
        });
      }
    });
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
      if (!content) throw new Error('请输入内容');
      const contentType = recordTypeList[selectedIndex].key;
      onPressSend({ content, contentType }, () => {
        this.setState({ content: null });
      });
    } catch (err) {
      Toast.showError(err.message);
    }
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
        <IconView
          marginLeft={8}
          marginRight={13}
          onPress={this.onPickImage}
        >
          <Thumbnail
            imgUri={cacheImageMap.filePath}
            source={require('../../img/picture.png')}
            size={27}
          />
        </IconView>
      </ContainerView>
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
