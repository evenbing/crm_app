/**
 * @component TotalLis.js
 * @description 总数list组件
 * @time 2018/8/12
 * @author JUSTIN XU
 */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { theme } from '../../../constants';

const ContainerView = styled.View`
  height: ${theme.moderateScale(87)};
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 0 ${theme.moderateScale(15)}px;
  border: 1px solid ${theme.borderColor};
  border-left-width: 0;
  border-right-width: 0;
`;

const ItemView = styled.View`
  align-items: center;
  flex: 1;
`;

const ItemText = styled.Text`
  color: ${theme.primaryColor};
`;

const ItemTitle = styled.Text`
  margin-top: ${theme.moderateScale(9)};
  color: ${theme.textGrayColor};
`;

class TotalList extends React.PureComponent {
  renderItem = () => {
    const {
      props: {
        list,
      },
    } = this;
    return list.map(_ => (
      <ItemView key={`${_.text}.${_.title}`}>
        <ItemText>{_.text}</ItemText>
        <ItemTitle>{_.title}</ItemTitle>
      </ItemView>
    ));
  };
  render() {
    const {
      props: {
        list,
      },
    } = this;
    if (!list.length) return null;
    return (
      <ContainerView>
        {this.renderItem()}
      </ContainerView>
    );
  }
}

TotalList.defaultProps = {
  list: [],
};

TotalList.propTypes = {
  list: PropTypes.arrayOf(PropTypes.any),
};

export default TotalList;
