/**
 * @component index.js
 * @description 团队角色
 * @time 2018/8/30
 * @author JUSTIN XU
 */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { theme } from '../../../constants';

// components
import { CommStatusBar, LeftBackIcon } from '../../../components/Layout';
import { ContainerView } from '../../../components/Styles/Layout';
import { HorizontalDivider } from '../../../components/Styles/Divider';
import Accordion from '../../../components/Accordion';
import MemberItem from '../../../components/MemberList/MemberItem';

// static source
import HeaderIcon from '../../../img/test/mine_head.png';
import LeaderIcon from '../../../img/team/leader.png';
import AddUserIcon from '../../../img/team/addUser.png';

const SectionView = styled.View`
   background-color: ${theme.whiteColor};
`;

class TeamRoles extends React.Component {
  state = {
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
        hiddenIcon
        onPress={this.onPressItem}
      />
    ));
  };
  render() {
    const {
      state: {
        memberList,
      },
    } = this;
    return (
      <ContainerView
        bottomPadding
      >
        <CommStatusBar />
        <SectionView>
          <Accordion
            left="负责人"
            rightUnit={null}
            foldIcon={LeaderIcon}
            unfoldIcon={LeaderIcon}
            showMain
            iconSize={23}
            onPress={() => alert(1)}
          >
            {this.renderMemeberItem(memberList.slice(0, 1))}
          </Accordion>
          <HorizontalDivider />
          <Accordion
            left="团队成员"
            rightUnit={null}
            showMain
            foldIcon={AddUserIcon}
            unfoldIcon={AddUserIcon}
            iconSize={23}
            onPress={() => alert(2)}
          >
            {this.renderMemeberItem(memberList)}
          </Accordion>
        </SectionView>
      </ContainerView>
    );
  }
}

TeamRoles.navigationOptions = ({ navigation, screenProps }) => ({
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
