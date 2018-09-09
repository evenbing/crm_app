/**
 * @component LeftItem.js
 * @description 左边条目组件
 * @time 2018/8/12
 * @author JUSTIN XU
 */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import moment from 'moment';
import { theme } from '../../../../constants';

const ContainerView = styled.View`
  flex: 1;
`;

const TitleView = styled.View`
  margin-bottom: ${theme.moderateScale(10)};
`;

const TitleText = styled.Text`
  font-size: ${theme.moderateScale(16)};
  font-family: ${theme.fontMedium};
  color: ${theme.listTitleColor};
`;

const TipView = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
const TipText = styled.Text`
  font-family: ${theme.fontRegular};
  color: ${props => props.color || theme.textGrayColor};
`;

class LeftItem extends React.PureComponent {
  render() {
    const { item } = this.props;
    return (
      <ContainerView>
        <TitleView>
          <TitleText>{item.code}</TitleText>
        </TitleView>
        <TipView>
          <TipText>客户：{item.issueId}</TipText>
          <TipText>合同：{item.pactId}</TipText>
        </TipView>
        <TipView>
          <TipText>实际回款：¥{item.receivablePrice}</TipText>
          <TipText>实际日期：{item.receivableDate ? moment(Number(item.receivableDate)).format('YYYY-MM-DD') : '--'}</TipText>
        </TipView>
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
