document.addEventListener("DOMContentLoaded", () => {
  const companyInput = document.getElementById("company_name");
  const anonymousCheckbox = document.getElementById("anonymous");
  const form = document.getElementById("companyForm");
  const proceedBtn = document.getElementById("proceedBtn");
  const validationMsg = document.getElementById("validationMsg");
  const validationText = document.getElementById("validationText");
  const charCounter = document.getElementById("charCounter");
  const anonymousContainer = document.getElementById("anonymousContainer");

  // State management
  let isInputMode = false;
  let isAnonymousMode = false;

  // Character counter with enhanced feedback
  function updateCharCounter() {
    const length = companyInput.value.length;
    const maxLength = 100;
    charCounter.textContent = `${length}/${maxLength}`;
    
    if (length > maxLength * 0.8) {
      charCounter.classList.add("warning");
      charCounter.classList.remove("error");
    } else if (length >= maxLength) {
      charCounter.classList.add("error");
      charCounter.classList.remove("warning");
    } else {
      charCounter.classList.remove("warning", "error");
    }
  }

  // Visual feedback based on user interaction (but allow both to be selected)
  function updateVisualStates() {
    const hasText = companyInput.value.trim() !== "";
    const isChecked = anonymousCheckbox.checked;
    
    if (hasText) {
      // Fade anonymous option but don't disable it
      anonymousContainer.classList.add("faded-hint");
      isInputMode = true;
    } else {
      anonymousContainer.classList.remove("faded-hint");
      isInputMode = false;
    }
    
    if (isChecked) {
      // Fade input but don't disable it
      companyInput.classList.add("faded-hint");
      isAnonymousMode = true;
    } else {
      companyInput.classList.remove("faded-hint");
      isAnonymousMode = false;
    }
  }

  // Enhanced validation - allow both for backend to catch
  function validateForm() {
    const hasCompanyName = companyInput.value.trim() !== "";
    const isAnonymous = anonymousCheckbox.checked;
    
    // Hide previous validation messages
    validationMsg.classList.add("hidden");
    companyInput.classList.remove("error-state");
    
    // Only show frontend validation for completely empty form
    if (!hasCompanyName && !isAnonymous) {
      validationText.textContent = "Please enter your company name or choose to stay anonymous.";
      validationMsg.classList.remove("hidden");
      return false;
    }
    
    // Let backend handle the "both selected" case
    return true;
  }

  // Show temporary messages
  function showTemporaryMessage(message, type = "info") {
    const existingMsg = document.querySelector('.temp-message');
    if (existingMsg) existingMsg.remove();
    
    const tempMsg = document.createElement('div');
    tempMsg.className = `temp-message temp-${type}`;
    tempMsg.innerHTML = `
      <span class="temp-icon">${type === 'success' ? '✓' : type === 'info' ? 'ℹ️' : '⚠️'}</span>
      <span>${message}</span>
    `;
    
    form.insertBefore(tempMsg, proceedBtn);
    
    setTimeout(() => {
      if (tempMsg.parentNode) {
        tempMsg.style.animation = 'fadeOut 0.3s ease-out forwards';
        setTimeout(() => tempMsg.remove(), 300);
      }
    }, 2500);
  }

  // Form submission - allow backend to handle validation
  function handleSubmit(e) {
    e.preventDefault();
    
    const hasCompanyName = companyInput.value.trim() !== "";
    const isAnonymous = anonymousCheckbox.checked;
    
    // Clear previous states
    validationMsg.classList.add("hidden");
    companyInput.classList.remove("error-state");
    
    // Only prevent submission if nothing is selected
    if (!hasCompanyName && !isAnonymous) {
      validationText.textContent = "Please enter your company name or choose to stay anonymous.";
      validationMsg.classList.remove("hidden");
      companyInput.classList.add("error-state");
      
      // Shake the form for attention
      form.style.animation = 'shake 0.5s ease-in-out';
      setTimeout(() => form.style.animation = '', 500);
      
      companyInput.focus();
      return;
    }
    
    // Allow form submission - let backend handle "both selected" case
    showLoadingState();
    
    setTimeout(() => {
      form.submit();
    }, 800);
  }

  // Loading state
  function showLoadingState() {
    proceedBtn.disabled = true;
    proceedBtn.querySelector(".button-text").textContent = "Entering...";
    proceedBtn.style.pointerEvents = "none";
    
    const loadingSpinner = document.createElement('div');
    loadingSpinner.className = 'loading-spinner';
    proceedBtn.appendChild(loadingSpinner);
    
    const progressBar = document.createElement('div');
    progressBar.className = 'progress-bar';
    progressBar.innerHTML = '<div class="progress-fill"></div>';
    form.appendChild(progressBar);
  }

  // Auto-save
  function autoSave() {
    localStorage.setItem('portfolioGateway_companyName', companyInput.value);
    localStorage.setItem('portfolioGateway_anonymous', anonymousCheckbox.checked);
  }

  function loadSaved() {
    const savedCompany = localStorage.getItem('portfolioGateway_companyName');
    const savedAnonymous = localStorage.getItem('portfolioGateway_anonymous') === 'true';
    
    if (savedCompany) {
      companyInput.value = savedCompany;
      updateCharCounter();
    }
    if (savedAnonymous) {
      anonymousCheckbox.checked = true;
    }
    
    updateVisualStates();
    validateForm();
  }

  // Enhanced input event handling - visual hints only
  function addInputFeedback() {
    companyInput.addEventListener("input", (e) => {
      updateCharCounter();
      updateVisualStates();
      validateForm();
      autoSave();
      
      // Add typing effect
      companyInput.classList.add("typing");
      clearTimeout(companyInput.typingTimeout);
      companyInput.typingTimeout = setTimeout(() => {
        companyInput.classList.remove("typing");
      }, 500);
    });

    companyInput.addEventListener("focus", () => {
      companyInput.classList.add("focused");
    });

    companyInput.addEventListener("blur", () => {
      companyInput.classList.remove("focused", "typing");
    });

    // Anonymous checkbox handling - visual hints only
    anonymousCheckbox.addEventListener("change", () => {
      updateVisualStates();
      validateForm();
      autoSave();
    });
  }

  // Ripple effect
  function createRipple(e) {
    const rect = proceedBtn.getBoundingClientRect();
    const ripple = document.createElement("span");
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + "px";
    ripple.style.left = x + "px";
    ripple.style.top = y + "px";
    ripple.classList.add("ripple");
    
    // Color based on validation
    if (validateForm()) {
      ripple.style.background = "rgba(255, 255, 255, 0.6)";
    } else {
      ripple.style.background = "rgba(239, 68, 68, 0.6)";
    }
    
    proceedBtn.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  }

  // Keyboard shortcuts
  function addKeyboardShortcuts() {
    document.addEventListener("keydown", (e) => {
      if (e.key === "Enter" && (document.activeElement === companyInput || document.activeElement === anonymousCheckbox)) {
        e.preventDefault();
        handleSubmit(e);
      }
      
      if (e.key === "Escape") {
        companyInput.value = "";
        anonymousCheckbox.checked = false;
        updateCharCounter();
        updateVisualStates();
        validateForm();
        companyInput.focus();
      }
    });
  }

  // Mouse parallax effects
  function addParallaxEffects() {
    let mouseX = 0, mouseY = 0;
    let currentX = 0, currentY = 0;
    
    document.addEventListener("mousemove", (e) => {
      mouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    });
    
    function updateParallax() {
      currentX += (mouseX - currentX) * 0.1;
      currentY += (mouseY - currentY) * 0.1;
      
      const orbs = document.querySelectorAll(".floating-orb");
      orbs.forEach((orb, index) => {
        const speed = (index + 1) * 0.015;
        const x = currentX * 25 * speed;
        const y = currentY * 25 * speed;
        orb.style.transform = `translate(${x}px, ${y}px)`;
      });
      
      const container = document.querySelector('.container');
      container.style.transform = `translate(${currentX * 2}px, ${currentY * 2}px)`;
      
      requestAnimationFrame(updateParallax);
    }
    updateParallax();
  }

  // Error banner close functionality
  window.closeError = function() {
    const errorBanner = document.getElementById('errorBanner');
    if (errorBanner) {
      errorBanner.style.animation = 'fadeOut 0.3s ease-out forwards';
      setTimeout(() => errorBanner.remove(), 300);
    }
  };

  // Smart placeholder rotation
  const placeholderTexts = [
    "Enter your company name",
    "e.g., Google, Microsoft, Apple",
    "Which company do you represent?",
    "Your organization name"
  ];
  let placeholderIndex = 0;

  function rotatePlaceholder() {
    if (!companyInput.value && !companyInput.matches(':focus')) {
      companyInput.placeholder = placeholderTexts[placeholderIndex];
      placeholderIndex = (placeholderIndex + 1) % placeholderTexts.length;
    }
  }

  // Initialize everything
  function init() {
    loadSaved();
    addInputFeedback();
    addParallaxEffects();
    addKeyboardShortcuts();
    
    form.addEventListener("submit", handleSubmit);
    proceedBtn.addEventListener("click", createRipple);
    
    setInterval(rotatePlaceholder, 4000);
    
    updateCharCounter();
    updateVisualStates();
    validateForm();
  }

  init();
});
