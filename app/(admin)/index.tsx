// app/(admin)/index.tsx
import { View, Text, FlatList } from 'react-native';
import { useState, useCallback } from 'react';
import axios from 'axios';
import { API_URL } from '../../constants/api';
import { useFocusEffect } from 'expo-router';

export default function MemberListScreen() {
  const [members, setMembers] = useState([]);

  useFocusEffect(
    useCallback(() => {
      axios.get(`${API_URL}/members`).then(res => setMembers(res.data));
    }, [])
  );

  return (
    <View className="flex-1 bg-emerald-50 px-5 pt-6">
      
      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
        data={members}
        keyExtractor={(item: any) => item.member_id.toString()}
        renderItem={({ item }) => (
          <View className="bg-white p-5 rounded-2xl mb-4 shadow-md border border-emerald-100">
            
            <Text className="font-semibold text-lg text-emerald-900">
              {item.full_name}
            </Text>

            <Text className="text-emerald-600 mt-2 text-sm">
              User: {item.username}
            </Text>

            <Text className="text-emerald-400 text-xs mt-1">
              Role: {item.role}
            </Text>

          </View>
        )}
      />

    </View>
  );
}
