// app/index.tsx
import { View, Text, TouchableOpacity, Image } from "react-native";
import { router } from "expo-router";

export default function HomePage() {
  return (
    <View className="flex-1 bg-[#f8fafc] items-center justify-center px-8">
      
      {/* ส่วนโลโก้หรือหัวข้อ */}
      <View className="items-center mb-16">
        <View className="w-28 h-28 bg-emerald-500 rounded-[32px] items-center justify-center mb-8 shadow-2xl shadow-emerald-500/30">
          <Text className="text-5xl">📖</Text>
        </View>

        <Text className="text-4xl font-black text-[#064e3b] tracking-tighter">
          My Library
        </Text>

        <View className="mt-4 px-2">
          <Text className="text-slate-400 text-center text-[15px] font-medium leading-6">
            ห้องสมุดดิจิทัลที่ใช้งานง่าย {"\n"}
            <Text className="text-emerald-600 font-semibold"> ค้นหา ยืม คืน ครบจบในที่เดียว</Text>
          </Text>
        </View>
      </View>

      {/* ปุ่มเมนูต่างๆ */}
      <View className="w-full max-w-sm">
        
        {/* ปุ่มเข้าสู่ระบบ */}
        <TouchableOpacity
          activeOpacity={0.85}
          className="bg-emerald-600 py-5 rounded-[22px] shadow-xl shadow-emerald-600/20"
          onPress={() => router.push("/login")}
        >
          <Text className="text-white text-center font-bold text-lg tracking-wide">
            เข้าสู่ระบบ
          </Text>
        </TouchableOpacity>

        {/* ปุ่มสมัครสมาชิก */}
        <TouchableOpacity
          activeOpacity={0.7}
          className="bg-white border-2 border-emerald-50 py-5 rounded-[22px] mt-4 shadow-sm active:bg-slate-50"
          onPress={() => router.push("/register")}
        >
          <Text className="text-emerald-700 text-center font-bold text-lg tracking-wide">
            สร้างบัญชีใหม่
          </Text>
        </TouchableOpacity>

        {/* Admin Portal Link */}
        <TouchableOpacity
          className="mt-10 py-2"
          onPress={() => router.push("/admin-login")}
        >
          <Text className="text-slate-400 text-center text-[12px] font-bold uppercase tracking-[2px]">
            — Admin Portal —
          </Text>
        </TouchableOpacity>

      </View>

      {/* Version Tag */}
      <View className="absolute bottom-10">
        <Text className="text-[10px] text-slate-300 font-bold tracking-widest uppercase">
          Library System v1.0.0
        </Text>
      </View>

    </View>
  );
}