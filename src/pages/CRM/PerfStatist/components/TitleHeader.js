/**
 * @component TitleHeader.js
 * @description 标题头部组件
 * @time 2018/8/12
 * @author JUSTIN XU
 */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// constants
import { theme } from 'constants';

// components
import Thumbnail from 'components/Thumbnail';

const ContainerView = styled.View`
  margin-top: ${props => theme.moderateScale(props.marginTop || 10)};
  margin-bottom: ${props => theme.moderateScale(props.marginBottom || 4)};
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const TitleText = styled.Text`
  font-size: ${theme.moderateScale(18)};
  font-family: ${theme.fontMedium};
  margin-left: ${props => theme.moderateScale(props.marginLeft || 5)};
  color: #515151;
`;

class TitleHeader extends React.PureComponent {
  render() {
    const {
      containerStyle,
      titleStyle,
      imageSize,
      imageSource,
      title,
    } = this.props;
    return (
      <ContainerView
        style={containerStyle}
      >
        <Thumbnail
          size={theme.moderateScale(imageSize)}
          source={imageSource}
        />
        <TitleText titleStyle={titleStyle}>{title}</TitleText>
      </ContainerView>
    );
  }
}

TitleHeader.defaultProps = {
  containerStyle: {},
  titleStyle: {},
  imageSize: 18,
  imageSource: null,
  title: null,
};

TitleHeader.propTypes = {
  containerStyle: PropTypes.objectOf(PropTypes.any),
  titleStyle: PropTypes.objectOf(PropTypes.any),
  imageSize: PropTypes.number,
  imageSource: PropTypes.number,
  title: PropTypes.string,
};

export default TitleHeader;
