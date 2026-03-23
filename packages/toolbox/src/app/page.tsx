import Link from "next/link";

export default function Home() {
  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      minHeight: "100vh",
      padding: "2rem",
      textAlign: "center",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      color: "#fff",
      fontFamily: "system-ui, -apple-system, sans-serif"
    }}>
      <div style={{ maxWidth: "600px" }}>
        <h1 style={{ fontSize: "3rem", marginBottom: "1rem", fontWeight: "bold" }}>
          🧰 Toolbox
        </h1>
        <p style={{ fontSize: "1.25rem", marginBottom: "2rem", opacity: 0.95 }}>
          Single application platform with plugin architecture
        </p>
        
        <div style={{ 
          display: "flex", 
          gap: "1rem", 
          justifyContent: "center",
          flexWrap: "wrap",
          marginBottom: "2rem"
        }}>
          <Link
            href="/app"
            style={{
              display: "inline-block",
              padding: "0.75rem 1.5rem",
              backgroundColor: "#fff",
              color: "#667eea",
              textDecoration: "none",
              borderRadius: "0.5rem",
              fontWeight: "bold",
              fontSize: "1rem",
              cursor: "pointer",
              transition: "transform 0.2s"
            }}
          >
            ➜ Go to App Router
          </Link>
        </div>

        <p style={{ fontSize: "0.9rem", opacity: 0.85", marginTop: "3rem" }}>
          Multiple features unified under a single application<br/>
          Built with Next.js, React, TypeScript &amp; Workspaces
        </p>
      </div>
    </div>
  );
}
