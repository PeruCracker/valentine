// Emojis for the slot machine
const items = [
  "🍎", "🍊", "🍉", "🍓", "🍒", "🍍", "🍇"
];

// List of possible "messages"
const messages = [
  "Every moment with you feels like a beautiful dream I never want to wake up from.",
    "Babygirl, you light up my world in ways words can't describe.",
    "You make my heart smile in ways no one else ever could.",
    "Even on the toughest days, the thought of you makes everything better.",
    "You’re not just my love, you’re my peace, my happiness, and my forever.",
    "Babygirl, you're my favorite hello and my hardest goodbye.",
    "With you, life feels like the best adventure I could ever ask for.",
    "I don't need the stars when I have you. You're all the light I need.",
    "Babygirl, you’ve stolen my heart, and I never want it back.",
    "You're my happy place, and I'll always cherish every moment we share."
];

// Spin counter
let spinCounter = 0;

// Function to trigger the slot machine spin
function spinSlotMachine() {
  const reel1 = document.getElementById('reel1');
  const reel2 = document.getElementById('reel2');
  const reel3 = document.getElementById('reel3');
  const winningMessage = document.getElementById('winning-message');
  const confettiContainer = document.getElementById('confetti');

  // Start spinning animation
  reel1.classList.add("spin-animation");
  reel2.classList.add("spin-animation");
  reel3.classList.add("spin-animation");

  // Hide the confetti initially
  confettiContainer.style.display = 'none';

  // Reset the winning message
  winningMessage.textContent = '';

  // Remove any previous confetti effect
  setTimeout(() => {
    reel1.classList.remove("spin-animation");
    reel2.classList.remove("spin-animation");
    reel3.classList.remove("spin-animation");

    // Guarantee a win every 2 spins
    let randomItem1, randomItem2, randomItem3;

    if (spinCounter === 1) {
      // Every 2nd spin guarantees a win
      randomItem1 = randomItem2 = randomItem3 = items[Math.floor(Math.random() * items.length)];
      spinCounter = 0;  // Reset counter after the guaranteed win
    } else {
      // Randomly pick items for each reel
      randomItem1 = items[Math.floor(Math.random() * items.length)];
      randomItem2 = items[Math.floor(Math.random() * items.length)];
      randomItem3 = items[Math.floor(Math.random() * items.length)];
      spinCounter++;
    }

    // Display the items on the reels
    reel1.textContent = randomItem1;
    reel2.textContent = randomItem2;
    reel3.textContent = randomItem3;

    // Check if all three items match
    if (randomItem1 === randomItem2 && randomItem2 === randomItem3) {
      // If all three items match, display a random message and show confetti
      const randomMessage = messages[Math.floor(Math.random() * messages.length)];
      winningMessage.textContent = `"${randomMessage}"`;
      showConfetti(confettiContainer);
    } else {
      winningMessage.textContent = 'Try Again!';
    }
  }, 1500); // Wait for 1.5 seconds before stopping the animation and displaying items
}

// Function to show confetti animation when the user wins
function showConfetti(confettiContainer) {
  // Show confetti container
  confettiContainer.style.display = 'block';

  // Generate 30 confetti pieces
  for (let i = 0; i < 30; i++) {
    const confettiPiece = document.createElement('div');
    confettiPiece.classList.add('confetti-piece');
    confettiPiece.style.left = `${Math.random() * 100}%`;
    confettiPiece.style.animationDelay = `${Math.random() * 0.5}s`;
    confettiContainer.appendChild(confettiPiece);
  }

  // Remove confetti after animation
  setTimeout(() => {
    confettiContainer.style.display = 'none'; // Hide confetti after 3 seconds
    confettiContainer.innerHTML = ''; // Clear all confetti pieces
  }, 3000);
}

// Add an event listener to the "Spin" button
document.getElementById('slot-machine-btn').addEventListener('click', spinSlotMachine);
