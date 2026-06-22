"use client";

const ITEMS = [
  ["devicon-kotlin-plain colored",        "Kotlin"],
  ["devicon-java-plain colored",          "Java"],
  ["devicon-android-plain colored",       "Android"],
  ["devicon-react-original colored",      "React"],
  ["devicon-react-original colored",      "React Native"],
  ["devicon-nextjs-plain",                "Next.js"],
  ["devicon-nodejs-plain colored",        "Node.js"],
  ["devicon-typescript-plain colored",    "TypeScript"],
  ["devicon-javascript-plain colored",    "JavaScript"],
  ["devicon-python-plain colored",        "Python"],
  ["devicon-mongodb-plain colored",       "MongoDB"],
  ["devicon-postgresql-plain colored",    "PostgreSQL"],
  ["devicon-tailwindcss-plain colored",   "Tailwind CSS"],
  ["devicon-git-plain colored",           "Git"],
];

export default function Marquee() {
  const doubled = [...ITEMS, ...ITEMS];
  return (
    <div className="marquee-wrap">
      <div className="marquee-track">
        {doubled.map(([cls, label], i) => (
          <div className="m-item" key={i}>
            <i className={cls} />{label}
          </div>
        ))}
      </div>
    </div>
  );
}
