
/**
 * @component DetailItem.jsm.js
 * @description ProductItem
 * @time 2018/8/07
 * @author zhao
 */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { theme } from '../../../../constants';
import { moderateScale } from '../../../../utils/scale';
import TouchableView from '../../../../components/TouchableView'

const ContainerView = styled(TouchableView)`
flex-direction: row;
padding-bottom: ${moderateScale(10)};
borderBottomWidth: 1px;
borderColor: #F6F6F6;
margin-bottom: ${moderateScale(10)};
`;

const LeftView = styled.View`
width: ${moderateScale(32)};
height: ${moderateScale(32)};
background-color: #D8D8D8;
border-radius: 4;
margin-right: ${moderateScale(17)};
`
const RightView = styled.View`
flex: 1;
`
const NameText = styled.Text`
font-family: ${theme.fontMedium};
font-size: ${moderateScale(14)};
color: #516189;
background-color: transparent;
margin-bottom: ${moderateScale(5)};
`
const ContentText = styled.Text`
font-family: ${theme.fontRegular};
font-size: ${moderateScale(14)};
color: #474747;
background-color: transparent;
margin-bottom: ${moderateScale(5)};
`
const PicImage = styled.View`
width: ${moderateScale(108)};
height: ${moderateScale(140)};
background: #D8D8D8;
margin-top: ${moderateScale(3)};
margin-bottom: ${moderateScale(5)};
`
const BottomView = styled.View`
flex-direction: row;
align-items: center;
`
const TimeText = styled.Text`
font-family: ${theme.fontRegular};
font-size: ${moderateScale(12)};
color: #BBBBBB;
margin-left: ${moderateScale(10)};
`
const TypeText = styled.Text`
font-family: ${theme.fontRegular};
font-size: ${moderateScale(12)};
color: #18B548;
`


class DetailItem extends React.PureComponent {
  render() {
    const { onPress, data } = this.props

    return (
      <ContainerView onPress={onPress}>
        <LeftView />
        <RightView>
          <NameText>张三</NameText>
          <ContentText>李总会带3个销售人员参会，李总会带3个销售人员参会李总会带3个销售人员参会。</ContentText>
          {
            data.url ? <PicImage /> : null
          }
          <BottomView>
            <TypeText>快速记录</TypeText>
            <TimeText>13:00</TimeText>
          </BottomView>
        </RightView>

      </ContainerView>
    );
  }
}

DetailItem.defaultProps = {
  data: {},
  onPress: () => null,
};

DetailItem.propTypes = {
  data: PropTypes.object.isRequired,
  onPress: PropTypes.func,
};

export default DetailItem;
