import { Router } from "express";
import pool from "./db";

const router = Router();


router.post("/", async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            idNumber,
            dateOfBirth,
            gender,
            phone,
            email,
            address,
            programme,
            programmeType,
            cohortDate,
            education,
            employmentStatus,
            institutionEmployer,
            experience,
            applicationReason,
            emergencyName,
            emergencyPhone
        } = req.body;

        const result = await pool.query(
            `INSERT INTO applicant (
                first_name,
                last_name,
                id_number,
                date_of_birth,
                gender,
                phone_number,
                email,
                address,
                programme,
                programme_type,
                cohort_date,
                education,
                employment_status,
                institution_employer,
                experience,
                application_reason,
                emergency_contact_name,
                emergency_contact_phone
            )
            VALUES (
                $1, $2, $3, $4, $5, $6, $7, $8,
                $9, $10, $11, $12, $13, $14, $15, $16,
                $17, $18
            )
            RETURNING *`,
            [
                firstName,
                lastName,
                idNumber,
                dateOfBirth,
                gender,
                phone,
                email,
                address,
                programme,
                programmeType,
                cohortDate,
                education,
                employmentStatus,
                institutionEmployer,
                experience,
                applicationReason,
                emergencyName,
                emergencyPhone
            ]
        );

        res.status(201).json(result.rows[0]);

    } catch (error) {
        console.error("Error submitting application:", error);

        res.status(500).json({
            error: "Failed to submit application"
        });
    }
});


router.get("/", async (req, res) => {
    try {
        const result = await pool.query(
            `SELECT *
             FROM applicant
             ORDER BY first_name ASC`
        );

        res.json(result.rows);

    } catch (error) {
        console.error("Error retrieving applications:", error);

        res.status(500).json({
            error: "Failed to retrieve applications"
        });
    }
});


router.put("/:idNumber", async (req, res) => {
    try {
        const idNumber = req.params.idNumber;
        const status = req.body.status;

        const currentResult = await pool.query(
            `SELECT status FROM applicant WHERE id_number = $1`,
            [idNumber]
        );

        if (currentResult.rows.length === 0) {
            return res.status(404).json({
                error: "Applicant not found",
                id_number: idNumber
            });
        }

        if (currentResult.rows[0].status === "accepted") {
            return res.status(400).json({
                error: "Cannot change status of an accepted applicant — manage this student from the Students dashboard instead"
            });
        }

        const result = await pool.query(
            `UPDATE applicant
             SET status = $1
             WHERE id_number = $2
             RETURNING *`,
            [status, idNumber]
        );

        res.status(200).json(result.rows[0]);

    } catch (error) {
        console.error("Error updating application:", error);

        res.status(500).json({
            error: "Failed to update application"
        });
    }
});

router.post("/:idNumber/accept", async (req, res) => {

    const client = await pool.connect();

    try {

        await client.query("BEGIN");

        const idNumber = req.params.idNumber;

        // Find applicant
        const applicantResult = await client.query(
            `SELECT *
             FROM applicant
             WHERE id_number = $1`,
            [idNumber]
        );

        if (applicantResult.rows.length === 0) {
            await client.query("ROLLBACK");

            return res.status(404).json({
                error: "Applicant not found"
            });
        }

        const applicant = applicantResult.rows[0];

        // Check if already accepted
        if (applicant.status === "accepted") {
            await client.query("ROLLBACK");

            return res.status(400).json({
                error: "Applicant has already been accepted"
            });
        }

        // Make sure applicant has a programme
        if (!applicant.programme) {
            await client.query("ROLLBACK");

            return res.status(400).json({
                error: "Applicant does not have a programme"
            });
        }

        // Find the programme
        const programmeResult = await client.query(
            `SELECT programme_id
             FROM programme
             WHERE programme_name = $1`,
            [applicant.programme]
        );

        if (programmeResult.rows.length === 0) {
            await client.query("ROLLBACK");

            return res.status(400).json({
                error: "Programme does not exist"
            });
        }

        const programmeId = programmeResult.rows[0].programme_id;

        // Find the intake
        const intakeResult = await client.query(
            `SELECT intake_id
             FROM intake
             WHERE start_date = $1`,
            [applicant.cohort_date]
        );

        if (intakeResult.rows.length === 0) {
            await client.query("ROLLBACK");

            return res.status(400).json({
                error: "Intake does not exist"
            });
        }

        const intakeId = intakeResult.rows[0].intake_id;

        // Create student
        const studentResult = await client.query(
            `INSERT INTO students (
                id_number,
                first_name,
                last_name,
                date_of_birth,
                gender,
                email,
                phone,
                address,
                programme_id,
                intake_id
            )
            VALUES (
                $1, $2, $3, $4, $5,
                $6, $7, $8, $9, $10
            )
            RETURNING *`,
            [
                applicant.id_number,
                applicant.first_name,
                applicant.last_name,
                applicant.date_of_birth,
                applicant.gender,
                applicant.email,
                applicant.phone_number,
                applicant.address,
                programmeId,
                intakeId
            ]
        );

        // Mark applicant as accepted
        await client.query(
            `UPDATE applicant
             SET status = 'accepted'
             WHERE id_number = $1`,
            [idNumber]
        );

        await client.query("COMMIT");

        res.status(200).json({
            message: "Applicant accepted and student created",
            student: studentResult.rows[0]
        });

    } catch (error) {
        await client.query("ROLLBACK");

        console.error("Error accepting applicant:", error);

        res.status(500).json({
            error: error instanceof Error
                ? error.message
                : "Failed to accept applicant"
        });
    } finally {

        client.release();

    }

});

router.get("/students", async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT
                s.id_number,
                s.first_name,
                s.last_name,
                s.status,
                s.programme_id,
                s.email,
                p.programme_code,
                p.programme_name,
                i.intake_name
            FROM students s
            JOIN programme p
                ON s.programme_id = p.programme_id
            JOIN intake i
                ON s.intake_id = i.intake_id
            ORDER BY s.last_name
        `);

        res.json(result.rows);

    } catch (error) {
        console.error("Error retrieving students:", error);

        res.status(500).json({
            error: error instanceof Error ? error.message : "Failed to retrieve students"
        });
    }
});

router.get("/programmes", async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT
                p.programme_id,
                p.programme_code,
                p.programme_name,
                p.department_id,
                d.department_name,
                p.duration_years
            FROM programme p
            JOIN department d
                ON p.department_id = d.department_id
            ORDER BY p.programme_name
        `);

        res.json(result.rows);

    } catch (error) {
        console.error("Error retrieving programmes:", error);

        res.status(500).json({
            error: error instanceof Error
                ? error.message
                : "Failed to retrieve programmes"
        });
    }
});

router.delete("/programmes/:programmeId", async (req, res) => {
    try {
        const { programmeId } = req.params;

        const programmeResult = await pool.query(
            `SELECT programme_name FROM programme WHERE programme_id = $1`,
            [programmeId]
        );

        if (programmeResult.rows.length === 0) {
            return res.status(404).json({ error: "Programme not found" });
        }

        const programmeName = programmeResult.rows[0].programme_name;

        const counts = await pool.query(
            `SELECT
                (SELECT COUNT(*) FROM module WHERE programme_id = $1) AS modules,
                (SELECT COUNT(*) FROM students WHERE programme_id = $1) AS students,
                (SELECT COUNT(*) FROM applicant
                    WHERE programme = $2
                    AND status IN ('awaiting', 'waitlisted')) AS applicants`,
            [programmeId, programmeName]
        );

        if (Number(counts.rows[0].modules) > 0) {
            return res.status(409).json({
                error: "This programme still has modules. Delete the modules first."
            });
        }

        if (Number(counts.rows[0].students) > 0) {
            return res.status(409).json({
                error: "This programme has students on record and cannot be deleted."
            });
        }

        if (Number(counts.rows[0].applicants) > 0) {
            return res.status(409).json({
                error: "This programme still has applicants awaiting a decision. Decide on them first."
            });
        }

        await pool.query(
            `DELETE FROM programme WHERE programme_id = $1`,
            [programmeId]
        );

        res.status(200).json({ message: "Programme deleted" });

    } catch (error) {
        console.error("Error deleting programme:", error);
        res.status(500).json({
            error: error instanceof Error ? error.message : "Failed to delete programme"
        });
    }
});

router.put("/programmes/:programmeId", async (req, res) => {
    try {
        const { programmeId } = req.params;
        const { programmeName, programmeCode, durationYears, departmentId } = req.body;

        if (!programmeName || !programmeCode || !durationYears || !departmentId) {
            return res.status(400).json({
                error: "Programme name, code, duration and department are required"
            });
        }

        const result = await pool.query(
            `UPDATE programme
             SET programme_name = $1,
                 programme_code = $2,
                 duration_years = $3,
                 department_id = $4
             WHERE programme_id = $5
             RETURNING *`,
            [programmeName, programmeCode, durationYears, departmentId, programmeId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Programme not found" });
        }

        res.status(200).json(result.rows[0]);

    } catch (error) {
        console.error("Error updating programme:", error);
        res.status(500).json({
            error: error instanceof Error ? error.message : "Failed to update programme"
        });
    }
});


router.get("/modules", async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT
                m.module_id,
                m.module_code,
                m.module_name,

                p.programme_id,
                p.programme_code,
                p.programme_name,

                l.lecturer_id,
                l.staff_number,
                l.first_name AS lecturer_first_name,
                l.last_name AS lecturer_last_name

            FROM module m

            JOIN programme p
                ON m.programme_id = p.programme_id

            LEFT JOIN lecturer l
                ON m.lecturer_id = l.lecturer_id

            ORDER BY m.module_name
        `);

        res.json(result.rows);

    } catch (error) {
        console.error("Error retrieving modules:", error);

        res.status(500).json({
            error: error instanceof Error
                ? error.message
                : "Failed to retrieve modules"
        });
    }
});

router.get("/lecturers", async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT

                l.lecturer_id,
                l.staff_number,
                l.first_name AS lecturer_first_name,
                l.last_name AS lecturer_last_name,
                l.email,
                l.phone,

                d.department_id,
                d.department_name

            FROM lecturer l
            JOIN department d
                ON l.department_id = d.department_id
            ORDER BY l.last_name
        `);

        res.json(result.rows);

    } catch (error) {
        console.error("Error retrieving lecturers:", error);

        res.status(500).json({
            error: error instanceof Error
                ? error.message
                : "Failed to retrieve lecturers"
        });
    }
});

router.get("/intakes", async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT
                intake_id,
                intake_name,
                start_date

            FROM intake
            ORDER BY intake_name
        `);

        res.json(result.rows);

    } catch (error) {
        console.error("Error retrieving intakes:", error);

        res.status(500).json({
            error: error instanceof Error
                ? error.message
                : "Failed to retrieve intakes"
        });
    }
});

router.get("/departments", async (req, res) => {
    try {
        const result = await pool.query(`
            SELECT department_id, department_name
            FROM department
            ORDER BY department_name
        `);

        res.json(result.rows);

    } catch (error) {
        console.error("Error retrieving departments:", error);

        res.status(500).json({
            error: error instanceof Error
                ? error.message
                : "Failed to retrieve departments"
        });
    }
});

router.post("/departments", async (req, res) => {
    try {
        const { departmentName } = req.body;

        if (!departmentName) {
            return res.status(400).json({ error: "Department name is required" });
        }

        const result = await pool.query(
            `INSERT INTO department (department_name)
             VALUES ($1)
             RETURNING *`,
            [departmentName]
        );

        res.status(201).json(result.rows[0]);

    } catch (error) {
        console.error("Error creating department:", error);
        res.status(500).json({
            error: error instanceof Error ? error.message : "Failed to create department"
        });
    }
});

router.delete("/departments/:departmentId", async (req, res) => {
    try {
        const { departmentId } = req.params;

        const counts = await pool.query(
            `SELECT
                (SELECT COUNT(*) FROM programme WHERE department_id = $1) AS programmes,
                (SELECT COUNT(*) FROM lecturer WHERE department_id = $1) AS lecturers`,
            [departmentId]
        );

        if (Number(counts.rows[0].programmes) > 0 || Number(counts.rows[0].lecturers) > 0) {
            return res.status(409).json({
                error: "Department still has programmes or lecturers"
            });
        }

        const result = await pool.query(
            `DELETE FROM department WHERE department_id = $1 RETURNING *`,
            [departmentId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Department not found" });
        }

        res.status(200).json({ message: "Department deleted" });

    } catch (error) {
        console.error("Error deleting department:", error);
        res.status(500).json({
            error: error instanceof Error ? error.message : "Failed to delete department"
        });
    }
});

router.put("/students/:idNumber/deregister", async (req, res) => {
    try {
        const idNumber = req.params.idNumber;

        const result = await pool.query(
            `UPDATE students
             SET status = 'deregistered'
             WHERE id_number = $1
             RETURNING *`,
            [idNumber]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                error: "Student not found"
            });
        }

        res.status(200).json(result.rows[0]);

    } catch (error) {
        console.error("Error deregistering student:", error);

        res.status(500).json({
            error: "Failed to deregister student"
        });
    }
});

router.delete("/modules/:moduleId", async (req, res) => {
    try {
        const { moduleId } = req.params;

        const result = await pool.query(
            `DELETE FROM module WHERE module_id = $1 RETURNING *`,
            [moduleId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                error: "Module not found"
            });
        }

        await pool.query(
            `INSERT INTO audit_log (entity_type, entity_id, action)
             VALUES ($1, $2, $3)`,
            ["module", moduleId, "deleted"]
        );

        res.status(200).json({
            message: "Module deleted",
            module: result.rows[0]
        });

    } catch (error) {
        console.error("Error deleting module:", error);

        res.status(500).json({
            error: error instanceof Error
                ? error.message
                : "Failed to delete module"
        });
    }
});

router.post("/modules", async (req, res) => {
    try {
        const { moduleCode, moduleName, programmeId, lecturerId } = req.body;

        if (!moduleCode || !moduleName || !programmeId) {
            return res.status(400).json({
                error: "Module code, name and programme are required"
            });
        }

        const result = await pool.query(
            `INSERT INTO module (module_code, module_name, programme_id, lecturer_id)
             VALUES ($1, $2, $3, $4)
             RETURNING *`,
            [moduleCode, moduleName, programmeId, lecturerId || null]
        );

        await pool.query(
            `INSERT INTO audit_log (entity_type, entity_id, action)
             VALUES ($1, $2, $3)`,
            ["module", result.rows[0].module_id, "created"]
        );

        res.status(201).json(result.rows[0]);

    } catch (error){
        console.error("Error creating module:", error);

        res.status(500).json({
            error: error instanceof Error
                ? error.message
                : "Failed to create module"
        });
    }
});

router.put("/modules/:moduleId/assign-lecturer", async (req, res) => {
    try {
        const { moduleId } = req.params;
        const { lecturerId } = req.body;

        if (!lecturerId) {
            return res.status(400).json({ error: "A lecturer must be selected" });
        }

        const result = await pool.query(
            `UPDATE module
             SET lecturer_id = $1
             WHERE module_id = $2
             RETURNING *`,
            [lecturerId, moduleId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Module not found" });
        }

        res.status(200).json(result.rows[0]);

    } catch (error) {
        console.error("Error assigning lecturer:", error);
        res.status(500).json({
            error: error instanceof Error ? error.message : "Failed to assign lecturer"
        });
    }
});

router.post("/intakes", async (req, res) => {
    try {
        const { intakeName, startDate } = req.body;

        if (!intakeName || !startDate) {
            return res.status(400).json({
                error: "Intake name and start date are required"
            });
        }

        const result = await pool.query(
            `INSERT INTO intake (intake_name, start_date)
             VALUES ($1, $2)
             RETURNING *`,
            [intakeName, startDate]
        );

        res.status(201).json(result.rows[0]);

    } catch (error) {
        console.error("Error creating intake:", error);
        res.status(500).json({
            error: error instanceof Error ? error.message : "Failed to create intake"
        });
    }
});

router.delete("/intakes/:intakeId", async (req, res) => {
    try {
        const { intakeId } = req.params;

        const result = await pool.query(
            `DELETE FROM intake WHERE intake_id = $1 RETURNING *`,
            [intakeId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Intake not found" });
        }

        res.status(200).json({ message: "Intake deleted", intake: result.rows[0] });

    } catch (error) {
        console.error("Error deleting intake:", error);
        res.status(500).json({
            error: error instanceof Error ? error.message : "Failed to delete intake"
        });
    }
});

router.post("/lecturers", async (req, res) => {
    try {
        const { firstName, lastName, staffNumber, email, phone, departmentId } = req.body;

        if (!firstName || !lastName || !staffNumber || !departmentId) {
            return res.status(400).json({
                error: "First name, last name, staff number and department are required"
            });
        }

        const result = await pool.query(
            `INSERT INTO lecturer (first_name, last_name, staff_number, email, phone, department_id)
             VALUES ($1, $2, $3, $4, $5, $6)
             RETURNING *`,
            [firstName, lastName, staffNumber, email, phone, departmentId]
        );

        res.status(201).json(result.rows[0]);

    } catch (error) {
        console.error("Error creating lecturer:", error);
        res.status(500).json({
            error: error instanceof Error ? error.message : "Failed to create lecturer"
        });
    }
});

router.delete("/lecturers/:lecturerId", async (req, res) => {
    try {
        const { lecturerId } = req.params;

        const result = await pool.query(
            `DELETE FROM lecturer WHERE lecturer_id = $1 RETURNING *`,
            [lecturerId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Lecturer not found" });
        }

        res.status(200).json({ message: "Lecturer deleted", lecturer: result.rows[0] });

    } catch (error) {
        console.error("Error deleting lecturer:", error);
        res.status(500).json({
            error: error instanceof Error ? error.message : "Failed to delete lecturer"
        });
    }
});

router.post("/programmes", async (req, res) => {
    try {
        const { programmeName, programmeCode, durationYears, departmentId } = req.body;

        if (!programmeName || !programmeCode || !durationYears || !departmentId) {
            return res.status(400).json({
                error: "Programme name, code, duration and department are required"
            });
        }

        const result = await pool.query(
            `INSERT INTO programme (programme_name, programme_code, duration_years, department_id)
             VALUES ($1, $2, $3, $4)
             RETURNING *`,
            [programmeName, programmeCode, durationYears, departmentId]
        );

        res.status(201).json(result.rows[0]);

    } catch (error) {
        console.error("Error creating programme:", error);
        res.status(500).json({
            error: error instanceof Error ? error.message : "Failed to create programme"
        });
    }
});

router.put("/departments/:departmentId", async (req, res) => {
    try {
        const { departmentId } = req.params;
        const { departmentName } = req.body;

        if (!departmentName) {
            return res.status(400).json({ error: "Department name is required" });
        }

        const result = await pool.query(
            `UPDATE department
             SET department_name = $1
             WHERE department_id = $2
             RETURNING *`,
            [departmentName, departmentId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Department not found" });
        }

        res.status(200).json(result.rows[0]);

    } catch (error) {
        console.error("Error updating department:", error);
        res.status(500).json({
            error: error instanceof Error ? error.message : "Failed to update department"
        });
    }
});

router.put("/lecturers/:lecturerId", async (req, res) => {
    try {
        const { lecturerId } = req.params;
        const { firstName, lastName, staffNumber, email, phone } = req.body;

        if (!firstName || !lastName || !staffNumber) {
            return res.status(400).json({
                error: "First name, last name and staff number are required"
            });
        }

        const result = await pool.query(
            `UPDATE lecturer
             SET first_name = $1,
                 last_name = $2,
                 staff_number = $3,
                 email = $4,
                 phone = $5
             WHERE lecturer_id = $6
             RETURNING *`,
            [firstName, lastName, staffNumber, email, phone, lecturerId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "Lecturer not found" });
        }

        res.status(200).json(result.rows[0]);

    } catch (error) {
        console.error("Error updating lecturer:", error);
        res.status(500).json({
            error: error instanceof Error ? error.message : "Failed to update lecturer"
        });
    }
});

export default router;