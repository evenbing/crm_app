/**
 * @component EditorMore.js
 * @description 编辑更多资料页面
 * @time 2018/8/13
 * @author JUSTIN XU
 */
import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { observer } from 'mobx-react/native';
import theme from '../../../constants/theme';
import { ContactsEnum } from '../../../constants/form';
import { CustomerType, SexTypes } from '../../../constants/enum';
import { routers } from '../../../constants';
import Toast from '../../../utils/toast';
import { formatDateByMoment, formatLocationMap, formatNumberToString } from '../../../utils/base';

// components
import { CommStatusBar, LeftBackIcon, RightView } from '../../../components/Layout';
import { ContainerScrollView } from '../../../components/Styles/Layout';
import { HorizontalDivider } from '../../../components/Styles/Divider';
import { TextareaGroup, TextareaView } from '../../../components/Styles/Editor';
import TitleItem from '../../../components/Details/TitleItem';
import NavInputItem from '../../../components/NavInputItem';
import { FormActionSheet } from '../../../components/Modal';
import DateTimePicker from '../../../components/DateTimePicker';
import { ListView, CenterText } from '../../../components/Styles/Form';

import ContactsModel from '../../../logicStores/contacts';

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
      },
      props: {
        navigation: { pop, state },
      },
    } = this;
    try {
      if (!name) throw new Error(ContactsEnum.name);
      if (!companyName) throw new Error(ContactsEnum.companyName);
      if (!departmentId) throw new Error(ContactsEnum.departmentId);

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
      Toast.showError(e.message);
    }
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
        birthDate,
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
            {...theme.getLeftStyle({
              placeholder: ContactsEnum.name,
              value: name,
              onChangeText: name => this.setState({ name }),
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
            onConfirm={
              date =>
                this.setState({
                  birthDate: `${formatDateByMoment(date)}`,
                })
            }
          >
            <NavInputItem
              leftText="出生日期"
              needPress={false}
              center={
                <CenterText active={birthDate}>
                  { birthDate || ContactsEnum.birthDate }
                </CenterText>
              }
              {...theme.navItemStyle}
            />
          </DateTimePicker>
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
            })}
            isLast
          />
        </ListView>
        <TitleItem text="联系信息" />
        <ListView>
          <NavInputItem
            leftText="电话"
            {...theme.getLeftStyle({
              placeholder: ContactsEnum.phoneNumber,
              value: phoneNumber,
              onChangeText: phoneNumber => this.setState({ phoneNumber }),
            })}
          />
          <NavInputItem
            leftText="手机"
            {...theme.getLeftStyle({
              placeholder: ContactsEnum.mobilePhone,
              value: mobilePhone,
              onChangeText: mobilePhone => this.setState({ mobilePhone }),
            })}
          />
          <NavInputItem
            leftText="微博"
            {...theme.getLeftStyle({
              placeholder: ContactsEnum.weibo,
              value: weibo,
              onChangeText: weibo => this.setState({ weibo }),
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
            })}
          />
          <NavInputItem
            leftText="邮箱"
            {...theme.getLeftStyle({
              placeholder: ContactsEnum.email,
              value: email,
              onChangeText: email => this.setState({ email }),
            })}
            isLast
          />
          <NavInputItem
            leftText="邮编"
            {...theme.getLeftStyle({
              placeholder: ContactsEnum.postCode,
              value: postCode,
              onChangeText: postCode => this.setState({ postCode }),
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
