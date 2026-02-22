// Mock authentication service for development/testing
// This allows login without backend

// Demo users stored in localStorage
const DEMO_USERS_KEY = "phishguard_demo_users";

// Initialize demo users if not exists
function initDemoUsers() {
  const existing = localStorage.getItem(DEMO_USERS_KEY);
  if (!existing) {
    const demoUsers = [
      {
        id: 1,
        name: "Demo User",
        email: "demo@phishguard.ai",
        password: "demo123", // In real app, this would be hashed
      },
      {
        id: 2,
        name: "Test User",
        email: "test@example.com",
        password: "test123",
      },
    ];
    localStorage.setItem(DEMO_USERS_KEY, JSON.stringify(demoUsers));
  }
}

// Get all users
function getUsers() {
  initDemoUsers();
  const users = localStorage.getItem(DEMO_USERS_KEY);
  return users ? JSON.parse(users) : [];
}

// Save users
function saveUsers(users) {
  localStorage.setItem(DEMO_USERS_KEY, JSON.stringify(users));
}

// Generate a simple token
function generateToken(userId) {
  return `mock_token_${userId}_${Date.now()}`;
}

export const mockAuth = {
  login: async (email, password) => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    const users = getUsers();
    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (!user) {
      throw new Error("Invalid email or password");
    }

    const token = generateToken(user.id);
    const userData = {
      id: user.id,
      name: user.name,
      email: user.email,
    };

    return {
      token,
      user: userData,
    };
  },

  signup: async (name, email, password) => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 500));

    const users = getUsers();

    // Check if user already exists
    if (users.find((u) => u.email === email)) {
      throw new Error("User with this email already exists");
    }

    // Create new user
    const newUser = {
      id: Date.now(),
      name,
      email,
      password, // In real app, this would be hashed
    };

    users.push(newUser);
    saveUsers(users);

    const token = generateToken(newUser.id);
    const userData = {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
    };

    return {
      token,
      user: userData,
    };
  },

  verifyToken: async (token) => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 200));

    if (!token || !token.startsWith("mock_token_")) {
      return null;
    }

    // Extract user ID from token
    const parts = token.split("_");
    if (parts.length < 3) return null;

    const userId = parseInt(parts[2]);
    const users = getUsers();
    const user = users.find((u) => u.id === userId);

    if (!user) {
      return null;
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  },
};

// Initialize demo users on import
initDemoUsers();
