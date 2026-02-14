// app/(admin)/borrowed-list.tsx
import { View, Text, FlatList, Image } from 'react-native';
import { useState, useCallback } from 'react';
import axios from 'axios';
import { API_URL } from '../../constants/api';
import { useFocusEffect } from 'expo-router';

export default function BorrowedListScreen() {
  const [items, setItems] = useState([]);

  useFocusEffect(
    useCallback(() => {
      axios.get(`${API_URL}/borrowed-all`).then(res => setItems(res.data));
    }, [])
  );

  return (
    <View className="flex-1 bg-emerald-50 px-5 pt-6">
      
      {items.length === 0 ? (
        <Text className="text-center text-emerald-700 mt-16 text-base">
          ไม่มีหนังสือที่ถูกยืมในขณะนี้
        </Text>
      ) : (
        <FlatList
          contentContainerStyle={{ paddingBottom: 20 }}
          showsVerticalScrollIndicator={false}
          data={items}
          keyExtractor={(item: any) => item.borrow_id.toString()}
          renderItem={({ item }) => (
            <View className="bg-white p-4 rounded-2xl mb-4 flex-row shadow-md border border-emerald-100">
              
              <Image
                source={{ uri: item.cover_url || 'https://placehold.co/100' }}
                className="w-20 h-24 bg-emerald-100 rounded-xl"
              />

              <View className="ml-4 flex-1 justify-center">
                <Text className="font-semibold text-base text-emerald-900">
                  {item.title}
                </Text>

                <Text className="text-emerald-700 font-medium mt-1">
                  ผู้ยืม: {item.full_name}
                </Text>

                <Text className="text-emerald-400 text-xs mt-2">
                  วันที่ยืม: {new Date(item.borrow_date).toLocaleDateString('th-TH')}
                </Text>
              </View>

            </View>
          )}
        />
      )}

    </View>
  );
}
