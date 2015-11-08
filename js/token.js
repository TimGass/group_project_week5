var token;
function addHeader(){
$.ajaxSetup({
headers: {
  "Authorization": "Bearer Access_Token " + token
}
});
};
