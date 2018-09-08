/**
 * @component LeftItem.js
 * @description 左边条目组件
 * @time 2018/8/12
 * @author JUSTIN XU
 */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { theme } from '../../../../constants/index';

const ContainerView = styled.View`
  flex: 1;
`;

const TitleView = styled.View`
  margin-bottom: ${theme.moderateScale(10)};
  flex-direction: row;
  align-items: center;
`;

const TitleText = styled.Text`
  font-size: ${theme.moderateScale(16)};
  font-family: ${theme.fontMedium};
  color: ${theme.listTitleColor};
`;

const JobText = styled.Text`
  margin-left: ${theme.moderateScale(15)};
  color: ${theme.textGrayColor};
`;

const TipText = styled.Text`
  color: ${props => props.color || theme.textGrayColor};
`;

class LeftItem extends React.PureComponent {
  render() {
    const { item } = this.props;
    return (
      <ContainerView>
        <TitleView>
          <TitleText>{item.name}</TitleText>
          <JobText>{item.jobTitle}</JobText>
        </TitleView>
        <TipText>{item.companyName}</TipText>
      </ContainerView>
    );
  }
}

LeftItem.defaultProps = {
  item: {},
};

LeftItem.propTypes = {
  item: PropTypes.objectOf(PropTypes.any),
};

export default LeftItem;
