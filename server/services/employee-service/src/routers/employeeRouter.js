const employeeController = require('../controllers/employeeController');

async function employeeRoutes(fastify, options) {
  fastify.post('/employees', employeeController.createEmployee);
  fastify.get('/employees', employeeController.getAllEmployees);
  fastify.get('/employees/:id', employeeController.getEmployeeById);
  fastify.put('/employees/:id', employeeController.updateEmployee);
  fastify.delete('/employees/:id', employeeController.deleteEmployee);
}

module.exports = employeeRoutes;
