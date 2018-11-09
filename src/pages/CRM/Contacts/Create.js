/**
 * @component Create.js
 * @description 创建资料页面
 * @time 2018/8/13
 * @author JUSTIN XU
 */
import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react/native';

// constants
import { routers, theme } from '../../../constants';
import { ContactsEnum } from '../../../constants/form';
import { CustomerType } from '../../../constants/enum';

// utils
import { verifyPhone, verifyMobile } from '../../../utils/formVerify';
import Toast from '../../../utils/toast';

// components
import { CommStatusBar, LeftBackIcon, RightView } from '../../../components/Layout';
import { ContainerScrollView } from '../../../components/Styles/Layout';
import { HorizontalDivider } from '../../../components/Styles/Divider';
import TitleItem from '../../../components/Details/TitleItem';
import NavInputItem from '../../../components/NavInputItem';
import CreateMoreButton from '../../../components/Create/CreateMoreButton';
// import ScanCard from '../../../components/Create/ScanCard';
import { ListView, CenterText } from '../../../components/Styles/Form';

import ContactsModel from '../../../logicStores/contacts';

@observer
class Create extends React.Component {
  state = {
    name: null,
    companyName: null,
    customerId: null,
    jobTitle: null,
    phoneNumber: null,
    mobilePhone: null,
    departmentId: null,
    departmentName: null,
  };
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
        customerId,
        jobTitle,
        phoneNumber,
        mobilePhone,
        departmentId,
        departmentName,
      },
      props: {
        navigation: { goBack },
      },
    } = this;
    try {
      if (!name) throw new Error(ContactsEnum.name);
      if (!companyName) throw new Error(ContactsEnum.companyName);
      if (phoneNumber) await verifyPhone(phoneNumber);
      if (mobilePhone) await verifyMobile(mobilePhone);
      ContactsModel.createContactReq({
        name,
        companyName,
        customerId,
        jobTitle,
        phoneNumber,
        mobilePhone,
        departmentId,
        departmentName,
      }, () => {
        goBack();
      });
    } catch (e) {
      Toast.showWarning(e.message);
    }
  };
  render() {
    const {
      state: {
        name,
        companyName,
        jobTitle,
        phoneNumber,
        mobilePhone,
        departmentId,
        departmentName,
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
        <HorizontalDivider height={9} />
        <TitleItem text="必填信息" />
        <ListView>
          <NavInputItem
            leftText="姓名"
            {...theme.getLeftStyle({
              placeholder: ContactsEnum.name,
              value: name,
              onChangeText: name => this.setState({ name }),
            })}
          />
          <NavInputItem
            leftText="公司名称"
            onPress={() => navigate(routers.customer, {
              type: CustomerType,
              callback: (item) => {
                if (!Object.keys(item).length) return;
                this.setState({
                  customerId: item.key,
                  companyName: item.title,
                });
              },
            })}
            center={
              <CenterText active={companyName}>
                { companyName || ContactsEnum.companyName }
              </CenterText>
            }
            {...theme.navItemStyle}
          />
          <NavInputItem
            leftText="职务"
            {...theme.getLeftStyle({
              placeholder: ContactsEnum.jobTitle,
              value: jobTitle,
              onChangeText: jobTitle => this.setState({ jobTitle }),
            })}
          />
          <NavInputItem
            leftText="电话"
            {...theme.getLeftStyle({
              keyboardType: 'numeric',
              placeholder: ContactsEnum.phoneNumber,
              value: phoneNumber,
              onChangeText: phoneNumber => this.setState({ phoneNumber }),
            })}
          />
          <NavInputItem
            leftText="手机"
            {...theme.getLeftStyle({
              keyboardType: 'numeric',
              placeholder: ContactsEnum.mobilePhone,
              value: mobilePhone,
              onChangeText: mobilePhone => this.setState({ mobilePhone }),
            })}
          />
          <NavInputItem
            leftText="部门"
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
                  (departmentId && departmentName) ? departmentName : ContactsEnum.departmentName
                }
              </CenterText>
            }
            isLast
            {...theme.navItemStyle}
          />
        </ListView>
        <HorizontalDivider
          height={41}
        />
        <CreateMoreButton
          onPress={() => navigate(routers.contactEditorMore, {
            item: this.state,
          })}
        />
      </ContainerScrollView>
    );
  }
}

Create.navigationOptions = ({ navigation }) => ({
  title: '新增联系人',
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

Create.defaultProps = {};

Create.propTypes = {
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

export default Create;
