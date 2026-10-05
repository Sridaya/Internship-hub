import { useEffect, useState } from "react";
import "./Settings.css";

function Settings() {

    const user = JSON.parse(localStorage.getItem("user"));

    const [name, setName] = useState(user.name);
    const [email, setEmail] = useState(user.email);
    const [internshipAlerts, setInternshipAlerts] = useState(
        localStorage.getItem("internshipAlerts") !== "false"
    );
    const [applicationUpdates, setApplicationUpdates] = useState(
    localStorage.getItem("applicationUpdates") !== "false"
);

const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "dark"
);
useEffect(() => {
    document.body.className = theme;
}, [theme]);

    async function handleSave() {
            const response = await fetch(
                `http://localhost:4000/api/users/${user.id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        name: name
                    })
                }
            );

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem(
                    "user",
                    JSON.stringify({
                        ...user,
                        name: name
                    })
                );

                alert(data.message);
            }
        }

        async function handleDeleteAccount() {
    const confirmDelete = window.confirm(
        "Are you sure you want to delete your account?"
    );

    if (!confirmDelete) {
        return;
    }

    const response = await fetch(
        `http://localhost:4000/api/users/${user.id}`,
        {
            method: "DELETE"
        }
    );

    const data = await response.json();

    if (response.ok) {
        localStorage.clear();
        alert(data.message);
        window.location.href = "/";
    }
}

    return (
        <div className={`settings-page ${theme}`}>
            <h1>Settings</h1>

            <div className="settings-section">
                <h2>👤 Profile</h2>

            <label>Name</label>
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />

            <label>Email</label>
            <input
                type="email"
                value={email}
                readOnly
            />
                <button onClick={handleSave}>Save Changes</button>
            </div>

            <div className="settings-section">
                <h2>🔔 Notifications</h2>
                <label>
                    <input
                        type="checkbox"
                        checked={internshipAlerts}
                        onChange={(e) => {
                            setInternshipAlerts(e.target.checked);
                            localStorage.setItem(
                                "internshipAlerts",
                                e.target.checked
                            );
                        }}
                    />
                    New Internship Alerts
                </label>
                <label>
    <input
        type="checkbox"
        checked={applicationUpdates}
        onChange={(e) => {
            setApplicationUpdates(e.target.checked);
            localStorage.setItem(
                "applicationUpdates",
                e.target.checked
            );
        }}
    />
    Application Updates
</label>
            </div>

            <div className="settings-section">
    <h2>🎨 Appearance</h2>

    <label>
        <input
    type="radio"
    name="theme"
    value="dark"
    checked={theme === "dark"}
    onChange={(e) => {
        setTheme(e.target.value);
        localStorage.setItem("theme", e.target.value);
    }}
/>
        Dark
    </label>

    <label>
        <input
    type="radio"
    name="theme"
    value="light"
    checked={theme === "light"}
    onChange={(e) => {
        setTheme(e.target.value);
        localStorage.setItem("theme", e.target.value);
    }}
/>
        Light
    </label>
</div>

            <div className="settings-section">
                <h2>🗑️ Account</h2>
                <button onClick={handleDeleteAccount}>
    Delete Account
</button>
            </div>
        </div>
    );
}

export default Settings;