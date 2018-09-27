import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import moment from 'moment';
import { moderateScale } from '../../../../utils/scale';
import { theme } from '../../../../constants';
import { DataTitleTypes } from '../../../../constants/enum';

// static source
import rightArrow from '../../../../img/home/ico_right_arrow.png';

// components
import { HorizontalDivider } from '../../../../components/Styles/Divider';

const ContainerView = styled.View`
  margin-top: ${moderateScale(10)};
`;

const ListHeaderView = styled.View`
  height: ${moderateScale(44)}px;
  padding: 0px ${moderateScale(15)}px;
  background-color: ${theme.whiteColor};
`;

const ListHeaderText = styled.Text.attrs({
  numberOfLines: 1,
})`
  color: ${theme.textColor};
  font-size: ${moderateScale(16)}px;
  height: ${moderateScale(43)}px;
  line-height: ${moderateScale(43)}px;
`;

const ListSectionView = styled.View`
  flex-direction: row;
  align-items: center;
  height: ${moderateScale(44)}px;
  padding: 0px ${moderateScale(15)}px;
  background-color: ${theme.whiteColor};
`;

const TypeText = styled.Text`
  font-size: ${moderateScale(16)}px;
  color: ${theme.textColor};
`;

const MiddleView = styled.View`
  flex: 1;
  flex-direction: row;
`;

const TimeText = styled.Text`
  font-size: ${moderateScale(16)}px;
  color: ${theme.textPlaceholderColor};
  margin-left: ${moderateScale(20)}px;
  margin-right: ${moderateScale(10)}px;
`;

const AmountText = styled.Text`
  font-size: ${moderateScale(16)}px;
  color: ${theme.textPlaceholderColor};
`;

const RightView = styled.View`
  flex-direction: row;
  align-items: center;
`;

const StatusText = styled.Text`
  font-size: ${moderateScale(14)}px;
  color: ${theme.primaryColor};
`;

const NavIcon = styled.Image.attrs({
  source: rightArrow,
})`
  width: ${moderateScale(6)}px;
  height: ${moderateScale(11)}px;
`;

class ReceivableItem extends React.PureComponent {
  renderItem = () => {
    const {
      item: {
        receivableDetailList = [],
      },
      totalPrice,
    } = this.props;
    if (!receivableDetailList.length) return null;
    return receivableDetailList.map(value => (
      <ListSectionView key={value.id}>
        <TypeText>计划</TypeText>
        <MiddleView>
          <TimeText>
            {
              value.receivableDate ?
                moment(Number(value.receivableDate)).format('YYYY-MM-DD')
                : null
            }
          </TimeText>
          <AmountText> {value.receivablePrice} </AmountText>
        </MiddleView>
        <RightView>
          <StatusText> {totalPrice <= value.receivablePrice ? '已完成' : '未完成'} </StatusText>
          <NavIcon />
        </RightView>
      </ListSectionView>
    ));
  };
  render() {
    const {
      index,
    } = this.props;
    return (
      <ContainerView>
        <ListHeaderView>
          <ListHeaderText> 第{DataTitleTypes[index]}期 </ListHeaderText>
          <HorizontalDivider height={moderateScale(1)} />
        </ListHeaderView>
        {this.renderItem()}
      </ContainerView>
    );
  }
}

ReceivableItem.defaultProps = {
  item: {},
  index: 0,
  isLast: false,
  totalPrice: 0,
};

ReceivableItem.propTypes = {
  item: PropTypes.objectOf(PropTypes.any),
  index: PropTypes.number,
  isLast: PropTypes.bool,
  totalPrice: PropTypes.number,
};

export default ReceivableItem;
