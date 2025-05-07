 
 // Call the function when the page loads
 window.onload = showWelcomePopup;
 

// Initial call to set the time immediately
updateTime();

// Update the time every 5 seconds (5000 milliseconds)
setInterval(updateTime, 5000);

 
 // --- Loading Animation ---
 window.addEventListener('load', () => {
  const loadingOverlay = document.getElementById('loading-overlay');
  // Ensure minimum display time (e.g., 3 seconds)
  const minLoadTime = 3000; // milliseconds
  const loadStartTime = Date.now();

  function hideLoader() {
   const timeElapsed = Date.now() - loadStartTime;
   const timeRemaining = minLoadTime - timeElapsed;

   if (timeRemaining <= 0) {
    loadingOverlay.classList.add('hidden');
    // Remove overlay from DOM after transition for performance
    setTimeout(() => {
     if (loadingOverlay.parentNode) {
      loadingOverlay.parentNode.removeChild(loadingOverlay);
     }
    }, 500); // Match CSS transition duration
   } else {
    setTimeout(hideLoader, timeRemaining);
   }
  }
  hideLoader(); // Initial check
 });


        // --- Mobile Menu Toggle ---
        const menuToggleButton = document.getElementById('menu-toggle-button');
        const mainMenu = document.getElementById('main-menu');
        if (menuToggleButton && mainMenu) {
             menuToggleButton.addEventListener('click', () => {
                 mainMenu.classList.toggle('active');
                 // Optional: Change hamburger icon to 'X' when open
                 menuToggleButton.innerHTML = mainMenu.classList.contains('active') ? '<i class="fa fa-remove"></i>' : '<i class="fa fa-navicon"></i>';
             });
         }

        // --- Search Toggle ---
         const searchIcon = document.getElementById('search-icon');
         const searchBox = document.getElementById('search-box');
         const searchInput = document.getElementById('search-input');

         if (searchIcon && searchBox && searchInput) {
            searchIcon.addEventListener('click', (e) => {
                e.stopPropagation(); // Prevent click from closing immediately
                searchBox.classList.toggle('active');
                 if(searchBox.classList.contains('active')) {
                     searchInput.focus(); // Focus input when opened
                 }
            });

            // Close search box if clicking outside
            document.addEventListener('click', (e) => {
                 if (!searchBox.contains(e.target) && !searchIcon.contains(e.target)) {
                     searchBox.classList.remove('active');
                 }
             });
         }
         // Basic Search Functionality (Placeholder - needs refinement)
         // This example searches page content, more complex search needs more work
         if (searchInput) {
            searchInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') {
                    const query = searchInput.value.toLowerCase();
                    if (!query) return;
                    // Simple concept: redirect to a search results page (which you'd need to create)
                    // or implement client-side search library (like Lunr.js)
                     alert(`Searching for: ${query}. Implement full search logic here.`);
                     // Example Redirect (if you create a search.html):
                     // window.location.href = `/search.html?q=${encodeURIComponent(query)}`;
                    searchBox.classList.remove('active'); // Hide after search
                }
            });
         }


         // --- Stop Blinking Animation on Hover/Timeout ---
         function handleBlinkingText(selector, timeout = 5000) {
             const elements = document.querySelectorAll(selector);
             elements.forEach(el => {
                 // Stop on hover
                 el.addEventListener('mouseover', () => el.classList.add('stop-blinking'));
                 el.addEventListener('mouseout', () => {
                     // Only remove stop-blinking if the timeout hasn't passed
                     if (!el.dataset.timedOut) {
                         el.classList.remove('stop-blinking');
                     }
                 });

                 // Stop after timeout
                 setTimeout(() => {
                     el.classList.add('stop-blinking');
                     el.dataset.timedOut = 'true'; // Mark as timed out
                 }, timeout);
             });
         }

         // --- Typing Animation ---
        function typeEffect(elementSelector, texts, typeSpeed = 100, eraseSpeed = 50, delay = 1500) {
            const targetElement = document.querySelector(elementSelector + ' span');
            const cursorElement = document.querySelector(elementSelector); // To toggle cursor visibility maybe
            if (!targetElement) return;

            let textIndex = 0;
            let charIndex = 0;
            let isDeleting = false;

            function type() {
                const currentText = texts[textIndex];
                let displayText = '';

                if (isDeleting) {
                    displayText = currentText.substring(0, charIndex - 1);
                    charIndex--;
                } else {
                    displayText = currentText.substring(0, charIndex + 1);
                    charIndex++;
                }

                targetElement.textContent = displayText;
                targetElement.style.visibility = 'visible'; // Make text visible

                let typingSpeed = isDeleting ? eraseSpeed : typeSpeed;

                if (!isDeleting && charIndex === currentText.length) {
                    // Finished typing word
                    typingSpeed = delay; // Pause at end
                    isDeleting = true;
                } else if (isDeleting && charIndex === 0) {
                    // Finished deleting word
                    isDeleting = false;
                    textIndex = (textIndex + 1) % texts.length; // Move to next text
                    typingSpeed = typeSpeed * 2; // Pause before typing next
                }

                setTimeout(type, typingSpeed);
            }
             // Start the animation
             setTimeout(type, typeSpeed); // Initial delay before starting
        }


        // --- Accessibility Menu ---
         const accButton = document.getElementById('accessibility-button');
         const accMenu = document.getElementById('accessibility-menu');

         if (accButton && accMenu) {
             accButton.addEventListener('click', (e) => {
                 e.stopPropagation();
                 accMenu.classList.toggle('active');
             });

             // Close menu if clicking outside
             document.addEventListener('click', (e) => {
                 if (!accMenu.contains(e.target) && !accButton.contains(e.target)) {
                     accMenu.classList.remove('active');
                 }
             });

             // Handle menu option clicks
             accMenu.addEventListener('click', (e) => {
                 const option = e.target.closest('.accessibility-option');
                 if (!option) return;

                 const action = option.dataset.action;
                 if (action === 'toggleTheme') {
                     toggleTheme();
                 } else if (action === 'changeFont') {
                     changeFontSize(parseFloat(option.dataset.amount) || 'reset');
                 } else if (action === 'toggleClass') {
                     document.querySelector(option.dataset.target).classList.toggle(option.dataset.class);
                 } 
                 // Optional: Close menu after selection
                 // accMenu.classList.remove('active');
             });
         }

        // Accessibility Functions
         function toggleTheme() {
             const body = document.body;
             body.classList.toggle('light-theme');
             const isLight = body.classList.contains('light-theme');
             document.getElementById('acc-theme-label').textContent = isLight ? 'Light Mode' : 'Dark Mode';
             // Optional: Store preference in localStorage
             localStorage.setItem('theme', isLight ? 'light' : 'dark');
         }

         function changeFontSize(amount) {
             const root = document.documentElement;
             let currentScale = parseFloat(getComputedStyle(root).getPropertyValue('--font-scale'));
             if (amount === 'reset') {
                 currentScale = 1.0;
             } else {
                 currentScale += amount;
                 currentScale = Math.max(0.7, Math.min(1.5, currentScale)); // Clamp font size
             }
             root.style.setProperty('--font-scale', currentScale);
             localStorage.setItem('fontScale', currentScale);
         }



         // Apply stored preferences on load
         document.addEventListener('DOMContentLoaded', () => {
             // Theme
             const storedTheme = localStorage.getItem('theme');
             if (storedTheme === 'light') {
                 document.body.classList.add('light-theme');
                 document.getElementById('acc-theme-label').textContent = 'Light Mode';
             }

             // Font Size
             const storedScale = localStorage.getItem('fontScale');
             if (storedScale) {
                 document.documentElement.style.setProperty('--font-scale', parseFloat(storedScale));
             }

              // Big Cursor
             const storedBigCursor = localStorage.getItem('bigCursor') === 'true';
             if (storedBigCursor) {
                 const cursorStyle = 'url("path/to/big-cursor.png"), auto'; // Replace path
                 document.documentElement.style.setProperty('--cursor-size', cursorStyle);
                 document.body.style.cursor = cursorStyle; // Apply immediately
             }

             // Apply other toggled classes if stored (e.g., invert)
             // if (localStorage.getItem('invertColors') === 'true') { document.body.classList.add('invert-colors'); }
             // ... etc for other toggles

            // --- Activate Page-Specific Scripts ---
            const pageId = document.body.dataset.pageId; // Add data-page-id="home/about/etc" to body tag

            if (pageId === 'home') {
                 initHomePage();
            } else if (pageId === 'about') {
                 initAboutPage();
            } else if (pageId === 'blogs') {
                initBlogsPage();
            } else if (pageId === 'certification') {
                 initCertificationPage();
            }
            // Add more pages as needed

         });


        // --- Certification Details Toggle ---
        function initCertificationPage() {
            const certItems = document.querySelectorAll('.cert-item');
            certItems.forEach(item => {
                item.addEventListener('click', () => {
                     // Optional: Close other items when one is opened
                     certItems.forEach(otherItem => {
                         if (otherItem !== item && otherItem.classList.contains('active')) {
                             otherItem.classList.remove('active');
                         }
                     });
                    // Toggle the clicked item
                    item.classList.toggle('active');
                });
            });
        }

        // Placeholder for search/filter logic on blogs page
        function filterAndSortPosts() {
             console.log("Filtering/sorting posts...");
             // Implement actual filtering logic based on search input and sort dropdown
        }


        // === Page Specific JS Initialization Functions ===

        function initHomePage() {
            console.log("Initializing Home Page JS");
            // Add span wrappers for letter animation (if not done in HTML)
            const welcomeTitle = document.querySelector('#welcome-title'); // Give your title an ID
            if (welcomeTitle && !welcomeTitle.querySelector('span')) { // Only wrap if not already wrapped
                 const text = welcomeTitle.textContent;
                 welcomeTitle.innerHTML = ''; // Clear existing text
                 text.split('').forEach(char => {
                     const span = document.createElement('span');
                     span.textContent = char === ' ' ? '\u00A0' : char; // Handle spaces
                     welcomeTitle.appendChild(span);
                 });
                 welcomeTitle.classList.add('blinking-text-letters'); // Add class for CSS animation
            }
             handleBlinkingText('.blinking-text-letters', 5000);
        }

        function initAboutPage() {
             console.log("Initializing About Page JS");
             // Title Animation (Words)
             const aboutTitle = document.querySelector('#about-title'); // Give title an ID
             if (aboutTitle && !aboutTitle.querySelector('span')) {
                 const text = aboutTitle.textContent;
                 aboutTitle.innerHTML = '';
                 text.split(' ').forEach(word => {
                     const span = document.createElement('span');
                     span.textContent = word;
                     aboutTitle.appendChild(span);
                     aboutTitle.appendChild(document.createTextNode(' ')); // Add space back
                 });
                  aboutTitle.classList.add('blinking-text-words');
             }
            handleBlinkingText('.blinking-text-words', 5000);

             // Subtitle Typing Animation
             const subtitles = ["Programmer", "Developer", "Designer", "Freelancer", "Forestry Student"]; // Add your roles
             typeEffect('.typing-subtitle', subtitles);
        }

        function initBlogsPage() {
             console.log("Initializing Blogs Page JS");
             generateBlogPostList(); // Generate list from posts.js data

             const searchInput = document.getElementById('blog-search');
             const sortSelect = document.getElementById('blog-sort');

             if (searchInput) searchInput.addEventListener('input', filterAndSortPosts);
             if (sortSelect) sortSelect.addEventListener('change', filterAndSortPosts);

        }



            // Function to toggle theme changer button

        document.addEventListener('DOMContentLoaded', function() {
            const themeToggle = document.getElementById('themeToggle');
            const body = document.body;
            const themeText = document.getElementById('themeText');
        
            // Function to set the theme
            function setTheme(theme) {
                if (theme === 'dark') {
                    body.classList.add('dark-theme');
                    themeText.textContent = 'Light theme';
                    themeToggle.checked = true;
                } else {
                    body.classList.remove('dark-theme');
                    themeText.textContent = 'Dark theme';
                    themeToggle.checked = false;
                }
                localStorage.setItem('theme', theme);
            }
        
            // Check for saved theme on page load
            const savedTheme = localStorage.getItem('theme');
            if (savedTheme) {
                setTheme(savedTheme);
            } else {
                // Default to light theme
                setTheme('light');
            }
        
            // Toggle theme on switch change
            themeToggle.addEventListener('change', function() {
                if (this.checked) {
                    setTheme('dark');
                } else {
                    setTheme('light');
                }
            });
        });















        // --- Date Display and Language Toggle ---
        // Function to display current date and toggle language 
document.addEventListener('DOMContentLoaded', function() {
  const dateElement = document.getElementById('current-date');
  const languageButton = document.getElementById('language-toggle');
  let isEnglish = true; // Initial language state

  function updateDate() {
    const now = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    const formattedDate = now.toLocaleDateString(undefined, options);
    dateElement.textContent = formattedDate;
  }

  // Update date initially
  updateDate();

  // Optionally, update the date periodically (e.g., every minute)
  // setInterval(updateDate, 60000);

  languageButton.addEventListener('click', function() {
    isEnglish = !isEnglish;
    languageButton.textContent = isEnglish ? 'EN' : 'BN';
    // In a real application, you would trigger content language change here
    console.log('Language toggled to:', isEnglish ? '<i class="fas fa-globe"></i> EN' : '<i class="fas fa-globe"></i> BN');
  });
});








let slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides(slideIndex += n);
}

function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
}

// Automatic Slideshow functionality
let autoSlideInterval = setInterval(function() {
  plusSlides(1);
}, 3000); // Change image every 3 seconds

// Pause automatic slideshow on manual navigation
function stopAutoSlide() {
  clearInterval(autoSlideInterval);
}

// Resume automatic slideshow
function startAutoSlide() {
  autoSlideInterval = setInterval(function() {
    plusSlides(1);
  }, 3000);
}

// Modify button clicks to stop and then potentially restart auto slide
let prevButton = document.querySelector(".prev");
let nextButton = document.querySelector(".next");
let dotsElements = document.querySelectorAll(".dot");

prevButton.addEventListener('click', function() {
  stopAutoSlide();
  // Optionally restart after a delay or only on another interaction
  // setTimeout(startAutoSlide, 5000);
});

nextButton.addEventListener('click', function() {
  stopAutoSlide();
  // Optionally restart after a delay
  // setTimeout(startAutoSlide, 5000);
});

dotsElements.forEach(dot => {
  dot.addEventListener('click', function() {
    stopAutoSlide();
    // Optionally restart after a delay
    // setTimeout(startAutoSlide, 5000);
  });
});






// Get the button
let mybutton = document.getElementById("gototop");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}







const roles = [
    "Forestry Expert",
    "Programmer",
    "Full-stack Software Developer",
    "Software Engineer",
    "Frontend Developer",
    "Backend Developer",
    "Artificial Intelligence Developer",
    "Artificial Intelligence Engineer",
    "Machine Learning Specialist",
    "Android Developer",
    "iOS Developer",
    "Data Scientist",
    "Cybersecurity Specialist",
    "Data Analyst",
    "Data Engineer",
    "Security Analyst",
    "Network Security Engineer",
    "WEB Developer",
    "WEB Designer",
    "UI/UX Designer",
    "Graphic Designer",
    "Editor",
    "Computer Programmer",
    "Computer Engineer",
    "Networking Expert",
  ];
  
  const typedTextSpan = document.querySelector(".typed-text");
  const typingContainer = document.querySelector(".typing-container");
  const cursorSpan = document.querySelector(".typing-cursor");
  
  let roleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typingDelay = 150;
  const deletingDelay = 50;
  const newTextDelay = 1500;
  
  function type() {
    if (isDeleting) {
      typedTextSpan.textContent = roles[roleIndex].substring(0, charIndex - 1);
      charIndex--;
    } else {
      typedTextSpan.textContent = roles[roleIndex].substring(0, charIndex + 1);
      charIndex++;
    }
  
    if (!isDeleting && charIndex === roles[roleIndex].length) {
      isDeleting = true;
      setTimeout(type, newTextDelay);
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      setTimeout(type, 500);
    } else {
      setTimeout(type, isDeleting ? deletingDelay : typingDelay);
    }
  }
  
  document.addEventListener("DOMContentLoaded", function() {
    setTimeout(type, 1000); // Start typing after a short delay
  });












  let nextButton1 = document.querySelector('.newnext');
  let prevButton1 = document.querySelector('.newprev');
  let items = document.querySelectorAll('.newitem');
  let currentIndex = 0;

  function showSlide(index) {
    // Hide all slides
    items.forEach(item => item.classList.remove('active'));
    // Show the slide at the given index
    items[index].classList.add('active');
  }

  function nextSlide() {
    currentIndex = (currentIndex + 1) % items.length; // Wrap around to the beginning
    showSlide(currentIndex);
  }

  function prevSlide() {
    currentIndex = (currentIndex - 1 + items.length) % items.length; // Wrap around to the end
    showSlide(currentIndex);
  }

  nextButton1.addEventListener('click', nextSlide);
  prevButton1.addEventListener('click', prevSlide);

  // Show the initial slide
  showSlide(currentIndex);







  

  function showWelcomePopup() {
    // Check if the user has visited before
    if (!localStorage.getItem('hasVisited')) {
      // Set the flag that the user has now visited
      localStorage.setItem('hasVisited', 'true');

      // Display the popup
      
      hellonameFunction();
    }   
    }
  

  function hellonameFunction() {
    let text;
    let person = prompt("Hi there!\n What is your name?", "");
    if (person == null || person == "") {
      alert("No problem. Best of luck!");
    } else {
      alert("Hello " + person + "!\n Welcome to my website.\n I hope you enjoy your stay here.\n\n Best of luck for your future endeavors!\n");
    }
    
  }







  function certFunction() {
    
    
  if (confirm("Go to my LinkedIn Profile to Verify Certificate!\n\n Countinue?")) {
    return true;
  } else {
    return false;
  }
}



function langFunc() {
    
    
  if (confirm("This option is not available right now.\n\n It's under construction.......\n So, please stay tuned for more updates!\n Thank you for your patience!") ){
    return true;
  } else {
    return false;
  }
}

function udemyFunction() {
    
    
  if (confirm("Visit Udemy Learner Profile to view the list of enrolled courses!\nTo view details, you need to SingUp/LogIn Udemy website.\n\n Countinue?")) {
    return true;
  } else {
    return false;
  }
}


function courseraFunction() {
    
    
  if (confirm("Visit Coursera Learner Profile to view details!\n\n Countinue?")) {
    return true;
  } else {
    return false;
  }
}


function noprofileFunction() {
  alert("Sorry! I don't have a profile yet on this plartform.\n But I am working on it.\n So, please stay tuned for more updates!\n Thank you for your patience!");
}


function nopageFunction() {
  alert("Sorry! This page isn't available right now.\n\n It's under construction.......\n So, please stay tuned for more updates!\n Thank you for your patience!");
}








document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.getElementById('contactForm');

  if (contactForm) {
      contactForm.addEventListener('submit', function(event) {
          event.preventDefault();
          // You would typically handle form submission here,
          // like sending data to a server.
          alert('Message sent (not actually implemented)!');
          contactForm.reset();
      });
  }
});




function updateTime() {
  const now = new Date();
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  document.getElementById('current-time').textContent = `${hours}:${minutes}`;
}







        // Add more init functions as needed...

        