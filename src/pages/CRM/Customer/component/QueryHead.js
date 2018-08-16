/**
 * @component QueryHead.js
 * @description 查询头部组件
 * @time 2018/8/14
 * @author JUSTIN XU
 */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { theme } from '../../../../constants';

// components
import { HeaderBack } from '../../../../components/Details';
import { VerticalDivider } from '../../../../components/Styles/Divider';

const ContainerView = styled.View``;

const ItemView = styled.View`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  margin-top: ${props => theme.moderateScale(props.marginTop || 0)};
  margin-bottom: ${props => theme.moderateScale(props.marginBottom || 0)};
  position: relative;
`;

const DecorationView = styled.View`
  position: absolute;
  width: 100%;
  height: 1px;
  left: 0;
  bottom: ${theme.moderateScale(-4)};
  background-color: ${theme.whiteColor};
`;

const NameText = styled.Text`
  font-size: ${theme.moderateScale(20)};
  color: ${theme.whiteColor};
`;

const PersonView = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const PersonTitle = styled.Text`
  color: ${theme.whiteColor};
  margin-bottom: ${theme.moderateScale(4)};
`;

const PersonText = styled.Text`
  font-size: ${theme.moderateScale(18)};
  color: ${theme.whiteColor};
`;

class QueryHead extends React.PureComponent {
  render() {
    return (
      <HeaderBack>
        <ContainerView>
          <ItemView
            marginTop={41}
          >
            <ItemView>
              <NameText>西风网络</NameText>
              <DecorationView />
            </ItemView>
          </ItemView>
          <ItemView
            marginTop={25}
            marginBottom={14}
          >
            <PersonView>
              <PersonTitle>法定代表人</PersonTitle>
              <PersonText>张三</PersonText>
            </PersonView>
            <VerticalDivider
              width={3}
              height={26}
              backgroundColor={theme.whiteColor}
            />
            <PersonView>
              <PersonTitle>法定代表人</PersonTitle>
              <PersonText>张三</PersonText>
            </PersonView>
          </ItemView>
        </ContainerView>
      </HeaderBack>
    );
  }
}

QueryHead.defaultProps = {
  item: {},
};

QueryHead.propTypes = {
  item: PropTypes.objectOf(PropTypes.any),
};

export default QueryHead;
