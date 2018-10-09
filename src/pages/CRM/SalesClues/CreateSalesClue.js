/**
 * @component CreateSalesClue.js
 * @description 新增线索页面
 * @time 2018/8/15
 * @author JUSTIN XU
 */
import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react/native';

import { theme, routers } from '../../../constants';
// components
import { CommStatusBar, LeftBackIcon, RightView } from '../../../components/Layout';
import { ContainerScrollView } from '../../../components/Styles/Layout';
import { HorizontalDivider } from '../../../components/Styles/Divider';
import TitleItem from '../../../components/Details/TitleItem';
import NavInputItem from '../../../components/NavInputItem';
// import ScanCard from '../../../components/Create/ScanCard';
import CreateMoreButton from '../../../components/Create/CreateMoreButton';
import { SalesClueEnum } from '../../../constants/form';
import { MarkActivityType } from '../../../constants/enum';
import SalesClueStore from '../../../logicStores/salesClues';
import Toast from '../../../utils/toast';
import { CenterText } from '../../../components/Styles/Form';

@observer
class CreateSalesClue extends React.Component {
  componentDidMount() {
    this.props.navigation.setParams({
      onPressRight: this.onPressRight,
    });
  }

  onPressRight = async () => {
    const {
      state: {
        name,
        companyName,
        activityId,
        activityName,
        departmentId,
        departmentName,
      },
      props: { navigation: {
        goBack,
        state: { params: { reFetchDataList = null } },
      } },
    } = this;
    try {
      if (!name) throw new Error(SalesClueEnum.name);
      if (!companyName) throw new Error(SalesClueEnum.companyName);
      if (!activityId || !activityName) throw new Error(SalesClueEnum.activity);
      if (!departmentId || !departmentName) throw new Error(SalesClueEnum.department);

      SalesClueStore.createSalesChanceReq({
        name,
        companyName,
        activityId,
        departmentId,
      }, () => {
        reFetchDataList && reFetchDataList();
        goBack();
      });
    } catch (error) {
      Toast.error(error.message);
    }
  }

  render() {
    const {
      props: { navigation: { navigate } },
      state: {
        name,
        companyName,
        activityId,
        activityName,
        departmentId,
        departmentName,
      },
    } = this;
    return (
      <ContainerScrollView
        bottomPadding
      >
        <CommStatusBar />
        {/* <ScanCard
          onPress={() => alert(1)}
        /> */}
        <TitleItem
          text="必填信息"
          fontSize={16}
        />                                                                                    
        <NavInputItem
          leftText="姓名"
          {...theme.getLeftStyle({
            placeholder: SalesClueEnum.name,
            value: name,
            onChangeText: name => this.setState({ name }),
          })}
        />
        <NavInputItem
          leftText="公司名称"
          {...theme.getLeftStyle({
            placeholder: SalesClueEnum.companyName,
            value: companyName,
            onChangeText: companyName => this.setState({ companyName }),
          })}
        />
        <NavInputItem
          leftText="市场活动"
          onPress={() => navigate(routers.markActivity, {
            type: MarkActivityType,
            callback: (item) => {
              if (!Object.keys(item).length) return;
              this.setState({
                activityId: item.key,
                activityName: item.title,
              });
            },
          })}
          center={
            <CenterText active={activityId && activityName}>
              {
                (activityId && activityName) ? activityName :
                  SalesClueEnum.activity
              }
            </CenterText>
          }
          {...theme.navItemStyle}
        />
        <NavInputItem
          leftText="所属部门"
          onPress={() => navigate(routers.selectDepartment, {
            id: departmentId,
            callback: (item) => {
              if (!Object.keys(item).length) return;
              this.setState({
                departmentId: item.id,
                departmentName: item.name,
              });
            },
          })}
          center={
            <CenterText active={departmentId && departmentName}>
              {
                (departmentId && departmentName) ? departmentName : SalesClueEnum.department
              }
            </CenterText>
          }
          {...theme.navItemStyle}
        />
        <HorizontalDivider
          height={41}
        />
        <CreateMoreButton
          onPress={() => navigate(routers.createSalesClueMore)}
        />
      </ContainerScrollView>
    );
  }
}

CreateSalesClue.navigationOptions = ({ navigation }) => ({
  title: '新增线索',
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

CreateSalesClue.defaultProps = {};

CreateSalesClue.propTypes = {
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

export default CreateSalesClue;
