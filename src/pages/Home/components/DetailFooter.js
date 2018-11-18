/**
 * @component DetailFooter.js
 * @description 详情底部组件
 * @time 2018/11/18
 * @author JUSTIN XU
 */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// constants
import { theme } from '../../../constants';

// utils
import { getFooterBottom } from '../../../utils/utils';

// components
import TouchableView from '../../../components/TouchableView';

const ContainerView = styled.View`
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  flex-direction: row;
  padding-bottom: ${getFooterBottom()};
  background-color: ${theme.whiteColor};
`;

const ItemView = styled(TouchableView)`
  flex: 1;
   height: ${theme.moderateScale(50)};
  justify-content: center;
  align-items: center;
  background-color: ${props => props.backgroundColor};
`;

const TextView = styled.Text`
  color: ${theme.whiteColor};
  font-size: ${theme.moderateScale(15)};
`;

class DetailFooter extends React.PureComponent {
  render() {
    const {
      props: {
        onPressEditor,
        onPressDelete,
      },
    } = this;
    return (
      <ContainerView>
        <ItemView
          backgroundColor={theme.primaryColor}
          onPress={onPressEditor}
        >
          <TextView>编辑</TextView>
        </ItemView>
        <ItemView
          backgroundColor="#E03C3C"
          onPress={onPressDelete}
        >
          <TextView>删除</TextView>
        </ItemView>
      </ContainerView>
    );
  }
}

DetailFooter.defaultProps = {
  onPressEditor: () => null,
  onPressDelete: () => null,
};

DetailFooter.propTypes = {
  onPressEditor: PropTypes.func,
  onPressDelete: PropTypes.func,
};

export default DetailFooter;
