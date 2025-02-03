import { View, Platform, Text, Keyboard, StatusBar, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { generateAPIUrl } from '@/utils';
import { useChat } from '@ai-sdk/react';
import { fetch as expoFetch } from 'expo/fetch';
import ChatMessage from '@/components/ChatMessage';
import MessageInput from '@/components/MessageInput';
import { Role } from '@/utils/Interfaces';
import { useSafeAreaInsets, SafeAreaView } from 'react-native-safe-area-context';
import { useState, useEffect } from 'react';
import Animated, { 
  useAnimatedStyle, 
  withSpring,
} from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { BlurView } from 'expo-blur';
import { getColor } from '@/utils/colors';
import ThinkingMessage from '@/components/ThinkingMessage';

export default function ChatScreen() {
  const { messages, error, handleInputChange, input, isLoading, handleSubmit } = useChat({
    fetch: expoFetch as unknown as typeof globalThis.fetch,
    api: generateAPIUrl('/api/chat'),
    onError: error => console.error(error, 'ERROR'),
    initialMessages: [
      {
        role: 'assistant',
        content: "Hello! I'm your Biblical AI assistant. How can I help you explore scripture and apply biblical wisdom today?",
        id: 'initial-message',
      }
    ],
  });
  
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: withSpring(-keyboardHeight * 0.9, {
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
    <View className="flex-1 bg-background">
      <StatusBar barStyle="dark-content" />
      <SafeAreaView edges={['top']} className="bg-background border-b border-border">
        <View 
          style={{ height: 44 + insets.top, paddingTop: insets.top }}
          className="flex-row items-center z-10 md:max-w-[768px] w-full md:mx-auto"
        >
          <View className="flex-1 flex-row items-center">
            <TouchableOpacity 
              onPress={() => router.back()} 
              className="flex-row items-center px-4 h-full justify-center"
            >
              <Ionicons name="chevron-back-outline" size={28} color={getColor('primary')} />
              <Text className="text-[17px] text-primary -ml-1">Back</Text>
            </TouchableOpacity>
          </View>
          <View className="flex-[2] items-center">
            <Text className="text-[17px] font-semibold text-foreground">AI Assistant</Text>
          </View>
          <View className="flex-1" />
        </View>
      </SafeAreaView>
      
      <View className="flex-1 md:max-w-[768px] md:mx-auto">
        <Animated.ScrollView
          className="flex-1"
          contentContainerStyle={{ paddingBottom: keyboardHeight + 20, paddingVertical: 20 }}
          keyboardShouldPersistTaps="handled"
        >
          {messages.length === 0 ? (
            <Animated.View style={emptyStateStyle}>
              <View className="flex-1 justify-center items-center px-5 pt-80">
                <Text className="text-base text-muted-foreground text-center">Send a message to start chatting!</Text>
              </View>
            </Animated.View>
          ) : (
            <>
              {messages.map((m, index) => (
                <ChatMessage
                  key={m.id}
                  role={m.role as Role}
                  content={m.content}
                  loading={
                    isLoading && 
                    messages.length - 1 === index && 
                    m.role === 'assistant' && 
                    m.content === ''
                  }
                />
              ))}
              {isLoading &&
                messages.length > 0 &&
                messages[messages.length - 1].role === 'user' && <ThinkingMessage />}
            </>
          )}
        </Animated.ScrollView>

        <SafeAreaView edges={['bottom']} className="bg-background/80 border-t border-border">
          <Animated.View 
            style={[animatedStyles]} 
            className="px-3 py-4 md:max-w-[768px] w-full relative"
          >
            <BlurView
              intensity={100}
              tint="light"
              className="absolute inset-0"
            />
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