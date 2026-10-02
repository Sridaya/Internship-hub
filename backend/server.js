const express = require("express");
const cors = require("cors");
const db = require("./database");

const app = express();

const crypto = require("crypto");
const transporter = require("./email");

const { importOpenInternJobs } = require("./services/internshipImporter");

app.use(cors());
app.use(express.json());

app.post("/api/auth/register", async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const bcrypt = require("bcrypt");

        const existingUser = db
            .prepare("SELECT * FROM users WHERE email = ?")
            .get(email);

        if (existingUser) {
            return res.status(400).json({ message: "Email already registered" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        db.prepare(
            "INSERT INTO users (name, email, password) VALUES (?, ?, ?)"
        ).run(name, email, hashedPassword);

        res.json({ message: "Registration successful" });

    } catch (error) {
        res.status(500).json({ message: "Registration failed" });
    }
});

app.post("/api/auth/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const bcrypt = require("bcrypt");

        const user = db
            .prepare("SELECT * FROM users WHERE email = ?")
            .get(email);

        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        res.json({
            message: "Login successful",
            user: {
                id: user.id,
                name: user.name,
                email: user.email
            }
        });

    } catch (error) {
        res.status(500).json({ message: "Login failed" });
    }
});

app.post("/api/auth/forgot-password", async(req, res) => {

    const { email } = req.body;

    const user = db
        .prepare("SELECT * FROM users WHERE email = ?")
        .get(email);

    if (!user) {
        return res.status(400).json({
            message: "If this email is registered, a reset link will be sent to your email."
        });
    }

    const token = crypto.randomBytes(32).toString("hex");
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000).toISOString();
    db.prepare(`
    INSERT INTO password_resets (user_id, token, expires_at)
        VALUES (?, ?, ?)
    `).run(user.id, token, expiresAt);

    const resetLink = `http://localhost:5173/reset-password/${token}`;

    await transporter.sendMail({
        from: "YOUR_GMAIL",
        to: email,
        subject: "Internship Hub - Reset Password",
        text: `Click this link to reset your password: ${resetLink}`
    });
    res.json({
        message: "If this email is registered, a reset link will be sent to your email."
    });

});

app.post("/api/auth/reset-password", async (req, res) => {
      const {token,password}=req.body;
      const reset = db
        .prepare("SELECT * FROM password_resets WHERE token = ?")
        .get(token);


        if (!reset) {
            return res.status(400).json({
                message: "Invalid or expired reset link"
            });
        }

        if (new Date(reset.expires_at) < new Date()) {
            return res.status(400).json({
                message: "Reset link has expired"
            });
        }
        console.log("Token is valid");
        const bcrypt = require("bcrypt");
        const hashedPassword = await bcrypt.hash(password, 10);
        db.prepare("UPDATE users SET password = ? WHERE id = ?").run(
          hashedPassword,
          reset.user_id,
        );
        
        db.prepare("DELETE FROM password_resets WHERE id = ?").run(reset.id);
        res.json({
          message: "Password reset successful",
        });
}); 

app.post("/api/internships", (req, res) => {
    const {
        title,
        company,
        department,
        location,
        mode,
        stipend,
        duration,
        description,
        apply_link,
        source,
        verified
    } = req.body;

    const result = db.prepare(`
        INSERT INTO internships
        (title, company, department, location, mode, stipend, duration, description, apply_link, source, verified)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `).run(
        title,
        company,
        department,
        location,
        mode,
        stipend,
        duration,
        description,
        apply_link,
        source,
        verified ? 1 : 0
    );

    res.json({
        message: "Internship added",
        id: result.lastInsertRowid
    });
});

app.get("/api/internships", (req, res) => {
    const internships = db
        .prepare("SELECT * FROM internships")
        .all();

    res.json(internships);
});

app.post("/api/internships/import", async (req, res) => {
    try {
        const result = await importOpenInternJobs();

        res.json({
            message: "Internships imported successfully",
            ...result
        });
    } catch (error) {
        console.error("Internship import failed:", error);

        res.status(500).json({
            message: "Failed to import internships"
        });
    }
});

app.post("/api/applications",(req,res)=>{
    const {user_id,internship_id}=req.body;
    const result=db.prepare(`
        SELECT * FROM applications
        WHERE user_id=?
        AND internship_id =?
    `).get(user_id,internship_id);
    
    if(result){
        return res.status(400).json({ message: "Already applied" });
    }
    db.prepare(`
        INSERT INTO applications(
           user_id,
           internship_id
        )
        VALUES(
            ?,
            ?
        )
    `).run(user_id,internship_id);
     res.status(201).json({
        message: "Application submitted"
    });
});

app.get("/api/applications/:user_id", (req, res) => {
    const { user_id } = req.params;

    const result = db.prepare(`
        SELECT
            applications.id,
            applications.internship_id,
            internships.title,
            internships.company,
            internships.location,
            internships.apply_link,
            applications.applied_at,
            applications.status
        FROM applications
        JOIN internships
        ON applications.internship_id = internships.id
        WHERE applications.user_id = ?
    `).all(user_id);

    res.json(result);
});
app.listen(4000, () => {
    console.log("Server running on http://localhost:4000");
});

