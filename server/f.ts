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
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10,
                    $11, $12, $13, $14, $15, $16, $17, $18)
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

export default router;