const express = require("express");
const {
  employeeList,
  employeeCreateOrEdit,
  employeePasswordCreate,
  employeePasswordForget,
  employeeDelete,
  employeeDetail,
  employeeLogin,
  employeeLogout,
} = require("../controllers/employeeController");
const router = express.Router();

router.post("/list", employeeList);
router.post("/create-edit", employeeCreateOrEdit);
router.post("/create-password", employeePasswordCreate);
router.post("/forget-password", employeePasswordForget);
router.post("/delete", employeeDelete);
router.post("/detail", employeeDetail);
router.post("/login", employeeLogin);
router.post("/logout", employeeLogout);

module.exports = router;


// hii chatgpt crete this my all controllers
// employeeList i have in req.body get company_id and find all employee
// employeeCreateOrEdit re.body get first_name,last_name,email,bod,phone_number or edit employee_id
// employeePasswordCreate email and password in req.body find email and update passowrd
// employeeDelete my id_delete 0 to 1 re.body get id
// employeeDetail req.body get id and find data
// employeeLogin req.body get only email
