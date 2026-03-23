import Link from "next/link";

export default function Home() {
  const features = [
    {
      id: "sap-playbook",
      icon: "📖",
      label: "SAP Playbook",
      description: "Searchable wiki for SAP case solutions and procedures",
      href: "/app/sap"
    },
    {
      id: "project",
      icon: "📊",
      label: "Project Manager",
      description: "Manage and track projects (coming soon)",
      href: "/app/project",
      disabled: true
    },
    {
      id: "finance",
      icon: "💰",
      label: "Finance Tools",
      description: "Financial tracking and analysis (coming soon)",
      href: "/app/finance",
      disabled: true
    }
  ];

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      padding: "2rem",
      fontFamily: "system-ui, -apple-system, sans-serif"
    }}>
      {/* Header */}
      <div style={{
        textAlign: "center",
        marginBottom: "3rem",
        color: "#fff"
      }}>
        <h1 style={{ fontSize: "3.5rem", marginBottom: "0.5rem", fontWeight: "bold" }}>
          🧰 Toolbox
        </h1>
        <p style={{ fontSize: "1.2rem", opacity: 0.9, marginBottom: "0.5rem" }}>
          Your All-in-One Application Suite
        </p>
        <p style={{ fontSize: "0.95rem", opacity: 0.8 }}>
          Single platform, multiple powerful features
        </p>
      </div>

      {/* Features Grid */}
      <div style={{
        maxWidth: "1200px",
        margin: "0 auto",
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
        gap: "2rem",
        marginBottom: "2rem"
      }}>
        {features.map((feature) => (
          <Link
            key={feature.id}
            href={feature.disabled ? "#" : feature.href}
            style={{
              textDecoration: "none",
              cursor: feature.disabled ? "not-allowed" : "pointer"
            }}
            onClick={(e) => {
              if (feature.disabled) {
                e.preventDefault();
              }
            }}
          >
            <div style={{
              background: "#fff",
              borderRadius: "1rem",
              padding: "2rem",
              boxShadow: "0 8px 16px rgba(0, 0, 0, 0.1)",
              transition: "all 0.3s ease",
              opacity: feature.disabled ? 0.6 : 1,
              transform: feature.disabled ? "none" : "translateY(0)",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between"
            } as React.CSSProperties}
            onMouseEnter={(e) => {
              if (!feature.disabled) {
                (e.currentTarget as HTMLElement).style.transform = "translateY(-8px)";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 12px 24px rgba(0, 0, 0, 0.15)";
              }
            }}
            onMouseLeave={(e) => {
              if (!feature.disabled) {
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 16px rgba(0, 0, 0, 0.1)";
              }
            }}
            >
              <div>
                <div style={{
                  fontSize: "3.5rem",
                  marginBottom: "1rem"
                }}>
                  {feature.icon}
                </div>
                <h2 style={{
                  fontSize: "1.5rem",
                  fontWeight: "600",
                  color: "#333",
                  margin: "0 0 0.5rem 0"
                }}>
                  {feature.label}
                </h2>
                <p style={{
                  fontSize: "0.95rem",
                  color: "#666",
                  margin: 0,
                  lineHeight: "1.5"
                }}>
                  {feature.description}
                </p>
              </div>
              
              <div style={{
                marginTop: "1.5rem",
                paddingTop: "1rem",
                borderTop: "1px solid #eee"
              }}>
                <span style={{
                  display: "inline-block",
                  padding: "0.5rem 1rem",
                  background: feature.disabled ? "#f0f0f0" : "#667eea",
                  color: feature.disabled ? "#999" : "#fff",
                  borderRadius: "0.5rem",
                  fontSize: "0.9rem",
                  fontWeight: "600",
                  textDecoration: "none"
                }}>
                  {feature.disabled ? "Coming Soon" : "Open →"}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Footer */}
      <div style={{
        textAlign: "center",
        color: "#fff",
        opacity: 0.8,
        fontSize: "0.9rem"
      }}>
        <p>Built with Next.js, React, TypeScript &amp; Workspaces</p>
      </div>
    </div>
  );
}
