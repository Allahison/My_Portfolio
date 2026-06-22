import type { Metadata } from "next";
import { Inter, Fira_Code } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], display: "swap" });
const firaCode = Fira_Code({ subsets: ["latin"], weight: ["400", "500"], display: "swap", variable: "--font-fira" });

export const metadata: Metadata = {
  title: "Muhammad Arslan — Software Engineer",
  description: "Android & Full-Stack Developer from Punjab, Pakistan. Building native Android apps with Kotlin & Java and modern web apps with React & Node.js for US & UK clients.",
  openGraph: {
    title: "Muhammad Arslan — Software Engineer",
    description: "Android & Full-Stack Developer building native apps and web solutions for global clients.",
    type: "website",
    images: [{ url: "/profile.jpg", width: 1200, height: 630, alt: "Muhammad Arslan — Software Engineer" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Muhammad Arslan — Software Engineer",
    description: "Android & Full-Stack Developer building native apps and web solutions for global clients.",
    images: ["/profile.jpg"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" data-theme="light" suppressHydrationWarning>
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css" />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t)document.documentElement.setAttribute('data-theme',t);}catch(e){}})()`,
          }}
        />
      </head>
      <body className={`${inter.className} ${firaCode.variable}`}>{children}</body>
    </html>
  );
}
