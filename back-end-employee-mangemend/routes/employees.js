const { response, request } = require("express");

//endpoint to get meploy list by department id 
server.get("/api/employees/list/:id", (request, response)=>{
const departmentsId = parseInt(request.params.id);
const departmentsData = router.db.get("departments").value();
const department = departmentsData.find(
    (depts) => depts.id === departmentsId
);

if(!department){
    response.status(404).json({error: "deparmets ot found"});

}else{
    const employeelist = department.employeelist;
    response.json(employeelist);
}
});


//new endint 

server.get("/api/emloyees/:dept_id/:emp_id", (request, response) => {

})