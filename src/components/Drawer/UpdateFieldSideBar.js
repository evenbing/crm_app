/**
 * @component UpdateFieldSideBar.js
 * @description 更新筛选
 * @time 2018/9/3
 * @author JUSTIN XU
 */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import theme from '../../constants/theme';

// components
import FooterGroup from './FooterGroup';
import Thumbnail from '../Thumbnail';
import TouchableView from '../TouchableView';
import {
  ContainerView,
  TopTitleText,
  HeaderView,
  HeaderTitleText,
} from './Styles';

const ListItemView = styled.View`
  height: ${theme.moderateScale(44)};
  padding: 0 ${theme.moderateScale(10)}px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  border-color: ${theme.borderColor};
  border-top-width: 1px;
  border-bottom-width: ${props => props.isLast ? '1px' : 0};
`;

const ListLeftText = styled.Text`
  font-size: ${theme.moderateScale(16)};
  color: ${theme.textColor};
`;

const ListRightView = styled.View`
  flex-direction: row;
  align-items: center;
`;

class UpdateFieldSideBar extends React.PureComponent {
  renderSelectedItem = () => {
    const {
      props: {
        selectedList,
      },
    } = this;
    if (!selectedList.length) return null;
    return selectedList.map((_, index) => (
      <ListItemView
        key={_}
        isLast={index === selectedList.length - 1}
      >
        <ListLeftText>{_}</ListLeftText>
        <ListRightView>
          <TouchableView>
            <Thumbnail
              source={require('../../img/drawer/drag.png')}
              size={16}
              style={{
                marginRight: theme.moderateScale(24),
              }}
            />
          </TouchableView>
          <TouchableView>
            <Thumbnail
              source={require('../../img/drawer/delete.png')}
              size={16}
            />
          </TouchableView>
        </ListRightView>
      </ListItemView>
    ));
  };
  renderOptionalItem = () => {
    const {
      props: {
        optionalList,
      },
    } = this;
    if (!optionalList.length) return null;
    return optionalList.map((_, index) => (
      <ListItemView
        key={_}
        isLast={index === optionalList.length - 1}
      >
        <ListLeftText>{_}</ListLeftText>
        <TouchableView>
          <Thumbnail
            source={require('../../img/drawer/add.png')}
            size={16}
          />
        </TouchableView>
      </ListItemView>
    ));
  };
  render() {
    const {
      props: {
        onReset,
        onFilter,
      },
    } = this;
    return (
      <ContainerView>
        <HeaderView>
          <TopTitleText>字段筛选</TopTitleText>
          <HeaderTitleText
            marginTop={25}
            marginBottom={10}
          >
            已选字段（3）
          </HeaderTitleText>
          {this.renderSelectedItem()}
          <HeaderTitleText
            marginTop={25}
            marginBottom={10}
          >
            可选字段
          </HeaderTitleText>
          {this.renderOptionalItem()}
        </HeaderView>
        <FooterGroup
          onReset={onReset}
          onSubmit={onFilter}
        />
      </ContainerView>
    );
  }
}

UpdateFieldSideBar.defaultProps = {
  selectedList: [],
  optionalList: [],
  onReset: () => null,
  onFilter: () => null,
};

UpdateFieldSideBar.propTypes = {
  selectedList: PropTypes.arrayOf(PropTypes.any),
  optionalList: PropTypes.arrayOf(PropTypes.any),
  onReset: PropTypes.func,
  onFilter: PropTypes.func,
};

export default UpdateFieldSideBar;
