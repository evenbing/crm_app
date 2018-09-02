/**
 * @component SideBar.js
 * @description 侧边栏
 * @time 2018/9/1
 * @author JUSTIN XU
 */
import React from 'react';
import PropTypes from 'prop-types';
import theme from '../../../../constants/theme';

// components
import { FooterGroup, AddButton, LabelItem } from '../../../../components/Drawer';
import {
  ContainerView,
  TopTitleText,
  HeaderView,
  HeaderTitleText,
  HeaderLabelView,
} from '../../../../components/Drawer/Styles';
import SearchInput from '../../../../components/SearchInput';

class SideBar extends React.PureComponent {
  state = {
    firstIndex: -1,
    searchValue: null,
  };
  onToggle = (type, index) => {
    let currIndex = index;
    if (this.state[type] === index) {
      currIndex = -1;
    }
    this.setState({ [type]: currIndex });
  };
  onReset = () => {
    this.setState({
      firstIndex: -1,
    });
  };
  onSubmit = () => {
    const {
      state: {
        firstIndex,
        searchValue,
      },
      props: {
        firstList,
      },
    } = this;
    const arr = [];
    if (firstIndex !== -1) {
      arr.push(firstList[firstIndex]);
    }
    if (searchValue) {
      arr.push({ name: searchValue });
    }
    this.props.onFilter(arr);
  };
  renderLabelItem = (list, state, type) => {
    return list.map((value, index) => (
      <LabelItem
        item={value}
        active={index === state}
        key={value.name}
        onPress={() => this.onToggle(type, index)}
      />
    ));
  };
  render() {
    const {
      state: {
        firstIndex,
        searchValue,
      },
      props: {
        firstList,
      },
    } = this;
    return (
      <ContainerView>
        <HeaderView>
          <TopTitleText>字段筛选</TopTitleText>
          <HeaderTitleText marginTop={25}>联系人姓名</HeaderTitleText>
          <SearchInput
            borderColor={theme.borderColor}
            borderWidth="1"
            borderRadius="4"
            searchStyle={{
              paddingLeft: theme.moderateScale(15),
              paddingRight: theme.moderateScale(15),
              paddingTop: theme.moderateScale(11),
              paddingBottom: 0,
            }}
            placeholder="输入关键字"
            value={searchValue}
            onChangeText={val => this.setState({ searchValue: val })}
          />
          <HeaderTitleText marginTop={20}>最近跟进日期</HeaderTitleText>
          <HeaderLabelView>
            {this.renderLabelItem([...firstList], firstIndex, 'firstIndex')}
          </HeaderLabelView>
          <AddButton
            onPress={() => alert(1)}
          />
        </HeaderView>
        <FooterGroup
          onReset={this.onReset}
          onSubmit={this.onSubmit}
        />
      </ContainerView>
    );
  }
}

SideBar.defaultProps = {
  firstList: [],
  onFilter: () => null,
};

SideBar.propTypes = {
  firstList: PropTypes.arrayOf(PropTypes.any),
  onFilter: PropTypes.func,
};

export default SideBar;
