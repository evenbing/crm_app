import React from 'react';
import { View, Image } from 'react-native';
import PropTypes from 'prop-types';
import Modal from 'react-native-modal';
import { IndicatorViewPager, PagerDotIndicator } from 'rn-viewpager';
import HeaderComponent from './Header';
import { moderateScale } from '../../../utils/scale';

const ImagePager = ({
  data,
  isVisible,
  selectedIndex,
  onCloseModal,
  onDeleteImage,
  onPageSelected,
}) => (
  <Modal
    animationType="fade"
    isVisible={isVisible}
    style={{ margin: 0 }}
    onBackButtonPress={onCloseModal}
  >
    <HeaderComponent
      onLeftPress={onCloseModal}
      onRightPress={onDeleteImage}
    />
    <IndicatorViewPager
      initialPage={selectedIndex}
      onPageSelected={(params) => {
        onPageSelected(params.position);
      }}
      style={{ flex: 1 }}
      indicator={
        <PagerDotIndicator
          pageCount={data.length}
          selectedDotStyle={{
            width: moderateScale(10),
          }}
        />
      }
    >
      {
        data.map((item, index) => {
          const {
            image,
            filePath,
          } = item;
          return (
            <View key={index}>
              <Image
                style={{ flex: 1 }}
                source={filePath ? { uri: filePath } : image}
              />
            </View>
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
  selectedIndex: PropTypes.number.isRequired,
  onCloseModal: PropTypes.func.isRequired,
  onDeleteImage: PropTypes.func.isRequired,
  onPageSelected: PropTypes.func.isRequired,
};

export default ImagePager;
