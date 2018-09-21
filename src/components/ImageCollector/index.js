import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ImagePicker from 'react-native-image-picker';
import uuidv1 from 'uuid/v1';

import addIcon from '../../img/add.png';
import { theme } from '../../constants';
import { KEY_ADD } from './Constants';
import ImageItem from './components/ImageItem';
import ImagePager from './components/ImagePager';

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

class ImageCollector extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isVisible: false,
      data: [{
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

  onPressItem = () => {
    this.setState({ isVisible: true });
  }

  onCloseModal = () => {
    this.setState({ isVisible: false });
  }

  keyExtractor = item => item.key

  renderItem =({ item }) => {
    return (
      <ImageItem 
        item={item} 
        onPressAdd={this.onPickImage} 
        onPressItem={this.onPressItem}
      />
    );
  }

  render() {
    const {
      state: {
        data,
      },
    } = this;
    return (
      <View>
        <Container
          data={data}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderItem}
        />
        <ImagePager
          data={this.state.data.filter(item => item.key !== KEY_ADD)}
          isVisible={this.state.isVisible}
          onCloseModal={this.onCloseModal}
        />
      </View>

    );
  }
}

ImageCollector.propTypes = {
  onConfirm: PropTypes.func.isRequired,
};

export default ImageCollector;
