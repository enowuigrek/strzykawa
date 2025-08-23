const CMS_URL = process.env.VITE_STRAPI_URL || 'http://localhost:1337';
const CMS_TOKEN = process.env.VITE_STRAPI_TOKEN;

export const cms = {
    // Pobieranie postów blog
    async fetchBlogPosts(limit = 10) {
        try {
            const response = await fetch(`${CMS_URL}/api/blog-posts?populate=*&pagination[limit]=${limit}`, {
                headers: {
                    'Authorization': `Bearer ${CMS_TOKEN}`,
                    'Content-Type': 'application/json'
                }
            });

            const data = await response.json();
            return data.data || [];
        } catch (error) {
            console.error('Error fetching blog posts:', error);
            return [];
        }
    },

    // Pobieranie pojedynczego postu
    async fetchBlogPost(slug) {
        try {
            const response = await fetch(`${CMS_URL}/api/blog-posts?filters[slug][$eq]=${slug}&populate=*`, {
                headers: {
                    'Authorization': `Bearer ${CMS_TOKEN}`,
                    'Content-Type': 'application/json'
                }
            });

            const data = await response.json();
            return data.data?.[0] || null;
        } catch (error) {
            console.error('Error fetching blog post:', error);
            return null;
        }
    },

    // Pobieranie przewodników parzenia
    async fetchBrewingGuides() {
        try {
            const response = await fetch(`${CMS_URL}/api/brewing-guides?populate=*`, {
                headers: {
                    'Authorization': `Bearer ${CMS_TOKEN}`,
                    'Content-Type': 'application/json'
                }
            });

            const data = await response.json();
            return data.data || [];
        } catch (error) {
            console.error('Error fetching brewing guides:', error);
            return [];
        }
    }
};

export default { CartModal, LoginModal, RegisterModal, CoffeeCardWithCart };