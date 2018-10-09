/**
 * @component ActivityDetailsItem.js
 * @description 活动详情组件
 * @time 2018/8/13
 * @author JUSTIN XU
 */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
// import { LeadsSource } from '../../../../constants/enum';

// components
import TitleItemComponent from '../../../../components/Details/TitleItem';
import { renderBasicItem, RemarkView, RemarkText, RightSuffix } from '../../../../components/Details/Styles';

const ContainerView = styled.View``;

const ActivityDetailsItem = ({
  item: {
    name,
    sex,
    companyName,
    departmentName,
    jobTitle,
    ownerUserName, // "大佬5",
    leadsDepartmentName,
    planAmount, // 33,
    salesPhaseId, // "1027551196627734528",
    expectedDate, // "1536422400000",
    follow, // false,
    id, // "1032876348290502657",
    inActive, // false,
    lastPhaseUpdateTime, // "1535092474000",
    source,
    description,
  },
} = {}) => (
  <ContainerView>
    <TitleItemComponent
      text="基本信息"
    />
    {renderBasicItem('姓名', name)}
    {renderBasicItem('性别', sex)}
    {renderBasicItem('公司名称', companyName)}
    {renderBasicItem('部门', leadsDepartmentName)}
    {renderBasicItem('职务', jobTitle, null, null, true)}
    <TitleItemComponent
      text="联系信息"
    />
    {renderBasicItem('开始时间', '')}
    {renderBasicItem('结束时间', '')}
    {renderBasicItem('活动成本', '', <RightSuffix>元</RightSuffix>)}
    {renderBasicItem('预期收入', '', <RightSuffix>元</RightSuffix>)}
    {renderBasicItem('邀请人数', '')}
    {renderBasicItem('预期响应', '')}
    {renderBasicItem('实际成本', '', <RightSuffix>元</RightSuffix>, null, true)}
    <TitleItemComponent
      text="其他信息"
    />
    {renderBasicItem('负责人', ownerUserName)}
    {renderBasicItem('所属部门', departmentName)}
    {renderBasicItem('创建人', '')}
    {renderBasicItem('创建时间', '')}
    {renderBasicItem('最近修改时间', '')}
    {renderBasicItem('最近跟进人', '')}
    {renderBasicItem('最近跟进时间', '', null, null, true)}
    <TitleItemComponent
      text="备注"
      color="#373737"
    />
    <RemarkView>
      <RemarkText>
        {description}
      </RemarkText>
    </RemarkView>
  </ContainerView>
);


ActivityDetailsItem.defaultProps = {
  item: {},
};

ActivityDetailsItem.propTypes = {
  item: PropTypes.objectOf(PropTypes.any),
};

export default ActivityDetailsItem;
