import React, { useState, useMemo, } from "react";
import { useNavigate } from "react-router-dom";
import { getTimeZones } from "@vvo/tzdb";
import type { TimeZone } from "@/types";
import { formatTimeZoneLabel } from "@/utils/formatTimeZoneLabel";
import { showToast } from "@/utils/showToast"; // adjust import path

const CharacterCreation = () => {

  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"profile" | "class">("profile");

  // Profile
  const [username, setUsername] = useState("");
  const [theme, setTheme] = useState("light");
  const [timezoneSearch, setTimezoneSearch] = useState("");
  const [timezone, setTimezone] = useState(Intl.DateTimeFormat().resolvedOptions().timeZone);

  // Class
  const [selectedClass, setSelectedClass] = useState<string | null>(null);
  const [customDescription, setCustomDescription] = useState("");
  const [aiPrompt, setAiPrompt] = useState("");
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);

  // Filter + format timezones
  const filteredTimezones = useMemo(() => {
    const search = timezoneSearch.toLowerCase();

    return getTimeZones()
      .filter(
        (tz) =>
          tz.name.toLowerCase().includes(search) ||
          tz.alternativeName?.toLowerCase().includes(search) ||
          tz.countryName?.toLowerCase().includes(search) ||
          tz.mainCities?.some((c) => c.toLowerCase().includes(search))
      )
      .map((tz) => ({
        ...tz,
        label: formatTimeZoneLabel(tz as TimeZone),
      }));
  }, [timezoneSearch]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setUploadedImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const classes = [
    {
      id: "barbarian",
      name: "Barbarian",
      stats: { strength: 9, agility: 5, intellect: 3 },
      perks: ["+10% melee damage", "+5% resistance", "Can enter Berserk mode"],
      description: "A fierce warrior who thrives in close combat and brute strength.",
      defaultImage: "/images/barbarian.png",
    },
    {
      id: "monk",
      name: "Monk",
      stats: { strength: 6, agility: 8, intellect: 5 },
      perks: ["+10% dodge chance", "+5% healing received", "Inner Peace buff"],
      description: "A disciplined fighter who channels spiritual energy for balance.",
      defaultImage: "/images/monk.png",
    },
    {
      id: "wizard",
      name: "Wizard",
      stats: { strength: 3, agility: 4, intellect: 10 },
      perks: ["+15% spell power", "+10% mana regen", "Can cast Arcane Shield"],
      description: "A master of arcane arts, wielding elemental power with intellect.",
      defaultImage: "/images/wizard.png",
    },
  ];

  const selectedClassData = classes.find((c) => c.id === selectedClass);

  const handleSubmit = async () => {
    const errors: string[] = [];

    if (!username.trim()) errors.push("Please enter a username.");
    if (!selectedClass) errors.push("Please select a class.");
    if (!timezone) errors.push("Please select a timezone.");

    if (errors.length > 0) {
      showToast("error", errors);
      return;
    }

    setIsSubmitting(true);

    const payload = {
      username,
      theme,
      timezone,
      selectedClass,
      customDescription,
      aiPrompt,
      uploadedImageName: uploadedImage?.name || null,
    };

    console.log("Submitting character:", payload);
    await new Promise((r) => setTimeout(r, 1500));
    const response = true

    setIsSubmitting(false);
    // Check for 200 response from api
    if (response) {
      navigate('/dashboard')
    } else {
      showToast('error', 'Something went wrong, please try again.')
    }

    // showToast("success", `Character Created! Welcome, ${username} the ${selectedClassData?.name}.`);
  };

  return (
    <div
      className="min-h-screen px-6 py-10"
      style={{
        background: "var(--bg-primary)",
        color: "var(--text-primary)",
        transition: "background 0.4s, color 0.4s",
      }}
    >
      <h1
        className="text-4xl font-semibold text-center mb-10"
        style={{
          color: "var(--accent-blue)",
          fontFamily: "Cinzel, serif",
          textShadow: "0 0 8px var(--accent-blue)",
        }}
      >
        Character Creation
      </h1>

      {/* Tabs */}
      <div className="flex justify-center mb-10 space-x-6">
        {["profile", "class"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as "profile" | "class")}
            className="px-6 py-2 text-lg font-medium rounded-md border transition-all duration-300 cursor-pointer"
            style={{
              background:
                activeTab === tab ? "var(--bg-dialog)" : "var(--bg-secondary)",
              borderColor:
                activeTab === tab ? "var(--accent-blue)" : "var(--border)",
              color:
                activeTab === tab
                  ? "var(--accent-blue)"
                  : "var(--text-muted)",
              boxShadow:
                activeTab === tab
                  ? "0 0 10px var(--accent-blue)"
                  : "none",
            }}
          >
            {tab === "profile" ? "Profile" : "Class Selection"}
          </button>
        ))}
      </div>

      {/* ---------------- PROFILE TAB ---------------- */}
      {activeTab === "profile" && (
        <div
          className="max-w-3xl mx-auto rounded-xl p-8"
          style={{
            background: "var(--bg-dialog)",
            border: "1px solid var(--border-dialog)",
            boxShadow: "0 0 20px rgba(0,0,0,0.1)",
          }}
        >
          {/* Username */}
          <div className="mb-6">
            <label className="block mb-2 font-medium" style={{ color: "var(--accent-blue)" }}>
              Username
            </label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              className="w-full p-3 rounded-md outline-none"
              style={{
                background: "var(--bg-secondary)",
                border: "1px solid var(--border)",
                color: "var(--text-primary)",
              }}
            />
          </div>

          {/* Theme */}
          <div className="mb-6">
            <label className="block mb-2 font-medium" style={{ color: "var(--accent-blue)" }}>
              Theme Preference
            </label>
            <select
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              className="w-full p-3 rounded-md outline-none cursor-pointer"
              style={{
                background: "var(--bg-secondary)",
                border: "1px solid var(--border)",
                color: "var(--text-primary)",
              }}
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
              <option value="rogue">Rogue</option>
            </select>
          </div>

          {/* Timezone */}
          <div>
            <label className="block mb-2 font-medium" style={{ color: "var(--accent-blue)" }}>
              Timezone
            </label>
            <input
              type="text"
              placeholder="Search timezone..."
              value={timezoneSearch}
              onChange={(e) => setTimezoneSearch(e.target.value)}
              className="w-full p-3 mb-3 rounded-md outline-none"
              style={{
                background: "var(--bg-secondary)",
                border: "1px solid var(--border)",
                color: "var(--text-primary)",
              }}
            />
            <div
              className="max-h-48 overflow-y-auto rounded-lg"
              style={{
                border: "1px solid var(--border)",
                background: "var(--bg-secondary)",
              }}
            >
              {filteredTimezones.slice(0, 50).map((tz) => (
                <div
                  key={tz.name}
                  className="px-3 py-2 text-sm cursor-pointer transition"
                  style={{
                    background:
                      tz.name === timezone
                        ? "var(--accent-blue)"
                        : "transparent",
                    color:
                      tz.name === timezone
                        ? "#fff"
                        : "var(--text-primary)",
                  }}
                  onClick={() => setTimezone(tz.name)}
                >
                  {tz.label}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ---------------- CLASS TAB ---------------- */}
      {activeTab === "class" && (
        <div
          className="max-w-5xl mx-auto rounded-xl p-8"
          style={{
            background: "var(--bg-dialog)",
            border: "1px solid var(--border-dialog)",
            boxShadow: "0 0 25px rgba(0,0,0,0.1)",
          }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {classes.map((cls) => (
              <div
                key={cls.id}
                className="p-4 rounded-xl transition-all duration-300 cursor-pointer"
                style={{
                  background: "var(--bg-secondary)",
                  border: `1px solid ${selectedClass === cls.id
                    ? "var(--accent-blue)"
                    : "var(--border)"
                    }`,
                  boxShadow:
                    selectedClass === cls.id
                      ? "0 0 12px var(--accent-blue)"
                      : "none",
                }}
                onClick={() => setSelectedClass(cls.id)}
              >
                <img
                  src={cls.defaultImage}
                  alt={cls.name}
                  className="w-full h-48 object-cover rounded-lg mb-3"
                />
                <h3
                  className="text-2xl font-semibold mb-1"
                  style={{ color: "var(--accent-blue)", fontFamily: "Cinzel" }}
                >
                  {cls.name}
                </h3>
                <p className="text-sm mb-2" style={{ color: "var(--text-muted)" }}>
                  {cls.description}
                </p>
                <ul className="text-sm list-disc pl-5 mb-3">
                  {cls.perks.map((perk) => (
                    <li key={perk} style={{ color: "var(--text-primary)" }}>
                      {perk}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {selectedClassData && (
            <div className="mt-10 border-t pt-6" style={{ borderColor: "var(--border)" }}>
              <h2
                className="text-3xl font-semibold mb-4"
                style={{ color: "var(--accent-blue)", fontFamily: "Cinzel" }}
              >
                Customize {selectedClassData.name}
              </h2>

              <textarea
                value={customDescription}
                onChange={(e) => setCustomDescription(e.target.value)}
                className="w-full p-3 rounded-md mb-6 outline-none"
                style={{
                  background: "var(--bg-secondary)",
                  border: "1px solid var(--border)",
                  color: "var(--text-primary)",
                }}
                placeholder="Describe your character's story..."
              />

              <input
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
                className="w-full p-3 rounded-md mb-6 outline-none"
                style={{
                  background: "var(--bg-secondary)",
                  border: "1px solid var(--border)",
                  color: "var(--text-primary)",
                }}
                placeholder="AI Image Prompt (optional)"
              />

              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="w-full text-sm mb-6 cursor-pointer"
                style={{ color: "var(--text-primary)" }}
              />

              <div className="mt-4 flex flex-col items-center">
                <img
                  src={previewImage || selectedClassData.defaultImage}
                  alt="Character Preview"
                  className="w-52 h-52 object-cover rounded-md"
                  style={{ boxShadow: "0 0 10px var(--accent-blue)" }}
                />
              </div>

              {/* Submit Button (always enabled) */}
              <div className="mt-10 flex justify-center">
                <button
                  onClick={handleSubmit}
                  className="px-10 py-3 rounded-lg text-lg font-semibold transition-all duration-300 cursor-pointer"
                  style={{
                    background: "var(--accent-blue)",
                    color: "#fff",
                    boxShadow: "0 0 12px var(--accent-blue)",
                    opacity: isSubmitting ? 0.6 : 1,
                  }}
                >
                  {isSubmitting ? "Creating..." : "Begin Journey"}
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CharacterCreation;
