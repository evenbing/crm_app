/**
 * @component MemberItem.js
 * @description 成员条目组件
 * @time 2018/8/28
 * @author JUSTIN XU
 */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { theme } from '../../constants';

// components
import TouchableView from '../TouchableView';
import Thumbnail from '../Thumbnail';

const ContainerView = styled(TouchableView)`
  width: 100%;
  height: ${theme.moderateScale(74)};
  padding: 0 ${theme.moderateScale(15)}px;
  position: relative;
  flex-direction: row;
  align-items: center;
`;

const BoardView = styled.View`
  position: absolute;
  height: 1px;
  width: 100%;
  left: ${theme.moderateScale(15)};
  bottom: 0;
  background-color: ${theme.borderColor};
`;

const LeftIconView = styled.View`
  width: ${theme.moderateScale(43)};
  align-items: center;
`;

const NameText = styled.Text`
  margin-left: ${theme.moderateScale(17)};
  font-family: ${theme.fontMedium};
`;

const MemberItem = ({
  item,
  index,
  onPress,
  style,
  hiddenIcon,
}) => {
  return (
    <ContainerView
      style={style}
      onPress={() => onPress({ item, index })}
    >
      {
        hiddenIcon ? null : (
          <LeftIconView>
            <Thumbnail
              source={item.actived ? require('../../img/company/selected.png') : require('../../img/company/unselected.png')}
              size={20}
            />
          </LeftIconView>
        )
      }
      <Thumbnail
        source={item.headImg || require('../../img/default_avatar.png')}
        size={60}
      />
      <NameText>{item.userName}</NameText>
      <BoardView />
    </ContainerView>
  );
};

MemberItem.defaultProps = {
  item: {},
  index: 0,
  onPress: () => null,
  style: {},
  hiddenIcon: false,
};

MemberItem.propTypes = {
  item: PropTypes.objectOf(PropTypes.any),
  index: PropTypes.number,
  onPress: PropTypes.func,
  style: PropTypes.objectOf(PropTypes.any),
  hiddenIcon: PropTypes.bool,
};

export default MemberItem;
