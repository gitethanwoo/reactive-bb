import { View, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getColor } from '@/utils/colors';
export default function HomeScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-background">
      <View className="flex-1 items-center justify-center px-5">
        <Text className="text-3xl font-bold text-primary mb-3">Made Just For You</Text>
        <Text className="text-lg text-gray-500 mb-10 text-center">Chat with the Business Bible – Trained to answer your questions about the Bible</Text>
        <TouchableOpacity
          className="flex-row items-center bg-primary px-6 py-4 rounded-full shadow-md"
          onPress={() => router.push('/chat')}
        >
          <Ionicons name="chatbubble-ellipses" size={24} color={getColor('primary-foreground')} className="mr-2" />
          <Text className=" text-lg text-primary-foreground font-semibold">Let's Chat</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}