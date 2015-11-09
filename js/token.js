var token;
function addToken(){
$.ajaxSetup({
headers: {
  "Authorization": "Bearer " + token
}
});
};
