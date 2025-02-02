import { TextInput, View } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Colors from '@/constants/Colors';

type Props = {
  onShouldSend: (message: string) => void;
  input: string;
  handleInputChange: (e: any) => void;
  handleSubmit: (e: any) => void;
};

const MessageInput = ({ onShouldSend, input, handleInputChange, handleSubmit }: Props) => {
  const onSend = () => {
    if (input.trim().length === 0) return;
    onShouldSend(input);
  };

  return (
    <View className="flex-row items-end bg-white rounded-full shadow-sm px-4 py-2">
      <TextInput
        placeholder="Message"
        className="flex-1 mr-2 max-h-[120px] text-[16px] leading-5 py-3"
        placeholderTextColor="#6B7280"
        value={input}
        multiline
        onChange={e =>
          handleInputChange({
            ...e,
            target: {
              ...e.target,
              value: e.nativeEvent.text,
            },
          })
        }
        onSubmitEditing={e => {
          handleSubmit(e);
          e.preventDefault();
        }}
      />
      <TouchableOpacity onPress={onSend} disabled={input?.length === 0}>
        <Ionicons 
          name="arrow-up-circle" 
          size={32}
          color={input?.length === 0 ? Colors.greyLight : Colors.primary} 
        />
      </TouchableOpacity>
    </View>
  );
};

export default MessageInput; 