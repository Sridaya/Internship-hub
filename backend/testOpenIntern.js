const {
    fetchOpenInternJobs,
    normalizeOpenInternJobs
} = require("./services/openIntern");

async function test() {
    try {
        const jobs = await fetchOpenInternJobs();

        const internships = normalizeOpenInternJobs(jobs);

        console.log("Fetched jobs:", jobs.length);
        console.log("Normalized internships:", internships.length);

        console.log(
            JSON.stringify(internships[0], null, 2)
        );
    } catch (error) {
        console.error("Error:", error.message);
    }
}

test();