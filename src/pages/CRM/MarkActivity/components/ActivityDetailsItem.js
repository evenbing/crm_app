/**
 * @component ActivityDetailsItem.js
 * @description 市场活动详情组件
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
import { MarketActivityStatus, MarketActivityTypes } from '../../../../constants/enum';
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
  font-size: ${theme.moderateScale(14)};
  color: #AEAEAE;
`;

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

const ActivityDetailsItem = ({
  actualCost, // 4546
  actualPeopleNumber, // 4242
  beginDate, // "1538236800000"
  budgetCost, // 124546
  budgetPeopleNumber, // 12
  budgetRevenue, // 1234887
  createdByName, // "测试员工1"
  creationTime, // "1538210392000"
  departmentId, // "982932499611389952"
  description, // "hdhdhdhdw"
  effect, // "54646464"
  endDate, // "1539792000000"
  executeDetail, // "bxhdhdjdjjdjdhdhdhhd"
  follow, // false
  id, // "1045956306525097984"
  name, // "xinzeng"
  ownerUserId, // "801689539444879360"
  ownerUserName, // "测试员工1"
  rowVersion, // "0"
  sourceType, // "EMAIL"
  status, // "ONGOING"
  tenantId, // "801689539428098048"
} = {}) => {
  return (
    <ContainerView>
      <TitleItemComponent
        text="基本信息"
      />
      {renderBasicItem('活动名称', name)}
      {renderBasicItem('活动状态', MarketActivityStatus[status])}
      {renderBasicItem('活动类型', MarketActivityTypes[sourceType])}
      <TitleItemComponent
        text="活动说明"
        color="#373737"
        fontSize={16}
      />
      <RemarkView>
        <RemarkText> {description} </RemarkText>
      </RemarkView>
      <TitleItemComponent
        text="计划信息"
      />
      {renderBasicItem('开始日期', formatDateByMoment(beginDate, 'YYYY-MM-DD'))}
      {renderBasicItem('结束日期', formatDateByMoment(endDate, 'YYYY-MM-DD'))}
      {renderBasicItem('活动成本', budgetCost, <RightSuffix>元</RightSuffix>)}
      {renderBasicItem('预期收入', budgetRevenue, <RightSuffix>元</RightSuffix>)}
      {renderBasicItem('邀请人数', budgetPeopleNumber, <RightSuffix>人</RightSuffix>)}
      {renderBasicItem('预期响应', effect, <RightSuffix>人</RightSuffix>)}
      <TitleItemComponent
        text="实际信息"
      />
      {renderBasicItem('实际人数', actualPeopleNumber, <RightSuffix>人</RightSuffix>)}
      {renderBasicItem('实际成本', actualCost, <RightSuffix>元</RightSuffix>)}
      {renderBasicItem('实际收入', '300000', <RightSuffix>元</RightSuffix>)}
      <TitleItemComponent
        text="其他信息"
      />
      {renderBasicItem('负责人', ownerUserName)}
      {renderBasicItem('所属部门', departmentId)}
      {renderBasicItem('创建人', createdByName)}
      {renderBasicItem('创建时间', formatDateByMoment(creationTime, 'YYYY-MM-DD'))}
      {renderBasicItem('最近修改时间', formatDateByMoment(creationTime, 'YYYY-MM-DD'))}
      {renderBasicItem('最近跟进人', '张三')}
      {renderBasicItem('最近跟进时间', '2018-09-09 09:00', null, null, true)}
      <TitleItemComponent
        text="备注"
        color="#373737"
      />
      <RemarkView>
        <RemarkText> {executeDetail} </RemarkText>
      </RemarkView>
    </ContainerView>
  );
};

ActivityDetailsItem.defaultProps = {};

ActivityDetailsItem.propTypes = {};

export default ActivityDetailsItem;
