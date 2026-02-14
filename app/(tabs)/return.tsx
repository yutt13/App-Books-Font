// app/(tabs)/return.tsx
import { View, Text, FlatList, TouchableOpacity, Image, Alert, RefreshControl } from 'react-native';
import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { API_URL } from '../../constants/api';
import { currentUser } from '../../constants/user';
import { useFocusEffect } from 'expo-router';

export default function ReturnScreen() {
  const [borrowedBooks, setBorrowedBooks] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchBorrowedBooks = async () => {
    if (!currentUser.id) return;
    try {
      const response = await axios.get(`${API_URL}/borrowed/${currentUser.id}`);
      setBorrowedBooks(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setRefreshing(false);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchBorrowedBooks();
    }, [])
  );

  const handleReturn = async (bookId: number) => {
    try {
      const response = await axios.post(`${API_URL}/return`, {
        member_id: currentUser.id,
        book_id: bookId
      });

      if (response.data.success) {
        Alert.alert("สำเร็จ", "คืนหนังสือเรียบร้อยแล้ว");
        fetchBorrowedBooks();
      }
    } catch (error) {
      Alert.alert("ผิดพลาด", "ไม่สามารถคืนหนังสือได้");
    }
  };

  return (
    <View className="flex-1 bg-emerald-50 px-5 pt-6">
      {borrowedBooks.length === 0 ? (
        <View className="flex-1 items-center justify-center">
            <Text className="text-emerald-600 text-lg">
              ไม่มีหนังสือที่ต้องคืน
            </Text>
        </View>
      ) : (
        <FlatList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20 }}
          data={borrowedBooks}
          keyExtractor={(item: any) => item.book_id.toString()}
          refreshControl={
            <RefreshControl 
              refreshing={refreshing} 
              onRefresh={fetchBorrowedBooks}
              tintColor="#059669"
            />
          }
          renderItem={({ item }) => (
            <View className="bg-white p-5 rounded-2xl mb-5 shadow-md border border-emerald-100 flex-row items-center">
              
              <Image 
                source={{ uri: item.cover_url || 'https://placehold.co/100x150/png' }} 
                className="w-16 h-24 rounded-xl bg-emerald-100"
              />

              <View className="flex-1 ml-4">
                <Text className="text-base font-semibold text-emerald-900">
                  {item.title}
                </Text>

                <Text className="text-emerald-500 text-sm mt-1">
                  ยืมเมื่อ: {new Date(item.borrow_date).toLocaleDateString('th-TH')}
                </Text>
                
                <TouchableOpacity 
                  className="bg-emerald-600 py-2 px-5 rounded-full mt-4 self-start active:opacity-80"
                  onPress={() => handleReturn(item.book_id)}
                >
                  <Text className="text-white font-semibold text-sm">
                    คืนหนังสือ
                  </Text>
                </TouchableOpacity>
              </View>

            </View>
          )}
        />
      )}
    </View>
  );
}
