// Simple Content Manager for Jehovah Jire Ministry
// This script loads custom content from localStorage and applies it to the website

// Helper function to get current page name
function getCurrentPageName() {
    const path = window.location.pathname;
    const page = path.split('/').pop().split('.')[0] || 'index';
    return page;
}

// Function to load custom images
function loadCustomImages() {
    // Check for custom logo
    const customLogo = localStorage.getItem('customLogo');
    if(customLogo) {
        // Update logo in navigation
        const logoElements = document.querySelectorAll('img[src*="logo"], .logo img, [src*="1768200744316"]');
        if(logoElements.length > 0) {
            logoElements.forEach(img => {
                img.src = customLogo;
            });
        } else {
            // If no specific logo element found, try to find any image in the header
            const headerImgs = document.querySelectorAll('header img, nav img');
            headerImgs.forEach(img => {
                img.src = customLogo;
            });
        }
    }

    // Check for custom hero image
    const customHeroBg = localStorage.getItem('customHeroBg');
    if(customHeroBg) {
        // Update hero background
        const heroBgElements = document.querySelectorAll('.hero-bg, .hero, .banner');
        if(heroBgElements.length > 0) {
            heroBgElements.forEach(hero => {
                hero.style.background = `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('${customHeroBg}')`;
                hero.style.backgroundSize = 'cover';
                hero.style.backgroundPosition = 'center';
            });
        }
    }
}

// Function to load custom content for the current page
function loadCustomContent() {
    // Check if we have custom content for this page
    const currentPage = getCurrentPageName();

    // Map page names to content IDs
    const contentMap = {
        'index': 'homeContent',
        'about': 'aboutContent',
        'contact': 'contactContent',
        'missions': 'missionsContent',
        'team': 'teamContent',
        'gallery': 'galleryContent'
    };

    // If we have custom content for this page, load it
    if (contentMap[currentPage]) {
        const customContent = localStorage.getItem(contentMap[currentPage]);
        
        if (customContent) {
            // For each page, target specific sections to replace
            switch(currentPage) {
                case 'index':
                    // Replace hero section content
                    const heroSection = document.querySelector('#home .max-w-7xl') || 
                                       document.querySelector('#home .pt-24.pb-20') ||
                                       document.querySelector('#home .pt-20.pb-16') ||
                                       document.querySelector('#home');
                    if(heroSection) {
                        heroSection.innerHTML = customContent;
                    }
                    break;

                case 'about':
                    // Replace about section content
                    const aboutSection = document.querySelector('#about .max-w-7xl') || 
                                        document.querySelector('#about .py-16') ||
                                        document.querySelector('#about');
                    if(aboutSection) {
                        aboutSection.innerHTML = customContent;
                    }
                    break;

                case 'contact':
                    // Replace contact section content
                    const contactSection = document.querySelector('#contact .max-w-7xl') || 
                                         document.querySelector('#contact .py-16') ||
                                         document.querySelector('#contact');
                    if(contactSection) {
                        contactSection.innerHTML = customContent;
                    }
                    break;

                case 'missions':
                    // Replace missions section content
                    const missionsSection = document.querySelector('#missions .max-w-7xl') || 
                                          document.querySelector('#missions .py-16') ||
                                          document.querySelector('#missions');
                    if(missionsSection) {
                        missionsSection.innerHTML = customContent;
                    }
                    break;

                case 'team':
                    // Replace team section content
                    const teamSection = document.querySelector('#team .max-w-7xl') || 
                                      document.querySelector('#team .py-16') ||
                                      document.querySelector('#team');
                    if(teamSection) {
                        teamSection.innerHTML = customContent;
                    }
                    break;

                case 'gallery':
                    // Replace gallery section content
                    const gallerySection = document.querySelector('#gallery .max-w-7xl') || 
                                         document.querySelector('#gallery .py-16') ||
                                         document.querySelector('#gallery');
                    if(gallerySection) {
                        gallerySection.innerHTML = customContent;
                    }
                    break;

                default:
                    // Fallback for any other content areas
                    const contentAreas = [
                        document.querySelector('.main-content'),
                        document.querySelector('main'),
                        document.querySelector('.content'),
                        document.querySelector('body')
                    ];

                    for(const area of contentAreas) {
                        if(area) {
                            area.innerHTML = customContent;
                            break;
                        }
                    }
            }
        }
    }
}

// Function to load contact information
function loadContactInfo() {
    // Load phone numbers
    const phoneNumbers = JSON.parse(localStorage.getItem('phoneNumbers') || '[]');
    if(phoneNumbers.length > 0) {
        // Update phone links
        const phoneLinks = document.querySelectorAll('a[href*="tel:"]');
        phoneLinks.forEach((link, index) => {
            if(index < phoneNumbers.length) {
                const cleanNumber = phoneNumbers[index].replace(/\D/g, ''); // Remove non-digit characters
                link.href = `tel:+${cleanNumber}`;
                // Update text if it contains a phone number
                if(link.textContent.trim().match(/\d/)) {
                    link.textContent = phoneNumbers[index];
                }
            }
        });
        
        // Update any elements with phone number classes
        const phoneElements = document.querySelectorAll('.phone-number, .contact-number, [data-contact-type="phone"]');
        phoneElements.forEach((element, index) => {
            if(index < phoneNumbers.length) {
                element.textContent = phoneNumbers[index];
            }
        });
    }
    
    // Load WhatsApp numbers
    const whatsappNumbers = JSON.parse(localStorage.getItem('whatsappNumbers') || '[]');
    if(whatsappNumbers.length > 0) {
        const whatsappLinks = document.querySelectorAll('a[href*="wa.me"], a[href*="api.whatsapp"]');
        whatsappLinks.forEach((link, index) => {
            if(index < whatsappNumbers.length) {
                const cleanNumber = whatsappNumbers[index].replace(/\D/g, '');
                link.href = `https://wa.me/${cleanNumber}`;
            }
        });
    }
}

// Admin login function (for convenience)
function goToAdminPanel() {
    window.location.href = 'admin.html';
}

// Function to update content across all pages
function updatePageContent(pageName, content) {
    localStorage.setItem(pageName, content);
    
    // If this is the current page, update it immediately
    if(getCurrentPageName() === pageName.replace('Content', '')) {
        location.reload();
    }
}

// Load content when the page is ready
document.addEventListener('DOMContentLoaded', function() {
    loadCustomContent();
    loadCustomImages();
    loadContactInfo();
    
    // Add a small delay to ensure all content is loaded
    setTimeout(function() {
        loadCustomContent();
        loadCustomImages();
        loadContactInfo();
    }, 100);
});