import React from 'react';
import { View, KeyboardAvoidingView } from 'react-native';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// utils
import { isIos } from '../../../utils/utils';

// constants
import { theme } from '../../../constants';

// components
import {
  ContainerView,
  ContainerScrollView,
} from '../../../components/Styles/Layout';
import {
  CommStatusBar,
  LeftBackIcon,
  RightView,
} from '../../../components/Layout';
import NavInputItem from '../../../components/NavInputItem';
import {
  TextareaGroup,
  TextareaView,
} from '../../../components/Styles/Editor';
import Thumbnail from '../../../components/Thumbnail';
import { CenterText } from '../../../components/Styles/Form';

const ProductImage = styled.View`
  padding-top: ${theme.moderateScale(14)}px;
  padding-bottom: ${theme.moderateScale(19)}px;
  align-items: center;
`;

const Name = styled.Text`
  font-size: ${theme.moderateScale(16)}px;
  color: ${theme.textFormColor};
  margin-top: ${theme.moderateScale(15)}px;
  margin-bottom: ${theme.moderateScale(5)}px;
`;

const StandPrice = styled.Text`
  font-size: ${theme.moderateScale(14)}px;
  color: ${theme.textWeekColor};
`;

class ModifyProductPrice extends React.PureComponent {
  constructor(props) {
    super(props);
    const {
      id,
      productName = null,
      standardPrice = null,
      salesPrice = '',
      salesNumber = '',
      comment = '',
      discount = '',
      salesTotalPrice = '',
      attachmentList = [],
    } = props.navigation.state.params;
    this.state = {
      id,
      productName,
      standardPrice,
      salesPrice,
      salesNumber,
      comment,
      discount,
      salesTotalPrice,
      attachmentList,
    };
  }
  componentDidMount() {
    this.props.navigation.setParams({
      onPressRight: this.onPressRight,
    });
    this.getSalesTotalPrice();
  }

  onPressRight = () => {
    const {
      goBack,
      state: { params: { callback } },
    } = this.props.navigation;
    callback && callback(this.state);
    goBack();
  }

  onFocus = (y = 40) => {
    this.scrollViewRef.scrollTo({
      x: 0,
      y: theme.moderateScale(y),
      animated: true,
    });
  };

  getSalesTotalPrice = () => {
    const {
      salesPrice,
      salesNumber,
      discount,
    } = this.state;
    let salesTotalPrice = 0;
    if (salesPrice && salesNumber) {
      salesTotalPrice = Number(salesPrice) * Number(salesNumber) || 0;
    }
    if (salesTotalPrice && discount && discount <= 100 && discount > 0) {
      salesTotalPrice *= (1 - (discount / 100));
    }
    this.setState({ salesTotalPrice });
  };

  render() {
    const {
      productName,
      standardPrice,
      salesPrice,
      salesNumber,
      discount,
      comment,
      salesTotalPrice,
      attachmentList,
    } = this.state;
    return (
      <KeyboardAvoidingView
        behavior={isIos() ? 'padding' : null}
        style={{ flex: 1 }}
        keyboardVerticalOffset={0}
      >
        <ContainerScrollView
          bottomPadding
          innerRef={(ref) => { this.scrollViewRef = ref; }}
        >
          <CommStatusBar />
          <ProductImage >
            <Thumbnail
              imgUri={attachmentList.length ? attachmentList[0].filePath : null}
              size={120}
            />
            <Name>{productName}</Name>
            <StandPrice> {`标准价格: ${standardPrice}`} </StandPrice>
          </ProductImage>
          <ContainerView
            backgroundColor={theme.whiteColor}
          >
            <NavInputItem
              leftText="销售单价"
              {...theme.getLeftStyle({
                keyboardType: 'numeric',
                placeholder: '请输入销售单价',
                value: salesPrice,
                onChangeText: async (salesPrice) => {
                  await this.setState({ salesPrice });
                  this.getSalesTotalPrice();
                },
                onFocus: () => this.onFocus(),
                onBlur: () => this.onFocus(0),
              })}
            />
            <NavInputItem
              leftText="数量"
              {...theme.getLeftStyle({
                keyboardType: 'numeric',
                placeholder: '请输入数量',
                value: salesNumber,
                onChangeText: async (salesNumber) => {
                  await this.setState({ salesNumber });
                  this.getSalesTotalPrice();
                },
                onFocus: () => this.onFocus(60),
              })}
            />
            <NavInputItem
              leftText="折扣%"
              {...theme.getLeftStyle({
                keyboardType: 'numeric',
                placeholder: '请输入折扣',
                value: discount,
                onChangeText: async (discount) => {
                  await this.setState({ discount });
                  this.getSalesTotalPrice();
                },
                onFocus: () => this.onFocus(80),
              })}
            />
            <NavInputItem
              leftText="总价"
              center={
                <CenterText active>{salesTotalPrice}</CenterText>
              }
              {...theme.navItemOnlyShowStyle}
            />
            <NavInputItem
              leftText="备注"
              height={44}
              center={<View />}
            />
            <TextareaGroup>
              <TextareaView
                rowSpan={2}
                bordered
                value={comment}
                onChangeText={comment => this.setState({ comment })}
                placeholder="请输入备注，十字以内"
                placeholderTextColor={theme.textPlaceholderColor}
                onFocus={() => this.onFocus(180)}
                onBlur={() => this.onFocus(0)}
              />
            </TextareaGroup>
          </ContainerView>
        </ContainerScrollView>
      </KeyboardAvoidingView>
    );
  }
}

ModifyProductPrice.navigationOptions = ({ navigation }) => {
  const { goBack } = navigation;
  return ({
    title: '修改产品报价',
    headerLeft: (
      <LeftBackIcon
        onPress={() => goBack()}
      />
    ),
    headerRight: (
      <RightView
        onPress={navigation.state.params ? navigation.state.params.onPressRight : () => null}
        right="完成"
        rightStyle={{
          color: theme.primaryColor,
        }}
      />
    ),
  });
};

ModifyProductPrice.propTypes = {
  navigation: PropTypes.shape({
    dispatch: PropTypes.func,
    goBack: PropTypes.func,
    navigate: PropTypes.func,
    setParams: PropTypes.func,
    state: PropTypes.shape({
      key: PropTypes.string,
      routeName: PropTypes.string,
      params: PropTypes.object,
    }),
  }).isRequired,
};
export default ModifyProductPrice;
