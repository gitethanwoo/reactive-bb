import { View, Text } from 'react-native';
import { useRouter } from 'expo-router';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-white">
      <View className="flex-1 items-center justify-center px-5">
        <Text className="text-3xl font-bold text-blue-500 mb-3">Welcome to ReactiveAI</Text>
        <Text className="text-lg text-gray-500 mb-10 text-center">Your AI assistant is ready to chat</Text>
        <TouchableOpacity
          className="flex-row items-center bg-blue-500 px-6 py-4 rounded-full shadow-md"
          onPress={() => router.push('/chat')}
        >
          <Ionicons name="chatbubble-ellipses" size={24} color="#fff" className="mr-2" />
          <Text className=" text-lg text-white font-semibold">Let's Chat</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}