import React from 'react';
import { Text, Image, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import Modal from 'react-native-modal';
import { IndicatorViewPager, PagerDotIndicator } from 'rn-viewpager';

const ImagePager = ({
  data,
  isVisible,
  onCloseModal,
}) => (
  <Modal
    animationType="fade"
    isVisible={isVisible}
    style={{ margin: 0 }}
    onBackButtonPress={onCloseModal}
  >
    <IndicatorViewPager
      style={{ flex: 1 }}
      indicator={<PagerDotIndicator pageCount={3} />}
    >
      {
        data.map((item) => {
          const {
            key,
            image,
          } = item;
          return (
            <TouchableOpacity key={key} style={{ backgroundColor: 'transparent' }}>
              <Image style={{ flex: 1 }} source={image} />
            </TouchableOpacity>
          );
        })
      }
    </IndicatorViewPager>
  </Modal>
);

ImagePager.defaultProps = {
  isVisible: false,
};

ImagePager.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    key: PropTypes.string,
    image: PropTypes.shape({
      uri: PropTypes.string,
    }),
  })).isRequired,
  isVisible: PropTypes.bool,
  onCloseModal: PropTypes.func.isRequired,
};

export default ImagePager;
