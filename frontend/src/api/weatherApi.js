import axiosClient from './axiosClient';
export const weatherApi = {
  getDistricts: () => axiosClient.get('/districts/'),
  getBlocks: (districtId) => axiosClient.get(`/blocks/?district=${districtId}`),
  getPanchayats: (blockId) => axiosClient.get(`/panchayats/?block=${blockId}`),
  getPanchayatForecast: (id) => axiosClient.get(`/forecast/${id}/`),
  getAdvisory: (id) => axiosClient.get(`/advisory/${id}/`),
  downscale: (data) => axiosClient.post('/forecast/downscale/', data),
};
