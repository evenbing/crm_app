/**
 * @component ListItem.js
 * @description 任务日程列表
 * @time 2018/8/5
 * @author
 */
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { TouchableView } from 'xn-react-native-applets';

// static source
import OperateIconImage from '../../../img/home/ico_operate_icon.png';

import { moderateScale } from '../../../utils/scale';
import { theme } from '../../../constants';
import { HorizontalDivider } from '../../../components/Styles/Divider';

const DivderView = styled.View`
  width: ${moderateScale(1)}px;
  height: ${moderateScale(39)}px;
  background-color: ${theme.pageBackColor};
`;

const ContainerView = styled.View`
  padding-top: ${theme.moderateScale(10)};
  padding-left: ${theme.moderateScale(15)};
  padding-right: ${theme.moderateScale(15)};
`;

const SectionItemView = styled(TouchableView)`
  background-color: ${theme.whiteColor};
  padding: ${moderateScale(15)}px 0px;
  flex-direction: row;
  align-items: center;
`;

const Lace = styled.View`
    width: ${moderateScale(4)};
    height: ${moderateScale(48)};
    background-color: ${theme.primaryColor};
    margin-right: ${moderateScale(15)};
  `;

const TimeView = styled.View`
  align-items: center;
  padding-top: ${moderateScale(10)}px;
  margin-right: ${moderateScale(9)}px;
  width: ${moderateScale(96)}px;
`;

const Duration = styled.Text.attrs({
  numberOfLines: 1,
})`
  color: ${theme.primaryColor};
  font-size: ${moderateScale(16)};
`;

const Type = styled.Text.attrs({
  numberOfLines: 1,
  ellipsizeMode: 'tail',
})`
  height: ${moderateScale(17)}px;
  color: grey;
  font-size: ${moderateScale(12)}px;
  line-height: ${moderateScale(17)}px;
`;

const Theme = styled.View`
  flex: 1;
  padding-top: ${moderateScale(10)}px;
  margin-left: ${moderateScale(8)}px;
`;

const Title = styled.Text.attrs({
  numberOfLines: 1,
  ellipsizeMode: 'tail',
})`
  color: black;
  font-size: ${moderateScale(18)};
`;

const Time = styled.Text.attrs({
  numberOfLines: 1,
  ellipsizeMode: 'tail',
})`
  height: ${moderateScale(17)}px;
  color: grey;
  font-size: ${moderateScale(12)}px;
  line-height: ${moderateScale(17)}px;
`;

const Operate = styled.TouchableOpacity`
  align-items: center;
  padding: 0px ${moderateScale(12)}px;
`;

const OperateIcon = styled.Image.attrs({
  source: OperateIconImage,
})`
  width: ${moderateScale(22)};
  height: ${moderateScale(22)};
`;

const OperateCompletedView = styled.View`
  justify-content: center;
  align-items: center;
  padding: 0px ${moderateScale(12)}px;
`;

const OperateCompletedTex = styled.Text`
  color: ${theme.primaryColor};
`;

const OperateView = styled.View`
  height: ${props => props.showOperateView ? moderateScale(37) : '0px'};
  background-color: ${theme.whiteColor};
`;

const OperateItemView = styled.View`
  flex-direction: row;
  background-color: ${theme.whiteColor};
`;

const OperateItem = styled.TouchableOpacity`
  flex: 1;
  height: ${moderateScale(36)};
  justify-content: center;
  align-items: center;
  background-color: ${props => props.showOperateView ? 'white' : 'transparent'};
`;

const OperateText = styled.Text`
  font-size: ${moderateScale(16)};
  color:  ${props => props.showOperateView ? ' #26B34E' : 'transparent'};
`;

class ListItem extends React.PureComponent {
  state = {
    showOperateView: false,
  };

  onToggleOperateView = ({ id, type, startTime, endTime, moduleId, moduleType, rowVersion } = {}) => () => {
    const {
      item: { operateList },
      onPressItem,
    } = this.props;
    if (operateList && operateList.length > 0) {
      if (type === '任务') {
        onPressItem({ id, type: 'TASK', startTime, endTime, moduleId, moduleType, rowVersion });
      } else {
        onPressItem({ id, type: 'SCHEDULE', startTime, endTime, moduleId, moduleType, rowVersion });
      }
      this.setState({ showOperateView: !this.state.showOperateView });
    }
  }

  renderOperate = () => {
    const {
      props: {
        item: {
          id,
          type,
          startTime,
          endTime,
          moduleId,
          moduleType,
          rowVersion,
          isCompleted,
        },
        showOperate,
      },
    } = this;
    if (!isCompleted && showOperate) {
      return (
        <Operate
          onPress={
            this.onToggleOperateView({
              id, type, startTime, endTime, moduleId, moduleType, rowVersion,
            })
          }
        >
          <OperateIcon />
        </Operate>
      );
    }
    return (
      <OperateCompletedView>
        <OperateCompletedTex>已完成</OperateCompletedTex>
      </OperateCompletedView>
    );
  };

  render() {
    const {
      state: {
        showOperateView,
      },
      props: {
        item: {
          id,
          duration,
          startDuration,
          endDuration,
          type,
          name,
          comment,
          operateList,
        },
        onPressDetails,
      },
    } = this;
    return (
      <ContainerView>
        <SectionItemView
          onPress={onPressDetails}
        >
          <Lace />
          <TimeView>
            {
              startDuration ? (<Duration>{startDuration}</Duration>) : null
            }
            {
              startDuration && endDuration ? <Type>至</Type> : null
            }
            {
              endDuration ? (<Duration>{endDuration}</Duration>) : null
            }
            {
              duration ? (<Duration>{duration}</Duration>) : null
            }
            <Type>{type}</Type>
          </TimeView>
          <DivderView />
          <Theme>
            <Title>{name}</Title>
            <Time>{comment}</Time>
          </Theme>
          <DivderView />
          {this.renderOperate()}
        </SectionItemView>
        <OperateView showOperateView={showOperateView}>
          <HorizontalDivider height={moderateScale(1)} />
          <OperateItemView>
            {operateList && operateList.map((item) => {
              const {
                key,
                text,
                onPress,
              } = item;
              return (
                <OperateItem
                  showOperateView={showOperateView}
                  onPress={text === '删除' ? onPress(id) : () => onPress(id)}
                  key={key}
                >
                  <OperateText showOperateView={showOperateView}>{text}</OperateText>
                </OperateItem>
              );
            })}
          </OperateItemView>
        </OperateView>
      </ContainerView>
    );
  }
}

ListItem.defaultProps = {
  item: {},
  showOperate: true,
  onPressItem: () => null,
  onPressDetails: () => null,
};

ListItem.propTypes = {
  item: PropTypes.objectOf(PropTypes.any),
  showOperate: PropTypes.bool,
  onPressItem: PropTypes.func,
  onPressDetails: PropTypes.func,
};

export default ListItem;
