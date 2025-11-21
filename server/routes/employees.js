const express = require('express');
const router = express.Router();
const pool = require('../db');
const multer = require('multer');
const cloudinary = require('../cloudinary');
const fs = require('fs');


const upload = multer({ dest: 'tmp/' });



router.get("/check-id/:employee_id", async (req, res) => {
  try {
    const empId = req.params.employee_id;

    const [rows] = await pool.query(
      "SELECT id FROM employees WHERE employee_id = ?",
      [empId]
    );

    res.json({ exists: rows.length > 0 });

  } catch (err) {
    console.error("ID Check Error:", err);
    res.status(500).json({ error: err.message });
  }
});



router.get('/', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM employees ORDER BY id ASC');
    res.json(rows);
  } catch (err) {
    console.error("Get All Error:", err);
    res.status(500).json({ error: err.message });
  }
});



router.get('/:id', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM employees WHERE id=?', [req.params.id]);

    if (!rows.length) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.json(rows[0]);
  } catch (err) {
    console.error("Get One Error:", err);
    res.status(500).json({ error: err.message });
  }
});



router.post('/', upload.single('profile'), async (req, res) => {
  try {
    let imgUrl = null;

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "employees"
      });

      imgUrl = result.secure_url;
      fs.unlink(req.file.path, () => {});
    }

    const { name, employee_id, department, designation, project, type, status } = req.body;

    const [insert] = await pool.query(
      `INSERT INTO employees 
        (name, employee_id, department, designation, project, type, status, profile_image)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      [name, employee_id, department, designation, project, type, status, imgUrl]
    );

    const [employee] = await pool.query('SELECT * FROM employees WHERE id=?', [insert.insertId]);

    res.json(employee[0]);

  } catch (err) {
    console.error("Create Error:", err);
    res.status(500).json({ error: err.message });
  }
});



router.put('/:id', upload.single('profile'), async (req, res) => {
  try {
    const { name, employee_id, department, designation, project, type, status } = req.body;
    let imgUrl = null;

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "employees"
      });

      imgUrl = result.secure_url;
      fs.unlink(req.file.path, () => {});

    } else {
      const [old] = await pool.query(
        "SELECT profile_image FROM employees WHERE id=?",
        [req.params.id]
      );
      imgUrl = old[0]?.profile_image || null;
    }

    await pool.query(
      `UPDATE employees 
        SET name=?, employee_id=?, department=?, designation=?, project=?, type=?, status=?, profile_image=?
       WHERE id=?`,
      [name, employee_id, department, designation, project, type, status, imgUrl, req.params.id]
    );

    const [updated] = await pool.query('SELECT * FROM employees WHERE id=?', [req.params.id]);
    res.json(updated[0]);

  } catch (err) {
    console.error("Update Error:", err);
    res.status(500).json({ error: err.message });
  }
});


router.delete('/:id', async (req, res) => {
  try {
    await pool.query('DELETE FROM employees WHERE id=?', [req.params.id]);
    res.json({ success: true });
  } catch (err) {
    console.error("Delete Error:", err);
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;
