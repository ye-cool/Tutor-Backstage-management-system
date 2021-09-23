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

function postDemandVerify(params) {
  return request.post(`Admin/Demand/Verify`, params)
}

function putDemandVerify(params) {
  return request.put(`Admin/Demand/Verify`, params)
}

function postVerify(params) {
  return request.post(`Admin/Teacher/Verify`, params)
}

function putVerify(params) {
  return request.put(`Admin/Teacher/Verify`, params)
}

function getMatchedContracts(params) {
  return request.get(`Admin/MatchedContracts`, params)
}

function getUnmatchedContracts(params) {
  return request.get(`Admin/UnmatchedContracts`, params)
}

function putAdmin(aid,params) {
  return request.put(`Admin/Admin/${aid}`, params)
}

function deleteAdmin(aid,params) {
  return request.delete(`Admin/Admin/${aid}`, params)
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

function getImages(params) {
  return request.get(`Admin/Config/Images`,params)
}

function putImage(params) {
  return request.put(`Admin/Config/Image`,params)
}

function getVerifyAdmins(params) {
  return request.get(`Admin/Verify/Admins`,params)
}

function getAdmins(params) {
  return request.get(`Admin/Admins`,params)
}

function changePassword(params) {
  return request.put(`Admin/Admin`,params)
}

export default {
  login,
  getTeachers,
  getRegister,
  getVerify,
  getDemand,
  postVerify,
  putVerify,
  postDemandVerify,
  putDemandVerify,
  getMatchedContracts,
  getUnmatchedContracts,
  putAdmin,
  getDemandRegister,
  getDemandVerify,
  deleteDemand,
  getAdminTeacher,
  putAdminTeacher,
  getImage,
  getImages,
  putImage,
  deleteAdmin,
  getVerifyAdmins,
  getAdmins,
  changePassword
};
