import { View } from 'react-native';
import Animated, { 
  useAnimatedStyle,
  withRepeat,
  withTiming,
  useSharedValue,
  Easing,
} from 'react-native-reanimated';
import { getColor } from '@/utils/colors';
import { useEffect } from 'react';

const DOT_SIZE = 8;
const ANIMATION_DURATION = 1600;

export default function LoadingDots() {
  const progress = useSharedValue(0);

  useEffect(() => {
    progress.value = withRepeat(
      withTiming(1, {
        duration: ANIMATION_DURATION,
        easing: Easing.bezier(0.41, 0, 0.56, 1.21),
      }),
      -1,
      false
    );
  }, []);

  const Dot = ({ delay }: { delay: number }) => {
    const animatedStyle = useAnimatedStyle(() => {
      const moveProgress = (progress.value + delay) % 1;
      
      let translateY = 0;
      let opacity = 0.3; // Base opacity at rest
      
      if (moveProgress < 0.2) {
        translateY = -(moveProgress * 5) * 8; // Move up
        opacity = 0.3 + (moveProgress * 5) * 0.7; // Increase opacity as it moves up
      } else if (moveProgress < 0.4) {
        translateY = -((0.4 - moveProgress) * 5) * 8; // Move down
        opacity = 0.3 + ((0.4 - moveProgress) * 5) * 0.7; // Decrease opacity as it moves down
      }
      
      return {
        transform: [{ translateY }],
        opacity,
      };
    });

    return (
      <Animated.View
        style={[
          {
            width: DOT_SIZE,
            height: DOT_SIZE,
            borderRadius: DOT_SIZE / 2,
            backgroundColor: 'black',
            marginHorizontal: 2,
          },
          animatedStyle,
        ]}
      />
    );
  };

  return (
    <View className="flex-row items-center justify-center h-12">
      <Dot delay={0} />
      <Dot delay={0.33} />
      <Dot delay={0.66} />
    </View>
  );
} 