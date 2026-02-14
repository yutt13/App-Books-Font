// app/index.tsx
import { View, Text, TouchableOpacity, Image } from "react-native";
import { router } from "expo-router";

export default function HomePage() {
  return (
    <View className="flex-1 bg-emerald-50 items-center justify-center px-6">
      
      {/* ส่วนโลโก้หรือหัวข้อ */}
      <View className="items-center mb-14">
        <View className="w-24 h-24 bg-emerald-600 rounded-3xl items-center justify-center mb-6 shadow-xl">
          <Text className="text-4xl">📚</Text>
        </View>

        <Text className="text-3xl font-semibold text-emerald-900 tracking-tight">
          My Library
        </Text>

        <Text className="text-emerald-600 mt-3 text-center leading-5">
          ระบบยืม-คืนหนังสือออนไลน์
          {"\n"}สะดวก รวดเร็ว ใช้งานง่าย
        </Text>
      </View>

      {/* ปุ่มเมนูต่างๆ */}
      <View className="w-full max-w-sm">
        
        {/* ปุ่มเข้าสู่ระบบ */}
        <TouchableOpacity
          className="bg-emerald-600 p-4 rounded-2xl shadow-md active:opacity-80"
          onPress={() => router.push("/login")}
        >
          <Text className="text-white text-center font-semibold text-lg">
            เข้าสู่ระบบ (Login)
          </Text>
        </TouchableOpacity>

        {/* ปุ่มสมัครสมาชิก */}
        <TouchableOpacity
          className="bg-white border border-emerald-300 p-4 rounded-2xl mt-4 shadow-sm active:bg-emerald-50"
          onPress={() => router.push("/register")}
        >
          <Text className="text-emerald-700 text-center font-semibold text-lg">
            สมัครสมาชิกใหม่ (Register)
          </Text>
        </TouchableOpacity>

        {/* Admin */}
        <TouchableOpacity
          className="mt-6"
          onPress={() => router.push("/admin-login")}
        >
          <Text className="text-emerald-500 text-center text-sm">
            สำหรับผู้ดูแลระบบ (Admin Only)
          </Text>
        </TouchableOpacity>

      </View>

      <Text className="mt-16 text-xs text-emerald-400">
        Version 1.0.0 - Localhost Edition
      </Text>

    </View>
  );
}
