import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ImagePicker from 'react-native-image-picker';
import uuidv1 from 'uuid/v1';

import addIcon from '../../img/add.png';
import delIcon from '../../img/drawer/delete.png';
import { theme } from '../../constants';
import { width } from '../../utils/scale';

const options = {
  title: 'Select Avatar',
  customButtons: [
    { name: 'fb', title: 'Choose Photo from Facebook' },
  ],
  storageOptions: {
    skipBackup: true,
    path: 'images',
  },
};

const Container = styled.FlatList.attrs({
  numColumns: 4,
})`
  width: 100%;
  padding: 0px ${theme.moderateScale(15)}px;
`;

const ImageView = styled.TouchableOpacity`
  justify-content: center;
  align-items: center;
  background-color: #F5F5F5;
  margin-right: ${theme.moderateScale(10)}px;
  margin-bottom: ${theme.moderateScale(10)}px;
`;

const Image = styled.Image`
  width: ${((width - theme.moderateScale(2 * 14) - (3 * theme.moderateScale(10))) / 4)}px;
  height: ${((width - theme.moderateScale(2 * 14) - (3 * theme.moderateScale(10))) / 4)}px;
`;

const DeleteIconView = styled.TouchableOpacity`
  width: ${theme.moderateScale(20)}px;
  height: ${theme.moderateScale(20)}px;
  border-radius: ${theme.moderateScale(10)}px;
  background-color: transparent;
  position: absolute;
  top: 0px;
  right: 0px;
  justify-content: center;
  align-items: center;
`;

const DeleteIcon = styled.Image`
  width: ${theme.moderateScale(20)}px;
  height: ${theme.moderateScale(20)}px;
  border-radius: ${theme.moderateScale(10)}px;
`;

const KEY_ADD = 'KEY_ADD';

class ImageCollector extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: [{
        key: 1,
        image: addIcon,
      }, {
        key: 2,
        image: addIcon,
      }, {
        key: 3,
        image: addIcon,
      }, {
        key: 4,
        image: addIcon,
      }, {
        key: KEY_ADD,
        image: addIcon,
      }],
    };
  }

  onPickImage =() => {
    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = { uri: response.uri };
        // You can also display the image using data:
        // let source = { uri: 'data:image/jpeg;base64,' + response.data };
        const d = this.state.data.map(item => item);
        const loc = this.state.data.length - 1;
        d.splice(loc, 0, {
          key: uuidv1(),
          image: source,
        });
        this.setState({
          data: d,
        });
      }
    });
  }

  keyExtractor = item => item.key

  renderItem =({ item }) => {
    const {
      key,
      image,
    } = item;
    return (
      <ImageView
        disabled={key !== KEY_ADD}
        onPress={this.onPickImage}
      >
        {
          key !== KEY_ADD &&
          <DeleteIconView>
            <DeleteIcon source={delIcon} />
          </DeleteIconView>
        }
        <Image source={image} />
      </ImageView>
    );
  }

  render() {
    const {
      state: {
        data,
      },
      props: {
        onConfirm,
      },
    } = this;
    return (
      <View>
        <Container
          data={data}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderItem}
        />
      </View>

    );
  }
}

ImageCollector.propTypes = {
  onConfirm: PropTypes.func.isRequired,
};

export default ImageCollector;
