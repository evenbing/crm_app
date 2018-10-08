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
import { CustomerLevelTypes, industryTypes } from '../../../../constants/enum';

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
  item: {
    name, // '更新机会123',
    level,
    superiorCustomerId,
    industry,
    locationId,
    phone,
    fax,
    weibo,
    website,
    peopleNumber,
    salesNumber,
    departmentId,
    description,
  },
} = {}) => (
  <ContainerView>
    <TitleItemComponent
      text="基本信息"
    />
    {renderBasicItem('客户姓名', name)}
    {renderBasicItem('客户级别', CustomerLevelTypes[level])}
    {renderBasicItem('上级客户', superiorCustomerId)}
    {renderBasicItem('行业', industryTypes[industry])}
    <TitleItemComponent
      text="联系信息"
    />
    {renderBasicItem('省份地市', locationId)}
    {renderBasicItem('详细地址', locationId)}
    {renderBasicItem('电话', phone)}
    {renderBasicItem('邮箱', fax)}
    {renderBasicItem('微博', weibo)}
    {renderBasicItem('网址', website)}
    <TitleItemComponent
      text="其他信息"
    />
    {renderBasicItem('总人数', peopleNumber, <RightSuffix>个</RightSuffix>)}
    {renderBasicItem('年销售额', salesNumber, <RightSuffix>元</RightSuffix>)}
    {renderBasicItem('所属部门', departmentId)}
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


ActivityDetailsItem.defaultProps = {};

ActivityDetailsItem.propTypes = {};

export default ActivityDetailsItem;
