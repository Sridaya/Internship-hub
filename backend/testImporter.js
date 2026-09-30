const { importOpenInternJobs } = require("./services/internshipImporter");

async function test() {
    try {
        const result = await importOpenInternJobs();

        console.log("Import result:");
        console.log(result);
    } catch (error) {
        console.error("Import failed:", error.message);
    }
}

test();