import { get, post, put, del } from '../fetchAPI';

export interface UpdateDoctorInput {
  name?: string;
  email?: string;
  clinicId?: string | null;
}

export const getDoctors = async (options?: { showToast?: boolean }) => {
  const data = await get('/api/doctors', options);
  // console.log(data);
  return data;
};

export const getDoctorById = (id: string, options?: { showToast?: boolean }) => get(`/api/doctors/${id}`, options);

export const updateDoctor = (id: string, data: UpdateDoctorInput) =>
  put(`/api/doctors/${id}`, data);

export const deleteDoctor = (id: string) => del(`/api/doctors/${id}`);

export const assignDoctorToClinic = (doctorId: string, clinicId: string) =>
  post(`/api/doctors/${doctorId}/clinic`, { clinicId });
