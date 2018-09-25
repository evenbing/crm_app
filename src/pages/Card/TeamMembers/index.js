/**
 * @component index.js
 * @description 团队成员
 * @time 2018/8/28
 * @author JUSTIN XU
 */
import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react/native';
import { routers, theme } from '../../../constants';

// components
import { CommStatusBar, LeftBackIcon, RightView } from '../../../components/Layout';
import SearchInput from '../../../components/SearchInput';
import { ContainerView } from '../../../components/Styles/Layout';
import CompanyHeader from '../../../components/MemberList/CompanyHeader';
import MemberList from '../../../components/MemberList/MemberList';
import TeamStore from '../../../logicStores/team';

@observer
class TeamMembers extends React.Component {
  componentDidMount() {
    this.props.navigation.setParams({
      onPressRight: this.onPressRight,
    });
    this.getData();
  }

  onPressRight = () => {
    const {
      goBack,
      state: {
        params: {
          callback,
          radio,
        },
      },
    } = this.props.navigation;
    const {
      teamList,
    } = TeamStore;
    const list = teamList.filter(v => v.actived);
    if (list.length === 0) return;
    if (radio) {
      callback && callback(list);
    } else {
      callback && callback(list[0]);
    }
    goBack();
  };

  onPressItem = ({ item }) => {
    const {
      radio = false, // false 单选 true 多选
    } = this.props.navigation.state.params || {};
    TeamStore.updateTeamActive({ item, radio });
  };

  getData = () => {
    const {
      moduleId,
      moduleType,
    } = this.props.navigation.state.params || {};
    TeamStore.getTeamListReq({
      moduleId,
      moduleType,
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
      teamList,
    } = TeamStore;
    return (
      <ContainerView
        bottomPadding
      >
        <CommStatusBar />
        <SearchInput placeholder="输入姓名搜索成员" />
        <MemberList
          renderHeader={this.renderHeader}
          headerHeight={theme.moderateScale(44)}
          dataList={teamList}
          onPressItem={this.onPressItem}
        />
      </ContainerView>
    );
  }
}

TeamMembers.navigationOptions = ({ navigation }) => ({
  title: '团队成员',
  headerLeft: (
    <LeftBackIcon
      onPress={() => navigation.goBack()}
    />
  ),
  headerRight: (
    <RightView
      onPress={navigation.state.params ? navigation.state.params.onPressRight : null}
      right="完成"
      rightStyle={{
        color: theme.primaryColor,
      }}
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
