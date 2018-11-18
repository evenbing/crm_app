/**
 * @component index.js
 * @description 公司部门
 * @time 2018/8/16
 * @author JUSTIN XU
 */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { theme } from '../../../constants';

// components
import { CommStatusBar, LeftBackIcon } from '../../../components/Layout';
import SearchInput from '../../../components/SearchInput';
import { ContainerView } from '../../../components/Styles/Layout';
import Accordion from '../../../components/Accordion';
import MemberItem from '../../../components/MemberList/MemberItem';

// static source
import HeaderIcon from '../../../img/test/mine_head.png';

const SectionView = styled.View`
   background-color: ${theme.whiteColor};
`;

class CompanyDepartment extends React.Component {
  state = {
    activeIndex: 0,
    memberList: [
      { active: false, name: '张三', url: HeaderIcon },
      { active: false, name: '张三三', url: HeaderIcon },
      { active: false, name: '三张三', url: HeaderIcon },
    ],
  };
  componentDidMount() {
    this.props.navigation.setParams({
      onPressRight: this.onPressRight,
    });
  }
  onPressRight = () => alert('finish');
  onPressHeader = (index) => {
    this.setState({ activeIndex: index });
  };
  onPressItem = ({ item, index }) => {
    // TODO 判断当前的激活list
    const { memberList } = this.state;
    memberList[index].active = !memberList[index].active;
    this.setState({
      memberList,
    });
  };
  renderMemeberItem = (list) => {
    if (!list.length) return null;
    return list.map((v, i) => (
      <MemberItem
        key={v.name}
        item={v}
        index={i}
        onPress={this.onPressItem}
      />
    ));
  };
  render() {
    const {
      state: {
        activeIndex,
        memberList,
      },
    } = this;
    return (
      <ContainerView
        bottomPadding
      >
        <CommStatusBar />
        <SearchInput placeholder="输入姓名搜索成员" />
        <SectionView>
          <Accordion
            left="销售部"
            rightUnit={null}
            showMain={activeIndex === 0}
            onPress={() => this.onPressHeader(0)}
          >
            {this.renderMemeberItem(memberList)}
          </Accordion>
          <Accordion
            left="市场部"
            rightUnit={null}
            showMain={activeIndex === 1}
            onPress={() => this.onPressHeader(1)}
          >
            {this.renderMemeberItem(memberList)}
          </Accordion>
          <Accordion
            left="售后部"
            rightUnit={null}
            showMain={activeIndex === 2}
            onPress={() => this.onPressHeader(2)}
          >
            {this.renderMemeberItem(memberList)}
          </Accordion>
          <Accordion
            left="售前部"
            rightUnit={null}
            showMain={activeIndex === 3}
            onPress={() => this.onPressHeader(3)}
          >
            {this.renderMemeberItem(memberList)}
          </Accordion>
        </SectionView>
      </ContainerView>
    );
  }
}

CompanyDepartment.navigationOptions = ({ navigation }) => ({
  title: '公司部门',
  headerLeft: (
    <LeftBackIcon
      onPress={() => navigation.goBack()}
    />
  ),
});

CompanyDepartment.defaultProps = {};

CompanyDepartment.propTypes = {
  navigation: PropTypes.shape({
    dispatch: PropTypes.func,
    goBack: PropTypes.func,
    navigate: PropTypes.func,
    setParams: PropTypes.func,
    state: PropTypes.shape({
      key: PropTypes.string,
      routeName: PropTypes.string,
      params: PropTypes.object,
    }),
  }).isRequired,
};

export default CompanyDepartment;
