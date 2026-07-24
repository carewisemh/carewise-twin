"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {
  Heart,
  Activity,
  CheckCircle2,
  ShieldCheck,
  Brain,
  Moon,
  Battery,
  AlertTriangle,
  ClipboardList,
  Sparkles,
  Info,
} from "lucide-react";

type TwinResponse = {
  success: boolean;
  eventCount?: number;
  cardiovascular?: {
    system: string;
    twinId: string;
    events: unknown[];
  };
  error?: string;
};

export default function Home() {
  const [data, setData] = useState<TwinResponse | null>(null);
  const [loading, setLoading] = useState(true);

  // Mood Assessment State
  const [mood, setMood] = useState("");
  const [stress, setStress] = useState(5);
  const [sleep, setSleep] = useState("Good");
  const [energy, setEnergy] = useState("Medium");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    fetch("/api/twin")
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch(() => {
        setData({
          success: false,
          error: "Unable to connect to Ontomorph.",
        });
        setLoading(false);
      });
  }, []);

  const calculateWellnessScore = () => {
    let score = 100;

    // Stress impact
    score -= stress * 5;

    // Sleep impact
    if (sleep === "Fair") score -= 10;
    if (sleep === "Poor") score -= 20;

    // Energy impact
    if (energy === "Medium") score -= 5;
    if (energy === "Low") score -= 15;

    return Math.max(score, 0);
  };

  const wellnessScore = calculateWellnessScore();
  const needsSupportNote = mood === "😢 Overwhelmed" || stress >= 9;

  if (loading) {
    return (
      <main
        style={{
          padding: "40px",
          fontFamily: "Arial, sans-serif",
          background: "#f5f9fc",
          minHeight: "100vh",
        }}
      >
        <h2>Loading CareWise Twin...</h2>
      </main>
    );
  }

  return (
    <main
      style={{
        background: "#f5f9fc",
        minHeight: "100vh",
        padding: "40px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* Hero Banner */}
<div
  style={{
    background: "linear-gradient(135deg, #0f766e, #14b8a6)",
    color: "#ffffff",
    borderRadius: "24px",
    padding: "50px 40px",
    marginBottom: "40px",
    textAlign: "center",
    boxShadow: "0 12px 30px rgba(15,118,110,0.25)",
    maxWidth: "980px",
  }}
>
  <h1
    style={{
      fontSize: "3rem",
      marginBottom: "15px",
      fontWeight: "700",
    }}
  >
    🧠 CareWise Twin
  </h1>

  <p
    style={{
      fontSize: "1.4rem",
      marginBottom: "30px",
      opacity: 0.95,
      lineHeight: "1.6",
    }}
  >
    Preventive Mental Wellness
    <br />
    powered by Digital Twins
  </p>

  <button
    type="button"
    onClick={() =>
      window.scrollTo({
        top: 450,
        behavior: "smooth",
      })
    }
    style={{
      background: "#ffffff",
      color: "#0f766e",
      border: "none",
      padding: "15px 35px",
      borderRadius: "999px",
      fontSize: "1rem",
      fontWeight: "bold",
      cursor: "pointer",
      boxShadow: "0 6px 15px rgba(0,0,0,0.15)",
    }}
  >
    Start Assessment
  </button>
</div>
      {/* Header */}
<div
  style={{
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: "25px",
    maxWidth: "980px",
  }}
>
  <div
  style={{
    display: "flex",
    alignItems: "center",
    gap: "12px",
  }}
>
  <div
    style={{
      width: "60px",
      height: "60px",
      borderRadius: "50%",
      background: "#0f766e",
      color: "#ffffff",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "26px",
      fontWeight: "bold",
    }}
  >
    CW
  </div>

  <div>
    <h2
      style={{
        margin: 0,
        color: "#0f766e",
      }}
    >
      CareWise Twin
    </h2>

    <small
      style={{
        color: "#64748b",
      }}
    >
      Mental Wellness Hub
    </small>
  </div>
</div>

  <div
    style={{
      display: "inline-flex",
      alignItems: "center",
      gap: "8px",
      background: "#dcfce7",
      color: "#166534",
      padding: "10px 18px",
      borderRadius: "999px",
      fontWeight: 600,
    }}
  >
    <CheckCircle2 size={18} />
    Connected to Ontomorph
  </div>
</div>

      {/* Mood Check-in */}
      <div
        style={{
          background: "#ffffff",
          borderRadius: "18px",
          padding: "30px",
          maxWidth: "980px",
          marginBottom: "30px",
          boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
        }}
      >
        <h2>📝 Daily Wellness Check-in</h2>

        <p>How are you feeling today?</p>

        <div
          style={{
            display: "flex",
            gap: "10px",
            flexWrap: "wrap",
            marginBottom: "20px",
          }}
        >
          {["😊 Great", "🙂 Okay", "😟 Stressed", "😢 Overwhelmed"].map(
            (item) => (
              <button
                key={item}
                type="button"
                onClick={() => setMood(item)}
                style={{
                  padding: "10px 16px",
                  borderRadius: "10px",
                  cursor: "pointer",
                  border:
                    mood === item
                      ? "2px solid #0f766e"
                      : "1px solid #ccc",
                  background:
                    mood === item ? "#d1fae5" : "#ffffff",
                }}
              >
                {item}
              </button>
            )
          )}
        </div>

        <label>
          Stress Level: <strong>{stress}</strong>/10
        </label>

        <input
          type="range"
          min="1"
          max="10"
          value={stress}
          onChange={(e) => setStress(Number(e.target.value))}
          style={{ width: "100%" }}
        />

        <div style={{ marginTop: "20px" }}>
          <label>Sleep Quality</label>

          <select
            value={sleep}
            onChange={(e) => setSleep(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              marginTop: "8px",
            }}
          >
            <option>Excellent</option>
            <option>Good</option>
            <option>Fair</option>
            <option>Poor</option>
          </select>
        </div>

        <div style={{ marginTop: "20px" }}>
          <label>Energy Level</label>

          <select
            value={energy}
            onChange={(e) => setEnergy(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              marginTop: "8px",
            }}
          >
            <option>High</option>
            <option>Medium</option>
            <option>Low</option>
          </select>
        </div>

        <button
          type="button"
          disabled={!mood}
          onClick={() => setSubmitted(true)}
          style={{
            marginTop: "25px",
            background: mood ? "#0f766e" : "#9ca3af",
            color: "#ffffff",
            border: "none",
            padding: "12px 24px",
            borderRadius: "10px",
            cursor: mood ? "pointer" : "not-allowed",
            fontWeight: 600,
          }}
        >
          Analyze My Wellness
        </button>

        {!mood && (
          <p style={{ color: "#9ca3af", marginTop: "8px", fontSize: "0.9rem" }}>
            Please select a mood to continue.
          </p>
        )}
      </div>

      {submitted && (
        <div
          style={{
            background: "#ffffff",
            borderRadius: "18px",
            padding: "30px",
            maxWidth: "980px",
            marginBottom: "30px",
            boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
          }}
        >
          <h2>📊 Wellness Summary</h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(180px,1fr))",
              gap: "15px",
              marginTop: "20px",
            }}
          >
            <div
              style={{
                background: "#f0fdf4",
                padding: "20px",
                borderRadius: "12px",
              }}
            >
              <h3
  style={{
    display: "flex",
    alignItems: "center",
    gap: "8px",
  }}
>
  <Brain size={20} color="#0f766e" />
  Mood
</h3>
              <p>{mood || "Not selected"}</p>
            </div>

            <div
              style={{
                background: "#eff6ff",
                padding: "20px",
                borderRadius: "12px",
              }}
            >
              <h3
  style={{
    display: "flex",
    alignItems: "center",
    gap: "8px",
  }}
>
  <Moon size={20} color="#2563eb" />
  Sleep
</h3>
              <p>{sleep}</p>
            </div>

            <div
              style={{
                background: "#fefce8",
                padding: "20px",
                borderRadius: "12px",
              }}
            >
              <h3
  style={{
    display: "flex",
    alignItems: "center",
    gap: "8px",
  }}
>
  <Battery size={20} color="#d97706" />
  Energy
</h3>
              <p>{energy}</p>
            </div>

            <div
              style={{
                background:
                  stress >= 8
                    ? "#fee2e2"
                    : stress >= 5
                    ? "#fef3c7"
                    : "#dcfce7",
                padding: "20px",
                borderRadius: "12px",
              }}
            >
              <h3
  style={{
    display: "flex",
    alignItems: "center",
    gap: "8px",
  }}
>
  <AlertTriangle size={20} color="#dc2626" />
  Wellness Risk
</h3>

              <h2>
                {stress >= 8
                  ? "🔴 High"
                  : stress >= 5
                  ? "🟠 Moderate"
                  : "🟢 Low"}
              </h2>

              <p>Stress Score: {stress}/10</p>
            </div>
          </div>
        </div>
      )}

      {submitted && (
        <div
          style={{
            background: "#ffffff",
            borderRadius: "18px",
            padding: "30px",
            maxWidth: "980px",
            marginBottom: "30px",
            boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
            textAlign: "center",
          }}
        >
          <h2
  style={{
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    gap: "10px",
  }}
>
  <Brain size={28} color="#0f766e" />
  CareWise Wellness Score
</h2>

          <div
            style={{
              fontSize: "64px",
              fontWeight: "bold",
              color:
                wellnessScore >= 80
                  ? "#16a34a"
                  : wellnessScore >= 60
                  ? "#d97706"
                  : "#dc2626",
              marginTop: "20px",
            }}
          >
            {wellnessScore}
          </div>

          <p style={{ fontSize: "20px" }}>/100 Wellness Score</p>

          <div
            style={{
              marginTop: "20px",
              padding: "15px",
              borderRadius: "10px",
              background:
                wellnessScore >= 80
                  ? "#dcfce7"
                  : wellnessScore >= 60
                  ? "#fef3c7"
                  : "#fee2e2",
            }}
          >
            <strong>
              {wellnessScore >= 80
                ? "🟢 Excellent Wellbeing"
                : wellnessScore >= 60
                ? "🟠 Moderate Wellbeing"
                : "🔴 Needs Attention"}
            </strong>
          </div>
        </div>
      )}

      {/* Twin Status */}
      {data?.success ? (
        <div
          style={{
            background: "#ffffff",
            borderRadius: "18px",
            padding: "30px",
            maxWidth: "980px",
            boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
          }}
        >
          <h2
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <ShieldCheck color="#16a34a" />
            Twin Status
          </h2>

          <hr style={{ margin: "20px 0" }} />

          <p>
            <Heart color="red" size={20} /> <strong>Body System:</strong>{" "}
            {data.cardiovascular?.system}
          </p>

          <p>
            <Activity color="#2563eb" size={20} /> <strong>Events:</strong>{" "}
            {data.eventCount}
          </p>

          <p>
            <strong>Twin ID</strong>
            <br />
            <code
              style={{
                display: "inline-block",
                marginTop: "8px",
                background: "#f3f4f6",
                padding: "10px",
                borderRadius: "8px",
                wordBreak: "break-all",
              }}
            >
              {data.cardiovascular?.twinId}
            </code>
          </p>
        </div>
      ) : (
        <div
          style={{
            color: "#b91c1c",
            background: "#fee2e2",
            padding: "20px",
            borderRadius: "12px",
            maxWidth: "980px",
          }}
        >
          {data?.error}
        </div>
      )}

      {/* AI Recommendation */}
      {submitted && (
        <>
          <div
            style={{
              background: "#eefdf5",
              borderRadius: "18px",
              padding: "30px",
              maxWidth: "980px",
              marginTop: "30px",
              border: "1px solid #bbf7d0",
            }}
          >
            <h2
  style={{
    display: "flex",
    alignItems: "center",
    gap: "10px",
  }}
>
  <Sparkles color="#0f766e" />
  CareWise AI Recommendation
</h2>

            <p>
              <strong>Mood:</strong> {mood || "Not selected"}
            </p>

            <p>
              <strong>Stress Level:</strong> {stress}/10
            </p>

            <p>
              <strong>Sleep Quality:</strong> {sleep}
            </p>

            <p>
              <strong>Energy Level:</strong> {energy}
            </p>

            <hr style={{ margin: "20px 0" }} />

            {stress >= 8 ? (
              <p>
                Your responses suggest a high level of stress today. Consider
                taking a short break, practicing deep breathing for 5–10
                minutes, staying hydrated, and speaking with someone you trust
                if these feelings continue.
              </p>
            ) : stress >= 5 ? (
              <p>
                You appear to be experiencing moderate stress. A short walk,
                mindfulness exercise, stretching, or listening to calming
                music may help you recharge.
              </p>
            ) : (
              <p>
                Your wellbeing indicators look positive today. Keep
                maintaining healthy habits, regular sleep, hydration, and
                physical activity.
              </p>
            )}

            {needsSupportNote && (
              <div
                style={{
                  marginTop: "20px",
                  padding: "16px",
                  borderRadius: "10px",
                  background: "#fff7ed",
                  border: "1px solid #fed7aa",
                }}
              >
                <strong>💬 You don't have to handle this alone.</strong>
                <p style={{ marginTop: "8px" }}>
                  If today feels like more than you can manage, it can help to
                  talk to someone you trust or a mental health professional.
                  This tool isn't a substitute for that kind of support.
                </p>
              </div>
            )}
          </div>

          <div
            style={{
              background: "#ffffff",
              borderRadius: "18px",
              padding: "30px",
              maxWidth: "980px",
              marginTop: "30px",
              boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
            }}
          >
            <h2
  style={{
    display: "flex",
    alignItems: "center",
    gap: "10px",
  }}
>
  <ClipboardList color="#0f766e" />
  Personalized Care Plan
</h2>

            <h3>🚀 Immediate Actions</h3>

            <ul>
              {stress >= 8 && (
                <>
                  <li>🫁 Practice 5–10 minutes of deep breathing.</li>
                  <li>🚶 Take a short walk outdoors.</li>
                  <li>💧 Drink a glass of water.</li>
                </>
              )}

              {stress >= 5 && stress < 8 && (
                <>
                  <li>🧘 Take a mindfulness break.</li>
                  <li>🎵 Listen to calming music.</li>
                </>
              )}

              {stress < 5 && (
                <>
                  <li>✅ Keep maintaining healthy habits.</li>
                  <li>🌱 Continue your wellness routine.</li>
                </>
              )}
            </ul>

            <h3>🌙 Lifestyle Suggestions</h3>

            <ul>
              {sleep === "Poor" && (
                <li>😴 Aim for at least 7–9 hours of sleep tonight.</li>
              )}

              {energy === "Low" && (
                <li>🥗 Eat a balanced meal and stay hydrated.</li>
              )}

              <li>📵 Reduce screen time before bedtime.</li>
              <li>☀ Spend a few minutes outside today.</li>
            </ul>

            <h3>📅 Follow-up</h3>

            <p>
              Complete another wellness assessment tomorrow to monitor changes
              in your wellbeing over time.
            </p>
          </div>
        </>
      )}
      {/* About CareWise */}
      <div
        style={{
          background: "#ffffff",
          borderRadius: "18px",
          padding: "30px",
          maxWidth: "980px",
          marginTop: "30px",
          marginBottom: "30px",
          boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
        }}
      >
        <h2
  style={{
    display: "flex",
    alignItems: "center",
    gap: "10px",
  }}
>
  <Info color="#0f766e" />
  About CareWise Twin
</h2>

        <p style={{ lineHeight: "1.8" }}>
          <strong>CareWise Twin</strong> combines self-reported wellness
          assessments with Ontomorph's Digital Twin Platform to provide
          personalized preventive mental wellness guidance.
        </p>

        <p style={{ lineHeight: "1.8" }}>
          By helping users recognize early signs of stress, poor sleep, and
          reduced energy, CareWise encourages healthy interventions before
          wellbeing declines.
        </p>

        <p style={{ lineHeight: "1.8" }}>
          This project demonstrates how Digital Twins can support proactive
          healthcare by combining user-reported wellness information with
          connected digital health data to deliver timely, personalized
          recommendations.
        </p>
      </div>
          {/* Footer */}
      <footer
        style={{
          maxWidth: "980px",
          marginTop: "20px",
          marginBottom: "20px",
          padding: "25px",
          textAlign: "center",
          color: "#475569",
          fontSize: "0.95rem",
          borderTop: "1px solid #dbeafe",
        }}
      >
        <h3
          style={{
            color: "#0f766e",
            marginBottom: "10px",
          }}
        >
          Built for
        </h3>

        <p
          style={{
            fontWeight: "bold",
            marginBottom: "20px",
          }}
        >
          Ontomorph HealthTech Hackathon 2026
        </p>

        <h4
          style={{
            marginBottom: "12px",
          }}
        >
          Powered by
        </h4>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "12px",
            flexWrap: "wrap",
          }}
        >
          <span
            style={{
              background: "#dbeafe",
              padding: "8px 14px",
              borderRadius: "999px",
            }}
          >
            Next.js
          </span>

          <span
            style={{
              background: "#dcfce7",
              padding: "8px 14px",
              borderRadius: "999px",
            }}
          >
            TypeScript
          </span>

          <span
            style={{
              background: "#fef3c7",
              padding: "8px 14px",
              borderRadius: "999px",
            }}
          >
            Ontomorph DTP SDK
          </span>
        </div>

        <p
          style={{
            marginTop: "20px",
            fontSize: "0.85rem",
            color: "#64748b",
          }}
        >
          © 2026 CareWise Twin • Preventive Mental Wellness Companion
        </p>
      </footer>
    </main>
  );
}