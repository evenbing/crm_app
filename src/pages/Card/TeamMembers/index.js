/**
 * @component index.js
 * @description 团队成员
 * @time 2018/8/28
 * @author JUSTIN XU
 */
import React from 'react';
import PropTypes from 'prop-types';
import { routers } from '../../../constants';
import { formatMemberList } from '../../../utils/base';

// components
import { CommStatusBar, LeftBackIcon } from '../../../components/Layout';
import SearchInput from '../../../components/SearchInput';
import { ContainerView } from '../../../components/Styles/Layout';
import CompanyHeader from '../../../components/MemberList/CompanyHeader';
import MemberList from '../../../components/MemberList/MemberList';

// static source
import HeaderIcon from '../../../img/test/mine_head.png';

class TeamMembers extends React.Component {
  state = {
    list: [
      { active: false, name: '张三', url: HeaderIcon },
      { active: false, name: '安琪', url: HeaderIcon },
      { active: false, name: '贝贝', url: HeaderIcon },
      { active: false, name: '测试', url: HeaderIcon },
      { active: false, name: '戴尔', url: HeaderIcon },
      { active: false, name: '刚哥', url: HeaderIcon },
      { active: false, name: '宁哥', url: HeaderIcon },
      { active: false, name: '五阿哥', url: HeaderIcon },
      { active: false, name: '13123123', url: HeaderIcon },
      { active: false, name: '于金', url: HeaderIcon },
      { active: false, name: '186123123', url: HeaderIcon },
      { active: false, name: '幼儿园', url: HeaderIcon },
    ],
  };
  componentDidMount() {
    this.props.navigation.setParams({
      onPressRight: this.onPressRight,
    });
  }
  onPressRight = () => alert('finish');
  onPressItem = ({ item }) => {
    // TODO 判断当前的激活list
    const { list } = this.state;
    const index = list.findIndex(v => v.name === item.name);
    list[index].active = !list[index].active;
    this.setState({
      list,
    });
  };
  renderHeader = () => {
    return (
      <CompanyHeader
        title="公司部门"
        onPress={() => this.props.navigation.navigate(routers.companyDepartment)}
      />
    );
  };
  render() {
    const {
      state: {
        list,
      },
    } = this;
    return (
      <ContainerView
        bottomPadding
      >
        <CommStatusBar />
        <SearchInput placeholder="输入姓名搜索成员" />
        <MemberList
          renderHeader={this.renderHeader}
          headerHeight={44}
          dataList={formatMemberList(list)}
          onPressItem={this.onPressItem}
        />
      </ContainerView>
    );
  }
}

TeamMembers.navigationOptions = ({ navigation, screenProps }) => ({
  title: '团队成员',
  headerLeft: (
    <LeftBackIcon
      onPress={() => navigation.goBack()}
    />
  ),
});

TeamMembers.defaultProps = {};

TeamMembers.propTypes = {
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

export default TeamMembers;
