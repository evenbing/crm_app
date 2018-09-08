/**
 * @component EditorMore.js
 * @description 编辑更多资料页面
 * @time 2018/8/13
 * @author JUSTIN XU
 */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { View } from 'react-native';
import { observer } from 'mobx-react/native';
import theme from '../../../constants/theme';
import { moderateScale } from '../../../utils/scale';
import { contactsEnum } from '../../../constants/form';
import Toast from '../../../utils/toast';

// components
import { CommStatusBar, LeftBackIcon, RightView } from '../../../components/Layout';
import { ContainerScrollView } from '../../../components/Styles/Layout';
import { HorizontalDivider } from '../../../components/Styles/Divider';
import { TextareaGroup, TextareaView } from '../../../components/Styles/Editor';
import TitleItem from '../../../components/Details/TitleItem';
import NavInputItem from '../../../components/NavInputItem';

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
class EditorMore extends React.Component {
  state = {
    name: null,
    sex: null,
    weibo: null,
    location: null,
    email: null,
    birthDate: null,
    description: null,
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
      sex,
      weibo,
      location,
      email,
      birthDate,
      description,
      companyName,
      jobTitle,
      phoneNumber,
      mobilePhone,
      departmentId,
      departmentName,
    } = this.state;
    try {
      if (!name) throw new Error(contactsEnum.name);
      if (!sex) throw new Error(contactsEnum.sex);
      if (!companyName) throw new Error(contactsEnum.companyName);
      if (!departmentId) throw new Error(contactsEnum.departmentId);
      const { item: { id } } = this.props.navigation.state.params;
      if (!id) throw new Error('id 不为空');
      ContactsModel.updateContactReq({
        id,
        name,
        sex,
        weibo,
        location,
        email,
        birthDate,
        description,
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
        color: '#373737',
        width: moderateScale(width),
      },
      height: 44,
    };
  };
  render() {
    const {
      state: {
        name,
        sex,
        weibo,
        location,
        email,
        birthDate,
        companyName,
        jobTitle,
        phoneNumber,
        mobilePhone,
        departmentId,
        departmentName,
        description,
      },
    } = this;
    return (
      <ContainerScrollView
        bottomPadding
      >
        <CommStatusBar />
        <HorizontalDivider
          height={9}
        />
        <TitleItem text="基本信息" />
        <ListView>
          <NavInputItem
            leftText="姓名"
            {...this.getLeftStyle({
              placeholder: contactsEnum.name,
              value: name,
              onChangeText: name => this.setState({ name }),
            })}
          />
          <NavInputItem
            leftText="性别"
            center={
              <CenterText>{sex ? null : contactsEnum.sex}</CenterText>
            }
            {...NavItemStyle}
          />
          <NavInputItem
            leftText="出生日期"
            center={
              <CenterText>{birthDate ? null : contactsEnum.birthDate}</CenterText>
            }
            {...NavItemStyle}
          />
          <NavInputItem
            leftText="公司名称"
            {...this.getLeftStyle({
              placeholder: contactsEnum.companyName,
              value: companyName,
              onChangeText: companyName => this.setState({ companyName }),
            })}
          />
          <NavInputItem
            leftText="部门"
            center={
              <CenterText>
                {
                  (departmentId && departmentName) ? null : contactsEnum.departmentName
                }
              </CenterText>
            }
            {...NavItemStyle}
          />
          <NavInputItem
            leftText="职务"
            {...this.getLeftStyle({
              placeholder: contactsEnum.jobTitle,
              value: jobTitle,
              onChangeText: jobTitle => this.setState({ jobTitle }),
            })}
            isLast
            height={44}
          />
        </ListView>
        <TitleItem text="联系信息" />
        <ListView>
          <NavInputItem
            leftText="电话"
            {...this.getLeftStyle({
              placeholder: contactsEnum.phoneNumber,
              value: phoneNumber,
              onChangeText: phoneNumber => this.setState({ phoneNumber }),
            })}
          />
          <NavInputItem
            leftText="手机"
            {...this.getLeftStyle({
              placeholder: contactsEnum.mobilePhone,
              value: mobilePhone,
              onChangeText: mobilePhone => this.setState({ mobilePhone }),
            })}
          />
          <NavInputItem
            leftText="微博"
            {...this.getLeftStyle({
              placeholder: contactsEnum.weibo,
              value: weibo,
              onChangeText: weibo => this.setState({ weibo }),
            })}
          />
          <NavInputItem
            leftText="省份"
            center={
              <CenterText>{contactsEnum.location}</CenterText>
            }
            {...NavItemStyle}
          />
          <NavInputItem
            leftText="地址"
            {...this.getLeftStyle({
              placeholder: contactsEnum.location,
              value: location,
              onChangeText: location => this.setState({ location }),
            })}
          />
          <NavInputItem
            leftText="邮编"
            {...this.getLeftStyle({
              placeholder: contactsEnum.email,
              value: email,
              onChangeText: email => this.setState({ email }),
            })}
            isLast
          />
        </ListView>
        <TitleItem text="其他信息" />
        <ListView>
          <NavInputItem
            leftText="所属部门"
            center={
              <CenterText>{contactsEnum.departmentName}</CenterText>
            }
            {...NavItemStyle}
          />
          <NavInputItem
            leftText="备注"
            center={<View />}
            right={<View />}
            height={44}
          />
          <TextareaGroup>
            <TextareaView
              rowSpan={5}
              bordered
              value={description}
              onChangeText={description => this.setState({ description })}
              placeholder={contactsEnum.description}
              placeholderTextColor={theme.textPlaceholderColor}
            />
          </TextareaGroup>
        </ListView>
        <HorizontalDivider height={8} />
      </ContainerScrollView>
    );
  }
}

EditorMore.navigationOptions = ({ navigation }) => ({
  title: '联系人更多资料',
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

EditorMore.defaultProps = {};

EditorMore.propTypes = {
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

export default EditorMore;
