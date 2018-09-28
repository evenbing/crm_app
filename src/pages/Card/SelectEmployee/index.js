/**
 * @component index.js
 * @description 选择全部成员
 * @time 2018/8/28
 * @author JUSTIN XU
 */
import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react/native';
import { theme } from '../../../constants';

// components
import { CommStatusBar, LeftBackIcon, RightView } from '../../../components/Layout';
import SearchInput from '../../../components/SearchInput';
import { ContainerView } from '../../../components/Styles/Layout';
import MemberList from '../../../components/MemberList/MemberList';

import EmployeeStore from '../../../logicStores/employee';

@observer
class SelectEmployee extends React.Component {
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
      goBack,
      state: {
        params: {
          callback,
          radio,
        },
      },
    } = this.props.navigation;
    const {
      employeeList,
    } = EmployeeStore;
    const list = employeeList.filter(v => v.actived);
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
    EmployeeStore.updateEmployeeActive({ item, radio });
  };

  getData = () => {
    const {
      moduleId,
      moduleType,
    } = this.props.navigation.state.params || {};
    EmployeeStore.getEmployeeListReq({
      moduleID: moduleId,
      moduleType,
    });
  };

  render() {
    const {
      state: {
        search,
      },
    } = this;
    const {
      filterEmployeeList,
      updateSearch,
    } = EmployeeStore;
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
          dataList={filterEmployeeList}
          onPressItem={this.onPressItem}
        />
      </ContainerView>
    );
  }
}

SelectEmployee.navigationOptions = ({ navigation }) => ({
  title: '转移负责人',
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

SelectEmployee.defaultProps = {};

SelectEmployee.propTypes = {
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

export default SelectEmployee;
