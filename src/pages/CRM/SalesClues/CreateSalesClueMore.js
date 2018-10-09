/**
 * @component CreateSalesClueMore.js
 * @description 新增线索更多/编辑页面
 * @time 2018/8/15
 * @author
 */
import React from 'react';
import PropTypes from 'prop-types';
import { View } from 'react-native';
import { theme, routers } from '../../../constants';
import { SalesClueEnum } from '../../../constants/form';
import { formatNumberToString } from '../../../utils/base';
import { LeadsSource, MarkActivityType, SexTypes } from '../../../constants/enum';
import Toast from '../../../utils/toast';

// components
import { LeftBackIcon, RightView, CommStatusBar } from '../../../components/Layout';
import { ContainerScrollView } from '../../../components/Styles/Layout';
import TitleItem from '../../../components/Details/TitleItem';
import NavInputItem from '../../../components/NavInputItem';
import { HorizontalDivider } from '../../../components/Styles/Divider';
import { TextareaGroup, TextareaView } from '../../../components/Styles/Editor';
import { ListView, CenterText } from '../../../components/Styles/Form';
import FormActionSheet from '../../../components/Modal/FormActionSheet';

import SalesCluesModel from '../../../logicStores/salesClues';

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
    address: null,
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
        status,
        name,
        sex,
        companyName,
        jobTitle,
        phone,
        mobilePhone,
        email,
        weibo,
        locationInfo,
        address,
        postCode,
        source,
        activityId,
        departmentId,
        leadsDepartmentName,
        description,
      },
      props: {
        navigation: { pop, state },
      },
    } = this;
    if (address) {
      locationInfo.address = address;
    }

    try {
      if (!name) throw new Error(SalesClueEnum.name);
      if (!companyName) throw new Error(SalesClueEnum.companyName);
      if (!activityId) throw new Error(SalesClueEnum.activityId);
      if (!departmentId) throw new Error(SalesClueEnum.departmentId);
      debugger;
      const { item: { id } = {} } = state.params || {};
      // 新增
      if (!id) {
        SalesCluesModel.createSalesClueReq({
          name,
          companyName,
          activityId,
          departmentId,
          sex,
          leadsDepartmentName,
          jobTitle,
          phone,
          mobilePhone,
          email,
          weibo,
          locationInfo,
          postCode,
          source,
          description,
        }, () => {
          pop(2);
        });
        return;
      }
      if (!id) throw new Error('id 不为空');
      SalesCluesModel.updateSalesClueReq({
        id,
        status,
        name,
        companyName,
        activityId,
        departmentId,
        sex,
        leadsDepartmentName,
        jobTitle,
        phone,
        mobilePhone,
        email,
        weibo,
        locationInfo,
        postCode,
        source,
        description,
      }, () => {
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
    this.setState({
      ...formatNumberToString(item),
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
        address,
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
            leftText="公司名称"
            {...theme.getLeftStyle({
              placeholder: SalesClueEnum.companyName,
              value: companyName,
              onChangeText: companyName => this.setState({ companyName }),
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
              placeholder: SalesClueEnum.phone,
              value: phone,
              onChangeText: phone => this.setState({ phone }),
            })}
          />
          <NavInputItem
            leftText="手机"
            {...theme.getLeftStyle({
              placeholder: SalesClueEnum.mobilePhone,
              value: mobilePhone,
              onChangeText: mobilePhone => this.setState({ mobilePhone }),
            })}
          />
          <NavInputItem
            leftText="邮箱"
            {...theme.getLeftStyle({
              placeholder: SalesClueEnum.email,
              value: email,
              onChangeText: email => this.setState({ email }),
            })}
          />
          <NavInputItem
            leftText="微博"
            {...theme.getLeftStyle({
              placeholder: SalesClueEnum.weibo,
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
                  locationInfo: item,
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
              value: address,
              onChangeText: address => this.setState({ address }),
            })}
          />
          <NavInputItem
            leftText="邮编"
            {...theme.getLeftStyle({
              placeholder: SalesClueEnum.postCode,
              value: postCode,
              onChangeText: postCode => this.setState({ postCode }),
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
      onPress={navigation.state.params ? navigation.state.params.onPressRight : null}
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
