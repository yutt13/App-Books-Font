// app/(admin)/add-book.tsx
import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import { useState } from 'react';
import axios from 'axios';
import { API_URL } from '../../constants/api';
import { router } from 'expo-router';

export default function AddBookScreen() {
  const [form, setForm] = useState({ title: '', author: '', cover_url: '' });

  const handleAdd = async () => {
    if (!form.title || !form.author) return Alert.alert('แจ้งเตือน', 'กรุณากรอกชื่อและผู้แต่ง');
    try {
      await axios.post(`${API_URL}/books`, form);
      Alert.alert('สำเร็จ', 'เพิ่มหนังสือเรียบร้อย');
      setForm({ title: '', author: '', cover_url: '' });
    } catch (e) {
      Alert.alert('ผิดพลาด', 'ไม่สามารถเพิ่มหนังสือได้');
    }
  };

  return (
    <View className="flex-1 bg-emerald-50 px-6 pt-8">
      
      <Text className="text-2xl font-semibold mb-8 text-emerald-900 tracking-tight">
        เพิ่มหนังสือใหม่
      </Text>

      <Text className="mb-2 text-emerald-800 font-medium">ชื่อหนังสือ</Text>
      <TextInput
        className="bg-white border border-emerald-100 p-4 rounded-2xl mb-5 text-slate-800 shadow-sm"
        placeholder="กรอกชื่อหนังสือ"
        placeholderTextColor="#94a3b8"
        value={form.title}
        onChangeText={t => setForm({ ...form, title: t })}
      />

      <Text className="mb-2 text-emerald-800 font-medium">ชื่อผู้แต่ง</Text>
      <TextInput
        className="bg-white border border-emerald-100 p-4 rounded-2xl mb-5 text-slate-800 shadow-sm"
        placeholder="กรอกชื่อผู้แต่ง"
        placeholderTextColor="#94a3b8"
        value={form.author}
        onChangeText={t => setForm({ ...form, author: t })}
      />

      <Text className="mb-2 text-emerald-800 font-medium">ลิงก์รูปปก (URL)</Text>
      <TextInput
        className="bg-white border border-emerald-100 p-4 rounded-2xl mb-10 text-slate-800 shadow-sm"
        placeholder="https://example.com/cover.jpg"
        placeholderTextColor="#94a3b8"
        value={form.cover_url}
        onChangeText={t => setForm({ ...form, cover_url: t })}
      />

      <TouchableOpacity
        className="bg-emerald-600 p-4 rounded-2xl shadow-md active:opacity-80"
        onPress={handleAdd}
      >
        <Text className="text-white text-center font-semibold text-lg tracking-wide">
          บันทึกข้อมูล
        </Text>
      </TouchableOpacity>

    </View>
  );
}
