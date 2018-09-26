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

  // class:"com.xiniunet.customerRelations.domain.Customer"
  // createdByName:"测试员工1"
  // creationTime:"1537949474000"
  // departmentId:"999160903427821568"
  // description:"看了一下午"
  // fax:"175999"
  // feeds:Array(0)
  // follow:false
  // followUpStatus:false
  // id:"1044861939311841280"
  // industry:"HIGH_TECH"
  // isActive:true
  // level:"A"
  // location:Object
  // locationId:"1044861938393288704"
  // name:"头像"
  // ownerUserId:"801689539444879360"
  // ownerUserName:"测试员工1"
  // peopleNumber:12
  // phone:"154253688558"
  // pinyin:"touxiang"
  // py:"tx"
  // rowVersion:"0"
  // salesNumber:128
  // superiorCustomerId:"1032800638335062016"
  // tenantId:"801689539428098048"
  // website:"KTV音响"
  // weibo:"好困"

  data: {
    expectedDate, // '1536422400000',
    follow, // false,
    id, // '1032876348290502657',
    inActive, // false,
    lastPhaseUpdateTime, // '1535092474000',
    name, // '更新机会123',
    ownerUserId, // '801689539444879360',
    ownerUserName, // '大佬5',
    planAmount, // 33,
    rowVersion, // '3',
    salesPhaseId, // '3333333333',
    tenantId, // '801689539428098048',
  },
} = {}) => (
  <ContainerView>
    <TitleItemComponent
      text="基本信息"
    />
    {renderBasicItem('姓名', name)}
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
