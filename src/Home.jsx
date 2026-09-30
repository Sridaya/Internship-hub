import Sidebar from "./Sidebar";
import "./Home.css";
import InternshipCard from "./InternshipCard";
import { useEffect, useState } from "react";

function Home() {
    const [search, setSearch] = useState("");
    const [dept, setDept] = useState("all");
    const [mode, setMode] = useState("all");

    const [internships, setInternships] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        fetch("http://localhost:4000/api/internships")
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to fetch internships");
                }

                return response.json();
            })
            .then((data) => {
                setInternships(data);
                setLoading(false);
            })
            .catch((error) => {
                setError("Unable to load internships");
                setLoading(false);
            });
    }, []);

    const filteredInternships = internships.filter((detail) => {
    const searchText = search.trim().toLowerCase();

    const title = detail.title?.toLowerCase() || "";
    const company = detail.company?.toLowerCase() || "";
    const department = detail.department?.toLowerCase() || "";
    const location = detail.location?.toLowerCase() || "";

    const matchesSearch =
        title.includes(searchText) ||
        company.includes(searchText) ||
        department.includes(searchText) ||
        location.includes(searchText);

    const matchesDepartment =
        dept === "all" ||
        department === dept.toLowerCase();

    const matchesMode =
        mode === "all" ||
        detail.mode?.toLowerCase() === mode.toLowerCase();

    return matchesSearch && matchesDepartment && matchesMode;
});

    const hasFilter =
        search !== "" || dept !== "all" || mode !== "all";

    return (
        <div className="full">
            <div className="sidebar">
                <Sidebar />
            </div>

            <div className="home">
                <h2>Welcome to Internship Hub 👋</h2>

                <label>Search🔎</label>
                <br />

                <input
                    type="search"
                    placeholder="Type to search the role.."
                    className="search"
                    onChange={(e) => setSearch(e.target.value)}
                />

                <br />

                <label>Choose the department⬇️</label>
                <br />

                <select
                    className="dept"
                    onChange={(e) => setDept(e.target.value)}
                >
                    <option value="all">All</option>
                    <option value="CSE">CSE</option>
                    <option value="ECE">ECE</option>
                    <option value="EEE">EEE</option>
                    <option value="MECH">MECH</option>
                    <option value="CIVIL">CIVIL</option>
                    <option value="BCA">BCA</option>
                    <option value="BA">BA</option>
                </select>

                <br />

                <label>Mode of Internship⬇️</label>
                <br />

                <select
                    className="mode"
                    onChange={(e) => setMode(e.target.value)}
                >
                    <option value="all">All</option>
                    <option value="Online">Online</option>
                    <option value="On-site">On-site</option>
                    <option value="Part time">Part time</option>
                    <option value="Full time">Full time</option>
                    <option value="Hybrid">Hybrid</option>
                </select>

                {loading && <p>Loading internships...</p>}

                {error && <p>{error}</p>}

                {!loading &&
                    !error &&
                    hasFilter &&
                    filteredInternships.map((detail) => (
                        <InternshipCard
                            key={detail.id}
                            title={detail.title}
                            company={detail.company}
                            department={detail.department}
                            loc={detail.location}
                            mode={detail.mode}
                            stipend={detail.stipend}
                            duration={detail.duration}
                            view="View details"
                            save="❤️ Save"
                            internship={detail}
                        />
                    ))}
            </div>
        </div>
    );
}

export default Home;