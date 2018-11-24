/**
 * @component CreateSalesClueMore.js
 * @description 新增线索更多/编辑页面
 * @time 2018/8/15
 * @author
 */
import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';

// constants
import { theme, routers } from 'constants';
import { SalesClueEnum } from 'constants/form';
import { LeadsSource, MarkActivityType, SexTypes } from 'constants/enum';

// utils
import { delay, formatLocationMap, formatNumberToString } from 'utils/base';
import { verifyPhone, verifyMobile, verifyEMail, verifyPostalCode } from 'utils/formVerify';
import { isIos } from 'utils/utils';
import Toast from 'utils/toast';

// components
import { LeftBackIcon, RightView, CommStatusBar } from 'components/Layout';
import { ContainerScrollView } from 'components/Styles/Layout';
import TitleItem from 'components/Details/TitleItem';
import NavInputItem from 'components/NavInputItem';
import { HorizontalDivider } from 'components/Styles/Divider';
import { TextareaGroup, TextareaView } from 'components/Styles/Editor';
import { ListView, CenterText } from 'components/Styles/Form';
import FormActionSheet from 'components/Modal/FormActionSheet';

// logicStores
import SalesCluesModel from 'logicStores/salesClues';

class CreateSalesClueMore extends React.Component {
  state = {
    name: null,
    sex: null,
    companyName: null,
    jobTitle: null,
    phone: null,
    mobilePhone: null,
    email: null,
    weibo: null,
    locationInfo: {},
    postCode: null,
    source: null,
    activityId: null,
    activityName: null,
    departmentId: null,
    leadsDepartmentName: null,
    description: null,
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
        activityId,
        departmentId,
        phone,
        mobilePhone,
        email,
        postCode,
      },
      props: {
        navigation: { pop, state },
      },
    } = this;

    try {
      if (!name) throw new Error(SalesClueEnum.name);
      if (!companyName) throw new Error(SalesClueEnum.companyName);
      if (!activityId) throw new Error(SalesClueEnum.activityId);
      if (!departmentId) throw new Error(SalesClueEnum.departmentId);
      if (phone) await verifyPhone(phone);
      if (mobilePhone) await verifyMobile(mobilePhone);
      if (email) await verifyEMail(email);
      if (postCode) await verifyPostalCode(postCode);
      const { item: { id } = {} } = state.params || {};
      // 新增
      if (!id) {
        SalesCluesModel.createSalesClueReq(this.state, () => {
          pop(2);
        });
        return;
      }
      if (!id) throw new Error('id 不为空');
      SalesCluesModel.updateSalesClueReq(this.state, () => {
        pop(1);
      });
    } catch (e) {
      Toast.showWarning(e.message);
    }
  };
  onFocus = async (y = 40) => {
    await delay();
    this.scrollViewRef.scrollTo({
      x: 0,
      y: theme.moderateScale(isIos() ? y : y + 30),
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
      departmentName,
    } = item;
    let locationInfo = {};
    if (location) {
      locationInfo = location;
      locationInfo.formatLocation = formatLocationMap(location, false);
      locationInfo.address = location.address || '';
    }
    let leadsDepartmentName = null;
    if (departmentName) {
      leadsDepartmentName = departmentName;
    }
    this.setState({
      leadsDepartmentName,
      ...formatNumberToString(item),
      locationInfo,
    });
  };
  render() {
    const {
      state: {
        name,
        sex,
        companyName,
        jobTitle,
        phone,
        mobilePhone,
        email,
        weibo,
        locationInfo,
        postCode,
        source,
        activityId,
        activityName,
        departmentId,
        leadsDepartmentName,
        description,
      },
      props: {
        navigation: {
          navigate,
        },
      },
    } = this;
    return (
      <ContainerScrollView
        bottomPadding
        innerRef={(ref) => { this.scrollViewRef = ref; }}
      >
        <CommStatusBar />
        <TitleItem
          text="基本信息"
          fontSize={16}
          titleBackColor="transparent"
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
          <FormActionSheet
            onConfirm={({ key }) => {
              this.setState({ sex: key });
            }}
            typeEnum={SexTypes}
          >
            <NavInputItem
              leftText="性别"
              needPress={false}
              center={
                <CenterText
                  active={sex}
                >
                  {sex ? SexTypes[sex] : SalesClueEnum.sex}
                </CenterText>
              }
              {...theme.navItemStyle}
            />
          </FormActionSheet>
          <NavInputItem
            leftText="客户名称"
            {...theme.getLeftStyle({
                placeholder: SalesClueEnum.companyName,
                value: companyName,
                onChangeText: companyName => this.setState({ companyName }),
                onFocus: () => this.onFocus(80),
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
          />
          <NavInputItem
            leftText="职务"
            {...theme.getLeftStyle({
                placeholder: SalesClueEnum.jobTitle,
                value: jobTitle,
                onChangeText: jobTitle => this.setState({ jobTitle }),
                onFocus: () => this.onFocus(100),
            })}
            isLast
          />
        </ListView>
        <TitleItem
          text="联系信息"
          fontSize={16}
          titleBackColor="transparent"
        />
        <ListView>
          <NavInputItem
            leftText="电话"
            {...theme.getLeftStyle({
                keyboardType: 'numeric',
                placeholder: SalesClueEnum.phone,
                value: phone,
                onChangeText: phone => this.setState({ phone }),
                onFocus: () => this.onFocus(140),
            })}
          />
          <NavInputItem
            leftText="手机"
            {...theme.getLeftStyle({
                keyboardType: 'numeric',
                placeholder: SalesClueEnum.mobilePhone,
                value: mobilePhone,
                onChangeText: mobilePhone => this.setState({ mobilePhone }),
                onFocus: () => this.onFocus(180),
            })}
          />
          <NavInputItem
            leftText="邮箱"
            {...theme.getLeftStyle({
                placeholder: SalesClueEnum.email,
                value: email,
                onChangeText: email => this.setState({ email }),
                onFocus: () => this.onFocus(220),
            })}
          />
          <NavInputItem
            leftText="微博"
            {...theme.getLeftStyle({
                placeholder: SalesClueEnum.weibo,
                value: weibo,
                onChangeText: weibo => this.setState({ weibo }),
                onFocus: () => this.onFocus(260),
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
                { locationInfo.formatLocation || SalesClueEnum.location}
              </CenterText>
            }
            {...theme.navItemStyle}
          />
          <NavInputItem
            leftText="详细地址"
            {...theme.getLeftStyle({
                placeholder: SalesClueEnum.address,
                value: locationInfo.address,
                onChangeText: address => this.setState({
                  locationInfo: {
                    ...locationInfo,
                    address,
                  },
                }),
                onFocus: () => this.onFocus(340),
            })}
          />
          <NavInputItem
            leftText="邮编"
            {...theme.getLeftStyle({
                placeholder: SalesClueEnum.postCode,
                value: postCode,
                onChangeText: postCode => this.setState({ postCode }),
                onFocus: () => this.onFocus(380),
            })}
            isLast
          />
        </ListView>
        <TitleItem
          text="其它信息"
          fontSize={16}
          titleBackColor="transparent"
        />
        <ListView>
          <FormActionSheet
            onConfirm={({ key }) => {
              this.setState({ source: key });
            }}
            typeEnum={LeadsSource}
          >
            <NavInputItem
              leftText="线索来源"
              needPress={false}
              center={
                <CenterText
                  active={source}
                >
                  {source ? LeadsSource[source] : SalesClueEnum.source}
                </CenterText>
              }
              {...theme.navItemStyle}
            />
          </FormActionSheet>
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
        </ListView>
        <ListView>
          <NavInputItem
            leftText="备注"
            center={<View />}
            right={<View />}
          />
          <TextareaGroup>
            <TextareaView
              rowSpan={5}
              bordered
              value={description}
              onChangeText={description => this.setState({ description })}
              placeholder="请输入备注说明"
              placeholderTextColor={theme.textPlaceholderColor}
              onFocus={() => this.onFocus(550)}
              onBlur={() => this.onFocus(0)}
            />
          </TextareaGroup>
          <HorizontalDivider
            height={20}
          />
        </ListView>
      </ContainerScrollView>
    );
  }
}

CreateSalesClueMore.navigationOptions = ({ navigation }) => ({
  title: '更多销售线索',
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

CreateSalesClueMore.defaultProps = {};

CreateSalesClueMore.propTypes = {
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

export default CreateSalesClueMore;
