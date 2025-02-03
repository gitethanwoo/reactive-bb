import { View } from 'react-native';
import { Role } from '@/utils/Interfaces';
import LoadingDots from './LoadingDots';
import BBLogo from '@/components/ui/bb-logo';
import Markdown from 'react-native-markdown-display';
import { getColor } from '@/utils/colors';

type Message = {
  role: Role;
  content: string;
  id?: string;
};

type Props = Message & {
  loading?: boolean;
};

const markdownStyles = {
  body: {
    color: getColor('foreground'),
    fontSize: 16,
    margin: 0,
    padding: 0,
  },
  paragraph: {
    margin: 0,
    padding: 0,
    flexShrink: 1,
  },
  code_inline: {
    backgroundColor: getColor('muted'),
    color: getColor('foreground'),
    borderRadius: 4,
    paddingHorizontal: 4,
    paddingVertical: 2,
    fontFamily: 'SpaceMono',
  },
  code_block: {
    backgroundColor: getColor('muted'),
    borderRadius: 8,
    padding: 12,
    marginVertical: 8,
    fontFamily: 'SpaceMono',
  },
  link: {
    color: getColor('primary'),
    textDecorationLine: 'underline' as const,
  },
  list_item: {
    marginTop: 4,
    marginBottom: 4,
  },
  bullet_list: {
    marginTop: 8,
    marginBottom: 8,
  },
  ordered_list: {
    marginTop: 8,
    marginBottom: 8,
  },
  heading1: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
    color: getColor('foreground'),
  },
  heading2: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
    color: getColor('foreground'),
  },
  heading3: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 16,
    marginBottom: 8,
    color: getColor('foreground'),
  },
};

const ChatMessage = ({ content, role, loading }: Props) => {
  const isUser = role === 'user';

  return (
    <View className={`flex-row items-start px-4 gap-4 ${isUser ? 'justify-end' : ''}`}>
      {!isUser && (
        <View className="mt-4">
          <View className="w-[30px] h-[30px] rounded-[8px] bg-[#CD9A49] justify-center items-center">
            <BBLogo />
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
            className={`${
              isUser 
                ? 'bg-primary/65 max-w-[90%] rounded-2xl px-3 py-1.5 rounded-tr-sm' 
                : 'mt-2'
            }`}
          >
            {isUser ? (
              <Markdown 
                style={markdownStyles}
                mergeStyle={true}
                >{content.trim()}</Markdown>
            ) : (
              <Markdown 
                style={markdownStyles}
                mergeStyle={true}
              >
                {content.trim()}
              </Markdown>
            )}
          </View>
        </View>
      )}
    </View>
  );
};

export default ChatMessage; 