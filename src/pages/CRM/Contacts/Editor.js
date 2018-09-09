/**
 * @component Editor.js
 * @description 编辑资料页面
 * @time 2018/8/13
 * @author JUSTIN XU
 */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { observer } from 'mobx-react/native';
import { routers, theme } from '../../../constants';
import { ContactsEnum } from '../../../constants/form';
import { moderateScale } from '../../../utils/scale';
import Toast from '../../../utils/toast';

// components
import { CommStatusBar, LeftBackIcon, RightView } from '../../../components/Layout';
import { ContainerScrollView } from '../../../components/Styles/Layout';
import { HorizontalDivider } from '../../../components/Styles/Divider';
import TitleItem from '../../../components/Details/TitleItem';
import NavInputItem from '../../../components/NavInputItem';
import CreateMoreButton from '../../../components/Create/CreateMoreButton';
import ScanCard from '../../../components/Create/ScanCard';

import ContactsModel from '../../../logicStores/contacts';

const ListView = styled.View`
  background: ${theme.whiteColor};
`;

const CenterText = styled.Text`
  font-size: ${moderateScale(16)};
  color: #AEAEAE;
  font-family: ${theme.fontRegular};
`;

const NavItemStyle = {
  leftWidth: moderateScale(83),
  height: 44,
  showNavIcon: true,
};

@observer
class Editor extends React.Component {
  state = {
    name: null,
    companyName: null,
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
  onPressRight = () => {
    const {
      name,
      companyName,
      jobTitle,
      phoneNumber,
      mobilePhone,
      departmentId,
      departmentName,
    } = this.state;
    try {
      if (!name) throw new Error(ContactsEnum.name);
      if (!companyName) throw new Error(ContactsEnum.companyName);
      ContactsModel.createContactReq({
        name,
        companyName,
        jobTitle,
        phoneNumber,
        mobilePhone,
        departmentId,
        departmentName,
      });
    } catch (e) {
      Toast.showError(e.message);
    }
  };
  getLeftStyle = (inputProps, width = 80) => {
    return {
      inputProps: {
        ...inputProps,
        fontSize: moderateScale(16),
      },
      leftTextStyle: {
        color: theme.textFormColor,
        width: moderateScale(width),
      },
      height: 44,
    };
  };
  render() {
    const {
      props: {
        navigation: { navigate },
      },
      state: {
        name,
        companyName,
        jobTitle,
        phoneNumber,
        mobilePhone,
        departmentId,
        departmentName,
      },
    } = this;
    return (
      <ContainerScrollView
        bottomPadding
        backgroundColor={theme.whiteColor}
      >
        <CommStatusBar />
        <ScanCard
          onPress={() => alert(1)}
        />
        <TitleItem text="必填信息" />
        <ListView>
          <NavInputItem
            leftText="姓名"
            {...this.getLeftStyle({
              placeholder: ContactsEnum.name,
              value: name,
              onChangeText: name => this.setState({ name }),
            })}
          />
          <NavInputItem
            leftText="公司名称"
            center={
              <CenterText>
                { companyName ? null : ContactsEnum.companyName }
              </CenterText>
            }
            {...NavItemStyle}
          />
          <NavInputItem
            leftText="职务"
            {...this.getLeftStyle({
              placeholder: ContactsEnum.companyName,
              value: jobTitle,
              onChangeText: jobTitle => this.setState({ jobTitle }),
            })}
          />
          <NavInputItem
            leftText="电话"
            {...this.getLeftStyle({
              placeholder: ContactsEnum.phoneNumber,
              value: phoneNumber,
              onChangeText: phoneNumber => this.setState({ phoneNumber }),
            })}
          />
          <NavInputItem
            leftText="手机"
            {...this.getLeftStyle({
              placeholder: ContactsEnum.mobilePhone,
              value: mobilePhone,
              onChangeText: mobilePhone => this.setState({ mobilePhone }),
            })}
          />
          <NavInputItem
            leftText="部门"
            center={
              <CenterText>
                {
                  (departmentId && departmentName) ? null : ContactsEnum.departmentName
                }
              </CenterText>
            }
            isLast
            {...NavItemStyle}
          />
        </ListView>
        <HorizontalDivider
          height={41}
          backgroundColor={theme.whiteColor}
        />
        <CreateMoreButton
          onPress={() => navigate(routers.contactEditorMore)}
        />
      </ContainerScrollView>
    );
  }
}

Editor.navigationOptions = ({ navigation }) => ({
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

Editor.defaultProps = {};

Editor.propTypes = {
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

export default Editor;
