// Supabase Client Initialization
const SUPABASE_URL = 'https://your-project.supabase.co'; // Replace with your Supabase project URL
const SUPABASE_KEY = 'your-anon-key'; // Replace with your Supabase anon key

// Initialize Supabase client
const { createClient } = supabase;
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY);

// Function to get current page name
function getCurrentPageName() {
    const path = window.location.pathname;
    const page = path.split('/').pop().split('.')[0] || 'index';
    return page;
}

// Function to load custom images
async function loadCustomImages() {
    try {
        const { data, error } = await supabaseClient
            .from('media')
            .select('key, value')
            .in('key', ['customLogo', 'customHeroBg']);

        if (error) throw error;

        const mediaMap = {};
        data.forEach(item => {
            mediaMap[item.key] = item.value;
        });

        // Check for custom logo
        const customLogo = mediaMap.customLogo;
        if (customLogo) {
            // Update logo in navigation
            const logoElements = document.querySelectorAll('img[src*="logo"]');
            if (logoElements.length > 0) {
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
        const customHeroBg = mediaMap.customHeroBg;
        if (customHeroBg) {
            // Update hero background
            const heroBgElements = document.querySelectorAll('.hero-bg');
            if (heroBgElements.length > 0) {
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
        console.error('Error loading images from Supabase:', error);
    }
}

// Admin login function (for convenience)
function goToAdminPanel() {
    window.location.href = 'admin.html';
}

// Function to load custom content for the current page from Supabase
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

        // If we have custom content for this page, load it
        if (contentMap[currentPage]) {
            const { data, error } = await supabaseClient
                .from('content')
                .select('page, section, content')
                .eq('page', contentMap[currentPage])
                .eq('section', 'main')
                .single();

            if (error) {
                if (error.code === 'PGRST116') { // Row not found
                    console.log(`No custom content found for ${currentPage}, using default`);
                    return;
                }
                throw error;
            }

            if (data && data.content) {
                // For each page, target specific sections to replace
                switch(currentPage) {
                    case 'index':
                        // Replace hero section content
                        const heroSection = document.querySelector('#home .max-w-7xl');
                        if(heroSection) {
                            heroSection.innerHTML = data.content;
                        } else {
                            // If specific selector doesn't exist, try alternative selectors
                            const heroSectionAlt = document.querySelector('#home .pt-24.pb-20');
                            if(heroSectionAlt) {
                                heroSectionAlt.innerHTML = `<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">${data.content}</div>`;
                            } else {
                                // Last resort - try to find the main content area
                                const mainContentEl = document.querySelector('main') || document.querySelector('.content') || document.querySelector('.main-content');
                                if(mainContentEl) {
                                    mainContentEl.innerHTML = data.content;
                                }
                            }
                        }
                        break;

                    case 'about':
                        // Replace about section content
                        const aboutSection = document.querySelector('#about .max-w-7xl');
                        if(aboutSection) {
                            aboutSection.innerHTML = data.content;
                        } else {
                            // If specific selector doesn't exist, try alternative selectors
                            const aboutSectionAlt = document.querySelector('#about .py-16');
                            if(aboutSectionAlt) {
                                aboutSectionAlt.innerHTML = `<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">${data.content}</div>`;
                            } else {
                                // Last resort - try to find the main content area
                                const mainContentEl = document.querySelector('main') || document.querySelector('.content') || document.querySelector('.main-content');
                                if(mainContentEl) {
                                    mainContentEl.innerHTML = data.content;
                                }
                            }
                        }
                        break;

                    case 'contact':
                        // Replace contact section content
                        const contactSection = document.querySelector('#contact .max-w-7xl');
                        if(contactSection) {
                            contactSection.innerHTML = data.content;
                        } else {
                            // If specific selector doesn't exist, try alternative selectors
                            const contactSectionAlt = document.querySelector('#contact .py-16');
                            if(contactSectionAlt) {
                                contactSectionAlt.innerHTML = `<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">${data.content}</div>`;
                            } else {
                                // Last resort - try to find the main content area
                                const mainContentEl = document.querySelector('main') || document.querySelector('.content') || document.querySelector('.main-content');
                                if(mainContentEl) {
                                    mainContentEl.innerHTML = data.content;
                                }
                            }
                        }
                        break;

                    case 'missions':
                        // Replace missions section content
                        const missionsSection = document.querySelector('#missions .max-w-7xl');
                        if(missionsSection) {
                            missionsSection.innerHTML = data.content;
                        } else {
                            // If specific selector doesn't exist, try alternative selectors
                            const missionsSectionAlt = document.querySelector('#missions .py-16');
                            if(missionsSectionAlt) {
                                missionsSectionAlt.innerHTML = `<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">${data.content}</div>`;
                            } else {
                                // Last resort - try to find the main content area
                                const mainContentEl = document.querySelector('main') || document.querySelector('.content') || document.querySelector('.main-content');
                                if(mainContentEl) {
                                    mainContentEl.innerHTML = data.content;
                                }
                            }
                        }
                        break;

                    case 'team':
                        // Replace team section content
                        const teamSection = document.querySelector('#team .max-w-7xl');
                        if(teamSection) {
                            teamSection.innerHTML = data.content;
                        } else {
                            // If specific selector doesn't exist, try alternative selectors
                            const teamSectionAlt = document.querySelector('#team .py-16');
                            if(teamSectionAlt) {
                                teamSectionAlt.innerHTML = `<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">${data.content}</div>`;
                            } else {
                                // Last resort - try to find the main content area
                                const mainContentEl = document.querySelector('main') || document.querySelector('.content') || document.querySelector('.main-content');
                                if(mainContentEl) {
                                    mainContentEl.innerHTML = data.content;
                                }
                            }
                        }
                        break;

                    case 'gallery':
                        // Replace gallery section content
                        const gallerySection = document.querySelector('#gallery .max-w-7xl');
                        if(gallerySection) {
                            gallerySection.innerHTML = data.content;
                        } else {
                            // If specific selector doesn't exist, try alternative selectors
                            const gallerySectionAlt = document.querySelector('#gallery .py-16');
                            if(gallerySectionAlt) {
                                gallerySectionAlt.innerHTML = `<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">${data.content}</div>`;
                            } else {
                                // Last resort - try to find the main content area
                                const mainContentEl = document.querySelector('main') || document.querySelector('.content') || document.querySelector('.main-content');
                                if(mainContentEl) {
                                    mainContentEl.innerHTML = data.content;
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
                                area.innerHTML = data.content;
                                break;
                            }
                        }
                }
            }
        }
    } catch (error) {
        console.error(`Error loading ${currentPage} content from Supabase:`, error);
    }
}

// Load content when the page is ready
document.addEventListener('DOMContentLoaded', function() {
    loadCustomContent();
    loadCustomImages();

    // Add a small delay to ensure all content is loaded
    setTimeout(function() {
        loadCustomContent();
        loadCustomImages();
    }, 100);
});