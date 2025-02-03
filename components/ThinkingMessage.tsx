import { View, Text } from 'react-native';
import Animated, { 
  FadeIn,
} from 'react-native-reanimated';
import LoadingDots from './LoadingDots';
import BBLogo from './ui/bb-logo';

export default function ThinkingMessage() {
  return (
    <Animated.View 
      entering={FadeIn.duration(300).delay(200)}
      className="flex-row items-start px-4 gap-4 my-2"
    >
        <View className="mt-1">
          <View className="w-[30px] h-[30px] rounded-[8px] bg-[#CD9A49] justify-center items-center">
            <BBLogo />
          </View>
        </View>

      <View className="justify-center mt-2 h-[26px]">
        <LoadingDots />
      </View>
    </Animated.View>
  );
} 