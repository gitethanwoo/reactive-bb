import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { Role } from '@/utils/Interfaces';
import Colors from '@/constants/Colors';
import { Ionicons } from "@expo/vector-icons";

type Message = {
  role: Role;
  content: string;
  id?: string;
};

type Props = Message & {
  loading?: boolean;
};

const ChatMessage = ({ content, role, loading }: Props) => {
  return (
    <View style={styles.row}>
      <View style={{ marginTop: 10 }}>
        {role === 'assistant' ? (
          <View style={[styles.avatar, { backgroundColor: '#000' }]}>
            <Text style={styles.avatarText}>AI</Text>
          </View>
        ) : (
          <View style={[styles.avatar, { backgroundColor: Colors.greyLight }]}>
            <Ionicons name="person" size={20} color="#fff" />
          </View>
        )}
      </View>

      {loading ? (
        <View style={styles.loading}>
          <ActivityIndicator color={Colors.primary} size="small" />
        </View>
      ) : (
        <View style={styles.messageContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.text}>{content}</Text>
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingHorizontal: 14,
    gap: 14,
    marginVertical: 12,
    backgroundColor: '#FFFFFF',
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  messageContainer: {
    flex: 1,
  },
  textContainer: {
    padding: 4,
  },
  text: {
    fontSize: 16,
    flexWrap: 'wrap',
  },
  loading: {
    justifyContent: 'center',
    height: 26,
    marginLeft: 14,
  },
});

export default ChatMessage; 