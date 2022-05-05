export const login_url = 'http://localhost:5000/login';
export const registration_url = 'http://localhost:5000/registration';
export const user_url = 'http://localhost:5000/user';
export function get_doctor_url(user_id) {
  return `http://localhost:5000/user/${user_id}/doctor`;
}

export function get_education_url(user_id) {
  return `http://localhost:5000/user/${user_id}/doctor/education`;
}

export function get_education_by_id_url(user_id, education_id) {
  return `http://localhost:5000/user/${user_id}/doctor/education/${education_id}`;
}

export function get_patient_url(user_id) {
  return `http://localhost:5000/user/${user_id}/patient`;
}

export function get_address_url(user_id) {
  return `http://localhost:5000/user/${user_id}/patient/address`;
}
