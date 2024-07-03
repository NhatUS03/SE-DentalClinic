var jwt = require('jsonwebtoken');


var data={username:"NhatVo"}

// var token=jwt.sign(data,'conmemay')
// console.log(token)


var new_token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Ik5oYXRWbyIsImlhdCI6MTcxODg2MzQ4N30.XCQNswNz9T4MPsCsT181k8GuK2IlPv9Ylr3cnBLn4kM'
var new_data=jwt.verify(new_token,'conmemay')
console.log(new_data)


