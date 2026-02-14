// app/(tabs)/history.tsx
import { View, Text, FlatList } from 'react-native';
import { useState, useCallback } from 'react';
import axios from 'axios';
import { API_URL } from '../../constants/api';
import { currentUser } from '../../constants/user';
import { useFocusEffect } from 'expo-router';

export default function HistoryScreen() {
  const [history, setHistory] = useState([]);

  const fetchHistory = async () => {
    if (!currentUser.id) return;
    try {
      const response = await axios.get(`${API_URL}/history/${currentUser.id}`);
      setHistory(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchHistory();
    }, [])
  );

  return (
    <View className="flex-1 bg-emerald-50 px-5 pt-6">
      
      <Text className="text-2xl font-semibold mb-6 text-emerald-900 tracking-tight">
        ประวัติการยืม-คืน
      </Text>

      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
        data={history}
        keyExtractor={(item: any, index) => index.toString()}
        renderItem={({ item }) => (
          <View className="bg-white p-5 rounded-2xl mb-4 shadow-md border border-emerald-100">
            
            <Text className="text-base font-semibold text-emerald-900">
              {item.title}
            </Text>

            <View className="flex-row mt-3 items-center">
              
              <Text className="text-emerald-500 text-xs flex-1">
                ยืม: {new Date(item.borrow_date).toLocaleDateString('th-TH')}
              </Text>

              <Text
                className={`text-xs font-semibold px-3 py-1 rounded-full ${
                  item.return_date
                    ? 'bg-emerald-100 text-emerald-700'
                    : 'bg-amber-100 text-amber-600'
                }`}
              >
                {item.return_date
                  ? `คืนแล้ว ${new Date(item.return_date).toLocaleDateString('th-TH')}`
                  : 'กำลังยืม'}
              </Text>

            </View>

          </View>
        )}
      />

    </View>
  );
}
