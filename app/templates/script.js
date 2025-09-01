// Global JavaScript for HabitPredict

// Sample habit data
const habits = [
    { id: 1, name: 'Drink water', risk: 25, bestTime: '9:00 AM', completed: true },
    { id: 2, name: 'Read 5 minutes', risk: 45, bestTime: '8:00 PM', completed: false },
    { id: 3, name: 'Stretch', risk: 65, bestTime: '10:00 AM', completed: false },
    { id: 4, name: 'Take a 10-minute walk', risk: 85, bestTime: '12:00 PM', completed: false }
];

// Risk level classification
function getRiskLevel(risk) {
    if (risk <= 30) return { level: 'low', label: 'Low risk', class: 'risk-low', progressClass: 'risk-progress-low' };
    if (risk <= 50) return { level: 'medium', label: 'Medium risk', class: 'risk-medium', progressClass: 'risk-progress-medium' };
    if (risk <= 70) return { level: 'high', label: 'High risk', class: 'risk-high', progressClass: 'risk-progress-high' };
    return { level: 'very-high', label: 'Very high risk', class: 'risk-very-high', progressClass: 'risk-progress-very-high' };
}

// Render habit cards
function renderHabitCards() {
    const container = document.getElementById('habits-container');
    if (!container) return;
    
    container.innerHTML = '';
    
    habits.forEach(habit => {
        const risk = getRiskLevel(habit.risk);
        
        const habitCard = document.createElement('div');
        habitCard.className = `habit-card bg-white rounded-xl shadow-md p-5 ${risk.class} border-l-4`;
        habitCard.innerHTML = `
            <div class="flex justify-between items-start">
                <h3 class="font-semibold text-gray-800">${habit.name}</h3>
                <span class="px-2 py-1 bg-${risk.level}-100 text-${risk.level}-800 text-xs rounded-full">${risk.label}</span>
            </div>
            <div class="mt-4">
                <div class="w-full bg-gray-200 rounded-full h-2.5">
                    <div class="h-2.5 rounded-full ${risk.progressClass}" style="width: ${habit.risk}%"></div>
                </div>
                <p class="text-xs text-gray-500 mt-2">${habit.risk}% skip risk</p>
            </div>
            <div class="mt-4 flex items-center text-sm text-gray-600">
                <i class="far fa-clock mr-2"></i>
                Best time: ${habit.bestTime}
            </div>
        `;
        
        container.appendChild(habitCard);
    });
}

// Render habit log items
function renderHabitLogs() {
    const container = document.getElementById('habit-log-container');
    if (!container) return;
    
    container.innerHTML = '';
    
    habits.forEach(habit => {
        const logItem = document.createElement('div');
        logItem.className = 'flex items-center justify-between p-4 border border-gray-200 rounded-lg';
        logItem.innerHTML = `
            <div>
                <h3 class="font-medium text-gray-800">${habit.name}</h3>
                <p class="text-sm text-gray-600">Best completed at ${habit.bestTime}</p>
            </div>
            <button class="habit-toggle ${habit.completed ? 'bg-green-500' : 'bg-gray-300'} text-white px-4 py-2 rounded-lg transition-colors" data-id="${habit.id}">
                ${habit.completed ? '<i class="fas fa-check mr-2"></i> Completed' : '<i class="fas fa-times mr-2"></i> Mark as Done'}
            </button>
        `;
        
        container.appendChild(logItem);
    });
    
    // Add event listeners to toggle buttons
    document.querySelectorAll('.habit-toggle').forEach(button => {
        button.addEventListener('click', function() {
            const habitId = parseInt(this.getAttribute('data-id'));
            const habit = habits.find(h => h.id === habitId);
            
            if (habit) {
                habit.completed = !habit.completed;
                this.innerHTML = habit.completed ? 
                    '<i class="fas fa-check mr-2"></i> Completed' : 
                    '<i class="fas fa-times mr-2"></i> Mark as Done';
                this.classList.toggle('bg-green-500', habit.completed);
                this.classList.toggle('bg-gray-300', !habit.completed);
                
                showToast(habit.completed ? 
                    `Great job completing "${habit.name}"!` : 
                    `Marked "${habit.name}" as not completed.`);
            }
        });
    });
}

// Show toast notification
function showToast(message) {
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toast-message');
    
    if (!toast || !toastMessage) return;
    
    toastMessage.textContent = message;
    toast.classList.remove('opacity-0');
    toast.classList.remove('translate-y-20');
    toast.classList.add('opacity-100');
    toast.classList.add('translate-y-0');
    
    setTimeout(() => {
        toast.classList.remove('opacity-100');
        toast.classList.remove('translate-y-0');
        toast.classList.add('opacity-0');
        toast.classList.add('translate-y-20');
    }, 3000);
}

// Initialize charts
        function initCharts() {
            // Completion Rate Chart
            const completionCtx = document.getElementById('completionChart').getContext('2d');
            new Chart(completionCtx, {
                type: 'bar',
                data: {
                    labels: ['Drink Water', 'Read', 'Stretch', 'Take a Walk'],
                    datasets: [{
                        label: 'Completion Rate (%)',
                        data: [92, 78, 60, 45],
                        backgroundColor: [
                            'rgba(16, 185, 129, 0.7)',
                            'rgba(245, 158, 11, 0.7)',
                            'rgba(249, 115, 22, 0.7)',
                            'rgba(239, 68, 68, 0.7)'
                        ],
                        borderColor: [
                            'rgb(16, 185, 129)',
                            'rgb(245, 158, 11)',
                            'rgb(249, 115, 22)',
                            'rgb(239, 68, 68)'
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        y: {
                            beginAtZero: true,
                            max: 100,
                            ticks: {
                                callback: function(value) {
                                    return value + '%';
                                }
                            }
                        }
                    }
                }
            });

            // Prediction Trend Chart
            const predictionCtx = document.getElementById('predictionChart').getContext('2d');
            new Chart(predictionCtx, {
                type: 'line',
                data: {
                    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                    datasets: [
                        {
                            label: 'Drink Water',
                            data: [15, 18, 20, 22, 25, 30, 25],
                            borderColor: 'rgb(16, 185, 129)',
                            backgroundColor: 'rgba(16, 185, 129, 0.1)',
                            tension: 0.3,
                            fill: true
                        },
                        {
                            label: 'Read',
                            data: [35, 40, 38, 42, 45, 50, 45],
                            borderColor: 'rgb(245, 158, 11)',
                            backgroundColor: 'rgba(245, 158, 11, 0.1)',
                            tension: 0.3,
                            fill: true
                        },
                        {
                            label: 'Stretch',
                            data: [50, 55, 58, 60, 62, 65, 65],
                            borderColor: 'rgb(249, 115, 22)',
                            backgroundColor: 'rgba(249, 115, 22, 0.1)',
                            tension: 0.3,
                            fill: true
                        },
                        {
                            label: 'Take a Walk',
                            data: [70, 72, 75, 78, 80, 85, 85],
                            borderColor: 'rgb(239, 68, 68)',
                            backgroundColor: 'rgba(239, 68, 68, 0.1)',
                            tension: 0.3,
                            fill: true
                        }
                    ]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        y: {
                            beginAtZero: true,
                            max: 100,
                            ticks: {
                                callback: function(value) {
                                    return value + '%';
                                }
                            }
                        }
                    }
                }
            });

            // Weekly Performance Chart
            const weeklyCtx = document.getElementById('weeklyChart').getContext('2d');
            new Chart(weeklyCtx, {
                type: 'bar',
                data: {
                    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
                    datasets: [{
                        label: 'Completion Rate (%)',
                        data: [65, 75, 70, 80, 85, 60, 75],
                        backgroundColor: 'rgba(79, 70, 229, 0.7)',
                        borderColor: 'rgb(79, 70, 229)',
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    scales: {
                        y: {
                            beginAtZero: true,
                            max: 100,
                            ticks: {
                                callback: function(value) {
                                    return value + '%';
                                }
                            }
                        }
                    }
                }
            });

            // Distribution Chart
            const distributionCtx = document.getElementById('distributionChart').getContext('2d');
            new Chart(distributionCtx, {
                type: 'doughnut',
                data: {
                    labels: ['Completed', 'Skipped', 'Pending'],
                    datasets: [{
                        data: [45, 30, 25],
                        backgroundColor: [
                            'rgba(16, 185, 129, 0.7)',
                            'rgba(239, 68, 68, 0.7)',
                            'rgba(156, 163, 175, 0.7)'
                        ],
                        borderColor: [
                            'rgb(16, 185, 129)',
                            'rgb(239, 68, 68)',
                            'rgb(156, 163, 175)'
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'bottom'
                        }
                    }
                }
            });
        }

// Initialize profile menu functionality
document.addEventListener('DOMContentLoaded', function() {
    // Profile menu functionality
    const profileContainers = document.querySelectorAll('.profile-container');
    profileContainers.forEach(container => {
        container.addEventListener('click', function(e) {
            e.stopPropagation();
            const menu = this.querySelector('.profile-menu');
            if (menu) {
                menu.classList.toggle('hidden');
            }
        });
    });
    
    // Close profile menu when clicking outside
    document.addEventListener('click', function() {
        document.querySelectorAll('.profile-menu').forEach(menu => {
            menu.classList.add('hidden');
        });
    });
});

document.getElementById("add-habit-form").addEventListener("submit", function(e) {
    e.preventDefault();
    const name = document.getElementById("habit-name").value.trim();
    const time = document.getElementById("habit-time").value;
    const duration = document.getElementById("habit-duration").value;

    if (!name || !time || !duration) return;

    const newHabit = {
        id: habits.length + 1,
        name,
        risk: 50, // default risk value, you can calculate differently
        bestTime: time,
        completed: false
    };

    habits.push(newHabit);
    renderHabitCards();
    renderHabitLogs();
    e.target.reset();
});