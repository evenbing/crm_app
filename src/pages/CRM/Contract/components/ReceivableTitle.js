import React from 'react';
import PropType from 'prop-types';
import LinearGradient from 'react-native-linear-gradient';
import { Bar as ReceivableProgress } from 'react-native-progress';
import styled from 'styled-components';
import { LeftBackIcon } from '../../../../components/Layout';
import { moderateScale, width } from '../../../../utils/scale';
import { theme } from '../../../../constants';

const ReceivableTitleView = styled.View`
  background-color: transparent;
  height: ${moderateScale(120)}px;
  align-items: center;
`;

const ReceivableText = styled.Text.attrs({
  numberOfLines: 1,
})`
  font-size: ${moderateScale(18)}px;
  color: ${theme.whiteColor};
  margin-top: ${moderateScale(22)}px;
  margin-bottom: ${moderateScale(12)}px;
  text-align: center;
`;

const CurReceivable = styled.View`
  width: ${width};
  margin-bottom: ${moderateScale(6)}px;
`;

const CurReceivableText = styled.Text.attrs({
  numberOfLines: 1,
})`
  font-size: ${moderateScale(12)}px;
  color: ${theme.whiteColor};
  margin-left: ${props => (props.progress * (width - (2 * moderateScale(58)))) + (moderateScale(58) / 2)}px;
`;

const TotalReceivable = styled.View`
  width: ${width};
  margin-top: ${moderateScale(6)}px;
  margin-bottom: ${moderateScale(18)}px;
`;

const TotalReceivableText = styled.Text.attrs({
  numberOfLines: 1,
})`
  font-size: ${moderateScale(12)}px;
  color: ${theme.whiteColor};
  margin-left: ${width - (2 * moderateScale(58))}px;
`;

const ReceivableTitle = ({ progress }) => {
  const ReceivableProgressProps = {
    progress,
    width: width - (2 * moderateScale(58)),
    height: moderateScale(4),
    color: '#FEDB3D',
    unfilledColor: '#191919',
    borderWidth: 0,
    borderColor: 'transparent',
    useNativeDriver: true,
    borderRadius: moderateScale(2),
  };
  return (
    <LinearGradient
      start={{ x: 0, y: 0 }}
      end={{ x: 1.0, y: 1.0 }}
      colors={['#169C58', '#8EC963']}
    >
      <ReceivableTitleView>
        <ReceivableText>回款进度</ReceivableText>
        <CurReceivable>
          <CurReceivableText progress={progress}>
                ¥1000.000
          </CurReceivableText>
        </CurReceivable>
        <ReceivableProgress {...ReceivableProgressProps} />
        <TotalReceivable>
          <TotalReceivableText>¥2000.000</TotalReceivableText>
        </TotalReceivable>
      </ReceivableTitleView>
    </LinearGradient>
  );
};

ReceivableTitle.navigationOptions = ({ navigation }) => ({
  title: '回款',
  headerLeft: (
    <LeftBackIcon
      onPress={() => navigation.goBack()}
    />
  ),
});

ReceivableTitle.propTypes = {
  progress: PropType.number,
};

ReceivableTitle.defaultProps = {
  progress: 0,
};

export default ReceivableTitle;
