
const templates = {
    en: (name, niche, audience, customMsg) => `Hi ${name},

I've been following your amazing content in the ${niche} space and love the way you engage your community of ${audience} followers!

We're launching an AI-powered tool that helps creators like you save time while delivering even more value to your audience. I believe your authentic style makes you the perfect fit.

${customMsg ? '\n' + customMsg + '\n' : ''}

Would you be open to a quick chat about partnering together?

Best,
[Your Name]`,
    es: (name, niche, audience, customMsg) => `Hola ${name},

¡He estado siguiendo tu increíble contenido en ${niche} y me encanta cómo interactúas con tus ${audience} seguidores!

Estamos lanzando una herramienta impulsada por IA que ayuda a creadores como tú a ahorrar tiempo y ofrecer más valor a su audiencia.

${customMsg ? '\n' + customMsg + '\n' : ''}

¿Te gustaría tener una breve charla para colaborar?

Saludos,
[Tu Nombre]`,
    fr: (name, niche, audience, customMsg) => `Bonjour ${name},

Je suis votre contenu ${niche} et j'adore la manière dont vous engagez vos ${audience} abonnés !

Nous lançons un outil alimenté par l'IA qui aide les créateurs comme vous à gagner du temps.

${customMsg ? '\n' + customMsg + '\n' : ''}

Seriez-vous disponible pour en discuter rapidement ?

Cordialement,
[Votre Nom]`,
    hi: (name, niche, audience, customMsg) => `नमस्ते ${name},

मैंने आपका ${niche} कंटेंट देखा है और जिस तरह आप अपने ${audience} फॉलोअर्स को एंगेज करते हैं, वह कमाल है!

${customMsg ? '\n' + customMsg + '\n' : ''}

क्या हम सहयोग पर संक्षिप्त बातचीत कर सकते हैं?

धन्यवाद,
[आपका नाम]`
};

const audMap = {
    micro: '<50k',
    mid: '50k-250k',
    macro: '250k+'
};

let currentData = { name: '', niche: '', audience: '', customMessage: '' };
let currentLang = 'en';


const analyticsData = {
    campaigns: [
        { name: 'Tech Influencers Q4', sent: 245, opens: 201, replies: 61, language: 'en' },
        { name: 'Beauty Campaign ES', sent: 189, opens: 142, replies: 36, language: 'es' },
        { name: 'Fitness Micro-Influencers', sent: 156, opens: 106, replies: 23, language: 'fr' },
        { name: 'Gaming Creators', sent: 312, opens: 221, replies: 69, language: 'en' },
        { name: 'Lifestyle India', sent: 345, opens: 221, replies: 41, language: 'hi' }
    ],
    languagePerformance: {
        en: { sent: 557, opens: 422, replies: 130 },
        es: { sent: 189, opens: 142, replies: 36 },
        fr: { sent: 156, opens: 106, replies: 23 },
        hi: { sent: 345, opens: 221, replies: 41 }
    }
};


document.getElementById('influencerForm').addEventListener('submit', function(e) {
    e.preventDefault();
    currentData.name = document.getElementById('name').value;
    currentData.niche = document.getElementById('niche').value;
    currentData.audience = audMap[document.getElementById('audience').value] || '';
    currentData.customMessage = document.getElementById('customMessage').value;
    generatePreview();
    

    setTimeout(updateAnalytics, 1000);
});


document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        currentLang = this.dataset.lang;
        generatePreview();
    });
});

function generatePreview() {
    if (!currentData.name) return;
    const template = templates[currentLang];
    const email = template(currentData.name, currentData.niche, currentData.audience, currentData.customMessage);
    document.getElementById('emailPreview').textContent = email;
}

function updateAnalytics() {

    const currentTotal = parseInt(document.getElementById('totalEmails').textContent.replace(',', ''));
    document.getElementById('totalEmails').textContent = (currentTotal + 1).toLocaleString();
    

    document.getElementById('totalEmails').style.transform = 'scale(1.1)';
    setTimeout(() => {
        document.getElementById('totalEmails').style.transform = 'scale(1)';
    }, 300);
}


const performanceCtx = document.getElementById('performanceChart').getContext('2d');
const performanceChart = new Chart(performanceCtx, {
    type: 'bar',
    data: {
        labels: analyticsData.campaigns.map(c => c.name),
        datasets: [
            {
                label: 'Open Rate (%)',
                data: analyticsData.campaigns.map(c => Math.round((c.opens / c.sent) * 100)),
                backgroundColor: 'rgba(74, 144, 226, 0.8)',
                borderColor: 'rgba(74, 144, 226, 1)',
                borderWidth: 2,
                borderRadius: 6,
                borderSkipped: false,
            },
            {
                label: 'Reply Rate (%)',
                data: analyticsData.campaigns.map(c => Math.round((c.replies / c.sent) * 100)),
                backgroundColor: 'rgba(26, 188, 156, 0.8)',
                borderColor: 'rgba(26, 188, 156, 1)',
                borderWidth: 2,
                borderRadius: 6,
                borderSkipped: false,
            }
        ]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    color: '#a0a9c0',
                    font: { size: 12, family: 'Inter' },
                    padding: 20
                }
            },
            tooltip: {
                backgroundColor: 'rgba(26, 29, 41, 0.95)',
                titleColor: '#ffffff',
                bodyColor: '#a0a9c0',
                borderColor: 'rgba(255, 255, 255, 0.1)',
                borderWidth: 1,
                cornerRadius: 8
            }
        },
        scales: {
            x: {
                ticks: { 
                    color: '#a0a9c0',
                    font: { family: 'Inter' }
                },
                grid: { 
                    color: 'rgba(255, 255, 255, 0.1)',
                    drawBorder: false
                }
            },
            y: {
                beginAtZero: true,
                ticks: { 
                    color: '#a0a9c0',
                    font: { family: 'Inter' }
                },
                grid: { 
                    color: 'rgba(255, 255, 255, 0.1)',
                    drawBorder: false
                }
            }
        }
    }
});

// Initialize Language Performance Chart
const languageCtx = document.getElementById('languageChart').getContext('2d');
const languageChart = new Chart(languageCtx, {
    type: 'doughnut',
    data: {
        labels: ['🇺🇸 English', '🇪🇸 Español', '🇫🇷 Français', '🇮🇳 हिन्दी'],
        datasets: [{
            label: 'Open Rate by Language',
            data: [
                Math.round((analyticsData.languagePerformance.en.opens / analyticsData.languagePerformance.en.sent) * 100),
                Math.round((analyticsData.languagePerformance.es.opens / analyticsData.languagePerformance.es.sent) * 100),
                Math.round((analyticsData.languagePerformance.fr.opens / analyticsData.languagePerformance.fr.sent) * 100),
                Math.round((analyticsData.languagePerformance.hi.opens / analyticsData.languagePerformance.hi.sent) * 100)
            ],
            backgroundColor: [
                'rgba(74, 144, 226, 0.8)',
                'rgba(26, 188, 156, 0.8)',
                'rgba(142, 68, 173, 0.8)',
                'rgba(243, 156, 18, 0.8)'
            ],
            borderColor: [
                'rgba(74, 144, 226, 1)',
                'rgba(26, 188, 156, 1)',
                'rgba(142, 68, 173, 1)',
                'rgba(243, 156, 18, 1)'
            ],
            borderWidth: 2
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    color: '#a0a9c0',
                    font: { size: 12, family: 'Inter' },
                    padding: 15
                }
            },
            tooltip: {
                backgroundColor: 'rgba(26, 29, 41, 0.95)',
                titleColor: '#ffffff',
                bodyColor: '#a0a9c0',
                borderColor: 'rgba(255, 255, 255, 0.1)',
                borderWidth: 1,
                cornerRadius: 8,
                callbacks: {
                    label: function(context) {
                        return context.label + ': ' + context.parsed + '% open rate';
                    }
                }
            }
        }
    }
});

// Add smooth scrolling for better UX
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Add intersection observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all sections for animation
document.querySelectorAll('.section').forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

// Real-time metric updates (simulated)
setInterval(() => {
    const metrics = ['totalEmails', 'openRate', 'replyRate'];
    const randomMetric = metrics[Math.floor(Math.random() * metrics.length)];
    const element = document.getElementById(randomMetric);
    
    if (Math.random() > 0.95) { // 5% chance every second
        element.style.transform = 'scale(1.05)';
        element.style.color = '#27AE60';
        
        setTimeout(() => {
            element.style.transform = 'scale(1)';
            element.style.color = '#4A90E2';
        }, 500);
    }
}, 1000);
