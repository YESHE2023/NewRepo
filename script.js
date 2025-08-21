document.addEventListener('DOMContentLoaded', () => {
    // 1. Selección de elementos HTML
    const garden = document.getElementById('emotion-garden');
    const plantSadBtn = document.getElementById('plant-sad');
    const plantCalmBtn = document.getElementById('plant-calm');
    const plantHappyBtn = document.getElementById('plant-happy');
    const getMessageBtn = document.getElementById('get-message-btn');
    const randomMessageDisplay = document.getElementById('random-message');
    const saveEntryBtn = document.getElementById('save-entry-btn');
    const diaryEntriesContainer = document.getElementById('diary-entries');
    const diaryTextarea = document.getElementById('diary-text');
    const flowerSelect = document.getElementById('flower-id');

    // 2. Base de datos de flores y mensajes
    let emotions = []; // Almacenará los datos de las flores y entradas del diario
    let nextFlowerId = 0; // Para dar un ID único a cada flor

    const upliftingMessages = [
        "Estoy aquí contigo. Siempre.",
        "Recuerda que eres increíble, incluso en los días difíciles.",
        "Esto también pasará. Juntos lo superaremos.",
        "Eres mi sol, incluso en la oscuridad.",
        "Un día a la vez. Siempre estoy a tu lado."
    ];

    // 3. Funciones de guardar y cargar datos (usando localStorage)
    const loadEmotions = () => {
        const savedData = localStorage.getItem('emotionGardenData');
        if (savedData) {
            emotions = JSON.parse(savedData);
            if (emotions.length > 0) {
                nextFlowerId = emotions[emotions.length - 1].id + 1;
            }
            renderGarden();
            renderDiaryEntries();
        }
    };

    const saveEmotions = () => {
        localStorage.setItem('emotionGardenData', JSON.stringify(emotions));
    };

    // 4. Funciones de renderizado
    const renderGarden = () => {
        garden.innerHTML = ''; // Limpia el jardín antes de redibujarlo
        emotions.forEach(emotion => {
            const flower = document.createElement('div');
            flower.classList.add('flower', emotion.type);
            flower.dataset.id = emotion.id;
            garden.appendChild(flower);
        });
        renderFlowerSelect();
    };

    const renderDiaryEntries = () => {
        diaryEntriesContainer.innerHTML = '';
        emotions.filter(e => e.diaryEntry).forEach(emotion => {
            const entryDiv = document.createElement('div');
            entryDiv.classList.add('diary-entry', emotion.type);
            
            const date = new Date(emotion.timestamp);
            const formattedDate = date.toLocaleDateString('es-ES', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
            });

            entryDiv.innerHTML = `
                <h4>Flor de ${emotion.type} (${formattedDate})</h4>
                <p>${emotion.diaryEntry}</p>
            `;
            diaryEntriesContainer.appendChild(entryDiv);
        });
    };
    
    const renderFlowerSelect = () => {
        flowerSelect.innerHTML = '<option value="">Selecciona una flor...</option>';
        emotions.forEach(emotion => {
            const option = document.createElement('option');
            option.value = emotion.id;
            option.textContent = `Flor de ${emotion.type} #${emotion.id}`;
            flowerSelect.appendChild(option);
        });
    };

    // 5. Lógica principal del jardín
    const plantFlower = (type) => {
        const newEmotion = {
            id: nextFlowerId++,
            type: type,
            diaryEntry: null,
            timestamp: Date.now()
        };
        emotions.push(newEmotion);
        saveEmotions();
        renderGarden();
    };
    
    // 6. Asignación de eventos
    plantSadBtn.addEventListener('click', () => plantFlower('sad'));
    plantCalmBtn.addEventListener('click', () => plantFlower('calm'));
    plantHappyBtn.addEventListener('click', () => plantFlower('happy'));

    getMessageBtn.addEventListener('click', () => {
        const randomIndex = Math.floor(Math.random() * upliftingMessages.length);
        randomMessageDisplay.textContent = upliftingMessages[randomIndex];
    });

    saveEntryBtn.addEventListener('click', () => {
        const selectedId = parseInt(flowerSelect.value);
        const diaryEntryText = diaryTextarea.value.trim();

        if (selectedId && diaryEntryText) {
            const emotion = emotions.find(e => e.id === selectedId);
            if (emotion) {
                emotion.diaryEntry = diaryEntryText;
                saveEmotions();
                renderDiaryEntries();
                diaryTextarea.value = ''; // Limpia el textarea
            }
        }
    });

    // 7. Carga inicial del jardín
    loadEmotions();
});
