"use client";

export default function SpoonKnifeRoot() {
  return (
    <div className="min-h-screen bg-white">
      <style>{`
        * {
          margin: 0;
          padding: 0;
        }
        
        .octocat-container {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 40px 20px;
        }
        
        .octocat-image {
          display: block;
          width: 384px;
          height: auto;
          margin: 50px auto;
          background-color: #f0f0f0;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #888;
          font-size: 14px;
        }
        
        .fork-message {
          display: block;
          width: 400px;
          margin: 50px auto;
          font: 30px Monaco, "Courier New", "DejaVu Sans Mono", "Bitstream Vera Sans Mono", monospace;
          text-align: center;
          color: #333;
          line-height: 1.4;
        }
      `}</style>
      
      <div className="octocat-container">
        <div className="octocat-image">
          🐱 Octocat Fork Guide
        </div>
        
        <p className="fork-message">
          Fork me? Fork you, @octocat!
        </p>
        
        <section style={{
          maxWidth: '600px',
          margin: '60px auto',
          padding: '20px',
          backgroundColor: '#f9f9f9',
          borderRadius: '8px',
          lineHeight: '1.6',
          color: '#555'
        }}>
          <h2 style={{ marginBottom: '15px', color: '#333' }}>Welcome to Spoon-Knife</h2>
          <p style={{ marginBottom: '10px' }}>
            This repository is for <strong>learning how to fork</strong> a repository on GitHub.
          </p>
          <p style={{ marginBottom: '10px' }}>
            Forking is when you create your own copy of someone else's project. This is the first step to contributing to open source!
          </p>
          <p>
            To fork this repository, click the <strong>Fork</strong> button in the top-right corner of this page.
          </p>
        </section>
      </div>
    </div>
  );
}
