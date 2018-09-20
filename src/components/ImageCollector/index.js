import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import addIcon from '../../img/add.png';
import { theme } from '../../constants';
import { width } from '../../utils/scale';

const Container = styled.FlatList.attrs({
  horizontal: true,
})`
  width: 100%;
`;

const ImageView = styled.View`
  padding: ${theme.moderateScale(10)}px;
  justify-content: center;
  align-items: center;
  background-color: #F5F5F5;
`;

const Image = styled.Image`
  width: ${((width - theme.moderateScale(2 * 14)) / 4) - (2 * theme.moderateScale(10))};
  height: ${((width - theme.moderateScale(2 * 14)) / 4) - (2 * theme.moderateScale(10))};
`;

class ImageCollector extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      data: [{
        key: '1',
        image: addIcon,
      }],
    };
  }

  keyExtractor = item => item.key

  renderItem =({ item }) => {
    const {
      image,
    } = item;
    return (
      <ImageView>
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
      <Container 
        data={data}
        keyExtractor={this.keyExtractor}
        renderItem={this.renderItem}
      />
    );
  }
}

ImageCollector.propTypes = {
  onConfirm: PropTypes.func.isRequired,
};

export default ImageCollector;
