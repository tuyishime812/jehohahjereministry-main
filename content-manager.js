// Content Manager Script
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
        const logoElements = document.querySelectorAll('img[src*="logo"], .logo img');
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

    // Check for custom hero background
    const customHeroBg = localStorage.getItem('customHeroBg');
    if(customHeroBg) {
        // Update hero background
        const heroBgElements = document.querySelectorAll('.hero-bg');
        if(heroBgElements.length > 0) {
            heroBgElements.forEach(hero => {
                hero.style.background = `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('${customHeroBg}')`;
                hero.style.backgroundSize = 'cover';
                hero.style.backgroundPosition = 'center';
            });
        } else {
            // If no hero-bg class found, try alternative selectors
            const bannerElements = document.querySelectorAll('[class*="hero"], [class*="banner"]');
            bannerElements.forEach(banner => {
                banner.style.background = `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('${customHeroBg}')`;
                banner.style.backgroundSize = 'cover';
                banner.style.backgroundPosition = 'center';
            });
        }
    }
}

// Function to load custom contact information
function loadContactInfo() {
    // Load phone numbers
    const phoneNumbers = JSON.parse(localStorage.getItem('phoneNumbers') || '[]');
    if(phoneNumbers.length > 0) {
        const phoneLinks = document.querySelectorAll('a[href*="tel:"]');
        phoneLinks.forEach((link, index) => {
            if(index < phoneNumbers.length) {
                link.href = `tel:${phoneNumbers[index]}`;
                // Update the text content if it contains a phone number
                if(link.textContent.match(/\+?\d[\d\s\-\(\)]+\d/)) {
                    link.textContent = phoneNumbers[index];
                }
            }
        });
        
        // Update contact display elements
        const contactDisplays = document.querySelectorAll('.contact-number, .phone-number, [data-contact-type="phone"]');
        contactDisplays.forEach((display, index) => {
            if(index < phoneNumbers.length) {
                display.textContent = phoneNumbers[index];
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
    if(contentMap[currentPage]) {
        const customContent = localStorage.getItem(contentMap[currentPage]);
        if(customContent) {
            // For each page, target specific sections to replace
            switch(currentPage) {
                case 'index':
                    // Replace hero section content
                    const heroSection = document.querySelector('#home .max-w-7xl');
                    if(heroSection) {
                        heroSection.innerHTML = customContent;
                    } else {
                        // If specific selector doesn't exist, try alternative selectors
                        const heroSectionAlt = document.querySelector('#home .pt-24.pb-20');
                        if(heroSectionAlt) {
                            heroSectionAlt.innerHTML = `<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">${customContent}</div>`;
                        } else {
                            // Last resort - try to find the main content area
                            const mainContentEl = document.querySelector('main') || document.querySelector('.content') || document.querySelector('.main-content');
                            if(mainContentEl) {
                                mainContentEl.innerHTML = customContent;
                            }
                        }
                    }
                    break;

                case 'about':
                    // Replace about section content
                    const aboutSection = document.querySelector('#about .max-w-7xl');
                    if(aboutSection) {
                        aboutSection.innerHTML = customContent;
                    } else {
                        // If specific selector doesn't exist, try alternative selectors
                        const aboutSectionAlt = document.querySelector('#about .py-16');
                        if(aboutSectionAlt) {
                            aboutSectionAlt.innerHTML = `<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">${customContent}</div>`;
                        } else {
                            // Last resort - try to find the main content area
                            const mainContentEl = document.querySelector('main') || document.querySelector('.content') || document.querySelector('.main-content');
                            if(mainContentEl) {
                                mainContentEl.innerHTML = customContent;
                            }
                        }
                    }
                    break;

                case 'contact':
                    // Replace contact section content
                    const contactSection = document.querySelector('#contact .max-w-7xl');
                    if(contactSection) {
                        contactSection.innerHTML = customContent;
                    } else {
                        // If specific selector doesn't exist, try alternative selectors
                        const contactSectionAlt = document.querySelector('#contact .py-16');
                        if(contactSectionAlt) {
                            contactSectionAlt.innerHTML = `<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">${customContent}</div>`;
                        } else {
                            // Last resort - try to find the main content area
                            const mainContentEl = document.querySelector('main') || document.querySelector('.content') || document.querySelector('.main-content');
                            if(mainContentEl) {
                                mainContentEl.innerHTML = customContent;
                            }
                        }
                    }
                    break;

                case 'missions':
                    // Replace missions section content
                    const missionsSection = document.querySelector('#missions .max-w-7xl');
                    if(missionsSection) {
                        missionsSection.innerHTML = customContent;
                    } else {
                        // If specific selector doesn't exist, try alternative selectors
                        const missionsSectionAlt = document.querySelector('#missions .py-16');
                        if(missionsSectionAlt) {
                            missionsSectionAlt.innerHTML = `<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">${customContent}</div>`;
                        } else {
                            // Last resort - try to find the main content area
                            const mainContentEl = document.querySelector('main') || document.querySelector('.content') || document.querySelector('.main-content');
                            if(mainContentEl) {
                                mainContentEl.innerHTML = customContent;
                            }
                        }
                    }
                    break;

                case 'team':
                    // Replace team section content
                    const teamSection = document.querySelector('#team .max-w-7xl');
                    if(teamSection) {
                        teamSection.innerHTML = customContent;
                    } else {
                        // If specific selector doesn't exist, try alternative selectors
                        const teamSectionAlt = document.querySelector('#team .py-16');
                        if(teamSectionAlt) {
                            teamSectionAlt.innerHTML = `<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">${customContent}</div>`;
                        } else {
                            // Last resort - try to find the main content area
                            const mainContentEl = document.querySelector('main') || document.querySelector('.content') || document.querySelector('.main-content');
                            if(mainContentEl) {
                                mainContentEl.innerHTML = customContent;
                            }
                        }
                    }
                    break;

                case 'gallery':
                    // Replace gallery section content
                    const gallerySection = document.querySelector('#gallery .max-w-7xl');
                    if(gallerySection) {
                        gallerySection.innerHTML = customContent;
                    } else {
                        // If specific selector doesn't exist, try alternative selectors
                        const gallerySectionAlt = document.querySelector('#gallery .py-16');
                        if(gallerySectionAlt) {
                            gallerySectionAlt.innerHTML = `<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">${customContent}</div>`;
                        } else {
                            // Last resort - try to find the main content area
                            const mainContentEl = document.querySelector('main') || document.querySelector('.content') || document.querySelector('.main-content');
                            if(mainContentEl) {
                                mainContentEl.innerHTML = customContent;
                            }
                        }
                    }
                    break;

                default:
                    // Fallback for any other content areas
                    const contentAreas = [
                        document.querySelector('.main-content'),
                        document.querySelector('main'),
                        document.querySelector('.content'),
                        document.body
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