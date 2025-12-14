// Authentication Utilities

// Check if user is logged in
async function checkAuth() {
  const {
    data: { session },
  } = await supabase.auth.getSession();
  return session !== null;
}

// Get current user
async function getCurrentUser() {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return user;
}

// Sign up new user
async function signUp(email, password) {
  try {
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

// Sign in user
async function signIn(email, password) {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) throw error;
    return { success: true, data };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

// Sign out user
async function signOut() {
  try {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

// Protect route - redirect to login if not authenticated
async function protectRoute() {
  const isAuthenticated = await checkAuth();
  if (!isAuthenticated) {
    window.location.href = "form page.html";
    return false;
  }
  return true;
}

// Show error message
function showError(message) {
  const errorDiv = document.createElement("div");
  errorDiv.className = "error-message";
  errorDiv.style.cssText = `
    background: #fee;
    color: #c33;
    padding: 12px;
    border-radius: 8px;
    margin-bottom: 15px;
    border: 1px solid #fcc;
  `;
  errorDiv.textContent = message;

  const container = document.querySelector(".container");
  if (container) {
    container.insertBefore(errorDiv, container.firstChild);
    setTimeout(() => errorDiv.remove(), 5000);
  }
}

// Show success message
function showSuccess(message) {
  const successDiv = document.createElement("div");
  successDiv.className = "success-message";
  successDiv.style.cssText = `
    background: #efe;
    color: #3c3;
    padding: 12px;
    border-radius: 8px;
    margin-bottom: 15px;
    border: 1px solid #cfc;
  `;
  successDiv.textContent = message;

  const container = document.querySelector(".container");
  if (container) {
    container.insertBefore(successDiv, container.firstChild);
    setTimeout(() => successDiv.remove(), 5000);
  }
}

// Show loading state
function setLoading(button, isLoading) {
  if (isLoading) {
    button.disabled = true;
    button.dataset.originalText = button.textContent;
    button.textContent = "Loading...";
  } else {
    button.disabled = false;
    button.textContent = button.dataset.originalText || button.textContent;
  }
}
