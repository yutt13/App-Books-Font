// app/(tabs)/index.tsx
import { View, Text, FlatList, TouchableOpacity, Image, ActivityIndicator, RefreshControl, Alert } from 'react-native';
import { useState, useEffect, useCallback } from 'react';
import axios from 'axios'; 
import { API_URL } from '../../constants/api'; 
import { currentUser } from '../../constants/user'; 

interface Book {
  book_id: number;
  title: string;
  author: string;
  cover_url: string;
  status: 'available' | 'borrowed';
}

export default function BookListScreen() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchBooks = async () => {
    try {
      const response = await axios.get(`${API_URL}/books`);
      setBooks(response.data);
    } catch (error) {
      console.error("Error fetching books:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchBooks();
  }, []);

  const handleBorrow = async (bookId: number) => {
    if (!currentUser.id) {
        Alert.alert('แจ้งเตือน', 'กรุณาเข้าสู่ระบบใหม่');
        return;
    }

    try {
        const response = await axios.post(`${API_URL}/borrow`, {
            member_id: currentUser.id,
            book_id: bookId
        });

        if (response.data.success) {
            Alert.alert('สำเร็จ', 'ยืมหนังสือสำเร็จ!');
            fetchBooks();
        }
    } catch (error) {
        Alert.alert('ผิดพลาด', 'ยืมไม่สำเร็จ หรือหนังสือถูกยืมไปแล้ว');
    }
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-emerald-50">
        <ActivityIndicator size="large" color="#059669" />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-emerald-50 px-5 pt-6">
      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
        data={books}
        keyExtractor={(item) => item.book_id.toString()}
        refreshControl={
          <RefreshControl 
            refreshing={refreshing} 
            onRefresh={onRefresh}
            tintColor="#059669"
          />
        }
        renderItem={({ item }) => (
          <View className="bg-white p-5 rounded-2xl mb-5 shadow-md border border-emerald-100 flex-row">
            
            <Image 
              source={{ uri: item.cover_url || 'https://placehold.co/100x150/png' }} 
              className="w-20 h-28 rounded-xl bg-emerald-100"
            />
            
            <View className="flex-1 ml-4 justify-between">
              
              <View>
                <Text 
                  className="text-base font-semibold text-emerald-900"
                  numberOfLines={2}
                >
                  {item.title}
                </Text>

                <Text className="text-emerald-600 text-sm mt-1">
                  ผู้แต่ง: {item.author}
                </Text>
                
                <View
                  className={`self-start px-3 py-1 rounded-full mt-3 ${
                    item.status === 'available'
                      ? 'bg-emerald-100'
                      : 'bg-slate-200'
                  }`}
                >
                  <Text
                    className={`text-xs font-semibold ${
                      item.status === 'available'
                        ? 'text-emerald-700'
                        : 'text-slate-600'
                    }`}
                  >
                    {item.status === 'available' ? 'ว่าง' : 'ถูกยืมแล้ว'}
                  </Text>
                </View>
              </View>

              {item.status === 'available' && (
                <TouchableOpacity 
                  className="bg-emerald-600 py-2 px-5 rounded-full mt-4 self-start active:opacity-80"
                  onPress={() => handleBorrow(item.book_id)}
                >
                  <Text className="text-white font-semibold text-sm">
                    ยืมหนังสือ
                  </Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        )}
      />
    </View>
  );
}
