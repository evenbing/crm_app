/**
 * @component PreviewHead.js
 * @description 榜单预览
 * @time 2018/6/24
 * @author JUSTIN XU
 */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Image } from 'react-native';
import { theme } from '../constants/index';

const MembBirthView = styled.View`
  margin-top: 24px;
  margin-bottom: 18px;
  height: 25px;
  padding: 0 14px;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
`;

const BodyView = styled.View`
  flex: 2;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const LeftView = styled.View`
  flex: 1;
`;

const RightView = styled.View`
  flex: 1;
  align-items: flex-end;
`;

const BodyTitle = styled.Text`
  margin-left: 5px;
  font-family: ${theme.fontMedium};
  font-size: 18px;
  color: #515151;
`;

class previewHead extends React.PureComponent {
  renderBody = () => {
    const {
      bodyIcon,
      bodyTitle,
      bodyElem,
    } = this.props;
    if (bodyElem) {
      return bodyElem;
    }
    return (
      <BodyView>
        <Image
          source={bodyIcon}
        />
        <BodyTitle>{bodyTitle}</BodyTitle>
      </BodyView>
    );
  }
  render() {
    const {
      rightElem,
      containerStyle,
    } = this.props;
    return (
      <MembBirthView style={containerStyle}>
        <LeftView />
        {this.renderBody()}
        <RightView>
          {rightElem}
        </RightView>
      </MembBirthView>
    );
  }
}

previewHead.defaultProps = {
  bodyTitle: null,
  bodyIcon: 0,
  rightElem: null,
  bodyElem: null,
  containerStyle: null,
  titleStyle: null,
};

previewHead.propTypes = {
  bodyTitle: PropTypes.string,
  bodyIcon: PropTypes.number,
  rightElem: PropTypes.element,
  bodyElem: PropTypes.element,
  containerStyle: PropTypes.objectOf(PropTypes.any),
  titleStyle: PropTypes.objectOf(PropTypes.any),
};

export default previewHead;

