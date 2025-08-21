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
    const sendWhatsappBtn = document.getElementById('send-whatsapp-btn');

    // 2. Base de datos de flores y mensajes
    let emotions = []; // Almacenará los datos de las flores y entradas del diario
    let nextFlowerId = 0; // Para dar un ID único a cada flor

    const upliftingMessages = [
        "Estoy aquí contigo. Siempre.",
        "Recuerda que eres increíble, incluso en los días difíciles.",
        "Esto también pasará. Juntos lo superaremos.",
        "Eres mi sol, incluso en la oscuridad.",
        "Un día a la vez. Siempre estoy a tu lado.",
        "Mi lugar favorito en el mundo es a tu lado.",
        "Eres mi persona favorita en el universo.",
        "Contigo, todo es mejor.",
        "Gracias por ser tú.",
        "No sabía lo que era el amor hasta que te conocí.",
        "No hay día que no me despierte agradecido por tenerte en mi vida.",
        "Tu sonrisa es mi motivación y tu mirada mi mayor calma.",
        "Encontré en ti un hogar para mi corazón.",
        "Eres la melodía que le hacía falta a mi vida.",
        "Cada momento a tu lado se convierte en un recuerdo inolvidable.",
        "Te amo no solo por lo que eres, sino por lo que soy cuando estoy contigo.",
        "Si tuviera que elegir de nuevo, te elegiría a ti una y mil veces.",
        "Eres el sol que ilumina mis días y la luna que calma mis noches.",
        "Amarte es un privilegio y cuidarte mi mayor bendición.",
        "Mi vida era una historia incompleta hasta que llegaste tú.",
        "Eres la prueba de que los sueños se hacen realidad.",
        "Me das la fuerza para ser la mejor versión de mi mismo.",
        "Juntos, no hay obstaculo que no podamos superar.",
        "Cada día a tu lado me inspira a ser mejor.",
        "Contigo, el futuro no me asusta, me emociona.",
        "Eres el único futuro que quiero.",
        "Mi plan para el futuro no tiene sentido si no te incluye a ti."
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
    
    // Función para generar y enviar el resumen por WhatsApp
    const sendWhatsappSummary = () => {
        // 1. Crear el encabezado del mensaje
        let summaryText = "💌 Resumen de nuestro Jardín de Emociones 🌸\n\n";

        // 2. Filtrar solo las flores que tienen una entrada de diario
        const diaryEmotions = emotions.filter(e => e.diaryEntry);

        // 3. Si no hay entradas, muestra un mensaje de advertencia
        if (diaryEmotions.length === 0) {
            alert("Aún no hay entradas en el diario para enviar.");
            return;
        }

        // 4. Recorrer las entradas del diario y construir el texto
        diaryEmotions.forEach(emotion => {
            const date = new Date(emotion.timestamp);
            const formattedDate = date.toLocaleDateString('es-ES', {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
            });

            // Agrega la entrada al resumen
            summaryText += `*Flor de ${emotion.type}* el ${formattedDate}\n`;
            summaryText += `"${emotion.diaryEntry}"\n\n`;
        });

        // 5. Codificar el texto para que sea seguro en un enlace URL
        const encodedText = encodeURIComponent(summaryText);

        // 6. Construir el enlace de WhatsApp
        const whatsappUrl = `https://web.whatsapp.com/send?text=${encodedText}`;

        // 7. Abrir el enlace en una nueva pestaña
        window.open(whatsappUrl, '_blank');
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
    
    sendWhatsappBtn.addEventListener('click', sendWhatsappSummary);

    // 7. Carga inicial del jardín
    loadEmotions();
});
