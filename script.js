function saveReflection() {
  const input = document.getElementById('reflectionInput').value.trim();
  if (input === '') return;

  const reflections = JSON.parse(localStorage.getItem('reflections')) || [];

  const newReflection = {
    text: input,
    timestamp: new Date().toLocaleString()
  };

  reflections.unshift(newReflection);
  localStorage.setItem('reflections', JSON.stringify(reflections));

  document.getElementById('reflectionInput').value = '';
  displayReflections();
}

function displayReflections() {
  const reflections = JSON.parse(localStorage.getItem('reflections')) || [];
  const list = document.getElementById('reflectionList');
  list.innerHTML = '';

  reflections.forEach(reflection => {
    const div = document.createElement('div');
    div.className = 'reflection-item';
    div.innerHTML = `<strong>${reflection.timestamp}</strong><p>${reflection.text}</p>`;
    list.appendChild(div);
  });
}

 
window.onload = displayReflections;
