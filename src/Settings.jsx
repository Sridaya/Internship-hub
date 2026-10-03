import "./Settings.css";

function Settings() {
    return (
        <div className="settings-page">
            <h1>Settings</h1>

            <div className="settings-section">
                <h2>👤 Profile</h2>

                <label>Name</label>
                <input type="text" />

                <label>Email</label>
                <input type="email" />

                <button>Save Changes</button>
            </div>

            <div className="settings-section">
                <h2>🔔 Notifications</h2>
            </div>

            <div className="settings-section">
                <h2>🎨 Appearance</h2>
            </div>

            <div className="settings-section">
                <h2>🗑️ Account</h2>
                <button>Delete Account</button>
            </div>
        </div>
    );
}

export default Settings;