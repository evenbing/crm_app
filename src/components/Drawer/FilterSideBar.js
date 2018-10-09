/**
 * @component FilterSideBar.js
 * @description 筛选侧边栏
 * @time 2018/9/1
 * @author JUSTIN XU
 */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {
  TYPE_LIST,
  TYPE_INPUT,
} from '../../constants/drawer';
import theme from '../../constants/theme';

// components
import FooterGroup from './FooterGroup';
// import AddButton from './AddButton';
import LabelItem from './LabelItem';
import {
  ContainerView,
  TopTitleText,
  HeaderView,
  HeaderTitleText,
  HeaderLabelView,
} from './Styles';
import SearchInput from '../SearchInput';

const ListView = styled.View``;

class FilterSideBar extends React.PureComponent {
  renderLabelList = () => {
    const {
      list,
    } = this.props;
    if (!list.length) return null;
    return list.map((_, index) => (
      <ListView
        key={_.label}
      >
        <HeaderTitleText
          marginTop={index === 0 ? 25 : 17}
        >
          {_.label}
        </HeaderTitleText>
        <HeaderLabelView>
          {this.renderLabelItem(_, index)}
        </HeaderLabelView>
      </ListView>
    ));
  };
  renderLabelItem = ({ type, selectedIndex, list, placeholder, value }, pareIndex) => {
    const {
      onToggle,
    } = this.props;
    if (type === TYPE_LIST) {
      if (!list.length) return null;
      return list.map((value, currIndex) => (
        <LabelItem
          item={value}
          active={currIndex === selectedIndex}
          key={value.name}
          onPress={() => onToggle({ type, currIndex, pareIndex })}
        />
      ));
    }
    if (type === TYPE_INPUT) {
      return (
        <SearchInput
          borderColor={theme.borderColor}
          borderWidth="1"
          borderRadius="4"
          searchStyle={{
            paddingLeft: theme.moderateScale(10),
            paddingRight: theme.moderateScale(10),
            paddingTop: theme.moderateScale(11),
            paddingBottom: 0,
          }}
          placeholder={placeholder}
          value={value}
          onChangeText={value => onToggle({ type, value, pareIndex })}
        />
      );
    }
  };
  render() {
    const {
      props: {
        onReset,
        onFilter,
        // onPressAdd,
      },
    } = this;
    return (
      <ContainerView>
        <HeaderView>
          <TopTitleText>字段筛选</TopTitleText>
          {this.renderLabelList()}
          {/*
           <AddButton
            onPress={onPressAdd}
          />
           */}
        </HeaderView>
        <FooterGroup
          onReset={onReset}
          onSubmit={onFilter}
        />
      </ContainerView>
    );
  }
}

FilterSideBar.defaultProps = {
  list: [],
  onToggle: () => null,
  onReset: () => null,
  onFilter: () => null,
  onPressAdd: () => null,
};

FilterSideBar.propTypes = {
  list: PropTypes.arrayOf(PropTypes.any),
  onToggle: PropTypes.func,
  onReset: PropTypes.func,
  onFilter: PropTypes.func,
  onPressAdd: PropTypes.func,
};

export default FilterSideBar;
