import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { theme } from '../../../constants';
import { width } from '../../../utils/scale';
import { KEY_ADD } from '../Constants';
import { FormActionSheet } from '../../Modal';
import { CameraOrPickerType } from '../../../constants/enum';


const ImageView = styled.View`
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

const ImageItem = ({
  item: {
    key,
    image,
  },
  onPressAdd,
  onPressItem,
}) => {
  if (key === KEY_ADD) {
    return (
      <FormActionSheet
        onConfirm={onPressAdd}
        typeEnum={CameraOrPickerType}
      >
        <ImageView >
          <Image source={image} />
        </ImageView>
      </FormActionSheet>
    );
  }
  return (
    <ImageView
      onPress={key === KEY_ADD ? onPressAdd : onPressItem}
    >
      <Image source={image} />
    </ImageView>
  );
};

ImageItem.propTypes = {
  item: PropTypes.shape({
    key: PropTypes.string,
    image: PropTypes.oneOfType([
      PropTypes.shape({
        uri: PropTypes.string,
      }),
      PropTypes.number,
    ]),
  }).isRequired,
  onPressAdd: PropTypes.func.isRequired,
  onPressItem: PropTypes.func.isRequired,
};

export default ImageItem;
