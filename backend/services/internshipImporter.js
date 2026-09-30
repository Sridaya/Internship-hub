const db = require("../database");

const {
    fetchOpenInternJobs,
    normalizeOpenInternJobs
} = require("./openIntern");

async function importOpenInternJobs() {
    const jobs = await fetchOpenInternJobs();
    const internships = normalizeOpenInternJobs(jobs);

    let added = 0;
    let skipped = 0;

    const checkExisting = db.prepare(
        "SELECT id FROM internships WHERE apply_link = ?"
    );

    const insertInternship = db.prepare(`
        INSERT INTO internships (
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
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    for (const internship of internships) {
        if (!internship.apply_link) {
            skipped++;
            continue;
        }

        const existing = checkExisting.get(internship.apply_link);

        if (existing) {
            skipped++;
            continue;
        }

        insertInternship.run(
            internship.title,
            internship.company,
            internship.department,
            internship.location,
            internship.mode,
            internship.stipend,
            internship.duration,
            internship.description,
            internship.apply_link,
            internship.source,
            internship.verified
        );

        added++;
    }

    return {
        fetched: internships.length,
        added,
        skipped
    };
}

module.exports = {
    importOpenInternJobs
};