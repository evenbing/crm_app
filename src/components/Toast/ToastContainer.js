/**
 * @component Toast.js
 * @description Toast 容器
 * @time 2018/7/11
 * @author JUSTIN XU
 */
import React from 'react';
import PropTypes from 'prop-types';
import {
  ViewPropTypes,
  StyleSheet,
  View,
  Text,
  Animated,
  Dimensions,
  TouchableWithoutFeedback,
  Easing,
  Keyboard,
} from 'react-native';

const TOAST_MAX_WIDTH = 0.8;
const TOAST_ANIMATION_DURATION = 200;
const DIMENSION = Dimensions.get('window');
let KEYBOARD_HEIGHT = 0;

Keyboard.addListener('keyboardDidChangeFrame', ({ endCoordinates }) => {
  KEYBOARD_HEIGHT = DIMENSION.height - endCoordinates.screenY;
});

const WINDOW_WIDTH = DIMENSION.width;
const positions = {
  TOP: 20,
  BOTTOM: -20,
  CENTER: 0,
};

const durations = {
  LONG: 3500,
  SHORT: 2000,
};

const styles = StyleSheet.create({
  defaultStyle: {
    position: 'absolute',
    width: WINDOW_WIDTH,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerStyle: {
    padding: 13,
    backgroundColor: '#000000',
    opacity: 0.7,
    borderRadius: 5.5,
    marginHorizontal: WINDOW_WIDTH * ((1 - TOAST_MAX_WIDTH) / 2),
  },
  textStyle: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
  },
});

class ToastContainer extends React.PureComponent {
  static displayName = 'ToastContainer';
  constructor(props) {
    super(props);
    this.state = {
      visible: this.props.visible,
      opacity: new Animated.Value(0),
    };
    this.animating = false;
    this.root = null;
    this.hideTimeout = null;
    this.showTimeout = null;
  }

  componentDidMount = () => {
    if (this.state.visible) {
      this.showTimeout = setTimeout(() => this.show(), this.props.delay);
    }
  };

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.visible !== this.props.visible) {
      if (nextProps.visible) {
        clearTimeout(this.showTimeout);
        clearTimeout(this.hideTimeout);
        this.showTimeout = setTimeout(() => this.show(), this.props.delay);
      } else {
        this.hide();
      }

      this.setState({
        visible: nextProps.visible,
      });
    }
  };

  componentWillUnmount = () => {
    this.hide();
  };

  show = () => {
    clearTimeout(this.showTimeout);
    if (!this.animating) {
      clearTimeout(this.hideTimeout);
      this.animating = true;
      this.root.setNativeProps({
        pointerEvents: 'auto',
      });
      this.props.onShow && this.props.onShow(this.props.siblingManager);
      Animated.timing(this.state.opacity, {
        toValue: this.props.opacity,
        duration: this.props.animation ? TOAST_ANIMATION_DURATION : 0,
        easing: Easing.out(Easing.ease),
      }).start(({ finished }) => {
        if (finished) {
          this.animating = !finished;
          this.props.onShown && this.props.onShown(this.props.siblingManager);
          if (this.props.duration > 0) {
            this.hideTimeout = setTimeout(() => this.hide(), this.props.duration);
          }
        }
      });
    }
  };

  hide = () => {
    clearTimeout(this.showTimeout);
    clearTimeout(this.hideTimeout);
    if (!this.animating) {
      this.root.setNativeProps({
        pointerEvents: 'none',
      });
      this.props.onHide && this.props.onHide(this.props.siblingManager);
      Animated.timing(this.state.opacity, {
        toValue: 0,
        duration: this.props.animation ? TOAST_ANIMATION_DURATION : 0,
        easing: Easing.in(Easing.ease),
      }).start(({ finished }) => {
        if (finished) {
          this.animating = false;
          this.props.onHidden && this.props.onHidden(this.props.siblingManager);
        }
      });
    }
  };
  render() {
    const {
      position: offset,
      backgroundColor,
      shadow,
      containerStyle,
      textStyle,
      textColor,
      shadowStyle,
      children,
    } = this.props;
    const position = offset ? {
      [offset < 0 ? 'bottom' : 'top']: offset < 0 ? (KEYBOARD_HEIGHT - offset) : offset,
    } : {
      top: 0,
      bottom: KEYBOARD_HEIGHT,
    };

    return (this.state.visible || this.animating) ?
      <View
        style={[
          styles.defaultStyle,
          position,
        ]}
        pointerEvents="box-none"
      >
        <TouchableWithoutFeedback
          onPress={
            this.props.hideOnPress ? this.hide : null
          }
        >
          <Animated.View
            style={[
              styles.containerStyle,
              backgroundColor && { backgroundColor },
              shadow && shadowStyle,
              containerStyle,
              {
                opacity: this.state.opacity,
              },
            ]}
            pointerEvents="none"
            ref={(node) => { this.root = node; }}
          >
            {
              React.isValidElement(children) ? (
                children
              ) : (
                <Text
                  style={[
                    styles.textStyle,
                    textStyle,
                    textColor && { color: textColor },
                  ]}
                >
                  {children}
                </Text>
              )
            }
          </Animated.View>
        </TouchableWithoutFeedback>
      </View> :
      null;
  }
}

ToastContainer.defaultProps = {
  visible: false,
  duration: durations.SHORT,
  animation: true,
  shadow: true,
  position: positions.BOTTOM,
  opacity: 0.7,
  delay: 0,
  hideOnPress: true,
  containerStyle: null,
  backgroundColor: null,
  textColor: '#fff',
  textStyle: null,
  shadowStyle: {
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5.5,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    elevation: 3,
  },
  onHide: () => null,
  onHidden: () => null,
  onShow: () => null,
  onShown: () => null,
  children: null,
};

ToastContainer.propTypes = {
  ...ViewPropTypes,
  containerStyle: ViewPropTypes.style,
  duration: PropTypes.number,
  visible: PropTypes.bool,
  position: PropTypes.number,
  animation: PropTypes.bool,
  shadow: PropTypes.bool,
  backgroundColor: PropTypes.string,
  opacity: PropTypes.number,
  textColor: PropTypes.string,
  textStyle: Text.propTypes.style,
  shadowStyle: Text.propTypes.style,
  delay: PropTypes.number,
  hideOnPress: PropTypes.bool,
  onHide: PropTypes.func,
  onHidden: PropTypes.func,
  onShow: PropTypes.func,
  onShown: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.number,
    PropTypes.string,
  ]),
};

export default ToastContainer;
export {
  positions,
  durations,
};
