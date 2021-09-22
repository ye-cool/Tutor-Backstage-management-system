import request from "../utils/request";


function login(params) {
  return request.post(`User/Admin/Login`, params);
}

function getTeachers(params) {
  return request.get(`Admin/Teachers`, params);
}

function getRegister(tid,params) {
  return request.get(`Admin/Teacher/Register/${tid}`, params)
}

function getVerify(tid,params) {
  return request.get(`Admin/Teacher/Verify/${tid}`, params)
}

function getDemandRegister(did,params) {
  return request.get(`Admin/Demand/Register/${did}`, params)
}

function getDemandVerify(did,params) {
  return request.get(`Admin/Demand/Verify/${did}`, params)
}

function getDemand(params) {
  return request.get(`Admin/Demands`, params)
}

function postVerify(params) {
  return request.post(`Admin/Teacher/Verify`, params)
}

function getUnmatchedContracts(params) {
  return request.get(`Admin/UnmatchedContracts`, params)
}

function putAdmin(params) {
  return request.put(`Admin/Admin`, params)
}

function deleteDemand(did,params) {
  return request.delete(`Admin/Demand/${did}`, params)
}

function getAdminTeacher() {
  return request.get(`Admin/Config/Teachers`)
}

function putAdminTeacher(params) {
  return request.put(`Admin/Config/Teacher`,params)
}

function getImage(params) {
  return request.get(`Admin/Config/Image/Upload`,params)
}

export default {
  login,
  getTeachers,
  getRegister,
  getVerify,
  getDemand,
  postVerify,
  getUnmatchedContracts,
  putAdmin,
  getDemandRegister,
  getDemandVerify,
  deleteDemand,
  getAdminTeacher,
  putAdminTeacher,
  getImage
};
