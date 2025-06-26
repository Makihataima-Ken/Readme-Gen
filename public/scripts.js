document.getElementById('readmeForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const formData = {
    name: document.getElementById('name').value,
    description: document.getElementById('description').value,
    installation: document.getElementById('installation').value || 'npm install',
    usage: document.getElementById('usage').value,
    license: document.getElementById('license').value || 'MIT',
    githubUsername: document.getElementById('githubUsername').value,
    email: document.getElementById('email').value
  };

  try {
    const response = await fetch('/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });

    if (!response.ok) throw new Error('Failed to generate README');
    
    const result = await response.json();
    document.getElementById('readmeContent').textContent = result.content;
    document.getElementById('result').classList.remove('hidden');
    
    // Set up download button
    document.getElementById('downloadBtn').onclick = () => {
      downloadFile('README.md', result.content);
    };
  } catch (error) {
    alert('Error: ' + error.message);
  }
});

function downloadFile(filename, content) {
  const blob = new Blob([content], { type: 'text/markdown' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}