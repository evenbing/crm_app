import React from 'react';
import { View, StatusBar } from 'react-native';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ImagePicker from 'react-native-image-crop-picker';
import uuidv1 from 'uuid/v1';

import addIcon from '../../img/add.png';
import { theme } from '../../constants';
import { KEY_ADD } from './Constants';
import ImageItem from './components/ImageItem';
import ImagePager from './components/ImagePager';
import { formatPickerImage } from '../../utils/base';

const configOptions = {
  // width: 400,
  // height: 400,
  cropping: false,
};

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

const addIconObject = {
  key: KEY_ADD,
  image: addIcon,
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
      pagerData: [],
      data: [{
        key: KEY_ADD,
        image: addIcon,
      }],
      selectedIndex: 0,
    };
  }

  onPickImage1 =() => {
    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = {
          uri: response.uri,
          path: response.path,
        };
        const pagerData = [...this.state.pagerData];
        pagerData.push({
          key: uuidv1(),
          image: source,
        });
        const data = [...pagerData];
        data.push(addIconObject);
        this.setState({
          pagerData,
          data,
        });
        this.props.onConfirm && this.props.onConfirm(pagerData);
      }
    });
  }

  onPickImage = async ({ value }) => {
    // const {
    //   props: {
    //     onPressImage,
    //   },
    // } = this;
    // StatusBar.setBarStyle('dark-content');
    try {
      let image;
      console.log('onPickImage');

      if (value === '相机') {
        image = await ImagePicker.openCamera(configOptions);
      }
      if (value === '相册') {
        console.log('onPickImage');
        image = await ImagePicker.openPicker(configOptions);
      }
      console.log({ image });

      if (!Object.keys(image).length) return;
      // onPressImage(formatPickerImage(image));
      const source = {
        uri: image.sourceURL,
        path: image.path,
      };
      const pagerData = [...this.state.pagerData];
      pagerData.push({
        key: uuidv1(),
        image: source,
      });
      const data = [...pagerData];
      data.push(addIconObject);
      this.setState({
        pagerData,
        data,
      });
      // this.props.onConfirm && this.props.onConfirm(pagerData);
    } catch (e) {
      //
    } finally {
      // StatusBar.setBarStyle('light-content');
    }
  }

  onPressItem = index => () => {
    this.setState({
      selectedIndex: index,
    }, () => {
      this.setState({
        isVisible: true });
    });
  }

  onCloseModal = () => {
    this.setState({ isVisible: false });
  }

  onDeleteImage = () => {
    const { selectedIndex } = this.state;
    const pagerData = this.state.pagerData.filter((item, index) => index !== selectedIndex);
    const data = [...pagerData];
    data.push(addIconObject);
    if (pagerData.length === 0) {
      this.setState({
        isVisible: false,
      }, () => {
        this.setState({
          pagerData,
          data,
        });
      });
    } else {
      this.setState({
        // pagerData,
        data,
      });
    }
    this.props.onConfirm && this.props.onConfirm(pagerData);
  }

  onPageSelected = (selectedIndex) => {
    this.setState({ selectedIndex });
  }

  keyExtractor = item => item.key

  renderItem =({ item, index }) => {
    return (
      <ImageItem
        item={item}
        onPressAdd={this.onPickImage}
        onPressItem={this.onPressItem(index)}
      />
    );
  }

  render() {
    const {
      data,
      pagerData,
      selectedIndex,
    } = this.state;
    return (
      <View>
        <Container
          data={data}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderItem}
        />
        <ImagePager
          data={pagerData}
          isVisible={this.state.isVisible}
          onCloseModal={() => this.onCloseModal()}
          onDeleteImage={this.onDeleteImage}
          onPageSelected={this.onPageSelected}
          selectedIndex={selectedIndex}
        />
      </View>

    );
  }
}

ImageCollector.propTypes = {
  onConfirm: PropTypes.func.isRequired,
};

export default ImageCollector;
