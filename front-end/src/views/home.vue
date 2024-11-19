<script setup>
import { ref, onMounted } from 'vue';

// ตัวแปร Reactive
const message = ref('');
const dataToSend = ref('');
const responseMessage = ref('');

// GET: ดึงข้อความจาก Backend
const fetchMessage = async () => {
   try {
      const response = await fetch('http://localhost:5000/api/message');
      const data = await response.json();
      message.value = data.message;
   } catch (error) {
      console.error('Error fetching message:', error);
   }
};

// POST: ส่งข้อมูลไปยัง Backend
const sendData = async () => {
   try {
      const response = await fetch('http://localhost:5000/api/data', {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify({ data: dataToSend.value }),
      });
      const data = await response.json();
      responseMessage.value = data.received;
   } catch (error) {
      console.error('Error sending data:', error);
   }
};

// Fetch message เมื่อโหลดหน้า
onMounted(() => {
   fetchMessage();
});
</script>

<template>
   <div class="container mx-auto p-6 space-y-6">
      <!-- แสดงข้อความจาก Backend -->
      <div class="bg-gray-800 text-white p-6 rounded-lg shadow-md">
         <h1 class="text-2xl font-bold">Vue + Node.js Example with Tailwind CSS</h1>
         <p class="mt-2">Message from Backend: <span class="font-semibold">{{ message }}</span></p>
      </div>

      <!-- ฟอร์มส่งข้อมูล -->
      <div class="bg-gray-800 text-white p-6 rounded-lg shadow-md">
         <label for="data-input" class="block text-sm font-medium mb-2">Enter Data:</label>
         <input id="data-input" v-model="dataToSend" type="text" placeholder="Enter data to send"
            class="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:ring-2 focus:ring-blue-500" />
         <button @click="sendData"
            class="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium">
            Send Data
         </button>
      </div>

      <!-- แสดงผลลัพธ์จาก Backend -->
      <div class="bg-gray-800 text-white p-6 rounded-lg shadow-md">
         <p>Response from Backend: <span class="font-semibold">{{ responseMessage }}</span></p>
      </div>
   </div>
</template>

<style scoped>
/* ไม่มี CSS เพิ่มเติม เนื่องจากใช้ Tailwind CSS */
</style>