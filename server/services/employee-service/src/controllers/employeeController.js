// /src/controllers/employeeController.js
const Employee = require('../models/employee');
const { successResponse, errorResponse } = require('../../utils/responseHandlers');
const logger = require('../../utils/logger');

// Create a new employee
const createEmployee = async (request, reply) => {
  try {
    const employeeData = request.body;
    const employee = await Employee.create(employeeData);
    reply.send(successResponse(employee, 'Employee created successfully'));
  } catch (error) {
    logger.error(`Create Employee Error: ${error.message}`);
    reply.status(500).send(errorResponse('Failed to create employee'));
  }
};

// Get all employees
const getAllEmployees = async (request, reply) => {
  try {
    const employees = await Employee.findAll();
    reply.send(successResponse(employees, 'Employees retrieved successfully'));
  } catch (error) {
    logger.error(`Get All Employees Error: ${error.message}`);
    reply.status(500).send(errorResponse('Failed to retrieve employees'));
  }
};

// Get a single employee by ID
const getEmployeeById = async (request, reply) => {
  try {
    const { id } = request.params;
    const employee = await Employee.findByPk(id);
    if (!employee) {
      return reply.status(404).send(errorResponse('Employee not found', 404));
    }
    reply.send(successResponse(employee, 'Employee retrieved successfully'));
  } catch (error) {
    logger.error(`Get Employee By ID Error: ${error.message}`);
    reply.status(500).send(errorResponse('Failed to retrieve employee'));
  }
};

// Update an employee
const updateEmployee = async (request, reply) => {
  try {
    const { id } = request.params;
    const updateData = request.body;
    const [updatedRowsCount, updatedRows] = await Employee.update(updateData, {
      where: { employee_id: id },
      returning: true,
    });
    if (updatedRowsCount === 0) {
      return reply.status(404).send(errorResponse('Employee not found', 404));
    }
    reply.send(successResponse(updatedRows[0], 'Employee updated successfully'));
  } catch (error) {
    logger.error(`Update Employee Error: ${error.message}`);
    reply.status(500).send(errorResponse('Failed to update employee'));
  }
};

// Delete an employee
const deleteEmployee = async (request, reply) => {
  try {
    const { id } = request.params;
    const deletedRowsCount = await Employee.destroy({
      where: { employee_id: id },
    });
    if (deletedRowsCount === 0) {
      return reply.status(404).send(errorResponse('Employee not found', 404));
    }
    reply.send(successResponse(null, 'Employee deleted successfully'));
  } catch (error) {
    logger.error(`Delete Employee Error: ${error.message}`);
    reply.status(500).send(errorResponse('Failed to delete employee'));
  }
};

module.exports = {
  createEmployee,
  getAllEmployees,
  getEmployeeById,
  updateEmployee,
  deleteEmployee,
};
