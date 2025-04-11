import { motion } from 'framer-motion';
import { Calendar, User, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useSiteContent } from '../context/SiteContentContext';

// Define interface for blog post with additional properties
interface BlogPost {
  id: string | number;
  title: string;
  excerpt: string;
  author: string;
  date: string;
  category: string;
  image: string;
}

// Define categories for blog posts
const categories = [
  "All Posts",
  "Culinary Techniques",
  "Chef Stories",
  "Food Trends",
  "Events",
  "Behind the Scenes"
];

export default function Blog() {
  const siteContent = useSiteContent();
  const blog = siteContent?.blog || {
    header: {
      title: "Our Blog",
      description: "Culinary insights, recipes, and stories from our kitchen"
    },
    posts: [
      {
        id: "1",
        title: "The Art of Perfect Pizza",
        subtitle: "Secrets from our master chef",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eu aliquam nisl nisl eu nisl.",
        image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80",
        videoThumbnail: "",
        videoUrl: "",
        chef: "Marco Rossi",
        date: "2025-04-01",
        readTime: "5 min"
      },
      {
        id: "2",
        title: "Seasonal Ingredients: Spring Edition",
        subtitle: "Fresh flavors for your table",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eu aliquam nisl nisl eu nisl.",
        image: "https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?auto=format&fit=crop&q=80",
        videoThumbnail: "",
        videoUrl: "",
        chef: "Sophia Chen",
        date: "2025-03-15",
        readTime: "4 min"
      },
      {
        id: "3",
        title: "Wine Pairing Fundamentals",
        subtitle: "Elevate your dining experience",
        content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eu aliquam nisl nisl eu nisl.",
        image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&q=80",
        videoThumbnail: "",
        videoUrl: "",
        chef: "Jean Dupont",
        date: "2025-02-28",
        readTime: "6 min"
      }
    ]
  };
  
  // Transform blog data from siteContent to match the format expected by the component
  const blogPosts: BlogPost[] = blog.posts.map(post => ({
    id: post.id,
    title: post.title,
    excerpt: post.subtitle,
    author: post.chef,
    date: post.date,
    category: post.readTime.includes("min") ? "Culinary Techniques" : "Chef Stories",
    image: post.image
  }));
  
  // Use the first post as the featured post if available
  const featuredPost = blogPosts.length > 0 ? blogPosts[0] : null;
  return (
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold mb-4">{blog.header.title}</h1>
          <p className="text-xl text-gray-600">
            {blog.header.description}
          </p>
        </motion.div>

        {/* Featured Post */}
        {featuredPost && (
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-16"
          >
            <div className="relative h-[500px] rounded-xl overflow-hidden">
              <img
                src={featuredPost.image}
                alt={featuredPost.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent">
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <span className="text-red-500 bg-white px-4 py-1 rounded-full text-sm font-semibold">
                    Featured
                  </span>
                  <h2 className="text-3xl font-bold text-white mt-4">
                    {featuredPost.title}
                  </h2>
                  <p className="text-gray-200 mt-2 mb-4">
                    {featuredPost.excerpt}
                  </p>
                  <div className="flex items-center text-white gap-4">
                    <div className="flex items-center">
                      <User className="h-4 w-4 mr-2" />
                      <span>{featuredPost.author}</span>
                    </div>
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span>{new Date(featuredPost.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* Categories */}
        <div className="flex flex-wrap gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              className="px-6 py-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              {category}
            </button>
          ))}
        </div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="bg-white rounded-lg overflow-hidden shadow-lg"
            >
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-2" />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span>{new Date(post.date).toLocaleDateString()}</span>
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                <p className="text-gray-600 mb-4">{post.excerpt}</p>
                <Link
                  to={`/blog/${post.id}`}
                  className="inline-flex items-center text-red-500 hover:text-red-600 transition-colors"
                >
                  Read More <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Newsletter Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="mt-20 bg-red-500 rounded-xl p-12 text-white text-center"
        >
          <h2 className="text-3xl font-bold mb-4">Subscribe to Our Newsletter</h2>
          <p className="text-lg mb-8">
            Get the latest news, recipes, and special offers delivered to your inbox
          </p>
          <form className="max-w-md mx-auto flex gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-6 py-3 rounded-full text-gray-900 focus:outline-none"
            />
            <button
              type="submit"
              className="bg-white text-red-500 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors"
            >
              Subscribe
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}
