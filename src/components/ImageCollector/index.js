import React from 'react';
import { View, Platform } from 'react-native';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ImagePicker from 'react-native-image-crop-picker';
import uuidv1 from 'uuid/v1';

// static source
import addIcon from 'img/add.png';

// utils
import Toast from 'utils/toast';
import { attachmentDelete } from 'service/attachment';

import { theme } from '../../constants';
import { KEY_ADD } from './Constants';
import ImageItem from './components/ImageItem';
import ImagePager from './components/ImagePager';

const configOptions = {
  width: 400,
  height: 400,
  cropping: true,
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

  componentWillReceiveProps(props) {
    if (this.props.data !== props.data && props.data.length) {
      this.setState({
        data: [
          ...props.data,
          {
            key: KEY_ADD,
            image: addIcon,
          },
        ],
        pagerData: [...props.data],
      });
    }
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
      if (value === '相机') {
        image = await ImagePicker.openCamera(configOptions);
      }
      if (value === '相册') {
        image = await ImagePicker.openPicker(configOptions);
      }
      if (!Object.keys(image).length) return;
      const source = {
        uri: Platform.OS === 'android' ? image.path : image.path.replace('file://', ''),
        path: Platform.OS === 'android' ? image.path : image.path.replace('file://', ''),
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
    } catch (e) {
      Toast.showError(e.message);
    } finally {
      // StatusBar.setBarStyle('light-content');
    }
  }

  onPressItem = index => () => {
    this.setState({
      selectedIndex: index,
    }, () => {
      this.setState({
        isVisible: true,
      });
    });
  }

  onCloseModal = () => {
    this.setState({ isVisible: false });
  }

  onDeleteImage = async () => {
    const { selectedIndex, pagerData } = this.state;
    const { id, filePath } = pagerData[selectedIndex];
    if (filePath) {
      await attachmentDelete({ id });
    }
    const currPagerData = pagerData.filter((item, index) => index !== selectedIndex);
    const data = [...currPagerData];
    data.push(addIconObject);
    if (currPagerData.length === 0) {
      await this.setState({
        isVisible: false,
      });
    }
    await this.setState({
      pagerData: currPagerData,
      data,
    });
    this.props.onConfirm && this.props.onConfirm(currPagerData);
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
    console.log(data);
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

ImageCollector.defaultProps = {
  data: [],
};

ImageCollector.propTypes = {
  onConfirm: PropTypes.func.isRequired,
  data: PropTypes.arrayOf(PropTypes.any),
};

export default ImageCollector;
