/**
 * @component CreateSalesClue.js
 * @description 新增线索页面
 * @time 2018/8/15
 * @author JUSTIN XU
 */
import React from 'react';
import PropTypes from 'prop-types';
import { CommStatusBar, LeftBackIcon, RightView, ToastUtil } from 'xn-react-native-applets';

// constants
import { theme, routers } from 'constants';
import { SalesClueEnum } from 'constants/form';
import { MarkActivityType } from 'constants/enum';

// logicStores
import SalesCluesModel from 'logicStores/salesClues';

// components
import { ContainerScrollView } from 'components/Styles/Layout';
import { HorizontalDivider } from 'components/Styles/Divider';
import TitleItem from 'components/Details/TitleItem';
import NavInputItem from 'components/NavInputItem';
// import ScanCard from '../../../components/Create/ScanCard';
import CreateMoreButton from 'components/Create/CreateMoreButton';
import { ListView, CenterText } from 'components/Styles/Form';

class CreateSalesClue extends React.Component {
  state = {
    name: null,
    companyName: null,
    departmentId: null,
    leadsDepartmentName: null,
    activityId: null,
    activityName: null,
  };
  componentDidMount() {
    this.props.navigation.setParams({
      onPressRight: this.onPressRight,
    });
  }
  onPressRight = () => {
    const {
      state: {
        name,
        companyName,
        departmentId,
        activityId,
      },
      props: {
        navigation: {
          goBack,
        },
      },
    } = this;
    try {
      if (!name) throw new Error(SalesClueEnum.name);
      if (!companyName) throw new Error(SalesClueEnum.companyName);
      if (!departmentId) throw new Error(SalesClueEnum.departmentId);
      if (!activityId) throw new Error(SalesClueEnum.activityId);
      SalesCluesModel.createSalesClueReq({
        name,
        companyName,
        departmentId,
        activityId,
      }, () => {
        goBack();
      });
    } catch (error) {
      ToastUtil.showWarning(error.message);
    }
  };
  render() {
    const {
      state: {
        name,
        companyName,
        departmentId,
        leadsDepartmentName,
        activityId,
        activityName,
      },
      props: {
        navigation: { navigate },
      },
    } = this;
    return (
      <ContainerScrollView
        bottomPadding
      >
        <CommStatusBar />
        {/*
         <ScanCard
           onPress={() => alert(1)}
         />
         */}
        <TitleItem
          text="必填信息"
          fontSize={16}
        />
        <ListView>
          <NavInputItem
            leftText="姓名"
            {...theme.getLeftStyle({
              placeholder: SalesClueEnum.name,
              value: name,
              onChangeText: name => this.setState({ name }),
            })}
          />
          <NavInputItem
            leftText="客户名称"
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
                  activityId: item.id,
                  activityName: item.name,
                });
              },
            })}
            center={
              <CenterText active={activityId && activityName}>
                {
                  (activityId && activityName) ? activityName : SalesClueEnum.activityId
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
                  leadsDepartmentName: item.name,
                });
              },
            })}
            center={
              <CenterText active={departmentId && leadsDepartmentName}>
                {
                  (departmentId && leadsDepartmentName) ? leadsDepartmentName : SalesClueEnum.departmentId
                }
              </CenterText>
            }
            {...theme.navItemStyle}
            isLast
          />
        </ListView>
        <HorizontalDivider
          height={41}
        />
        <CreateMoreButton
          onPress={() => navigate(routers.createSalesClueMore, {
            item: this.state,
          })}
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
      onPress={navigation.state.params ? navigation.state.params.onPressRight : () => null}
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
