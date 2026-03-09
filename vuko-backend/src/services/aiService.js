const getCareerAdvice = async (userData) => {
    try {
        const apiKey = process.env.GOOGLE_API_KEY;
        const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: `Eres mentor de marketing. Aconseja a ${userData.name} con ${userData.experience} años de experiencia.` }] }]
            })
        });

        const data = await response.json();
        if (data.error) throw new Error(data.error.message);

        return data.candidates[0].content.parts[0].text;

    } catch (error) {
        // Log informativo 
        console.log("ℹ️ VUKO.AI: Usando lógica de consejo local (Servicio externo no disponible).");
        
        // Fallback inteligente: El usuario recibe algo útil 
        if (userData.experience >= 5) {
            return "Estrategia Senior: Enfócate en el liderazgo de equipos y optimización de presupuestos con Growth Hacking.";
        } else {
            return "Estrategia de Crecimiento: Potencia tu perfil técnico en Data Analytics y automatización de procesos.";
        }
    }
};

module.exports = { getCareerAdvice };