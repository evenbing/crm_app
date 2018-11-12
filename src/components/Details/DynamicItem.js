/**
 * @component DynamicItem.jsm.js
 * @description ProductItem
 * @time 2018/8/07
 * @author zhao
 */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import moment from 'moment';
import { theme } from '../../constants';
import { DynamicRecordType } from '../../constants/enum';
import { moderateScale } from '../../utils/scale';

// components
import TouchableView from '../TouchableView';
import Thumbnail from '../Thumbnail';

const ContainerView = styled(TouchableView)`
  flex-direction: row;
  padding-bottom: ${moderateScale(10)};
  borderBottomWidth: 1px;
  borderColor: #F6F6F6;
  margin-bottom: ${moderateScale(10)};
`;

const LeftView = styled(Thumbnail)`
  width: ${moderateScale(32)};
  height: ${moderateScale(32)};
  border-radius: 4px;
  margin-right: ${moderateScale(17)};
`;

const RightView = styled.View`
  flex: 1;
`;

const NameText = styled.Text`
  font-family: ${theme.fontMedium};
  font-size: ${moderateScale(14)};
  color: #516189;
  background-color: transparent;
  margin-bottom: ${moderateScale(5)};
`;

const ContentText = styled.Text`
  font-family: ${theme.fontRegular};
  font-size: ${moderateScale(14)};
  color: #474747;
  background-color: transparent;
  margin-bottom: ${moderateScale(5)};
`;

const PicImage = styled(Thumbnail)`
  width: ${moderateScale(108)};
  height: ${moderateScale(140)};
  margin-top: ${moderateScale(3)};
  margin-bottom: ${moderateScale(5)};
`;

const BottomView = styled.View`
  flex-direction: row;
  align-items: center;
`;

const TimeText = styled.Text`
  font-family: ${theme.fontRegular};
  font-size: ${moderateScale(12)};
  color: #BBBBBB;
  margin-left: ${moderateScale(10)};
`;

const TypeText = styled.Text`
  font-family: ${theme.fontRegular};
  font-size: ${moderateScale(12)};
  color: #18B548;
`;


class DynamicItem extends React.PureComponent {
  render() {
    const {
      onPress,
      item: {
        headImg,
        createdByName,
        content,
        attachmentList = [],
        contentType,
        creationTime,
      },
    } = this.props;
    const attList = attachmentList.slice();

    return (
      <ContainerView onPress={onPress}>
        <LeftView
          imgUri={headImg ? headImg.trim() : null}
        />
        <RightView>
          <NameText>{createdByName}</NameText>
          <ContentText>{content}</ContentText>
          {
            attList.length ? (
              <PicImage
                imgUri={attList[0].filePath || null}
              />
            ) : null
          }
          <BottomView>
            <TypeText>{DynamicRecordType[contentType]}</TypeText>
            <TimeText>{moment(Number(creationTime)).format('HH:mm')}</TimeText>
          </BottomView>
        </RightView>

      </ContainerView>
    );
  }
}

DynamicItem.defaultProps = {
  item: {},
  onPress: () => null,
};

DynamicItem.propTypes = {
  item: PropTypes.objectOf(PropTypes.any),
  onPress: PropTypes.func,
};

export default DynamicItem;
