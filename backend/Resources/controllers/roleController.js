const roles = require("../models/Roles");
const Film = require("../models/Films");
const { Op } = require('sequelize');

require("../models/associations");

const RoleController = {
  create: async (req, res) => {
    const {
      role_id,
      information,
      role_for,
      start_date,
      end_date,
      pay,
      creator,
      film_id,
    } = req.body;
    try {
      const newRole = await roles.create({
        role_id,
        information,
        role_for,
        start_date,
        end_date,
        pay,
        creator,
        film_id,
      });
      res.status(201).json({ newRole });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  delete: async (req, res) => {
    try {
      const { role_id } = req.params;
      const deletedRows = await roles.destroy({
        where: { role_id: role_id },
      });

      if (deletedRows === 0) {
        return res.status(404).json({ message: "Role not found!" });
      }
      return res.status(200).json({ message: "Role deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  update: async (req, res) => {
    const { role_id } = req.params;
    const {
      information,
      role_for,
      start_date,
      end_date,
      pay,
      creator,
      film_id,
    } = req.body;
    try {
      const updatedRows = await roles.update(
        { information, role_for, start_date, end_date, pay, creator, film_id },
        { where: { role_id: role_id } }
      );

      if (updatedRows[0] === 0) {
        res.status(404).json({ message: "Role not found or no changes made!" });
      } else {
        res.status(200).json({ message: "Role updated successfully" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  getAll: async (req, res) => {
    try {
      const skip = parseInt(req.query.skip || 0);
      const limit = parseInt(req.query.limit || 8);
      
      const role = await roles.findAll({
        include: {
          model: Film,
          attributes: ["film_id", "title"],
        },
        attributes: {
          exclude: ["film_id"],
        },
        offset: skip,
        limit: limit
      });

      if (!role) {
        return res.status(404).json({ message: "Role not found!" });
      } else {
        return res.status(200).json(role);
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  search: async (req, res) => {
    try {
      // search by creator, role for (actor/director), pay range
      const { creator, role_for } = req.query;
      const pay_ll = parseInt(req.query.pay_ll);
      const pay_hl = parseInt(req.query.pay_hl);
      const skip = parseInt(req.query.skip || 0);
      const limit = parseInt(req.query.limit || 8);
      
      const where = {};
      if (creator) where.creator = creator;
      if (role_for) where.role_for = role_for;
      if (pay_ll || pay_hl) {
        where.pay = {};
        if (pay_ll) where.pay[Op.gte] = Number(pay_ll);
        if (pay_hl) where.pay[Op.lte] = Number(pay_hl);
      }

      // Get filtered roles with pagination
      const Roles = await roles.findAll({
        where,
        include: {
          model: Film,
          attributes: ["film_id", "title"],
        },
        attributes: {
          exclude: ["film_id"],
        },
        offset: skip,
        limit: limit
      });

      // Get total count of roles matching the filter
      const total = await roles.count({ where });

      return res.status(200).json({
        roles: Roles,
        total: total
      });

    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  getOne: async (req, res) => {
    const { role_id } = req.params;
    try {
      const role = await roles.findOne({ where: { role_id: role_id } });

      if (!role) {
        res.status(404).json({ message: "Role not found!" });
      } else {
        res.status(200).json(role);
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = RoleController;
