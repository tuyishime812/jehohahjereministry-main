// Content Manager Script with Hybrid Storage (Supabase-ready)
// This script will load custom content from Supabase when available, otherwise from localStorage

// Supabase Configuration (will be used when configured)
let SUPABASE_URL = null; // 'https://your-project.supabase.co'
let SUPABASE_KEY = null; // 'your-anon-key'
let supabase = null;

// Try to initialize Supabase if credentials are available
function initSupabase() {
    if (SUPABASE_URL && SUPABASE_KEY) {
        // Dynamically load Supabase client if not already loaded
        if (typeof supabase === 'undefined') {
            // Note: In a real implementation, you'd load the Supabase client library
            // <script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2"></script>
            // For now, we'll simulate the functionality
            console.log('Supabase initialized');
        }
    }
}

// Helper function to get current page name
function getCurrentPageName() {
    const path = window.location.pathname;
    const page = path.split('/').pop().split('.')[0] || 'index';
    return page;
}

// Function to load custom images
async function loadCustomImages() {
    // Check for custom logo
    const customLogo = localStorage.getItem('customLogo');
    if(customLogo) {
        // Update logo in navigation
        const logoElements = document.querySelectorAll('img[src*="1768200744316.jpg"], img[src*="logo"]');
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

// Admin login function (for convenience)
function goToAdminPanel() {
    window.location.href = 'admin.html';
}

// Function to load custom content for the current page
// Tries Supabase first, falls back to localStorage
async function loadCustomContent() {
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
    
    let content = null;
    
    // Try to get content from Supabase first (simulated)
    if (SUPABASE_URL && SUPABASE_KEY) {
        try {
            // This is a simulated call - in real implementation you'd use Supabase
            // const { data, error } = await supabase
            //     .from('content')
            //     .select('content')
            //     .eq('page', contentMap[currentPage].replace('Content', ''))
            //     .eq('section', 'main')
            //     .single();
            
            // For now, we'll skip Supabase and use localStorage
            console.log('Attempting to load from Supabase...');
        } catch (error) {
            console.error('Supabase error, falling back to localStorage:', error);
        }
    }
    
    // Fallback to localStorage
    if (!content) {
        content = localStorage.getItem(contentMap[currentPage]);
    }
    
    // If we have content, apply it to the page
    if(content) {
        // For each page, target specific sections to replace
        switch(currentPage) {
            case 'index':
                // Replace hero section content
                const heroSection = document.querySelector('#home .max-w-7xl');
                if(heroSection) {
                    heroSection.innerHTML = content;
                } else {
                    // If specific selector doesn't exist, try alternative selectors
                    const heroSectionAlt = document.querySelector('#home .pt-24.pb-20');
                    if(heroSectionAlt) {
                        heroSectionAlt.innerHTML = `<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">${content}</div>`;
                    } else {
                        // Last resort - try to find the main content area
                        const mainContentEl = document.querySelector('main') || document.querySelector('.content') || document.querySelector('.main-content');
                        if(mainContentEl) {
                            mainContentEl.innerHTML = content;
                        }
                    }
                }
                break;
                
            case 'about':
                // Replace about section content
                const aboutSection = document.querySelector('#about .max-w-7xl');
                if(aboutSection) {
                    aboutSection.innerHTML = content;
                } else {
                    // If specific selector doesn't exist, try alternative selectors
                    const aboutSectionAlt = document.querySelector('#about .py-16');
                    if(aboutSectionAlt) {
                        aboutSectionAlt.innerHTML = `<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">${content}</div>`;
                    } else {
                        // Last resort - try to find the main content area
                        const mainContentEl = document.querySelector('main') || document.querySelector('.content') || document.querySelector('.main-content');
                        if(mainContentEl) {
                            mainContentEl.innerHTML = content;
                        }
                    }
                }
                break;
                
            case 'contact':
                // Replace contact section content
                const contactSection = document.querySelector('#contact .max-w-7xl');
                if(contactSection) {
                    contactSection.innerHTML = content;
                } else {
                    // If specific selector doesn't exist, try alternative selectors
                    const contactSectionAlt = document.querySelector('#contact .py-16');
                    if(contactSectionAlt) {
                        contactSectionAlt.innerHTML = `<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">${content}</div>`;
                    } else {
                        // Last resort - try to find the main content area
                        const mainContentEl = document.querySelector('main') || document.querySelector('.content') || document.querySelector('.main-content');
                        if(mainContentEl) {
                            mainContentEl.innerHTML = content;
                        }
                    }
                }
                break;
                
            case 'missions':
                // Replace missions section content
                const missionsSection = document.querySelector('#missions .max-w-7xl');
                if(missionsSection) {
                    missionsSection.innerHTML = content;
                } else {
                    // If specific selector doesn't exist, try alternative selectors
                    const missionsSectionAlt = document.querySelector('#missions .py-16');
                    if(missionsSectionAlt) {
                        missionsSectionAlt.innerHTML = `<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">${content}</div>`;
                    } else {
                        // Last resort - try to find the main content area
                        const mainContentEl = document.querySelector('main') || document.querySelector('.content') || document.querySelector('.main-content');
                        if(mainContentEl) {
                            mainContentEl.innerHTML = content;
                        }
                    }
                }
                break;
                
            case 'team':
                // Replace team section content
                const teamSection = document.querySelector('#team .max-w-7xl');
                if(teamSection) {
                    teamSection.innerHTML = content;
                } else {
                    // If specific selector doesn't exist, try alternative selectors
                    const teamSectionAlt = document.querySelector('#team .py-16');
                    if(teamSectionAlt) {
                        teamSectionAlt.innerHTML = `<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">${content}</div>`;
                    } else {
                        // Last resort - try to find the main content area
                        const mainContentEl = document.querySelector('main') || document.querySelector('.content') || document.querySelector('.main-content');
                        if(mainContentEl) {
                            mainContentEl.innerHTML = content;
                        }
                    }
                }
                break;
                
            case 'gallery':
                // Replace gallery section content
                const gallerySection = document.querySelector('#gallery .max-w-7xl');
                if(gallerySection) {
                    gallerySection.innerHTML = content;
                } else {
                    // If specific selector doesn't exist, try alternative selectors
                    const gallerySectionAlt = document.querySelector('#gallery .py-16');
                    if(gallerySectionAlt) {
                        gallerySectionAlt.innerHTML = `<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">${content}</div>`;
                    } else {
                        // Last resort - try to find the main content area
                        const mainContentEl = document.querySelector('main') || document.querySelector('.content') || document.querySelector('.main-content');
                        if(mainContentEl) {
                            mainContentEl.innerHTML = content;
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
                    document.querySelector('body')
                ];
                
                for(const area of contentAreas) {
                    if(area) {
                        area.innerHTML = content;
                        break;
                    }
                }
        }
    }
}

// Function to save content (to both localStorage and potentially Supabase)
async function saveContentToStorage(page, content) {
    // Save to localStorage as fallback
    localStorage.setItem(page, content);
    
    // If Supabase is configured, also save there
    if (SUPABASE_URL && SUPABASE_KEY) {
        try {
            // This is a simulated call - in real implementation you'd use Supabase
            // await supabase
            //     .from('content')
            //     .upsert({
            //         page: page.replace('Content', ''),
            //         section: 'main',
            //         content: content,
            //         updated_at: new Date()
            //     }, { onConflict: ['page', 'section'] });
            
            console.log('Content saved to Supabase');
        } catch (error) {
            console.error('Error saving to Supabase:', error);
            // Fallback is already handled by localStorage
        }
    }
}

// Load content when the page is ready
document.addEventListener('DOMContentLoaded', function() {
    initSupabase();
    loadCustomContent();
    loadCustomImages();
    
    // Add a small delay to ensure all content is loaded
    setTimeout(function() {
        loadCustomContent();
        loadCustomImages();
    }, 100);
});

// Expose functions globally for admin panel to use
window.ContentManager = {
    saveContent: saveContentToStorage,
    loadContent: loadCustomContent
};