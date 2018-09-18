/**
 * @component Editor.js
 * @description 编辑资料页面
 * @time 2018/9/2
 * @author JUSTIN XU
 */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { View } from 'react-native';
import { routers, theme } from '../../../constants';
import { moderateScale } from '../../../utils/scale';

// components
import { CommStatusBar, LeftBackIcon, RightView } from '../../../components/Layout';
import { ContainerView } from '../../../components/Styles/Layout';
import { HorizontalDivider } from '../../../components/Styles/Divider';
import { TextareaGroup, TextareaView } from '../../../components/Styles/Editor';
import NavInputItem from '../../../components/NavInputItem';
import CreateMoreButton from '../../../components/Create/CreateMoreButton';
import TitleItem from '../../../components/Details/TitleItem';
import { formatDate } from '../../../utils/base';
import DateTimePicker from '../../../components/DateTimePicker';
import { MarkActivityEnum } from '../../../constants/form';
import { CenterText } from '../../../components/Styles/Form';
import MarkActivityStore from '../../../logicStores/markActivity';
import Toast from '../../../utils/toast';

const ListView = styled.View`
  background: ${theme.whiteColor};
`;

// const RightText = CenterText.extend`
//   color: ${theme.textColor};
// `;

const NavItemStyle = {
  leftWidth: moderateScale(83),
  height: 44,
  showNavIcon: true,
};

const formatDateType = 'yyyy-MM-dd hh:mm';

class Editor extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: null,
      beginDate: null,
      endDate: null,
      departmentId: null,
      departmentName: null,
      description: null,
    };
  }

  componentDidMount() {
    this.props.navigation.setParams({
      onPressRight: this.onPressRight,
    });
  }

  onPressRight = () => {
    const {
      state: { name,
        beginDate,
        endDate,
        departmentId,
        description,
      },
      props: {
        navigation: {
          goBack,
        },
      },
    } = this;
    try {
      if (!name) throw new Error(MarkActivityEnum.name);
      if (!beginDate) throw new Error(MarkActivityEnum.beginDate);
      if (!endDate) throw new Error(MarkActivityEnum.endDate);
      if (!departmentId) throw new Error(MarkActivityEnum.departmentName);
      if (!description) throw new Error(MarkActivityEnum.description);
      MarkActivityStore.createMarkActivityReq({
        name,
        beginDate,
        endDate,
        departmentId,
        description,
      }, () => {
        goBack();
      });
    } catch (error) {
      Toast.showError(error.message);
    }
  }

  getLeftStyle = (placeholder, width = 80) => {
    return {
      inputProps: {
        placeholder,
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
      navigation: { navigate },
    } = this.props;
    const {
      name,
      beginDate,
      endDate,
      departmentId,
      departmentName,
      description,
    } = this.state;
    return (
      <ContainerView
        bottomPadding
      >
        <CommStatusBar />
        <HorizontalDivider
          height={12}
        />
        <ListView>
          <TitleItem text="必填信息" />
          <NavInputItem
            leftText="活动名称"
            {...this.getLeftStyle('请输入活动名称')}
            {...NavItemStyle}
            inputProps={{
              placeholder: '请输入姓名',
              fontSize: theme.moderateScale(16),
              onChangeText: () => { this.setState({ name }); },
              value: name,
            }}
          />
          <DateTimePicker
            onConfirm={
              date =>
                this.setState({
                  beginDate: `${formatDate(date, formatDateType)}`,
                })
            }
          >
            <NavInputItem
              leftText="开始日期"
              needPress={false}
              center={
                <CenterText active={beginDate}>
                  {beginDate || MarkActivityEnum.beginDate}
                </CenterText>
              }
              {...theme.navItemStyle}
            />
          </DateTimePicker>
          <DateTimePicker
            onConfirm={
              date =>
                this.setState({
                  endDate: `${formatDate(date, formatDateType)}`,
                })
            }
          >
            <NavInputItem
              leftText="结束日期"
              needPress={false}
              center={
                <CenterText active={endDate}>
                  {endDate || MarkActivityEnum.endDate}
                </CenterText>
              }
              {...theme.navItemStyle}
            />
          </DateTimePicker>
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
                  (departmentId && departmentName) ? departmentName : MarkActivityEnum.departmentName
                }
              </CenterText>
            }
            isLast
            {...theme.navItemStyle}
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
              placeholder={MarkActivityEnum.description}
              placeholderTextColor={theme.textPlaceholderColor}
            />
          </TextareaGroup>
        </ListView>
        <HorizontalDivider
          height={41}
        />
        <CreateMoreButton
          onPress={() => navigate(routers.markActivityEditorMore)}
        />
      </ContainerView>
    );
  }
}

Editor.navigationOptions = ({ navigation }) => ({
  title: '新增市场活动',
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
