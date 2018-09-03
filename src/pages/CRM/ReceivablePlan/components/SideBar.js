/**
 * @component SideBar.js
 * @description 侧边栏
 * @time 2018/9/1
 * @author JUSTIN XU
 */
import React from 'react';
import PropTypes from 'prop-types';

// components
import { FooterGroup, AddButton, LabelItem } from '../../../../components/Drawer';
import {
  ContainerView,
  TopTitleText,
  HeaderView,
  HeaderTitleText,
  HeaderLabelView,
} from '../../../../components/Drawer/Styles';

class SideBar extends React.PureComponent {
  state = {
    firstIndex: -1,
    secondIndex: -1,
    thirdIndex: -1,
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
      secondIndex: -1,
      thirdIndex: -1,
    });
  };
  onSubmit = () => {
    const {
      state: {
        firstIndex,
        secondIndex,
        thirdIndex,
      },
      props: {
        firstList,
        secondList,
        thirdList,
      },
    } = this;
    const arr = [];
    if (firstIndex !== -1) {
      arr.push(firstList[firstIndex]);
    }
    if (secondIndex !== -1) {
      arr.push(secondList[secondIndex]);
    }
    if (thirdIndex !== -1) {
      arr.push(thirdList[thirdIndex]);
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
        secondIndex,
        thirdIndex,
      },
      props: {
        firstList,
        secondList,
        thirdList,
        onPressAdd,
      },
    } = this;
    return (
      <ContainerView>
        <HeaderView>
          <TopTitleText>字段筛选</TopTitleText>
          <HeaderTitleText marginTop={25}>合同状态</HeaderTitleText>
          <HeaderLabelView>
            {this.renderLabelItem([...firstList], firstIndex, 'firstIndex')}
          </HeaderLabelView>
          <HeaderTitleText>行业</HeaderTitleText>
          <HeaderLabelView>
            {this.renderLabelItem([...secondList], secondIndex, 'secondIndex')}
          </HeaderLabelView>
          <HeaderTitleText>客户名称</HeaderTitleText>
          <HeaderLabelView>
            {this.renderLabelItem([...thirdList], thirdIndex, 'thirdIndex')}
          </HeaderLabelView>
          <AddButton
            onPress={onPressAdd}
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
  secondList: [],
  thirdList: [],
  onFilter: () => null,
  onPressAdd: () => null,
};

SideBar.propTypes = {
  firstList: PropTypes.arrayOf(PropTypes.any),
  secondList: PropTypes.arrayOf(PropTypes.any),
  thirdList: PropTypes.arrayOf(PropTypes.any),
  onFilter: PropTypes.func,
  onPressAdd: PropTypes.func,
};

export default SideBar;
