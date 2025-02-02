import { View, Text } from 'react-native';
import { Role } from '@/utils/Interfaces';
import LoadingDots from './LoadingDots';

type Message = {
  role: Role;
  content: string;
  id?: string;
};

type Props = Message & {
  loading?: boolean;
};

const ChatMessage = ({ content, role, loading }: Props) => {
  const isUser = role === 'user';

  return (
    <View className={`flex-row items-start px-4 gap-4 my-2 ${isUser ? 'justify-end' : ''}`}>
      {!isUser && (
        <View className="mt-1">
          <View className="w-[30px] h-[30px] rounded-full bg-foreground justify-center items-center">
            <Text className="text-primary-foreground text-xs font-semibold">AI</Text>
          </View>
        </View>
      )}

      {loading ? (
        <View className="justify-center mt-3 h-[26px]">
          <LoadingDots />
        </View>
      ) : (
        <View className={`flex-1 ${isUser ? 'items-end' : ''}`}>
          <View 
            className={` ${
              isUser 
                ? 'bg-muted max-w-[90%] rounded-2xl p-3 rounded-tr-sm' 
                : 'mt-2'
            }`}
          >
            <Text 
              className={`text-lg flex-wrap ${
                isUser 
                  ? 'text-foreground' 
                  : 'text-foreground'
              }`}
            >
              {content}
            </Text>
          </View>
        </View>
      )}
    </View>
  );
};

export default ChatMessage; 