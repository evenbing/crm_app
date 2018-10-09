import React, { Component } from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react/native';

import { LeftBackIcon, RightView, CommStatusBar } from '../../../components/Layout';
import { theme, routers } from '../../../constants';
import { ContainerScrollView } from '../../../components/Styles/Layout';
import TitleItem from '../../../components/Details/TitleItem';
import NavInputItem from '../../../components/NavInputItem';
import { HorizontalDivider } from '../../../components/Styles/Divider';
import { TextareaGroup, TextareaView } from '../../../components/Styles/Editor';
import { SalesClueEnum } from '../../../constants/form';
import { CenterText } from '../../../components/Styles/Form';
import { MarkActivityType, LeadsSource, LeadsStatus } from '../../../constants/enum';

@observer
class CreateSalesClueMore extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
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
        status,
        statusName,
        sex,
        leadsDepartmentName,
        jobTitle,
        phone,
        mobilePhone,
        email,
        weibo,
        districts,
        address,
        postCode,
        source,
        sourceName,
        description,
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
          leftText="性别"
          {...theme.getLeftStyle({
            placeholder: SalesClueEnum.sex,
            value: sex,
            onChangeText: sex => this.setState({ sex }),
          })}
        />
        <NavInputItem
          leftText="部门"
          {...theme.getLeftStyle({
            placeholder: SalesClueEnum.leadsDepartmentName,
            value: leadsDepartmentName,
            onChangeText: leadsDepartmentName => this.setState({ leadsDepartmentName }),
          })}
        />
        <NavInputItem
          leftText="职务"
          {...theme.getLeftStyle({
            placeholder: SalesClueEnum.jobTitle,
            value: jobTitle,
            onChangeText: jobTitle => this.setState({ jobTitle }),
          })}
        />
        <NavInputItem
          leftText="跟进状态"
          onPress={() => navigate(routers.typePicker, {
            selectedKey: status,
            typeEnum: LeadsStatus,
            callback: (key, value) => {
              this.setState({
                status: key,
                statusName: value,
              });
            },
          })}
          center={
            <CenterText active={status && statusName}>
              {(status && statusName) ? statusName : SalesClueEnum.status}
            </CenterText>
          }
          isLast
          {...theme.navItemStyle}
        />
        <TitleItem
          text="联系信息"
          fontSize={16}
          titleBackColor="transparent"
        />
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
          leftText="邮件"
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
          onPress={() => {
            navigate(routers.cityPicker, {
              callback: ({ formatLocation }) => {
                this.setState({
                  districts: formatLocation,
                });
              },
            });
          }}
          center={
            <CenterText active={districts}>
              {
                districts || SalesClueEnum.districts
              }
            </CenterText>
          }
          {...theme.navItemStyle}
        />
        <NavInputItem
          leftText="地址"
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
        />
        <NavInputItem
          leftText="线索来源"
          onPress={() => navigate(routers.typePicker, {
            selectedKey: source,
            typeEnum: LeadsSource,
            callback: (key, value) => {
              this.setState({
                source: key,
                sourceName: value,
              });
            },
          })}
          center={
            <CenterText active={source && sourceName}>
              {(source && sourceName) ? sourceName : SalesClueEnum.source}
            </CenterText>
          }
          isLast
          {...theme.navItemStyle}
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
        <NavInputItem
          leftText="备注"
          height={44}
          center={<View />}
        />
        <TextareaGroup>
          <TextareaView
            rowSpan={5}
            bordered
            value={description}
            onChangeText={description => this.setState({ description })}
            placeholder="请输入备注"
            placeholderTextColor={theme.textPlaceholderColor}
          />
        </TextareaGroup>
        <HorizontalDivider
          height={20}
        />
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
      onPress={navigation.state.params ? navigation.state.params.onPressRight : () => { }}
      right="完成"
      rightStyle={{
        color: theme.primaryColor,
      }}
    />
  ),
});

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
