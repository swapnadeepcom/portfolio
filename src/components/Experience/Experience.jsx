import React, { useEffect, useState, useCallback } from "react";
import britishAirwaysLogo from "../../assets/company_logo/british_airways.png";

export const experiences = [
  {
    id: 0,
    img: britishAirwaysLogo,
    role: "Data Science Intern",
    company: "British Airways",
    date: "September 2024",
    desc:
      "Worked as a Data Science Intern focusing on customer data analysis and predictive modeling. Presented insights and recommendations to stakeholders and helped integrate data-driven solutions into broader business strategies.",
    skills: [
      "Python",
      "Data Analysis",
      "Machine Learning",
      "Predictive Modeling",
      "Pandas",
      "Scikit-learn",
    ],
    details: {
      tasks: [
        {
          title:
            "Task 1 — Forecast Lounge Demand & Capacity Planning (Lookup Table)",
          learn:
            "How airline data and modeling helps British Airways forecast lounge demand and plan for future capacity.",
          do: [
            "Review lounge eligibility criteria and map customer groupings.",
            "Create a reusable lookup table + written justification for future schedules.",
          ],
          steps: [
            {
              t: "Collect & standardize inputs",
              d: "Load schedule data (flight, route, cabin) + customer segments (status tier, cabin, connection time, O/D).",
            },
            {
              t: "Define eligibility rules",
              d: "Encode BA/oneworld status rules, cabin rules, and partner exceptions into a single rule set.",
            },
            {
              t: "Build reusable lookup",
              d: "Create a table keyed by (Tier, Cabin, Connection, Airport) → Eligible? + Rationale. Join back to schedules to estimate demand.",
            },
            {
              t: "Validate & justify",
              d: "Back-test on historical days. Write short justification notes for assumptions (e.g., minimum dwell time, early-open buffers).",
            },
          ],
          codeLang: "python",
          code: `# --- Task 1: Forecast Lounge Demand & Capacity Planning ---
import pandas as pd

# ---------------------------
# Step 1: Define categories
# ---------------------------
tiers = ["None","Bronze","Silver","Gold","oneworld Sapphire","oneworld Emerald"]
cabins = ["Economy","Premium Economy","Business","First"]
connections = ["OD","Connecting<90m","Connecting>=90m"]

# ---------------------------
# Step 2: Build eligibility lookup table
# ---------------------------
rules = []
for tier in tiers:
    for cabin in cabins:
        for conn in connections:
            eligible = False
            rationale = "Not eligible (base rule)"
            lounge_tier = None  # 1=Concorde, 2=First, 3=Club

            # --- Rule 1: Premium cabins (cabin overrides) ---
            if cabin == "First":
                eligible, rationale, lounge_tier = True, "First Class cabin", 1
            elif cabin == "Business":
                eligible, rationale, lounge_tier = True, "Business Class cabin", 3

            # --- Rule 2: Frequent flyer status (higher tier overrides lower) ---
            if tier in ["Gold","oneworld Emerald"]:
                eligible, rationale, lounge_tier = True, f"Status: {tier}", 2
            elif tier in ["Silver","oneworld Sapphire"]:
                eligible, rationale, lounge_tier = True, f"Status: {tier}", 3

            # --- Rule 3: Dwell time restriction (final gate) ---
            if eligible and "Connecting" in conn and "<90m" in conn:
                eligible, rationale, lounge_tier = False, "Connection <90m → not enough time", None

            rules.append({
                "tier": tier,
                "cabin": cabin,
                "connection": conn,
                "eligible": int(eligible),
                "lounge_tier": lounge_tier,
                "rationale": rationale
            })

lookup = pd.DataFrame(rules)

print("✅ Lounge Eligibility Lookup Table (first 10 rows):")
print(lookup.head(10))

# ---------------------------
# Step 3: Example flight schedule (replace with CSV if needed)
# ---------------------------
schedule = pd.DataFrame({
    "flight": ["BA100","BA150","BA200","BA250","BA300"],
    "tier": ["Gold","Silver","None","oneworld Sapphire","None"],
    "cabin": ["Business","Economy","First","Premium Economy","Economy"],
    "connection": ["OD","Connecting>=90m","Connecting<90m","OD","OD"],
    "passengers": [180, 150, 200, 120, 90]
})

print("\\n📅 Sample Flight Schedule:")
print(schedule)

# ---------------------------
# Step 4: Merge schedule with lookup
# ---------------------------
merged = schedule.merge(
    lookup, on=["tier","cabin","connection"], how="left"
)

# Calculate eligible passengers
merged["eligible_pax"] = merged["passengers"] * merged["eligible"]

print("\\n📊 Flight-Level Lounge Eligibility:")
print(merged[["flight","tier","cabin","connection","passengers",
              "eligible","lounge_tier","rationale","eligible_pax"]])

# ---------------------------
# Step 5: Aggregate demand forecast by Lounge Tier
# ---------------------------
lounge_summary = (
    merged.groupby("lounge_tier", dropna=True)["eligible_pax"]
    .sum()
    .rename("total_eligible_passengers")
    .reset_index()
    .sort_values("lounge_tier")
)

lounge_names = {
    1: "Tier 1 — Concorde Room (hypothetical at T3)",
    2: "Tier 2 — First Lounge",
    3: "Tier 3 — Club Lounge"
}
lounge_summary["lounge_name"] = lounge_summary["lounge_tier"].map(lounge_names)

print("\\n📈 Total Forecasted Lounge Demand:")
print(lounge_summary)

# ---------------------------
# (Optional) If loading from CSV:
# schedule = pd.read_csv("ba_t3_schedule.csv")
# merged = schedule.merge(lookup, on=["tier","cabin","connection"], how="left")
# ... then aggregate as above.
# ---------------------------`,
        },
        {
          title: "Task 2 — Customer Acquisition Model (End-to-End)",
          learn:
            "How data and predictive models help British Airways acquire customers before they travel.",
          do: [
            "Prepare a dataset",
            "Train a machine learning model",
            "Evaluate & present findings",
          ],
          steps: [
            {
              t: "Data preparation",
              d: "Load 'customer_booking.csv' (or fallback to a toy set), handle missing values/outliers, split numeric vs categorical, and encode categoricals with OneHotEncoder.",
            },
            {
              t: "Model training",
              d: "Train a RandomForestClassifier with class_weight='balanced' to handle class imbalance; keep a compact Logistic Regression baseline if needed.",
            },
            {
              t: "Evaluation",
              d: "Hold-out + 5-fold cross-validation with ROC-AUC and PR-AUC; also print Accuracy/F1 for completeness.",
            },
            {
              t: "Interpretation",
              d: "Extract global feature importances from the trained forest; plot a simple bar chart of top drivers.",
            },
            {
              t: "Deliverables",
              d: "Export a CSV of top features and print a concise summary suitable for one-slide reporting.",
            },
          ],
          codeLang: "python",
          code: `# --- Task 2: Customer Acquisition Model (Robust & Interpretable) ---
import pandas as pd
import numpy as np
from pathlib import Path

from sklearn.model_selection import train_test_split, StratifiedKFold, cross_val_score
from sklearn.preprocessing import OneHotEncoder
from sklearn.compose import ColumnTransformer
from sklearn.pipeline import Pipeline
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import roc_auc_score, average_precision_score, accuracy_score, f1_score
from sklearn.impute import SimpleImputer

import matplotlib.pyplot as plt

# ---------------------------
# 1) Load data (with safe fallback)
# ---------------------------
csv_path = Path("customer_booking.csv")
if csv_path.exists():
    df = pd.read_csv(csv_path)
else:
    # Fallback toy data so this script runs anywhere
    df = pd.DataFrame({
        "avg_fare_viewed":[250,180,320,150,400,220,270,190,350,210,280,305],
        "num_searches":[3,1,7,2,10,4,5,2,8,3,6,4],
        "days_to_departure":[21,5,40,12,60,30,18,7,25,9,14,33],
        "country":["UK","UK","US","IN","US","FR","UK","IN","US","FR","UK","US"],
        "device":["mobile","desktop","mobile","mobile","desktop","desktop","mobile","desktop","mobile","desktop","mobile","mobile"],
        "route_bucket":["EU","EU","NA","APAC","NA","EU","EU","APAC","NA","EU","EU","NA"],
        "converted":[1,0,1,0,1,0,1,0,1,0,1,1]
    })

# Heuristic: pick target column
candidate_targets = ["converted","booking_complete","booked","label","target"]
target = next((c for c in candidate_targets if c in df.columns), None)
if target is None:
    # If not present, we assume fallback data with 'converted' exists
    target = "converted"

# Drop obvious non-features if present
drop_cols = [c for c in ["id","customer_id","booking_id"] if c in df.columns]
df = df.drop(columns=drop_cols, errors="ignore").copy()

# Separate features/target
if target not in df.columns:
    raise ValueError(f"Target column '{target}' not found. Available columns: {list(df.columns)}")
y = df[target].astype(int)
X = df.drop(columns=[target])

# ---------------------------
# 2) Identify types and build preprocessing
# ---------------------------
numeric_cols = list(X.select_dtypes(include=[np.number]).columns)
categorical_cols = [c for c in X.columns if c not in numeric_cols]

numeric_pre = Pipeline(steps=[
    ("impute", SimpleImputer(strategy="median"))
])

categorical_pre = Pipeline(steps=[
    ("impute", SimpleImputer(strategy="most_frequent")),
    ("onehot", OneHotEncoder(handle_unknown="ignore"))
])

pre = ColumnTransformer(
    transformers=[
        ("num", numeric_pre, numeric_cols),
        ("cat", categorical_pre, categorical_cols)
    ],
    remainder="drop"
)

# ---------------------------
# 3) Model (RandomForest for interpretability)
# ---------------------------
rf = RandomForestClassifier(
    n_estimators=300,
    max_depth=None,
    min_samples_leaf=2,
    random_state=42,
    class_weight="balanced",
    n_jobs=-1
)

pipe = Pipeline(steps=[
    ("pre", pre),
    ("rf", rf)
])

# ---------------------------
# 4) Train / Evaluate (hold-out + CV)
# ---------------------------
X_train, X_test, y_train, y_test = train_test_split(
    X, y, test_size=0.25, stratify=y, random_state=42
)

pipe.fit(X_train, y_train)
proba = pipe.predict_proba(X_test)[:, 1]
preds = (proba >= 0.5).astype(int)

holdout = {
    "ROC_AUC": roc_auc_score(y_test, proba),
    "PR_AUC": average_precision_score(y_test, proba),
    "Accuracy": accuracy_score(y_test, preds),
    "F1": f1_score(y_test, preds)
}
print("✅ Hold-out performance:")
for k, v in holdout.items():
    print(f"  {k}: {v:.4f}")

# 5-fold CV on full dataset (ROC-AUC)
cv = StratifiedKFold(n_splits=5, shuffle=True, random_state=42)
cv_auc = cross_val_score(pipe, X, y, cv=cv, scoring="roc_auc", n_jobs=-1)
print("\\n🔁 5-fold CV ROC-AUC:", np.round(cv_auc, 4), " | Mean:", cv_auc.mean().round(4))

# ---------------------------
# 5) Feature importance (global)
# ---------------------------
# Fit once on full data for a stable importance snapshot
pipe.fit(X, y)
rf_model = pipe.named_steps["rf"]

# Recover feature names: numeric + onehot-expanded categoricals
ohe = pipe.named_steps["pre"].named_transformers_["cat"].named_steps["onehot"]
cat_names = list(ohe.get_feature_names_out(categorical_cols)) if categorical_cols else []
feature_names = numeric_cols + cat_names

importances = rf_model.feature_importances_
feat_imp = pd.DataFrame({"feature": feature_names, "importance": importances}) \
    .sort_values("importance", ascending=False)

print("\\n🔑 Top 15 Feature Importances:")
print(feat_imp.head(15))

# Persist a CSV deliverable
feat_imp.to_csv("feature_importance_top.csv", index=False)

# ---------------------------
# 6) Simple visualization (top 12 features)
# ---------------------------
top_k = 12
top_feats = feat_imp.head(top_k).sort_values("importance")
plt.figure(figsize=(8, 6))
plt.barh(top_feats["feature"], top_feats["importance"])
plt.title("Top Feature Importances — RandomForest")
plt.xlabel("Importance")
plt.ylabel("Feature")
plt.tight_layout()
plt.savefig("feature_importance_top.png")
print("\\n📁 Saved 'feature_importance_top.csv' and 'feature_importance_top.png'.")

# ---------------------------
# 7) Short, slide-ready summary
# ---------------------------
summary_lines = [
    "Customer Acquisition Model — Summary",
    f"Data size: {len(df):,} rows | Target: {target}",
    f"Hold-out ROC-AUC: {holdout['ROC_AUC']:.3f} | PR-AUC: {holdout['PR_AUC']:.3f}",
    f"CV ROC-AUC (5-fold mean): {cv_auc.mean():.3f}",
    "Top drivers (global importance): " + ", ".join(feat_imp.head(5)["feature"].tolist())
]
print("\\n📝 One-slide summary:")
for line in summary_lines:
    print("-", line)`,
        },
      ],
    },
  },
];

const CodeBlock = ({ code, language = "text" }) => (
  <pre className="mt-3 rounded-xl border border-white/10 bg-[#0b0f1a] p-4 overflow-x-auto text-sm leading-relaxed text-white">
    <div className="mb-2 text-xs uppercase tracking-wider text-gray-400">
      {language}
    </div>
    <code className="text-white whitespace-pre-wrap">{code}</code>
  </pre>
);

const TaskCard = ({ task }) => {
  const [showCode, setShowCode] = useState(true);
  return (
    <div className="border border-white/15 rounded-2xl p-5 bg-white/[0.02]">
      <h4 className="text-lg font-semibold text-white">{task.title}</h4>
      <p className="text-gray-300 text-sm mt-2">
        <span className="font-semibold text-white/90">What you'll learn:</span>{" "}
        {task.learn}
      </p>
      <p className="text-gray-300 text-sm mt-1">
        <span className="font-semibold text-white/90">What you'll do:</span>{" "}
        {task.do.join(" • ")}
      </p>
      <ol className="list-decimal ml-5 mt-4 space-y-2 text-gray-200">
        {task.steps.map((s, i) => (
          <li key={i}>
            <span className="font-medium text-white">{s.t}:</span> {s.d}
          </li>
        ))}
      </ol>
      <button
        onClick={() => setShowCode((v) => !v)}
        className="mt-4 inline-flex items-center rounded-xl border border-white/20 px-3 py-1.5 text-sm text-white hover:bg-white/10"
      >
        {showCode ? "Hide" : "Show"} code
      </button>
      {showCode && <CodeBlock code={task.code} language={task.codeLang} />}
    </div>
  );
};

const DetailsModal = ({ open, onClose, exp }) => {
  const onEsc = useCallback((e) => e.key === "Escape" && onClose(), [onClose]);

  useEffect(() => {
    if (!open) return;
    document.body.classList.add("overflow-hidden");
    window.addEventListener("keydown", onEsc);
    return () => {
      document.body.classList.remove("overflow-hidden");
      window.removeEventListener("keydown", onEsc);
    };
  }, [open, onEsc]);

  if (!open || !exp) return null;

  return (
    <div className="fixed inset-0 z-[9999]">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      {/* Scroll container */}
      <div className="relative z-[10000] flex min-h-full items-start justify-center p-4 overflow-y-auto mt-20">
        {/* Modal panel */}
        <div
          role="dialog"
          aria-modal="true"
          className="relative w-full max-w-4xl rounded-3xl border border-white/20 bg-[#0e1220] shadow-[0_0_30px_rgba(130,69,236,.35)] max-h-[90vh] overflow-y-auto"
        >
          {/* Sticky header */}
          <div className="sticky top-0 z-[1] flex items-start gap-4 border-b border-white/10 bg-[#0e1220] p-6">
            <div className="bg-gray-400 border-4 border-[#8245ec] w-14 h-14 rounded-full overflow-hidden shrink-0">
              <img
                src={exp.img}
                alt={exp.company}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-white">{exp.role}</h3>
              <p className="text-gray-300">{exp.company}</p>
              <p className="text-sm text-gray-500">{exp.date}</p>
            </div>
            <button
              onClick={onClose}
              className="rounded-full border border-white/20 px-3 py-1.5 text-white hover:bg-white/10"
              aria-label="Close details"
            >
              Close
            </button>
          </div>

          <div className="p-6 pb-32">
            <p className="text-gray-300">{exp.desc}</p>
            <div className="mt-6 grid gap-5 md:grid-cols-2">
              {exp.details?.tasks?.map((task, i) => (
                <TaskCard key={i} task={task} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Experience = () => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  const openDetails = (exp) => {
    setSelected(exp);
    setOpen(true);
  };

  return (
    <>
      <section
        id="experience"
        className="py-24 pb-24 px-[12vw] md:px-[7vw] lg:px-[16vw] font-sans bg-skills-gradient clip-path-custom-2"
      >
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white">EXPERIENCE</h2>
          <div className="w-32 h-1 bg-purple-500 mx-auto mt-4" />
          <p className="text-gray-400 mt-4 text-lg font-semibold">
            A collection of my professional experience and the roles I have taken
          </p>
        </div>

        {experiences.map((experience) => (
          <div
            key={experience.id}
            className="w-full sm:max-w-md mx-auto p-4 sm:p-8 rounded-2xl shadow-2xl border border-white/10 bg-gray-900 backdrop-blur-md shadow-[0_0_20px_1px_rgba(130,69,236,0.3)] transition-transform duration-300 hover:scale-105"
          >
            <div className="flex items-center gap-6">
              <div className="bg-gray-400 border-4 border-[#8245ec] w-16 h-16 rounded-full overflow-hidden shrink-0">
                <img
                  src={experience.img}
                  alt={experience.company}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col">
                <h3 className="text-xl sm:text-2xl font-semibold text-white">
                  {experience.role}
                </h3>
                <h4 className="text-md sm:text-sm text-gray-300">
                  {experience.company}
                </h4>
                <p className="text-sm text-gray-500 mt-1">{experience.date}</p>
              </div>
            </div>

            <p className="mt-4 text-gray-400">{experience.desc}</p>

            <div className="mt-4">
              <h5 className="font-medium text-white">Skills:</h5>
              <ul className="flex flex-wrap mt-2">
                {experience.skills.map((skill, idx) => (
                  <li
                    key={idx}
                    className="bg-[#8245ec] text-gray-100 px-4 py-1 text-xs sm:text-sm rounded-lg mr-2 mb-2 border border-gray-400"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </div>

            {/* Action buttons */}
            <div className="mt-6 flex gap-3">
              <button
                onClick={() => openDetails(experience)}
                className="rounded-xl bg-[#8245ec] px-4 py-2 text-white font-medium hover:bg-[#6f34e3]"
              >
                Read More
              </button>

              <a
                href="https://drive.google.com/file/d/1T9610qfpsTCp_kjCv6NUxr6PINY_gNJ1/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-xl bg-green-600 px-4 py-2 text-white font-medium hover:bg-green-500"
              >
                Certificate
              </a>
            </div>
          </div>
        ))}
      </section>

      {/* 🔥 Modal outside section → always above all */}
      <DetailsModal open={open} onClose={() => setOpen(false)} exp={selected} />
    </>
  );
};

export default Experience;
