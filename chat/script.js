const chatBox = document.getElementById('chatBox');
const userInput = document.getElementById('userInput');
const sendBtn = document.getElementById('sendBtn');

// Healthcare knowledge base
const healthcareResponses = {
    'headache': 'For headaches, try: \n- Rest in a quiet, dark room\n- Stay hydrated\n- Take over-the-counter pain relievers\nIf persistent, consult a doctor.',
    'fever': 'For fever management:\n- Rest\n- Stay hydrated\n- Take fever reducers\n- Seek medical attention if temperature exceeds 103°F (39.4°C)',
    'cold': 'For cold relief:\n- Rest\n- Drink warm fluids\n- Use over-the-counter cold medications\n- Try honey for sore throat',
    'help': 'I can help you with common health concerns. Try asking about:\n- Headache\n- Fever\n- Cold\n- Or ask for emergency information',
    'emergency': 'For medical emergencies:\n- Call emergency services immediately (911)\n- Stay calm\n- Follow dispatcher instructions\nThis is not a substitute for professional medical help.'
};

function addMessage(message, isUser = false) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isUser ? 'user-message' : 'bot-message'}`;
    messageDiv.textContent = message;
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function processUserInput(input) {
    const lowercaseInput = input.toLowerCase();
    let response = "I'm not sure how to help with that. Try asking about headache, fever, or cold. Type 'help' for more options.";

    // Check for keywords in the input
    for (const [keyword, answer] of Object.entries(healthcareResponses)) {
        if (lowercaseInput.includes(keyword)) {
            response = answer;
            break;
        }
    }

    return response;
}

function handleUserInput() {
    const message = userInput.value.trim();
    if (message === '') return;

    // Add user message
    addMessage(message, true);

    // Process and add bot response
    const botResponse = processUserInput(message);
    setTimeout(() => addMessage(botResponse), 500);

    // Clear input
    userInput.value = '';
}

// Event listeners
sendBtn.addEventListener('click', handleUserInput);
userInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        handleUserInput();
    }
});

// Focus input on load
userInput.focus();
