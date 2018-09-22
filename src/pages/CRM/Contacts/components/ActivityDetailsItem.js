/**
 * @component ActivityDetailsItem.js
 * @description 活动详情组件
 * @time 2018/8/13
 * @author JUSTIN XU
 */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { theme } from '../../../../constants';
import { SexTypes } from '../../../../constants/enum';
import { formatDateByMoment } from '../../../../utils/base';

// components
import NavItemComponent from '../../../../components/NavItem';
import TitleItemComponent from '../../../../components/Details/TitleItem';

const ContainerView = styled.View``;

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
    rightText={rightText || '--'}
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
  item,
}) => (
  <ContainerView>
    <TitleItemComponent
      text="基本信息"
    />
    {renderBasicItem('姓名', item.name)}
    {renderBasicItem('性别', item.sex ? (SexTypes[item.sex] || item.sex) : null)}
    {renderBasicItem('出生日期', formatDateByMoment(item.birthDate))}
    {renderBasicItem('公司名称', item.companyName)}
    {renderBasicItem('部门', item.departmentName)}
    {renderBasicItem('职务', item.jobTitle)}
    <TitleItemComponent
      text="联系信息"
    />
    {renderBasicItem('电话', item.phoneNumber)}
    {renderBasicItem('手机', item.mobilePhone)}
    {renderBasicItem('微博', item.weibo)}
    {renderBasicItem('地址', item.location && item.cityName)}
    {renderBasicItem('邮箱', item.email)}
    {renderBasicItem('邮编', item.postCode)}
    <TitleItemComponent
      text="备注"
      color="#373737"
    />
    <RemarkView>
      <RemarkText>
        {item.description}
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
