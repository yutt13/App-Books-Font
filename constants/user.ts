// client/constants/user.ts
// ใช้เก็บข้อมูล User ปัจจุบันที่ Login อยู่ (แบบง่ายๆ)
export let currentUser = {
  id: 0,
  name: '',
  role: ''
};

export const setCurrentUser = (user: any) => {
  currentUser = { ...user };
};