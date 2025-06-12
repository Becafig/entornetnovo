        document.addEventListener('DOMContentLoaded', function() {

            // Lógica do Formulário de Contratação
            const signupForm = document.getElementById('signup-form');
            if (signupForm) {
                const submitLink = document.getElementById('submit-signup-link');
                const formInputs = signupForm.querySelectorAll('input, select');

                const updateMailtoLink = () => {
                    if (signupForm.checkValidity()) {
                        submitLink.classList.remove('is-disabled');
                        const name = document.getElementById('signup-name').value;
                        const cpf = document.getElementById('signup-cpf').value;
                        const address = document.getElementById('signup-address').value;
                        const phone = document.getElementById('signup-phone').value;
                        const plan = document.getElementById('signup-plan').value;
                        const emailTo = 'atendimento@entornet.com.br';
                        const emailSubject = `Solicitação de Contratação - ${name}`;
                        const emailBody = `
Olá, gostaria de solicitar a contratação do seguinte plano:
-----------------------------------------
DADOS DO CLIENTE
-----------------------------------------
Nome Completo: ${name}
CPF: ${cpf}
Endereço de Instalação: ${address}
Telefone de Contato (WhatsApp): ${phone}
Plano Escolhido: ${plan}
-----------------------------------------
Por favor, entrem em contato para finalizar o processo.
Obrigado,
${name}`;
                        submitLink.href = `mailto:${emailTo}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
                    } else {
                        submitLink.classList.add('is-disabled');
                        submitLink.href = '#';
                    }
                };
                
                formInputs.forEach(input => input.addEventListener('input', updateMailtoLink));
                updateMailtoLink();
            }

            // Lógica do Menu Mobile
            const menuToggle = document.querySelector('.menu-toggle');
            const navMenu = document.querySelector('.nav-menu');
            if(menuToggle) {
                menuToggle.addEventListener('click', () => navMenu.classList.toggle('active'));
            }

            // Lógica do Chatbot
            const chatbotIcon = document.getElementById('chatbot-icon');
            const chatWindow = document.getElementById('chat-window');
            const chatClose = document.getElementById('chat-close');
            const chatBody = document.getElementById('chat-body');
            const chatOptions = document.getElementById('chat-options');
            if (chatbotIcon) {
                chatbotIcon.addEventListener('click', () => chatWindow.classList.toggle('active'));
            }
            if(chatClose) {
                chatClose.addEventListener('click', () => chatWindow.classList.remove('active'));
            }
            if (chatOptions) {
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
            }

            // --- LÓGICA DE TROCA DE PLANOS E TEMA ---
            const planTabs = document.querySelector('.plan-tabs');
            const planGrids = document.querySelectorAll('.plans-grid');
            const heroImage = document.getElementById('hero-image-dynamic');
            const heroTitle = document.getElementById('hero-title');
            const heroSubtitle = document.getElementById('hero-subtitle');
            
            const themeData = {
                residential: {
                    className: 'theme-residential',
                    image: 'https://images.pexels.com/photos/4144923/pexels-photo-4144923.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
                    title: 'Há 18 anos MELHOR internet fibra da nossa cidade',
                    subtitle: 'Navegue com velocidade e estabilidade de verdade. Conexão ideal para streaming, jogos online e home office — com qualidade comprovada e liderança incontestável.'
                },
                gamer: {
                    className: 'theme-gamer',
                    image: 'https://images.pexels.com/photos/7915228/pexels-photo-7915228.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
                    title: 'A Conexão Definitiva para sua Vitória',
                    subtitle: 'Ping otimizado, baixa latência e ultravelocidade para você dominar qualquer partida. Sem lag, sem desculpas.'
                },
                empresarial: {
                    className: 'theme-empresarial',
                    image: 'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
                    title: 'A Performance que sua Empresa Precisa',
                    subtitle: 'Conexão robusta, suporte prioritário e a estabilidade que garante a produtividade do seu negócio.'
                }
            };
            
            const benefitsData = {
                residential: [
                    { icon: 'fa-solid fa-rocket', title: 'Velocidade Garantida', desc: 'Receba 100% da velocidade contratada, sem pegadinhas ou letras miúdas.' },
                    { icon: 'fa-solid fa-headset', title: 'Suporte 13/7 horas', desc: 'Nossa equipe está sempre pronta para te ajudar, durante todo o nosso horário comercial.' },
                    { icon: 'fa-solid fa-map-location-dot', title: 'Cobertura Local', desc: 'Atendimento em Casimiro de Abreu, Professor Souza e Visconde.' },
                    { icon: 'fa-solid fa-bolt', title: 'Instalação Rápida', desc: 'Agende a visita e tenha sua internet instalada por técnicos especializados.' }
                ],
                gamer: [
                    { icon: 'fa-solid fa-crosshairs', title: 'Ping Otimizado', desc: 'Rotas otimizadas para os principais servidores de jogos, garantindo menor tempo de resposta.' },
                    { icon: 'fa-solid fa-network-wired', title: 'DNS Prioritário', desc: 'Acesso a servidores DNS de alta performance para uma navegação e jogos mais rápidos.' },
                    { icon: 'fa-solid fa-wifi', title: 'Wi-Fi 6 de Verdade', desc: 'Receba um roteador de última geração para máxima performance nos seus dispositivos sem fio.' },
                    { icon: 'fa-solid fa-gamepad', title: 'Suporte Gamer', desc: 'Atendimento com especialistas que entendem as necessidades e os termos técnicos dos jogos.' }
                ],
                empresarial: [
                    { icon: 'fa-solid fa-shield-halved', title: 'IP Fixo Público', desc: 'Um endereço de IP exclusivo para sua empresa, ideal para servidores e sistemas externos.' },
                    { icon: 'fa-solid fa-business-time', title: 'Suporte Prioritário 8h', desc: 'Atendimento com prazo máximo de resolução de 8 horas para manter sua operação ativa.' },
                    { icon: 'fa-solid fa-chart-line', title: 'Monitoramento 24/7', desc: 'Nossa equipe monitora sua conexão proativamente para prevenir e resolver falhas rapidamente.' },
                    { icon: 'fa-solid fa-user-tie', title: 'Técnicos Especializados', desc: 'Profissionais treinados para atender as complexas demandas do ambiente corporativo.' }
                ]
            };

            function updateBenefits(planCategory) {
                const benefits = benefitsData[planCategory];
                for(let i = 1; i <= 4; i++) {
                    document.getElementById(`benefit-icon-${i}`).className = benefits[i-1].icon;
                    document.getElementById(`benefit-title-${i}`).textContent = benefits[i-1].title;
                    document.getElementById(`benefit-desc-${i}`).textContent = benefits[i-1].desc;
                }
            }

            if (planTabs) {
                planTabs.addEventListener('click', (e) => {
                    if (e.target.tagName === 'BUTTON') {
                        const selectedPlan = e.target.dataset.plan;

                        document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
                        e.target.classList.add('active');
                        
                        planGrids.forEach(grid => {
                            grid.classList.toggle('active', grid.classList.contains(selectedPlan));
                        });

                        document.body.className = themeData[selectedPlan].className;
                        heroImage.src = themeData[selectedPlan].image;
                        heroTitle.textContent = themeData[selectedPlan].title;
                        heroSubtitle.textContent = themeData[selectedPlan].subtitle;
                        
                        updateBenefits(selectedPlan);

                        document.getElementById('inicio').scrollIntoView({ behavior: 'smooth' });
                    }
                });
            }

            // --- LÓGICA DAS FEATURES GEMINI ---
            const apiKey = "AIzaSyAzhXIpf500NeZdfl44Qjh5k7epNaa8WS8";
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
                    if (result.candidates && result.candidates[0].content.parts) {
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

            const recommenderModal = document.getElementById('recommender-modal');
            const openRecommenderBtn = document.getElementById('open-recommender-btn');
            const closeRecommenderBtn = document.getElementById('close-recommender-modal');
            const recommenderForm = document.getElementById('recommender-form');
            if (openRecommenderBtn) {
                openRecommenderBtn.addEventListener('click', () => recommenderModal.style.display = 'flex');
            }
            if (closeRecommenderBtn) {
                closeRecommenderBtn.addEventListener('click', () => recommenderModal.style.display = 'none');
            }
            window.addEventListener('click', (e) => {
                if (e.target == recommenderModal) recommenderModal.style.display = 'none';
            });
            if (recommenderForm) {
                recommenderForm.addEventListener('submit', (e) => {
                    e.preventDefault();
                    const profile = document.getElementById('profile').value;
                    const people = document.getElementById('people').value;
                    const devices = document.getElementById('devices').value;
                    const recommenderResult = document.getElementById('recommender-result');
                    const prompt = `Aja como um especialista em vendas da entornet fibra. O cliente selecionou o perfil de uso '${profile}'. Nossa empresa atende APENAS em Casimiro de Abreu, Professor Souza e Visconde. 
                    - Planos Residenciais: 200 Mega (R$89,90), 500 Mega (R$99,90), 650 Mega (R$129,90), 830 Mega (R$189,90).
                    - Planos Gamer: 500 Mega (R$119,90), 650 Mega (R$159,90), 830 Mega (R$219,90), +1 GIGA (a partir de R$319,90). Vantagens: Wi-Fi 6, DNS prioritário, Ping otimizado.
                    - Planos Empresariais: 200 Mega (R$159,90), 500 Mega (R$199,90), 650 Mega (R$229,90), +1 GIGA (a partir de R$689,90). Vantagens: Suporte rápido, IP Fixo, Monitoramento 24/7.
                    Baseado no perfil, número de pessoas (${people}) e dispositivos (${devices}), recomende o melhor plano dentro da categoria escolhida e explique o porquê de forma curta e amigável.`;
                    const errorMessage = "Desculpe, não foi possível fazer a recomendação. Tente novamente.";
                    callGemini(prompt, recommenderResult, errorMessage);
                });
            }
            
            const coverageForm = document.getElementById('coverage-form-gemini');
            if (coverageForm) {
                coverageForm.addEventListener('submit', (e) => {
                    e.preventDefault();
                    const location = document.getElementById('location-input').value.toLowerCase();
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
            }

            const diagnosticsForm = document.getElementById('diagnostics-form');
            if(diagnosticsForm) {
                diagnosticsForm.addEventListener('submit', (e) => {
                    e.preventDefault();
                    const problem = document.getElementById('problem-description').value;
                    if (!problem) return;
                    const diagnosticsResult = document.getElementById('diagnostics-result');
                    const prompt = `Aja como um técnico de suporte de internet da empresa entornet fibra. Um cliente descreveu o seguinte problema: "${problem}". Forneça de 2 a 3 passos simples e práticos que ele pode tentar para resolver o problema antes de ligar para o suporte técnico. Use uma linguagem clara, amigável e em formato de lista numerada.`;
                    const errorMessage = "Não foi possível realizar o diagnóstico. Por favor, contate nosso suporte via WhatsApp.";
                    callGemini(prompt, diagnosticsResult, errorMessage);
                });
            }
        });