const { Op } = require("sequelize");
const Employee = require("../models/employee");
const bcrypt = require("bcrypt");

exports.employeeList = async (req, res) => {
  try {
    const { company_id } = req.body;
    if (!company_id) {
      return res.status(400).json({ message: "company_id is required." });
    }

    const employees = await Employee.findAll({
      where: {
        company_id,
        is_delete: "0",
      },
    });

    res.status(200).json(employees);
  } catch (error) {
    res.status(500).json({ message: "Error fetching employees.", error });
  }
};

exports.employeeCreateOrEdit = async (req, res) => {
  try {
    const {
      employee_id,
      first_name,
      last_name,
      email,
      bod,
      phone_number,
      company_id,
      position,
    } = req.body;

    if (
      !first_name ||
      !last_name ||
      !email ||
      !bod ||
      !company_id ||
      !position
    ) {
      return res.status(400).json({ message: "Missing required fields." });
    }

    if (employee_id) {
      const updated = await Employee.update(
        { first_name, last_name, email, bod, phone_number, position },
        { where: { employee_id } }
      );
      return res
        .status(200)
        .json({ message: "Employee updated successfully.", updated });
    } else {
      const newEmployee = await Employee.create({
        first_name,
        last_name,
        email,
        bod,
        phone_number,
        company_id,
        position,
        password: "default",
      });
      res
        .status(201)
        .json({ message: "Employee created successfully.", newEmployee });
    }
  } catch (error) {
    res.status(500).json({ message: "Error processing employee data.", error });
  }
};

exports.employeePasswordCreate = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "email and password are required." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const updated = await Employee.update(
      { password: hashedPassword },
      { where: { email } }
    );

    if (updated[0] === 0) {
      return res.status(404).json({ message: "Employee not found." });
    }

    res.status(200).json({ message: "Password updated successfully." });
  } catch (error) {
    res.status(500).json({ message: "Error updating password.", error });
  }
};

exports.employeeDelete = async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({ message: "id is required." });
    }

    const updated = await Employee.update(
      { is_delete: "1" },
      { where: { employee_id: id } }
    );

    if (updated[0] === 0) {
      return res.status(404).json({ message: "Employee not found." });
    }

    res.status(200).json({ message: "Employee deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: "Error deleting employee.", error });
  }
};

exports.employeeDetail = async (req, res) => {
  try {
    const { id } = req.body;

    if (!id) {
      return res.status(400).json({ message: "id is required." });
    }

    const employee = await Employee.findOne({
      where: { employee_id: id, is_delete: "0" },
    });

    if (!employee) {
      return res.status(404).json({ message: "Employee not found." });
    }

    res.status(200).json(employee);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching employee details.", error });
  }
};

exports.employeeLogin = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "email is required." });
    }

    const employee = await Employee.findOne({
      where: { email, is_delete: "0" },
    });

    if (!employee) {
      return res.status(404).json({ message: "Employee not found." });
    }

    res.status(200).json({ message: "Login successful.", employee });
  } catch (error) {
    res.status(500).json({ message: "Error during login.", error });
  }
};

exports.employeeLogout = async (req, res) => {
  try {
    res.status(200).json({ message: "Logout successful." });
  } catch (error) {
    res.status(500).json({ message: "Error during logout.", error });
  }
};
