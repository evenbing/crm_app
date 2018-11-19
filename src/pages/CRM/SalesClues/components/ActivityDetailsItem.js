/**
 * @component ActivityDetailsItem.js
 * @description 活动详情组件
 * @time 2018/8/13
 * @author JUSTIN XU
 */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { LeadsSource, SexTypes } from '../../../../constants/enum';
import { formatLocationMap } from '../../../../utils/base';

// components
import TitleItemComponent from '../../../../components/Details/TitleItem';
import { renderBasicItem, RemarkView, RemarkText } from '../../../../components/Details/Styles';

const ContainerView = styled.View``;

const ActivityDetailsItem = ({
  item: {
    name,
    sex,
    companyName,
    departmentName,
    jobTitle,

    phone,
    mobilePhone,
    email,
    weibo,
    location,
    postCode,

    source,
    activityName,

    description,
  },
} = {}) => (
  <ContainerView>
    <TitleItemComponent
      text="基本信息"
    />
    {renderBasicItem('姓名', name)}
    {renderBasicItem('性别', SexTypes[sex])}
    {renderBasicItem('客户名称', companyName)}
    {renderBasicItem('部门', departmentName)}
    {renderBasicItem('职务', jobTitle, null, null, true)}
    <TitleItemComponent
      text="联系信息"
    />
    {renderBasicItem('电话', phone)}
    {renderBasicItem('手机', mobilePhone)}
    {renderBasicItem('邮箱', email)}
    {renderBasicItem('微博', weibo)}
    {renderBasicItem('地址', formatLocationMap(location))}
    {renderBasicItem('邮政编码', postCode)}
    <TitleItemComponent
      text="其他信息"
    />
    {renderBasicItem('线索来源', LeadsSource[source])}
    {renderBasicItem('市场活动', activityName)}
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
