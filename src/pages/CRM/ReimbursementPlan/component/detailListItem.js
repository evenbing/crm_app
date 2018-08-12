
/**
 * @component DetailListItem.jsm.js
 * @description DetailListItem
 * @time 2018/8/12
 * @author zhao
 */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { theme } from '../../../../constants';
import { moderateScale } from '../../../../utils/scale';

import DetailItem from './detailItem';

const ContainerView = styled.View`
padding-left: ${moderateScale(15)};
padding-right: ${moderateScale(15)};
flex-direction: row;
background-color: #fff;
padding-top: ${props => props.isFrist ? moderateScale(20) : 0};
`;

const LeftView = styled.View`
flex-direction: row;
width: ${moderateScale(50)};
margin-right: ${moderateScale(3)};
align-items: baseline;
`
const MonthText = styled.Text`
font-family: ${theme.fontRegular};
font-size:${moderateScale(12)};
color: #494949;
background-color: transparent;
`
const DayText = styled.Text`
font-family: ${theme.fontMedium};
font-size: ${moderateScale(16)};
color: #1F1F1F;
background-color: transparent;
`
const RightView = styled.View`
flex: 1;
`

class DetailListItem extends React.PureComponent {
  render() {
    const { onPress, data, isFrist } = this.props
    return (
      <ContainerView onPress={onPress} isFrist={isFrist}>
        {
          data.type == 1 ? <LeftView><DayText>今天</DayText></LeftView> : (
            <LeftView>
              <MonthText>5月</MonthText>
              <DayText>27</DayText>
            </LeftView>
          )
        }
        <RightView>
          {
            data.list.map((item, index) => <DetailItem key={index} data={item} />)
          }
        </RightView>
      </ContainerView>
    );
  }
}

DetailListItem.defaultProps = {
  data: {},
  onPress: () => null,
  isFrist: false
};

DetailListItem.propTypes = {
  data: PropTypes.object.isRequired,
  onPress: PropTypes.func,
  isFrist: PropTypes.bool
};

export default DetailListItem;
