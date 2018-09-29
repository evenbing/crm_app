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
  expectedDate, // "1536422400000",
  follow, // false,
  id, // "1032876348290502657",
  inActive, // false,
  lastPhaseUpdateTime, // "1535092474000",
  name, // "更新机会123",
  ownerUserId, // "801689539444879360",
  ownerUserName, // "大佬5",
  planAmount, // 33,
  rowVersion, // "3",
  salesPhaseId, // "1027551196627734528",
  tenantId, // "801689539428098048",
} = {}) => (
  <ContainerView>
    <TitleItemComponent
      text="基本信息"
    />
    {renderBasicItem('机会名称', name)}
    {renderBasicItem('客户', '2018-09-09')}
    {renderBasicItem('价格表', '2018-09-09')}
    {renderBasicItem('机会类型', '部门部门部门')}
    {renderBasicItem('销售金额', '职务职务', <RightSuffix>元</RightSuffix>)}
    {renderBasicItem('来源', '职务职务')}
    {renderBasicItem('市场活动', '职务职务')}
    {renderBasicItem('结单日期', '职务职务')}
    {renderBasicItem('项目预算', '职务职务', <RightSuffix>元</RightSuffix>)}
    {renderBasicItem('实际花费', '职务职务', <RightSuffix>元</RightSuffix>)}
    <TitleItemComponent
      text="其他信息"
    />
    {renderBasicItem('负责人', '张三')}
    {renderBasicItem('所属部门', '所属部门所属部门')}
    {renderBasicItem('创建人', '创建人创建人')}
    {renderBasicItem('创建时间', '2018-09-09 09:00')}
    {renderBasicItem('最近修改时间', '2018-09-09 09:00')}
    {renderBasicItem('最近跟进人', '张三')}
    {renderBasicItem('最近跟进时间', '2018-09-09 09:00', null, null, true)}
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


ActivityDetailsItem.defaultProps = {};

ActivityDetailsItem.propTypes = {};

export default ActivityDetailsItem;
