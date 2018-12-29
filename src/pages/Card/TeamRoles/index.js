/**
 * @component index.js
 * @description 团队角色
 * @time 2018/8/30
 * @author JUSTIN XU
 */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { RefreshControl } from 'react-native';
import { observer } from 'mobx-react/native';
import { CommStatusBar, LeftBackIcon } from 'xn-react-native-applets';

// constants
import { theme, routers } from 'constants';

// static source
import LeaderIcon from 'img/team/leader.png';
import AddUserIcon from 'img/team/addUser.png';

// components
import { ContainerView } from 'components/Styles/Layout';
import { HorizontalDivider } from 'components/Styles/Divider';
import Accordion from 'components/Accordion';
import MemberItem from 'components/MemberList/MemberItem';

// logicStores
import EmployeeStore from 'logicStores/employee';

const SectionView = styled.ScrollView`
   background-color: ${theme.whiteColor};
`;

@observer
class TeamRoles extends React.Component {
  componentDidMount() {
    this.getData();
  }
  onPressItem = ({ item, index }) => {
    // TODO 判断当前的激活list
    console.log('@item', item);
    console.log('@index', index);
  };
  getData = () => {
    const {
      moduleId,
      moduleType,
      ownerUserId,
    } = this.props.navigation.state.params || {};
    EmployeeStore.getManageTeamListReq({
      moduleID: moduleId,
      moduleType,
      ownerUserId,
    });
  };
  renderMemeberItem = (list) => {
    if (!list.length) return null;
    return list.map((v, i) => (
      <MemberItem
        key={v.userName}
        item={v}
        index={i}
        hiddenIcon
        onPress={this.onPressItem}
      />
    ));
  };
  render() {
    const {
      manageTeamList: {
        refreshing,
        ownerUserList,
        teamList,
      },
    } = EmployeeStore;
    const {
      props: {
        navigation: { navigate, state, goBack },
      },
    } = this;
    const { moduleId, moduleType, callback } = state.params || {};
    return (
      <ContainerView
        bottomPadding
      >
        <CommStatusBar />
        <SectionView
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={this.getData}
            />
          }
        >
          <Accordion
            left="负责人"
            rightUnit={null}
            foldIcon={LeaderIcon}
            unfoldIcon={LeaderIcon}
            showMain
            iconSize={23}
            onPress={() => navigate(routers.selectEmployee, {
              callback: (obj) => {
                callback && callback(obj);
                goBack();
              },
            })}
          >
            {this.renderMemeberItem(ownerUserList)}
          </Accordion>
          <HorizontalDivider />
          <Accordion
            left="团队成员"
            rightUnit={null}
            showMain
            foldIcon={AddUserIcon}
            unfoldIcon={AddUserIcon}
            iconSize={23}
            onPress={() => navigate(routers.selectEmployee, {
              title: '请选择团队成员',
              callback: (obj) => {
                EmployeeStore.createTeamUserReq({
                  userId: obj.userId,
                  userName: obj.userName,
                  moduleId,
                  moduleType,
                }, this.getData);
              },
            })}
          >
            {this.renderMemeberItem(teamList)}
          </Accordion>
        </SectionView>
      </ContainerView>
    );
  }
}

TeamRoles.navigationOptions = ({ navigation }) => ({
  title: '团队成员',
  headerLeft: (
    <LeftBackIcon
      onPress={() => navigation.goBack()}
    />
  ),
});

TeamRoles.defaultProps = {};

TeamRoles.propTypes = {
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

export default TeamRoles;
