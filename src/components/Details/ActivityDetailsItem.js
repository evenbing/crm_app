/**
 * @component ActivityDetailsItem.js
 * @description 活动详情组件
 * @time 2018/8/13
 * @author JUSTIN XU
 */
import React from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';
// import { theme } from '../../../constants';

const ContainerView = styled.View``;
const TextView = styled.Text``;

class ActivityDetailsItem extends React.PureComponent {
  render() {
    return (
      <ContainerView>
        <TextView>
          ActivityDetailsItem
        </TextView>
      </ContainerView>
    );
  }
}

ActivityDetailsItem.defaultProps = {};

ActivityDetailsItem.propTypes = {};

export default ActivityDetailsItem;
