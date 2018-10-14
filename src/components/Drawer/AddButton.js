/**
 * @component AddButton.js
 * @description 添加组件
 * @time 2018/9/1
 * @author JUSTIN XU
 */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { theme } from '../../constants';

// components
import TouchableView from '../TouchableView';
import Thumbnail from '../Thumbnail';

const ContainerView = styled.View`
  margin-top: ${theme.moderateScale(31)};
  padding-left: ${theme.moderateScale(10)};
  padding-right: ${theme.moderateScale(18)};
`;

const AddButtonView = styled(TouchableView)`
  flex: 1;
  height: ${theme.moderateScale(48)};
  border: 1px solid ${theme.primaryColor};
  border-radius: ${theme.moderateScale(4)};
  flex-direction: row;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const AddButtonText = styled.Text`
  font-size: ${theme.moderateScale(16)};
  color: ${theme.primaryColor};
  margin-left: ${theme.moderateScale(10)};
`;

class AddButton extends React.PureComponent {
  render() {
    const {
      onPress,
    } = this.props;
    return (
      <ContainerView>
        <AddButtonView onPress={onPress}>
          <Thumbnail
            source={require('../../img/drawer/add.png')}
            size={19}
          />
          <AddButtonText>添加筛选字段</AddButtonText>
        </AddButtonView>
      </ContainerView>
    );
  }
}

AddButton.defaultProps = {
  onPress: () => null,
};

AddButton.propTypes = {
  onPress: PropTypes.func,
};

export default AddButton;
