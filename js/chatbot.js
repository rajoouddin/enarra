const chatbotToggler = document.querySelector(".chatbot-toggler");
const closeBtn = document.querySelector(".close-btn");
const chatbox = document.querySelector(".chatbox");
const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");

let userMessage = null; 
const inputInitHeight = chatInput.scrollHeight || 55; // Default to 55px if 0

// --- KNOWLEDGE BASE & CONFIGURATION ---

const knowledgeBase = {
    intents: [
        {
            id: 'greet',
            keywords: ['hi', 'hello', 'hey', 'greetings', 'good morning', 'good afternoon'],
            responses: [
                "Hi there! I’m Enarra’s assistant. I can help you learn about our automation services or you can Request a Discovery Call to talk with us directly."
            ]
        },
        {
            id: 'ask_what_you_do',
            keywords: ['what do you do', 'tell me about enarra', 'what is enarra', 'brand summary', 'who are you'],
            responses: [
                "Enarra helps small businesses automate repetitive tasks so you save time and reduce manual work. We tailor solutions to your processes. Would you like to Request a Discovery Call?",
                "Enarra provides AI-driven automation solutions for small businesses. We specialise in helping firms save time by automating repetitive tasks like emails, data entry, onboarding, and workflow coordination."
            ]
        },
        {
            id: 'ask_services',
            keywords: ['service', 'automate', 'onboarding', 'email', 'data entry', 'workflow', 'what can you automate'],
            responses: [
                "We can automate things like email workflows, onboarding, reminders, data entry, reporting, and more. If you want help specific to your workflows, you can Request a Discovery Call.",
                "Common automation opportunities include email workflows, client onboarding sequences, reminders, report generation, and data entry tasks."
            ]
        },
        {
            id: 'ask_pricing',
            keywords: ['price', 'cost', 'background', 'how much', 'quote', 'rates', 'fees'],
            responses: [
                "Pricing depends on what you want automated. After a short Discovery Call, we can give a personalised plan and quote.",
                "Our pricing is customised based on the specific needs of your firm, which we can discuss during a discovery call. This call is free and no-pressure, allowing us to understand your pain points better."
            ]
        },
        {
            id: 'ask_who_for',
            keywords: ['accountant', 'accounting', 'who can use', 'target audience', 'small business', 'not an accountant'],
            responses: [
                "Anyone who wants to streamline routine tasks and boost efficiency can use Enarra. While we often work with small accounting firms, our solutions help businesses of many types.",
                "We work with many types of small businesses, not just accountants. If you want to explore what we can automate for you, you can Request a Discovery Call."
            ]
        },
        {
            id: 'ask_technical',
            keywords: ['technical', 'code', 'coding', 'skills', 'programmer'],
            responses: [
                "No technical skills are needed. We tailor solutions around your current tools and processes so you don’t need to code.",
                "We specialise in automating tasks without requiring you to write code. If you want specific ideas for your workflow, we can explore them during a Discovery Call."
            ]
        },
        {
            id: 'ask_process',
            keywords: ['start', 'process', 'how do i start', 'begin', 'next steps'],
            responses: [
                "The first step is to Request a Discovery Call. In this free 15-minute session, we learn about your workflows and identify areas where automation delivers the most value.",
                "We discuss your workflows, perform a quick audit, and plan automation solutions that make sense for your business."
            ]
        },
        {
            id: 'ask_support',
            keywords: ['support', 'help', 'ongoing', 'maintenance'],
            responses: [
                "Yes, we offer ongoing support and optimisation to ensure your automations keep running smoothly."
            ]
        },
        {
            id: 'thank_you',
            keywords: ['thanks', 'thank you', 'appreciate'],
            responses: [
                "You’re welcome! If there’s anything else you’re curious about, just ask.",
                "Happy to help!"
            ]
        }
    ],
    fallbacks: [
        "I’m here to help. Could you rephrase that? If you’d like personalised guidance on automation for your business, you can Request a Discovery Call.",
        "Thanks for that. I’m not sure I fully understand. Can you rephrase your question or, if you prefer personalised guidance, you can Request a Discovery Call.",
        "I want to make sure you get the right answer. Let me connect you with a member of our team, or you can Request a Discovery Call so we can go through it together."
    ],
    microResponses: [
        "Great question! ",
        "Happy to help! ",
        "Here’s what I can tell you... ", 
        "" // Sometimes no prefix
    ]
};

// --- LOGIC ---

const createChatLi = (message, className) => {
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", `${className}`);
    let chatContent = className === "outgoing" ? `<p></p>` : `<span class="material-symbols-rounded">smart_toy</span><p></p>`;
    chatLi.innerHTML = chatContent;
    chatLi.querySelector("p").textContent = message;
    return chatLi;
}

const findIntent = (message) => {
    message = message.toLowerCase();
    
    // Look for exact matches or high-confidence keyword presence
    for (const intent of knowledgeBase.intents) {
        if (intent.keywords.some(keyword => message.includes(keyword))) {
            return intent;
        }
    }
    return null;
}

const generateResponse = (userMsg) => {
    const intent = findIntent(userMsg);
    
    if (intent) {
        // 1. Pick a random base response from the intent
        const baseResponse = intent.responses[Math.floor(Math.random() * intent.responses.length)];
        
        // 2. Optionally add a micro-response prefix for specific intents (like pricing or services) to sound "human"
        // avoiding prefixes for simple greetings to keep them natural
        let prefix = "";
        if (['ask_pricing', 'ask_services', 'ask_what_you_do', 'ask_process'].includes(intent.id)) {
            prefix = knowledgeBase.microResponses[Math.floor(Math.random() * knowledgeBase.microResponses.length)];
        }
        
        return prefix + baseResponse;
    } else {
        // Fallback
        return knowledgeBase.fallbacks[Math.floor(Math.random() * knowledgeBase.fallbacks.length)];
    }
}

let isThinking = false;

const handleChat = () => {
    if (isThinking) return;
    userMessage = chatInput.value.trim(); 
    if (!userMessage) return;

    isThinking = true;
    chatInput.value = "";
    chatInput.style.height = `${inputInitHeight}px`;
    chatInput.disabled = true; // Disable input while thinking

    chatbox.appendChild(createChatLi(userMessage, "outgoing"));
    chatbox.scrollTo(0, chatbox.scrollHeight);

    setTimeout(() => {
        const incomingChatLi = createChatLi("Thinking...", "incoming");
        chatbox.appendChild(incomingChatLi);
        chatbox.scrollTo(0, chatbox.scrollHeight);

        setTimeout(() => {
            const response = generateResponse(userMessage);
            incomingChatLi.querySelector("p").textContent = response;
            chatbox.scrollTo(0, chatbox.scrollHeight);
            
            isThinking = false;
            chatInput.disabled = false;
            chatInput.focus();
        }, 600);
    }, 600);
}

chatInput.addEventListener("input", () => {
    chatInput.style.height = `${inputInitHeight}px`;
    chatInput.style.height = `${chatInput.scrollHeight}px`;
});

chatInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && !e.shiftKey && window.innerWidth > 800) {
        e.preventDefault();
        handleChat();
    }
});

sendChatBtn.addEventListener("click", handleChat);
closeBtn.addEventListener("click", () => document.body.classList.remove("show-chatbot"));
chatbotToggler.addEventListener("click", () => document.body.classList.toggle("show-chatbot"));
