// Enhanced Content Manager with Supabase Storage Integration
// This script loads custom content from Supabase with localStorage fallback

// Supabase Configuration
const SUPABASE_URL = 'https://jkdysayryayshootssos.supabase.co'; // Replace with your Supabase project URL
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImprZHlzYXlyeWF5c2hvb3Rzc29zIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg4MjgyNDcsImV4cCI6MjA4NDQwNDI0N30.m3Bs7b-v_GatM_9NOh7g_T-Gekc22w1tOwQeehkVweE'; // Replace with your Supabase anon key

// Initialize Supabase client
const { createClient } = supabase;
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY);

// Helper function to get current page name
function getCurrentPageName() {
    const path = window.location.pathname;
    const page = path.split('/').pop().split('.')[0] || 'index';
    return page;
}

// Function to load custom images from Supabase with localStorage fallback
async function loadCustomImages() {
    try {
        // Try to get images from Supabase first
        const { data, error } = await supabaseClient
            .from('media')
            .select('key, value')
            .in('key', ['customLogo', 'customHeroBg']);

        if (error) {
            console.error('Error loading images from Supabase:', error);
            // Fallback to localStorage if Supabase fails
            loadCustomImagesFromLocalStorage();
            return;
        }

        const mediaMap = {};
        if (data) {
            data.forEach(item => {
                mediaMap[item.key] = item.value;
            });
        }

        // Check for custom logo
        const customLogo = mediaMap.customLogo || localStorage.getItem('customLogo');
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
        const customHeroBg = mediaMap.customHeroBg || localStorage.getItem('customHeroBg');
        if(customHeroBg) {
            // Update hero background
            const heroBgElements = document.querySelectorAll('.hero-bg, .hero, .banner');
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
    } catch (error) {
        console.error('Error in loadCustomImages:', error);
        // Fallback to localStorage if Supabase fails
        loadCustomImagesFromLocalStorage();
    }
}

// Fallback function to load images from localStorage
function loadCustomImagesFromLocalStorage() {
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

// Function to load contact information from Supabase with localStorage fallback
async function loadContactInfo() {
    try {
        // Try to get contact info from Supabase first
        const { data, error } = await supabaseClient
            .from('contact_info')
            .select('*')
            .eq('is_active', true)
            .order('sort_order');

        if (error) {
            console.error('Error loading contact info from Supabase:', error);
            // Fallback to localStorage if Supabase fails
            loadContactInfoFromLocalStorage();
            return;
        }

        // Update contact information on the page
        if (data && data.length > 0) {
            // Update phone numbers
            const phoneNumbers = data.filter(item => item.contact_type === 'phone');
            if(phoneNumbers.length > 0) {
                const phoneLinks = document.querySelectorAll('a[href*="tel:"]');
                phoneLinks.forEach((link, index) => {
                    if(index < phoneNumbers.length) {
                        const cleanNumber = phoneNumbers[index].contact_value.replace(/\D/g, ''); // Remove non-digit characters
                        link.href = `tel:+${cleanNumber}`;
                        // Update text if it contains a phone number
                        if(link.textContent.trim().match(/\d/)) {
                            link.textContent = phoneNumbers[index].contact_value;
                        }
                    }
                });
                
                // Update any elements with phone number classes
                const phoneElements = document.querySelectorAll('.phone-number, .contact-number, [data-contact-type="phone"]');
                phoneElements.forEach((element, index) => {
                    if(index < phoneNumbers.length) {
                        element.textContent = phoneNumbers[index].contact_value;
                    }
                });
            }
            
            // Update WhatsApp numbers
            const whatsappNumbers = data.filter(item => item.contact_type === 'whatsapp');
            if(whatsappNumbers.length > 0) {
                const whatsappLinks = document.querySelectorAll('a[href*="wa.me"], a[href*="api.whatsapp"]');
                whatsappLinks.forEach((link, index) => {
                    if(index < whatsappNumbers.length) {
                        const cleanNumber = whatsappNumbers[index].contact_value.replace(/\D/g, '');
                        link.href = `https://wa.me/${cleanNumber}`;
                    }
                });
            }
        }
    } catch (error) {
        console.error('Error in loadContactInfo:', error);
        // Fallback to localStorage if Supabase fails
        loadContactInfoFromLocalStorage();
    }
}

// Fallback function to load contact info from localStorage
function loadContactInfoFromLocalStorage() {
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

// Function to load custom content for the current page from Supabase with localStorage fallback
async function loadCustomContent() {
    try {
        // Check if we have custom content for this page
        const currentPage = getCurrentPageName();

        // Map page names to content IDs
        const contentMap = {
            'index': 'home',
            'about': 'about',
            'contact': 'contact',
            'missions': 'missions',
            'team': 'team',
            'gallery': 'gallery'
        };

        // Try to get content from Supabase first
        if (contentMap[currentPage]) {
            const { data, error } = await supabaseClient
                .from('content')
                .select('page, section, element_id, content, content_type')
                .eq('page', contentMap[currentPage])
                .order('sort_order');

            if (error) {
                console.error(`Error loading ${currentPage} content from Supabase:`, error);
                // Fallback to localStorage if Supabase fails
                loadCustomContentFromLocalStorage();
                return;
            }

            if (data && data.length > 0) {
                data.forEach(item => {
                    // If element_id is specified, target that specific element
                    if (item.element_id) {
                        const targetElement = document.getElementById(item.element_id);
                        if (targetElement) {
                            if (item.content_type === 'html') {
                                targetElement.innerHTML = item.content;
                            } else {
                                targetElement.textContent = item.content;
                            }
                        }
                    } else {
                        // For backward compatibility, use the old method
                        if (item.section === 'main') {
                            // For each page, target specific sections to replace
                            switch(currentPage) {
                                case 'index':
                                    // Replace hero section content
                                    const heroSection = document.querySelector('#home .max-w-7xl') ||
                                                       document.querySelector('#home .pt-24.pb-20') ||
                                                       document.querySelector('#home .pt-20.pb-16') ||
                                                       document.querySelector('#home');
                                    if(heroSection) {
                                        heroSection.innerHTML = item.content;
                                    }
                                    break;

                                case 'about':
                                    // Replace about section content
                                    const aboutSection = document.querySelector('#about .max-w-7xl') ||
                                                        document.querySelector('#about .py-16') ||
                                                        document.querySelector('#about');
                                    if(aboutSection) {
                                        aboutSection.innerHTML = item.content;
                                    }
                                    break;

                                case 'contact':
                                    // Replace contact section content
                                    const contactSection = document.querySelector('#contact .max-w-7xl') ||
                                                         document.querySelector('#contact .py-16') ||
                                                         document.querySelector('#contact');
                                    if(contactSection) {
                                        contactSection.innerHTML = item.content;
                                    }
                                    break;

                                case 'missions':
                                    // Replace missions section content
                                    const missionsSection = document.querySelector('#missions .max-w-7xl') ||
                                                          document.querySelector('#missions .py-16') ||
                                                          document.querySelector('#missions');
                                    if(missionsSection) {
                                        missionsSection.innerHTML = item.content;
                                    }
                                    break;

                                case 'team':
                                    // Replace team section content
                                    const teamSection = document.querySelector('#team .max-w-7xl') ||
                                                      document.querySelector('#team .py-16') ||
                                                      document.querySelector('#team');
                                    if(teamSection) {
                                        teamSection.innerHTML = item.content;
                                    }
                                    break;

                                case 'gallery':
                                    // Replace gallery section content
                                    const gallerySection = document.querySelector('#gallery .max-w-7xl') ||
                                                         document.querySelector('#gallery .py-16') ||
                                                         document.querySelector('#gallery');
                                    if(gallerySection) {
                                        gallerySection.innerHTML = item.content;
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
                                            area.innerHTML = item.content;
                                            break;
                                        }
                                    }
                            }
                        }
                    }
                });
            }
        }
    } catch (error) {
        console.error(`Error loading ${currentPage} content:`, error);
        // Fallback to localStorage if Supabase fails
        loadCustomContentFromLocalStorage();
    }
}

// Fallback function to load content from localStorage
function loadCustomContentFromLocalStorage() {
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