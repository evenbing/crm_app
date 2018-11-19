/**
 * @component EditorMore.js
 * @description 联系人编辑更多资料页面
 * @time 2018/8/13
 * @author JUSTIN XU
 */
import React from 'react';
import PropTypes from 'prop-types';
import { KeyboardAvoidingView, View } from 'react-native';
import { observer } from 'mobx-react/native';

// constants
import { theme, routers } from 'constants';
import { ContactsEnum } from 'constants/form';
import { CustomerType, SexTypes } from 'constants/enum';

// utils
import { isIos } from 'utils/utils';
import { formatDateByMoment, formatLocationMap, formatNumberToString, formatDateType } from 'utils/base';
import { verifyPhone, verifyMobile, verifyEMail, verifyPostalCode } from 'utils/formVerify';
import Toast from 'utils/toast';

// logicStores
import ContactsModel from 'logicStores/contacts';

// components
import { CommStatusBar, LeftBackIcon, RightView } from 'components/Layout';
import { ContainerScrollView } from 'components/Styles/Layout';
import { HorizontalDivider } from 'components/Styles/Divider';
import { TextareaGroup, TextareaView } from 'components/Styles/Editor';
import TitleItem from 'components/Details/TitleItem';
import NavInputItem from 'components/NavInputItem';
import { FormActionSheet } from 'components/Modal';
import DateTimePicker from 'components/DateTimePicker';
import { ListView, CenterText } from 'components/Styles/Form';

@observer
class EditorMore extends React.Component {
  state = {
    name: null,
    sex: null,
    weibo: null,
    postCode: null,
    locationInfo: {},
    email: null,
    birthDate: null,
    description: null,
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
    this.initState();
  }
  onPressRight = async () => {
    const {
      state: {
        name,
        companyName,
        departmentId,
        phoneNumber,
        mobilePhone,
        email,
        postCode,
      },
      props: {
        navigation: { pop, state },
      },
    } = this;
    try {
      if (!name) throw new Error(ContactsEnum.name);
      if (!companyName) throw new Error(ContactsEnum.companyName);
      if (!departmentId) throw new Error(ContactsEnum.departmentName);
      if (phoneNumber) await verifyPhone(phoneNumber);
      if (mobilePhone) await verifyMobile(mobilePhone);
      if (email) await verifyEMail(email);
      if (postCode) await verifyPostalCode(postCode);

      const { item: { id } = {} } = state.params || {};
      // 新增
      if (!id) {
        ContactsModel.createContactReq(this.state, () => {
          pop(2);
        });
        return;
      }
      if (!id) throw new Error('id 不为空');
      ContactsModel.updateContactReq(this.state, () => {
        pop(1);
      });
    } catch (e) {
      Toast.showWarning(e.message);
    }
  };
  onFocus = (y = 40) => {
    this.scrollViewRef.scrollTo({
      x: 0,
      y: theme.moderateScale(y),
      animated: true,
    });
  };
  initState = () => {
    const {
      props: {
        navigation: { state },
      },
    } = this;
    const { item = {} } = state.params || {};
    if (!Object.keys(item).length) return;
    const {
      location,
    } = item;
    let {
      birthDate,
    } = item;

    if (birthDate) {
      birthDate = formatDateByMoment(birthDate);
    }
    let locationInfo = {};
    if (location) {
      locationInfo = location;
      locationInfo.formatLocation = formatLocationMap(location, false);
      locationInfo.address = location.address || '';
    }
    this.setState({
      ...formatNumberToString(item),
      birthDate,
      locationInfo,
    });
  };
  render() {
    const {
      state: {
        name,
        sex,
        weibo,
        locationInfo,
        birthDateShow,
        email,
        postCode,
        companyName,
        jobTitle,
        phoneNumber,
        mobilePhone,
        departmentId,
        departmentName,
        description,
      },
      props: {
        navigation: { navigate },
      },
    } = this;
    return (
      <KeyboardAvoidingView
        behavior={isIos() ? 'padding' : null}
        style={{ flex: 1 }}
      >
        <ContainerScrollView
          bottomPadding
          innerRef={(ref) => { this.scrollViewRef = ref; }}
        >
          <CommStatusBar />
          <HorizontalDivider
            height={9}
          />
          <TitleItem text="基本信息" />
          <ListView>
            <NavInputItem
              leftText="姓名"
              {...theme.getLeftStyle({
                placeholder: ContactsEnum.name,
                value: name,
                onChangeText: name => this.setState({ name }),
                onFocus: () => this.onFocus(),
                onBlur: () => this.onFocus(0),
            })}
            />
            <FormActionSheet
              onConfirm={({ key }) =>
              this.setState({
                sex: key,
              })
            }
              typeEnum={SexTypes}
            >
              <NavInputItem
                leftText="性别"
                needPress={false}
                center={
                  <CenterText
                    active={sex}
                  >
                    {sex ? SexTypes[sex] : ContactsEnum.sex}
                  </CenterText>
              }
                {...theme.navItemStyle}
              />
            </FormActionSheet>
            <DateTimePicker
              mode="date"
              onConfirm={
              date =>
                this.setState({
                  birthDate: `${formatDateByMoment(date)}`,
                  birthDateShow: `${formatDateByMoment(date, formatDateType)}`,
                })
            }
            >
              <NavInputItem
                leftText="出生日期"
                needPress={false}
                center={
                  <CenterText active={birthDateShow}>
                    { birthDateShow || ContactsEnum.birthDate }
                  </CenterText>
              }
                {...theme.navItemStyle}
              />
            </DateTimePicker>
            <NavInputItem
              leftText="客户名称"
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
              {...theme.navItemStyle}
            />
            <NavInputItem
              leftText="职务"
              {...theme.getLeftStyle({
                placeholder: ContactsEnum.jobTitle,
                value: jobTitle,
                onChangeText: jobTitle => this.setState({ jobTitle }),
                onFocus: () => this.onFocus(100),
            })}
              isLast
            />
          </ListView>
          <TitleItem text="联系信息" />
          <ListView>
            <NavInputItem
              leftText="电话"
              {...theme.getLeftStyle({
                keyboardType: 'numeric',
                placeholder: ContactsEnum.phoneNumber,
                value: phoneNumber,
                onChangeText: phoneNumber => this.setState({ phoneNumber }),
                onFocus: () => this.onFocus(150),
            })}
            />
            <NavInputItem
              leftText="手机"
              {...theme.getLeftStyle({
                keyboardType: 'numeric',
                placeholder: ContactsEnum.mobilePhone,
                value: mobilePhone,
                onChangeText: mobilePhone => this.setState({ mobilePhone }),
                onFocus: () => this.onFocus(200),
            })}
            />
            <NavInputItem
              leftText="微博"
              {...theme.getLeftStyle({
                placeholder: ContactsEnum.weibo,
                value: weibo,
                onChangeText: weibo => this.setState({ weibo }),
                onFocus: () => this.onFocus(250),
            })}
            />
            <NavInputItem
              leftText="省份"
              onPress={() => navigate(routers.cityPicker, {
              callback: (item) => {
                if (!Object.keys(item).length) return;
                this.setState({
                  locationInfo: {
                    ...locationInfo,
                    ...item,
                  },
                });
              },
            })}
              center={
                <CenterText active={locationInfo.formatLocation}>
                  { locationInfo.formatLocation || ContactsEnum.location}
                </CenterText>
            }
              {...theme.navItemStyle}
            />
            <NavInputItem
              leftText="地址"
              {...theme.getLeftStyle({
                placeholder: ContactsEnum.address,
                value: locationInfo.address,
                onChangeText: address => this.setState({
                  locationInfo: {
                    ...locationInfo,
                    address,
                  },
                }),
                onFocus: () => this.onFocus(300),
            })}
            />
            <NavInputItem
              leftText="邮箱"
              {...theme.getLeftStyle({
                placeholder: ContactsEnum.email,
                value: email,
                onChangeText: email => this.setState({ email }),
                onFocus: () => this.onFocus(350),
            })}
              isLast
            />
            <NavInputItem
              leftText="邮编"
              {...theme.getLeftStyle({
                placeholder: ContactsEnum.postCode,
                value: postCode,
                onChangeText: postCode => this.setState({ postCode }),
                onFocus: () => this.onFocus(430),
            })}
              isLast
            />
          </ListView>
          <TitleItem text="其他信息" />
          <ListView>
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
                placeholder={ContactsEnum.description}
                placeholderTextColor={theme.textPlaceholderColor}
                onFocus={() => this.onFocus(500)}
                onBlur={() => this.onFocus(0)}
              />
            </TextareaGroup>
          </ListView>
          <HorizontalDivider height={8} />
        </ContainerScrollView>
      </KeyboardAvoidingView>
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
      onPress={navigation.state.params ? navigation.state.params.onPressRight : () => null}
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
