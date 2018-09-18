/**
 * @component EditorMore.js
 * @description 编辑回款记录页面
 * @time 2018/9/2
 * @author JUSTIN XU
 */
import React from 'react';
import PropTypes from 'prop-types';
import { observer } from 'mobx-react/native';
import { View } from 'react-native';
import theme from '../../../constants/theme';
import { moderateScale } from '../../../utils/scale';
import { ReceivablePlanEnum } from '../../../constants/form';
import Toast from '../../../utils/toast';
import { formatDate } from '../../../utils/base';

// components
import { CommStatusBar, LeftBackIcon, RightView } from '../../../components/Layout';
import { ContainerScrollView } from '../../../components/Styles/Layout';
import { HorizontalDivider } from '../../../components/Styles/Divider';
import { TextareaGroup, TextareaView } from '../../../components/Styles/Editor';
import NavInputItem from '../../../components/NavInputItem';
import { ListView, CenterText, RightText } from '../../../components/Styles/Form';
import DateTimePicker from '../../../components/DateTimePicker';

import ReceivableRecordModel from '../../../logicStores/receivableRecord';

const LeftViewWidth = moderateScale(110);
const formatDateType = 'yyyy-MM-dd hh:mm';

@observer
class EditorMore extends React.Component {
  state = {
    pactId: null,
    issueId: null,
    receivablePrice: null,
    receivableDate: null,
    ownerId: null,
    comment: null,
  };
  componentDidMount() {
    this.props.navigation.setParams({
      onPressRight: this.onPressRight,
    });
  }
  onPressRight = () => {
    const {
      pactId,
      issueId,
      receivablePrice,
      receivableDate,
      ownerId,
      comment,
    } = this.state;
    try {
      if (!pactId) throw new Error(ReceivablePlanEnum.pactId);
      if (!issueId) throw new Error(ReceivablePlanEnum.issue);
      if (!receivablePrice) throw new Error(ReceivablePlanEnum.receivablePrice);
      if (!receivableDate) throw new Error(ReceivablePlanEnum.receivableDate);
      if (!ownerId) throw new Error(ReceivablePlanEnum.ownerId);
      ReceivableRecordModel.updateReceivableRecordReq({
        pactId,
        issueId,
        receivablePrice,
        receivableDate,
        ownerId,
        comment,
      });
    } catch (e) {
      Toast.showError(e.message);
    }
  };
  render() {
    const {
      state: {
        issueId,
        receivablePrice,
        ownerId,
        comment,
        receivableDate,
      },
    } = this;
    return (
      <ContainerScrollView
        bottomPadding
      >
        <CommStatusBar />
        <HorizontalDivider
          height={12}
        />
        <ListView>
          <NavInputItem
            leftText="回款期次"
            {...theme.getLeftStyle({
              placeholder: '请输入回款期次',
              value: issueId,
              onChangeText: issueId => this.setState({ issueId }),
            })}
          />
          <NavInputItem
            leftText="实际回款金额"
            {...theme.getLeftStyle({
              placeholder: '请输入金额',
              value: issueId,
              onChangeText: issueId => this.setState({ issueId }),
            }, 110)}
            right={
              <RightText>元</RightText>
            }
          />
          <DateTimePicker
            onConfirm={
              date =>
                this.setState({
                  receivableDate: `${formatDate(date, formatDateType)}`,
                })
            }
          >
            <NavInputItem
              leftText="实际回款日期"
              needPress={false}
              center={
                <CenterText active={receivableDate}>
                  { receivableDate || ReceivablePlanEnum.receivableDate }
                </CenterText>
              }
              {...theme.navItemStyle}
              leftWidth={LeftViewWidth}
            />
          </DateTimePicker>
          <NavInputItem
            leftText="负责人"
            {...theme.getLeftStyle({
              placeholder: '请输入负责人',
              value: issueId,
              onChangeText: issueId => this.setState({ issueId }),
            })}
          />
          <NavInputItem
            leftText="合同"
            {...theme.getLeftStyle({
              placeholder: '请输入合同',
              value: issueId,
              onChangeText: issueId => this.setState({ issueId }),
            })}
          />
          <NavInputItem
            leftText="客户名称"
            {...theme.getLeftStyle({
              placeholder: '请输入客户名称',
              value: issueId,
              onChangeText: issueId => this.setState({ issueId }),
            })}
          />
          <NavInputItem
            leftText="付款方式"
            {...theme.getLeftStyle({
              placeholder: '请输入付款方式',
              value: issueId,
              onChangeText: issueId => this.setState({ issueId }),
            })}
          />
          <NavInputItem
            leftText="实际回款金额"
            {...theme.getLeftStyle({
              placeholder: '请输入金额',
              value: issueId,
              onChangeText: issueId => this.setState({ issueId }),
            }, 110)}
          />
          <NavInputItem
            leftText="所属部门"
            center={
              <CenterText>请选择所属部门</CenterText>
            }
            {...theme.navItemStyle}
          />
          <NavInputItem
            leftText="负责人"
            {...theme.getLeftStyle({
              placeholder: '请输入负责人',
              value: issueId,
              onChangeText: issueId => this.setState({ issueId }),
            })}
          />
          <NavInputItem
            leftText="所属部门"
            center={
              <CenterText>请选择所属部门</CenterText>
            }
            {...theme.navItemStyle}
          />
          <NavInputItem
            leftText="创建人"
            {...theme.getLeftStyle({
              placeholder: '请输入创建人',
              value: issueId,
              onChangeText: issueId => this.setState({ issueId }),
            })}
          />
          <DateTimePicker
            onConfirm={
              date =>
                this.setState({
                  receivableDate: `${formatDate(date, formatDateType)}`,
                })
            }
          >
            <NavInputItem
              leftText="创建时间"
              needPress={false}
              center={
                <CenterText active={receivableDate}>
                  { receivableDate || ReceivablePlanEnum.receivableDate }
                </CenterText>
              }
              {...theme.navItemStyle}
            />
          </DateTimePicker>
          <NavInputItem
            leftText="最近修改人"
            {...theme.getLeftStyle({
              placeholder: '请输入修改人',
              value: issueId,
              onChangeText: issueId => this.setState({ issueId }),
            })}
          />
          <NavInputItem
            leftText="最近时间"
            center={
              <CenterText>请选择最近时间</CenterText>
            }
            {...theme.navItemStyle}
          />
          <NavInputItem
            leftText="备注"
            center={<View />}
            right={<View />}
          />
          <TextareaGroup>
            <TextareaView
              rowSpan={5}
              bordered
              value={comment}
              onChangeText={comment => this.setState({ comment })}
              placeholder={ReceivablePlanEnum.comment}
              placeholderTextColor={theme.textPlaceholderColor}
            />
          </TextareaGroup>
        </ListView>
        <HorizontalDivider height={20} />
      </ContainerScrollView>
    );
  }
}

EditorMore.navigationOptions = ({ navigation }) => ({
  title: '编辑回款记录',
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
