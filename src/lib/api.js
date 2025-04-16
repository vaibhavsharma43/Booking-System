import axios from 'axios';
const API_BASE = 'http://localhost:3000/';

export const registerUser = async (userData) => {
    const res = await axios.post(`${API_BASE}/register`, userData);
    return res.data;
  };
export const bookAppointment = async (data) => {
    const res = await axios.post(`${API_BASE}/api/appointments`, data);
    return res.data;
};
export const getAvailableSlots = async (doctorId, date,day) => {
  console.log("xxxx")
    const response = await axios.get(`${API_BASE}/api/slots`, {
      params: { doctorId, date ,day},
})
console.log(response.data.available)

return response.data.available;
};
export const getDoctors = async ()=>{
  const response =  await axios.get(`${API_BASE}/api/doctors`);
  return response.data;
}