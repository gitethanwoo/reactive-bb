import { View, Platform, Text, Keyboard, StatusBar, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { generateAPIUrl } from '@/utils';
import { useChat } from '@ai-sdk/react';
import { fetch as expoFetch } from 'expo/fetch';
import ChatMessage from '@/components/ChatMessage';
import MessageInput from '@/components/MessageInput';
import { Role } from '@/utils/Interfaces';
import Colors from '@/constants/Colors';
import { useSafeAreaInsets, SafeAreaView } from 'react-native-safe-area-context';
import { useState, useEffect } from 'react';
import Animated, { 
  useAnimatedStyle, 
  withSpring,
} from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';

export default function ChatScreen() {
  const { messages, error, handleInputChange, input, handleSubmit } = useChat({
    fetch: expoFetch as unknown as typeof globalThis.fetch,
    api: generateAPIUrl('/api/chat'),
    onError: error => console.error(error, 'ERROR'),
  });
  
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: withSpring(-keyboardHeight * 1, {
            damping: 20,
            stiffness: 200,
            mass: 0.4,
          }),
        },
      ],
    };
  });

  const emptyStateStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: withSpring(-keyboardHeight * 0.2, {
            damping: 20,
            stiffness: 200,
            mass: 0.4,
          }),
        },
      ],
    };
  });

  useEffect(() => {
    const showEvent = Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow';
    const hideEvent = Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide';

    const onKeyboardShow = (event: any) => {
      setKeyboardHeight(event.endCoordinates.height);
    };
    const onKeyboardHide = () => {
      setKeyboardHeight(0);
    };

    const showSub = Keyboard.addListener(showEvent, onKeyboardShow);
    const hideSub = Keyboard.addListener(hideEvent, onKeyboardHide);

    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  const onSend = (message: string) => {
    const event = {
      nativeEvent: { text: message },
      preventDefault: () => {},
    } as any;
    
    handleSubmit(event);
  };

  return (
    <View className="flex-1 bg-white">
      <StatusBar barStyle="dark-content" />
      <SafeAreaView edges={['top']} className="bg-white">
        <View 
          style={{ height: 44 + insets.top, paddingTop: insets.top }}
          className="flex-row items-center border-b border-gray-200 z-10"
        >
          <View className="flex-1 flex-row items-center">
            <TouchableOpacity 
              onPress={() => router.back()} 
              className="flex-row items-center px-4 h-full justify-center"
            >
              <Ionicons name="chevron-back-outline" size={28} color={Colors.primary} />
              <Text className="text-[17px] text-blue-500 -ml-1">Back</Text>
            </TouchableOpacity>
          </View>
          <View className="flex-[2] items-center">
            <Text className="text-[17px] font-semibold text-black">AI Assistant</Text>
          </View>
          <View className="flex-1" />
        </View>
      </SafeAreaView>
      
      <View className="flex-1">
        <Animated.ScrollView
          className="flex-1"
          contentContainerStyle={{ paddingBottom: keyboardHeight + 20, paddingVertical: 20 }}
          keyboardShouldPersistTaps="handled"
        >
          {messages.length === 0 ? (
            <Animated.View style={emptyStateStyle}>
              <View className="flex-1 justify-center items-center px-5 pt-80">
                <Text className="text-base text-gray-500 text-center">Send a message to start chatting!</Text>
              </View>
            </Animated.View>
          ) : (
            messages.map(m => (
              <ChatMessage
                key={m.id}
                role={m.role as Role}
                content={m.content}
                loading={m.role === Role.Assistant && m.content === ''}
              />
            ))
          )}
        </Animated.ScrollView>

        <SafeAreaView edges={['bottom']} className="bg-gray-50">
          <Animated.View 
            style={[animatedStyles]} 
            className="px-3 py-2 bg-gray-50"
          >
            <MessageInput
              onShouldSend={onSend}
              input={input}
              handleInputChange={handleInputChange}
              handleSubmit={handleSubmit}
            />
          </Animated.View>
        </SafeAreaView>
      </View>
    </View>
  );
} 