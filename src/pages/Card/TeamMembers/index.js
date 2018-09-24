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
  state = {
    search: null,
  };
  componentDidMount() {
    this.props.navigation.setParams({
      onPressRight: this.onPressRight,
    });
    this.getData();
  }

  onPressRight = () => {
    const {
      props: {
        navigation: { goBack, state },
      },
    } = this;
    const {
      teamList,
    } = TeamStore;
    const obj = teamList.find(v => !!v.actived);
    if (!obj) return;
    state.params.callback(obj);
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
      state: {
        search,
      },
    } = this;
    const {
      filterTeamList,
      updateSearch,
    } = TeamStore;
    return (
      <ContainerView
        bottomPadding
      >
        <CommStatusBar />
        <SearchInput
          value={search}
          placeholder="输入姓名搜索成员"
          onChangeText={(search) => {
            if (!search) updateSearch(search);
            this.setState({ search });
          }}
          onSearch={() => updateSearch(search)}
        />
        <MemberList
          renderHeader={this.renderHeader}
          headerHeight={theme.moderateScale(44)}
          dataList={filterTeamList}
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
