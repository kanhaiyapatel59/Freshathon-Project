// Initialize the application when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize map
    initMap();
    
    // Set up event listeners
    setupEventListeners();
    
    // Load initial data
    loadInitialData();
    
    // Simulate chatbot messages
    simulateChatbot();
});

// Google Maps initialization
function initMap() {
    // This would be replaced with actual Google Maps API code
    const mapElement = document.getElementById('map-display');
    if (mapElement) {
        mapElement.innerHTML = '<div class="map-overlay"><h3>Interactive Resource Map</h3><p>Shelters, food distribution centers, and medical aid locations would be displayed here.</p></div>';
    }
}

// Set up all event listeners
function setupEventListeners() {
    // Help request form submission
    const helpRequestForm = document.getElementById('help-request-form');
    if (helpRequestForm) {
        helpRequestForm.addEventListener('submit', function(e) {
            e.preventDefault();
            submitHelpRequest();
        });
    }
    
    // Need Help button
    const needHelpBtn = document.getElementById('need-help-btn');
    if (needHelpBtn) {
        needHelpBtn.addEventListener('click', function() {
            document.getElementById('request-help').scrollIntoView({ behavior: 'smooth' });
        });
    }
    
    // Offer Help button
    const offerHelpBtn = document.getElementById('offer-help-btn');
    if (offerHelpBtn) {
        offerHelpBtn.addEventListener('click', function() {
            alert('Thank you for wanting to help! Volunteer registration will be available soon.');
        });
    }
    
    // Chatbot input
    const chatbotInput = document.querySelector('.chatbot-input input');
    const chatbotSendBtn = document.querySelector('.chatbot-input button');
    
    if (chatbotInput && chatbotSendBtn) {
        chatbotSendBtn.addEventListener('click', sendChatbotMessage);
        chatbotInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                sendChatbotMessage();
            }
        });
    }
    
    // Quick reply buttons
    const quickReplyBtns = document.querySelectorAll('.quick-reply-btn');
    quickReplyBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const message = this.textContent;
            addUserMessage(message);
            setTimeout(() => {
                respondToQuickReply(message);
            }, 800);
        });
    });
    
    // Modal close button
    const closeModal = document.querySelector('.close-modal');
    if (closeModal) {
        closeModal.addEventListener('click', function() {
            document.getElementById('confirmation-modal').style.display = 'none';
        });
    }
}

// Load initial data (simulated)
function loadInitialData() {
    // In a real app, this would fetch data from your backend
    console.log('Loading initial data...');
}

// Submit help request form
function submitHelpRequest() {
    // Get form values
    const emergencyType = document.getElementById('emergency-type').value;
    const location = document.getElementById('location').value;
    const details = document.getElementById('details').value;
    const contact = document.getElementById('contact').value;
    
    // Validate form
    if (!emergencyType || !location) {
        alert('Please fill in all required fields.');
        return;
    }
    
    // In a real app, this would send data to your backend
    console.log('Submitting help request:', {
        emergencyType,
        location,
        details,
        contact
    });
    
    // Show confirmation modal
    document.getElementById('confirmation-modal').style.display = 'flex';
    
    // Reset form
    document.getElementById('help-request-form').reset();
}

// Chatbot functions
function addBotMessage(text) {
    const messagesContainer = document.getElementById('chatbot-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message bot';
    messageDiv.innerHTML = `
        <div class="message-content">
            <p>${text}</p>
        </div>
    `;
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function addUserMessage(text) {
    const messagesContainer = document.getElementById('chatbot-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message user';
    messageDiv.innerHTML = `
        <div class="message-content">
            <p>${text}</p>
        </div>
    `;
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    
    // Clear input
    document.querySelector('.chatbot-input input').value = '';
}

function sendChatbotMessage() {
    const input = document.querySelector('.chatbot-input input');
    const message = input.value.trim();
    
    if (message) {
        addUserMessage(message);
        setTimeout(() => {
            processUserMessage(message);
        }, 1000);
    }
}

function processUserMessage(message) {
    // Simple keyword-based responses
    message = message.toLowerCase();
    
    if (message.includes('shelter') || message.includes('place to stay')) {
        addBotMessage('Here are the nearest shelters: <strong>Central High School</strong> (2 miles away), <strong>Community Center</strong> (3.5 miles away). Would you like directions?');
    } 
    else if (message.includes('food') || message.includes('hungry') || message.includes('water')) {
        addBotMessage('Food distribution centers near you: <strong>First Baptist Church</strong> (open until 8pm), <strong>City Park Pavilion</strong> (open until 7pm).');
    }
    else if (message.includes('medical') || message.includes('hurt') || message.includes('doctor')) {
        addBotMessage('For medical emergencies, the nearest aid station is at <strong>Memorial Hospital</strong> (1.2 miles away). If this is life-threatening, please call emergency services immediately.');
    }
    else if (message.includes('danger') || message.includes('unsafe')) {
        addBotMessage('Please report dangerous areas to help others avoid them. What is the location and nature of the danger?');
    }
    else {
        addBotMessage('I can help you find shelters, food, medical aid, or report dangers. What do you need assistance with?');
    }
}

function respondToQuickReply(reply) {
    processUserMessage(reply);
}

// Simulate initial chatbot messages
function simulateChatbot() {
    setTimeout(() => {
        addBotMessage('I can help you with:');
        setTimeout(() => {
            addBotMessage('• Finding emergency shelters');
            setTimeout(() => {
                addBotMessage('• Locating food and water distribution');
                setTimeout(() => {
                    addBotMessage('• Connecting with medical assistance');
                    setTimeout(() => {
                        addBotMessage('• Reporting dangerous areas');
                    }, 400);
                }, 400);
            }, 400);
        }, 800);
    }, 1500);
}