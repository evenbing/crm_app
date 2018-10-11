/**
 * @component ActivityDetailsItem.js
 * @description 活动详情组件
 * @time 2018/8/13
 * @author JUSTIN XU
 */
import React from 'react';
// import PropTypes from 'prop-types';
import styled from 'styled-components';

import { theme } from '../../../../constants';
// components
import NavItemComponent from '../../../../components/NavItem';
import TitleItemComponent from '../../../../components/Details/TitleItem';
import { OpportunityTypes, OpportunitySource } from '../../../../constants/enum';
import { formatDateByMoment } from '../../../../utils/base';

const ContainerView = styled.View``;

const RightSuffix = styled.Text`
  margin-left: ${theme.moderateScale(13)};
  color: #373737;
  font-size: ${theme.moderateScale(16)};
`;

const RemarkView = styled.View`
  padding: 0 ${theme.moderateScale(15)}px;
`;

const RemarkText = styled.Text`
  font-size: ${theme.moderateScale(16)};
  color: #AEAEAE;
`;

const formatDateTypeShow = 'YYYY-MM-DD HH:mm';
const renderBasicItem = (leftText, rightText, rightSuffix, rightStyle = {}, isLast = false) => (
  <NavItemComponent
    height={44}
    leftText={leftText}
    rightText={rightText}
    showNavIcon={false}
    isLast={isLast}
    rightTextStyle={{
      color: theme.textGrayColor,
      ...rightStyle,
    }}
    rightSuffix={rightSuffix}
  />
);

const ActivityDetailsItem = (props) => {
  const {
    activityId, // "1042418682246074368"
    activityStatus, // "ONGOING"
    actualCost, // 257
    budgetCost, // 258
    createdByName, // "测试员工1"
    creationTime, // "1539240302000"
    customerId, // "1049914714026545152"
    customerName, // "ggbb"
    departmentId, // "999572383251959808"
    departmentName, // "测试pos机结算"
    description, // "chbnnnnnnvv"
    expectedDate, // "1540915200000"
    follow, // false
    id, // "1050276062103212032"
    inActive, // false
    name, // "ttttttttttttttttt"
    opportunityType, // "OLD_CUSTOMER"
    ownerUserId, // "801689539444879360"
    ownerUserName, // "测试员工1"
    planAmount, // 2588
    rate, // 60
    rowVersion, // "0"
    salesPhaseId, // "1027551196627734530"
    salesPhaseName, // "方案报价"
    sourceType, // "SALES_OPPORTUNITY__INTRODUCTION"
    tenantId, // "801689539428098048"
    getDetailItem,
  } = props;
  const opportunityTypeName = OpportunityTypes[opportunityType];
  const sourceTypeName = OpportunitySource[sourceType];
  const expectedDateShow = formatDateByMoment(expectedDate, formatDateTypeShow);
  getDetailItem({
    ...props,
    opportunityTypeName,
    sourceTypeName,
    expectedDateShow,
  });
  return (
    <ContainerView>
      <TitleItemComponent
        text="基本信息"
      />
      {renderBasicItem('机会名称', name)}
      {renderBasicItem('客户', customerName)}
      {renderBasicItem('价格表', '价格表')}
      {renderBasicItem('机会类型', opportunityTypeName)}
      {renderBasicItem('销售金额', planAmount, <RightSuffix>元</RightSuffix>)}
      {renderBasicItem('来源', sourceTypeName)}
      {renderBasicItem('市场活动', '市场活动')}
      {renderBasicItem('结单日期', expectedDateShow)}
      {renderBasicItem('项目预算', budgetCost, <RightSuffix>元</RightSuffix>)}
      {renderBasicItem('实际花费', actualCost, <RightSuffix>元</RightSuffix>)}
      <TitleItemComponent
        text="其他信息"
      />
      {renderBasicItem('所属部门', departmentName)}
      <TitleItemComponent
        text="备注"
        color="#373737"
      />
      <RemarkView>
        <RemarkText>
            活动说明，活动说明，活动说明，活动说明，活动说明，活动说明，
        </RemarkText>
      </RemarkView>
    </ContainerView>
  );
};


ActivityDetailsItem.defaultProps = {};

ActivityDetailsItem.propTypes = {};

export default ActivityDetailsItem;
