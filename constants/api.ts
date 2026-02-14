// client/constants/api.ts

// ⚠️ เปลี่ยน 192.168.x.x เป็น IP Address ของเครื่องคุณ
// ถ้าทดสอบแค่บน Web Browser ใช้ 'http://localhost:3000' ได้
const IP_ADDRESS = 'localhost'; // <--- เปลี่ยนตรงนี้!
//http://192.168.1.100:3000/api
//http://localhost:3000/api
export const API_URL = `http://${IP_ADDRESS}:3000/api`;