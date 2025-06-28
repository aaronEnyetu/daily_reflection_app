  // Store reflections in memory
    let reflections = [];

    function saveReflection() {
      const mood = document.getElementById('moodSelector').value;
      const moodText = document.getElementById('moodSelector').options[document.getElementById('moodSelector').selectedIndex].text;
      const reflection = document.getElementById('reflectionInput').value;
      if (!mood || !reflection.trim()) {
        alert('Please select a mood and write your reflection.');
        return;
      }
      const now = new Date();
      const dateTimeString = now.toLocaleString();
      const dateString = now.toISOString().split('T')[0];
      const entry = {
        id: Date.now(),
        dateTime: dateTimeString,
        date: dateString,
        mood: moodText,
        reflection: reflection
      };
      reflections.unshift(entry);
      renderReflections();
      document.getElementById('reflectionInput').value = '';
      document.getElementById('moodSelector').value = '';
    }

    function renderReflections(filtered = null) {
      const reflectionList = document.getElementById('reflectionList');
      reflectionList.innerHTML = '';
      const items = filtered !== null ? filtered : reflections;
      items.forEach(entry => {
        const div = document.createElement('div');
        div.className = 'reflection-entry';
        div.innerHTML = `
          <strong>Date:</strong> ${entry.dateTime}<br>
          <strong>Mood:</strong> ${entry.mood}<br>
          <strong>Reflection:</strong> <span id="reflection-text-${entry.id}">${entry.reflection}</span>
          <br>
          <button onclick="editReflection(${entry.id})">Edit</button>
          <button onclick="deleteReflection(${entry.id})">Delete</button>
        `;
        reflectionList.appendChild(div);
      });
    }

    function filterReflections() {
      const filterDate = document.getElementById('filterDate').value;
      if (!filterDate) {
        renderReflections();
        return;
      }
      const filtered = reflections.filter(r => r.date === filterDate);
      renderReflections(filtered);
    }

    function clearFilter() {
      document.getElementById('filterDate').value = '';
      renderReflections();
    }

    function deleteReflection(id) {
      reflections = reflections.filter(r => r.id !== id);
      renderReflections();
    }

    function editReflection(id) {
      const entry = reflections.find(r => r.id === id);
      if (!entry) return;
      const newReflection = prompt('Edit your reflection:', entry.reflection);
      if (newReflection !== null && newReflection.trim() !== '') {
        entry.reflection = newReflection;
        renderReflections();
      }
    }