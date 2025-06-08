        // Lógica do Menu Mobile
        const menuToggle = document.querySelector('.menu-toggle');
        const navMenu = document.querySelector('.nav-menu');
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });

        // Lógica do Chatbot
        const chatbotIcon = document.getElementById('chatbot-icon');
        const chatWindow = document.getElementById('chat-window');
        const chatClose = document.getElementById('chat-close');
        const chatBody = document.getElementById('chat-body');
        const chatOptions = document.getElementById('chat-options');

        chatbotIcon.addEventListener('click', () => {
            chatWindow.classList.toggle('active');
        });

        chatClose.addEventListener('click', () => {
            chatWindow.classList.remove('active');
        });
        
        chatOptions.addEventListener('click', (e) => {
            if (e.target.classList.contains('chat-option-btn') && !e.target.disabled) {
                const choice = e.target.innerText;
                const userMessage = document.createElement('div');
                userMessage.classList.add('chat-message', 'user');
                userMessage.innerHTML = `<p>${choice}</p>`;
                chatBody.appendChild(userMessage);
                document.querySelectorAll('.chat-option-btn').forEach(btn => btn.disabled = true);
                
                const botResponse = `Entendido! Para continuarmos com a sua solicitação de "${choice.toLowerCase()}", por favor, clique no link abaixo para falar conosco diretamente no WhatsApp.`;
                const whatsappNumber = "552227781113"; 
                const whatsappMessage = encodeURIComponent(`Olá! Gostaria de prosseguir com a opção: ${choice}`);
                const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

                setTimeout(() => {
                    const botMessage = document.createElement('div');
                    botMessage.classList.add('chat-message', 'bot');
                    botMessage.innerHTML = `<p>${botResponse}</p><a href="${whatsappUrl}" target="_blank" class="btn-whatsapp-chat">Abrir WhatsApp</a>`;
                    chatBody.appendChild(botMessage);
                    chatBody.scrollTop = chatBody.scrollHeight;
                }, 500);
            }
        });

        // --- LÓGICA DAS FEATURES GEMINI ---

        const apiKey = "AIzaSyAzhXIpf500NeZdfl44Qjh5k7epNaa8WS8"; // Deixe em branco, será gerenciado pelo ambiente
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

        function showResult(element, text) {
            element.innerHTML = text;
            element.classList.remove('loading');
        }

        function showLoading(element) {
            element.innerHTML = '<div class="loader"></div>';
            element.classList.add('loading');
        }

        async function callGemini(prompt, resultElement, errorMessage) {
            showLoading(resultElement);
            try {
                const payload = { contents: [{ parts: [{ text: prompt }] }] };
                const response = await fetch(apiUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });

                if (!response.ok) {
                    const errorData = await response.json();
                    console.error("Erro da API Gemini:", errorData);
                    throw new Error(`API Error: ${response.statusText}`);
                }

                const result = await response.json();

                if (result.candidates && result.candidates.length > 0 && result.candidates[0].content && result.candidates[0].content.parts && result.candidates[0].content.parts.length > 0) {
                    const text = result.candidates[0].content.parts[0].text.replace(/\n/g, '<br>');
                    showResult(resultElement, text);
                } else {
                     console.error("Resposta inesperada da API:", result);
                    if (result.promptFeedback && result.promptFeedback.blockReason) {
                        throw new Error(`Conteúdo bloqueado: ${result.promptFeedback.blockReason}`);
                    }
                    throw new Error("Formato de resposta inesperado da API.");
                }
            } catch (error) {
                console.error("Erro ao chamar a API Gemini:", error);
                showResult(resultElement, errorMessage);
            }
        }

        // 1. Recomendador de Planos
        const recommenderModal = document.getElementById('recommender-modal');
        const openRecommenderBtn = document.getElementById('open-recommender-btn');
        const closeRecommenderBtn = document.getElementById('close-recommender-modal');
        const recommenderForm = document.getElementById('recommender-form');

        openRecommenderBtn.addEventListener('click', () => recommenderModal.style.display = 'flex');
        closeRecommenderBtn.addEventListener('click', () => recommenderModal.style.display = 'none');
        window.addEventListener('click', (e) => {
            if (e.target == recommenderModal) recommenderModal.style.display = 'none';
        });

        recommenderForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const people = document.getElementById('people').value;
            const devices = document.getElementById('devices').value;
            const usage = document.getElementById('usage').value;
            const recommenderResult = document.getElementById('recommender-result');

            const prompt = `Aja como um especialista em vendas da entornet fibra. Nossa empresa atende APENAS em Casimiro de Abreu, Professor Souza e Visconde. Nossos planos são: 50 Mega (R$79,90), 100 Mega (R$89,90), 300 Mega (R$99,90) e 500 Mega (R$139,90). Todos incluem roteador AC Giga. Baseado nos dados do cliente, recomende o melhor plano, explique o porquê de forma curta e amigável.
            - Pessoas na casa: ${people}
            - Dispositivos: ${devices}
            - Uso principal: ${usage}
            Formate a resposta de forma clara e use no máximo 60 palavras.`;

            const errorMessage = "Desculpe, não foi possível fazer a recomendação. Tente novamente.";
            callGemini(prompt, recommenderResult, errorMessage);
        });

        // 2. Verificador de Cobertura 
        const coverageForm = document.getElementById('coverage-form-gemini');
        coverageForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const location = document.getElementById('cep-input').value.toLowerCase();
            if (!location) return;
            const coverageResult = document.getElementById('coverage-result');

            const prompt = `Aja como um atendente da entornet fibra. Nossa área de cobertura atual é somente em "casimiro de abreu", "professor souza" e "visconde". Também temos planos de expandir para "rio dourado" em breve. O cliente perguntou sobre a localidade: "${location}".
            - Se a localidade mencionada for uma das três que atendemos, confirme a cobertura com entusiasmo.
            - Se a localidade for "rio dourado", informe que chegaremos em breve com novidades.
            - Se for qualquer outro lugar, informe educadamente que ainda não atendemos a região, mas que estamos expandindo.
            Seja breve e amigável.`;
            
            const errorMessage = "Não conseguimos verificar sua localidade. Por favor, tente novamente.";
            callGemini(prompt, coverageResult, errorMessage);
        });

        // 3. Técnico Virtual
        const diagnosticsForm = document.getElementById('diagnostics-form');
        diagnosticsForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const problem = document.getElementById('problem-description').value;
            if (!problem) return;
            const diagnosticsResult = document.getElementById('diagnostics-result');
            const prompt = `Aja como um técnico de suporte de internet da empresa entornet fibra. Um cliente descreveu o seguinte problema: "${problem}". Forneça de 2 a 3 passos simples e práticos que ele pode tentar para resolver o problema antes de ligar para o suporte técnico. Use uma linguagem clara, amigável e em formato de lista numerada.`;
            const errorMessage = "Não foi possível realizar o diagnóstico. Por favor, contate nosso suporte via WhatsApp.";
            callGemini(prompt, diagnosticsResult, errorMessage);
        });
