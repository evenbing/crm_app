/**
 * @component ActivityDetailsItem.js
 * @description 活动详情组件
 * @time 2018/8/13
 * @author JUSTIN XU
 */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// constants
import { CustomerLevelTypes, IndustryTypes } from 'constants/enum';

// utils
import { formatLocationMap, formatMoney } from 'utils/base';

// components
import TitleItemComponent from 'components/Details/TitleItem';
import { renderBasicItem, RemarkView, RemarkText, RightSuffix } from 'components/Details/Styles';

const ContainerView = styled.View``;

const ActivityDetailsItem = ({
  item: {
    name, // '更新机会123',
    level,
    // superiorCustomerId,
    superiorCustomerName,
    industry,
    phone,
    fax,
    weibo,
    // locationId,
    location,
    website,
    peopleNumber,
    salesNumber,
    // departmentId,
    departmentName,
    description,
  },
}) => (
  <ContainerView>
    <TitleItemComponent
      text="基本信息"
    />
    {renderBasicItem('客户姓名', name)}
    {renderBasicItem('客户级别', CustomerLevelTypes[level])}
    {renderBasicItem('上级客户', superiorCustomerName)}
    {renderBasicItem('行业', IndustryTypes[industry])}
    <TitleItemComponent
      text="联系信息"
    />
    {renderBasicItem('地址', formatLocationMap(location))}
    {renderBasicItem('电话', phone)}
    {renderBasicItem('传真', fax)}
    {renderBasicItem('微博', weibo)}
    {renderBasicItem('网址', website)}
    <TitleItemComponent
      text="其他信息"
    />
    {renderBasicItem('总人数', formatMoney(peopleNumber), <RightSuffix>个</RightSuffix>)}
    {renderBasicItem('年销售额', formatMoney(salesNumber), <RightSuffix>元</RightSuffix>)}
    {renderBasicItem('所属部门', departmentName)}
    <TitleItemComponent
      text="备注"
      color="#373737"
      fontSize={16}
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
