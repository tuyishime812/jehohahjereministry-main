// Supabase Client Initialization
const SUPABASE_URL = 'https://jkdysayryayshootssos.supabase.co'; // Your Supabase project URL
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImprZHlzYXlyeWF5c2hvb3Rzc29zIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg4MjgyNDcsImV4cCI6MjA4NDQwNDI0N30.m3Bs7b-v_GatM_9NOh7g_T-Gekc22w1tOwQeehkVweE'; // Your Supabase anon key

// Initialize Supabase client
const { createClient } = supabase;
const supabaseClient = createClient(SUPABASE_URL, SUPABASE_KEY);

// Helper function to get current page name
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

// Function to load contact information
async function loadContactInfo() {
    try {
        const { data, error } = await supabaseClient
            .from('contact_info')
            .select('*')
            .eq('is_active', true)
            .order('sort_order');

        if (error) throw error;

        // Update contact information on the page
        if (data && data.length > 0) {
            // Update contact numbers
            const contactNumbersDiv = document.querySelector('#contactNumbers');
            if (contactNumbersDiv) {
                contactNumbersDiv.innerHTML = '';
                data.forEach(contact => {
                    if (contact.contact_type === 'phone') {
                        const contactLink = document.createElement('a');
                        contactLink.href = contact.contact_value.startsWith('+') ? `tel:${contact.contact_value}` : `tel:+${contact.contact_value}`;
                        contactLink.className = 'text-blue-600 hover:underline flex items-center mt-2';
                        contactLink.innerHTML = `<i class="fas fa-phone-alt mr-2"></i>${contact.label || contact.contact_value}`;
                        contactNumbersDiv.appendChild(contactLink);
                    }
                });
            }

            // Update WhatsApp numbers
            const whatsappNumbers = document.querySelectorAll('[href*="wa.me"], [href*="api.whatsapp"]');
            if (whatsappNumbers.length > 0) {
                data.forEach(contact => {
                    if (contact.contact_type === 'whatsapp') {
                        whatsappNumbers.forEach(link => {
                            link.href = `https://wa.me/${contact.contact_value.replace(/\D/g, '')}`;
                        });
                    }
                });
            }
        }
    } catch (error) {
        console.error('Error loading contact info from Supabase:', error);
    }
}

// Function to load team members
async function loadTeamMembers() {
    try {
        const { data, error } = await supabaseClient
            .from('team_members')
            .select('*')
            .eq('is_active', true)
            .order('sort_order');

        if (error) throw error;

        // Update team members on the page
        if (data && data.length > 0) {
            const teamContainer = document.getElementById('staffContainer');
            if (teamContainer) {
                teamContainer.innerHTML = '';
                data.forEach(member => {
                    const staffCard = document.createElement('div');
                    staffCard.className = 'staff-card bg-gray-50 rounded-lg overflow-hidden shadow-md';
                    staffCard.innerHTML = `
                        <img src="${member.image_url || 'https://via.placeholder.com/300x200/4f46e5/white?text=' + encodeURIComponent(member.name.split(' ')[0])}" 
                             alt="${member.name}" 
                             class="w-full h-48 object-cover photo-clickable">
                        <div class="p-6">
                            <h3 class="text-xl font-bold text-gray-900">${member.name}</h3>
                            <p class="text-blue-600 font-semibold">${member.position}</p>
                            <p class="mt-2 text-gray-700">${member.bio || 'Serves as ' + member.position + ' and contributes to the ministry.'}</p>
                        </div>
                    `;
                    teamContainer.appendChild(staffCard);
                });
            }
        }
    } catch (error) {
        console.error('Error loading team members from Supabase:', error);
    }
}

// Function to load testimonials
async function loadTestimonials() {
    try {
        const { data, error } = await supabaseClient
            .from('testimonials')
            .select('*')
            .eq('is_active', true)
            .order('created_at', { ascending: false });

        if (error) throw error;

        // Update testimonials on the page
        if (data && data.length > 0) {
            const testimonialsContainer = document.getElementById('testimonialsContainer');
            if (testimonialsContainer) {
                testimonialsContainer.innerHTML = '';
                data.forEach(testimonial => {
                    const testimonialElement = document.createElement('div');
                    testimonialElement.className = 'bg-gray-50 p-6 rounded-lg shadow-md';
                    testimonialElement.innerHTML = `
                        <div class="flex items-center mb-4">
                            <div class="bg-gray-200 border-2 border-dashed rounded-full w-16 h-16 flex items-center justify-center text-gray-500">
                                <i class="fas fa-user text-2xl"></i>
                            </div>
                            <div class="ml-4">
                                <h4 class="font-bold text-gray-900">${testimonial.name}</h4>
                                <p class="text-blue-600">${testimonial.role}</p>
                            </div>
                        </div>
                        <p class="text-gray-700 italic">"${testimonial.content}"</p>
                        <div class="flex text-yellow-400 mt-4">
                            ${'<i class="fas fa-star"></i>'.repeat(testimonial.rating)}
                            ${'<i class="far fa-star"></i>'.repeat(5 - testimonial.rating)}
                        </div>
                    `;
                    testimonialsContainer.appendChild(testimonialElement);
                });
            }
        }
    } catch (error) {
        console.error('Error loading testimonials from Supabase:', error);
    }
}

// Function to load site settings
async function loadSiteSettings() {
    try {
        const { data, error } = await supabaseClient
            .from('site_settings')
            .select('setting_key, setting_value')
            .eq('is_active', true);

        if (error) throw error;

        // Apply site settings
        if (data && data.length > 0) {
            data.forEach(setting => {
                // Update site title if available
                if (setting.setting_key === 'site_title') {
                    document.title = setting.setting_value;
                    const titleElements = document.querySelectorAll('title, .site-title, .logo span');
                    titleElements.forEach(el => {
                        el.textContent = setting.setting_value;
                    });
                }
                
                // Update site description if available
                if (setting.setting_key === 'site_description') {
                    const metaDescription = document.querySelector('meta[name="description"]');
                    if (metaDescription) {
                        metaDescription.setAttribute('content', setting.setting_value);
                    }
                }
            });
        }
    } catch (error) {
        console.error('Error loading site settings from Supabase:', error);
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
                .select('page, section, element_id, content, content_type')
                .eq('page', contentMap[currentPage])
                .order('sort_order');

            if (error) {
                if (error.code === 'PGRST116') { // Row not found
                    console.log(`No custom content found for ${currentPage}, using default`);
                    return;
                }
                throw error;
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
                                    const heroSection = document.querySelector('#home .max-w-7xl');
                                    if(heroSection) {
                                        heroSection.innerHTML = item.content;
                                    } else {
                                        // If specific selector doesn't exist, try alternative selectors
                                        const heroSectionAlt = document.querySelector('#home .pt-24.pb-20');
                                        if(heroSectionAlt) {
                                            heroSectionAlt.innerHTML = `<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">${item.content}</div>`;
                                        } else {
                                            // Last resort - try to find the main content area
                                            const mainContentEl = document.querySelector('main') || document.querySelector('.content') || document.querySelector('.main-content');
                                            if(mainContentEl) {
                                                mainContentEl.innerHTML = item.content;
                                            }
                                        }
                                    }
                                    break;

                                case 'about':
                                    // Replace about section content
                                    const aboutSection = document.querySelector('#about .max-w-7xl');
                                    if(aboutSection) {
                                        aboutSection.innerHTML = item.content;
                                    } else {
                                        // If specific selector doesn't exist, try alternative selectors
                                        const aboutSectionAlt = document.querySelector('#about .py-16');
                                        if(aboutSectionAlt) {
                                            aboutSectionAlt.innerHTML = `<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">${item.content}</div>`;
                                        } else {
                                            // Last resort - try to find the main content area
                                            const mainContentEl = document.querySelector('main') || document.querySelector('.content') || document.querySelector('.main-content');
                                            if(mainContentEl) {
                                                mainContentEl.innerHTML = item.content;
                                            }
                                        }
                                    }
                                    break;

                                case 'contact':
                                    // Replace contact section content
                                    const contactSection = document.querySelector('#contact .max-w-7xl');
                                    if(contactSection) {
                                        contactSection.innerHTML = item.content;
                                    } else {
                                        // If specific selector doesn't exist, try alternative selectors
                                        const contactSectionAlt = document.querySelector('#contact .py-16');
                                        if(contactSectionAlt) {
                                            contactSectionAlt.innerHTML = `<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">${item.content}</div>`;
                                        } else {
                                            // Last resort - try to find the main content area
                                            const mainContentEl = document.querySelector('main') || document.querySelector('.content') || document.querySelector('.main-content');
                                            if(mainContentEl) {
                                                mainContentEl.innerHTML = item.content;
                                            }
                                        }
                                    }
                                    break;

                                case 'missions':
                                    // Replace missions section content
                                    const missionsSection = document.querySelector('#missions .max-w-7xl');
                                    if(missionsSection) {
                                        missionsSection.innerHTML = item.content;
                                    } else {
                                        // If specific selector doesn't exist, try alternative selectors
                                        const missionsSectionAlt = document.querySelector('#missions .py-16');
                                        if(missionsSectionAlt) {
                                            missionsSectionAlt.innerHTML = `<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">${item.content}</div>`;
                                        } else {
                                            // Last resort - try to find the main content area
                                            const mainContentEl = document.querySelector('main') || document.querySelector('.content') || document.querySelector('.main-content');
                                            if(mainContentEl) {
                                                mainContentEl.innerHTML = item.content;
                                            }
                                        }
                                    }
                                    break;

                                case 'team':
                                    // Replace team section content
                                    const teamSection = document.querySelector('#team .max-w-7xl');
                                    if(teamSection) {
                                        teamSection.innerHTML = item.content;
                                    } else {
                                        // If specific selector doesn't exist, try alternative selectors
                                        const teamSectionAlt = document.querySelector('#team .py-16');
                                        if(teamSectionAlt) {
                                            teamSectionAlt.innerHTML = `<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">${item.content}</div>`;
                                        } else {
                                            // Last resort - try to find the main content area
                                            const mainContentEl = document.querySelector('main') || document.querySelector('.content') || document.querySelector('.main-content');
                                            if(mainContentEl) {
                                                mainContentEl.innerHTML = item.content;
                                            }
                                        }
                                    }
                                    break;

                                case 'gallery':
                                    // Replace gallery section content
                                    const gallerySection = document.querySelector('#gallery .max-w-7xl');
                                    if(gallerySection) {
                                        gallerySection.innerHTML = item.content;
                                    } else {
                                        // If specific selector doesn't exist, try alternative selectors
                                        const gallerySectionAlt = document.querySelector('#gallery .py-16');
                                        if(gallerySectionAlt) {
                                            gallerySectionAlt.innerHTML = `<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">${item.content}</div>`;
                                        } else {
                                            // Last resort - try to find the main content area
                                            const mainContentEl = document.querySelector('main') || document.querySelector('.content') || document.querySelector('.main-content');
                                            if(mainContentEl) {
                                                mainContentEl.innerHTML = item.content;
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
        console.error(`Error loading ${currentPage} content from Supabase:`, error);
    }
}

// Load content when the page is ready
document.addEventListener('DOMContentLoaded', function() {
    loadCustomContent();
    loadCustomImages();
    loadContactInfo();
    loadTeamMembers();
    loadTestimonials();
    loadSiteSettings();

    // Add a small delay to ensure all content is loaded
    setTimeout(function() {
        loadCustomContent();
        loadCustomImages();
        loadContactInfo();
        loadTeamMembers();
        loadTestimonials();
        loadSiteSettings();
    }, 100);
});