import React from 'react';
import Animated, {
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { Gradient } from '../Components/Gradient';
import type { Size } from '../types';

// 当前页书边的阴影
type PageShadowProps = {
  degrees: Animated.SharedValue<number>;
  viewHeight: number;
  right: boolean;
  containerSize: Size;
  colors: string[];
};

const PageShadow: React.FC<PageShadowProps> = ({
                                                 degrees,
                                                 viewHeight,
                                                 right,
                                                 containerSize,
                                                 colors,
                                               }) => {
    const defaultColors = right
        ? [
            'rgba(100,0,0,0.0)',
            'rgba(100,0,0,0.0)',
            'rgba(100,0,0,0.2)',
            'rgba(100,0,0,0.6)',
        ]
        : [
            'rgba(0,100,0,0.6)',
            'rgba(0,100,0,0.2)',
            'rgba(0,100,0,0.0)',
            'rgba(0,100,0,0)',
        ];
    const colorsValue = colors ? colors : defaultColors;
  const shadowWidth = containerSize.width * 0.02;
  const animatedStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      Math.abs(degrees.value),
      [0, 30, 55, 180],
      [0, 0, 1, 0]
    );
    return {
      opacity,
    };
  });

  return (
    <Animated.View
      style={[
        {
          zIndex: 2,
          height: viewHeight,
          position: 'absolute',
          width: shadowWidth,
        },
        right ? { left: -shadowWidth } : { right: -shadowWidth },
        animatedStyle,
      ]}
    >
      <Gradient
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        colors={colorsValue}
        style={{
          flex: 1,
        }}
      />
    </Animated.View>
  );
};
export default PageShadow;
