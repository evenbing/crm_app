/**
 * @component Create.js
 * @description 新增回款计划页面
 * @time 2018/9/2
 * @author JUSTIN XU
 */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { observer } from 'mobx-react/native';
import { DatePicker } from 'native-base';
import { View } from 'react-native';
import { routers, theme } from '../../../constants';
import { moderateScale } from '../../../utils/scale';
import { ReceivablePlanEnum } from '../../../constants/form';
import Toast from '../../../utils/toast';

// components
import { CommStatusBar, LeftBackIcon, RightView } from '../../../components/Layout';
import { ContainerView } from '../../../components/Styles/Layout';
import { HorizontalDivider } from '../../../components/Styles/Divider';
import { TextareaGroup, TextareaView } from '../../../components/Styles/Editor';
import NavInputItem from '../../../components/NavInputItem';
import CreateMoreButton from '../../../components/Create/CreateMoreButton';

import ReceivablePlanModel from '../../../logicStores/receivablePlan';

const ListView = styled.View`
  background: ${theme.whiteColor};
`;

const CenterText = styled.Text`
  font-size: ${moderateScale(16)};
  color: #AEAEAE;
  font-family: ${theme.fontRegular};
`;

const RightText = CenterText.extend`
  color: ${theme.textColor};
`;

@observer
class Create extends React.Component {
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
      ReceivablePlanModel.createReceivablePlanReq({
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
      },
      props: {
        navigation: { navigate },
      },
    } = this;
    return (
      <ContainerView
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
                placeholder: ReceivablePlanEnum.issue,
                value: issueId,
                onChangeText: issueId => this.setState({ issueId }),
            })}
          />
          <NavInputItem
            leftText="计划回款金额"
            {...theme.navItemStyle}
            {...theme.getLeftStyle({
              placeholder: ReceivablePlanEnum.receivablePrice,
              value: receivablePrice,
              onChangeText: receivablePrice => this.setState({ receivablePrice }),
            }, 110)}
            right={
              <RightText>元</RightText>
            }
          />
          <NavInputItem
            leftText="计划回款日期"
            center={
              <DatePicker
                defaultDate={new Date(2018, 4, 4)}
                minimumDate={new Date(2018, 1, 1)}
                maximumDate={new Date(2018, 12, 31)}
                locale="cn"
                timeZoneOffsetInMinutes={undefined}
                modalTransparent={false}
                animationType="fade"
                androidMode="default"
                placeHolderText={ReceivablePlanEnum.receivableDate}
                textStyle={{
                  ...theme.pickerStyle,
                  color: theme.textColor,
                }}
                placeHolderTextStyle={{
                  ...theme.pickerStyle,
                  color: theme.textPlaceholderColor,
                }}
                onDateChange={receivableDate => this.setState({ receivableDate })}
              />
            }
            {...theme.navItemStyle}
            leftWidth={moderateScale(110)}
          />
          <NavInputItem
            leftText="负责人"
            center={
              <CenterText>
                {
                  ownerId ? null :
                    ReceivablePlanEnum.ownerId
                }
              </CenterText>
            }
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
              value={comment}
              onChangeText={comment => this.setState({ comment })}
              placeholder={ReceivablePlanEnum.comment}
              placeholderTextColor={theme.textPlaceholderColor}
            />
          </TextareaGroup>
        </ListView>
        <HorizontalDivider
          height={41}
        />
        <CreateMoreButton
          onPress={() => navigate(routers.receivablePlanEditorMore)}
        />
      </ContainerView>
    );
  }
}

Create.navigationOptions = ({ navigation }) => ({
  title: '新增回款计划',
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
