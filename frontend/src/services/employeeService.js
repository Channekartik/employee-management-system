import api from '../api/axiosConfig';

const employeeService = {
  getAll:   ()           => api.get('/employees'),
  getById:  (id)         => api.get(`/employees/${id}`),
  search:   (keyword)    => api.get(`/employees/search?keyword=${keyword}`),
  create:   (data)       => api.post('/employees', data),
  update:   (id, data)   => api.put(`/employees/${id}`, data),
  remove:   (id)         => api.delete(`/employees/${id}`),
};

export default employeeService;
