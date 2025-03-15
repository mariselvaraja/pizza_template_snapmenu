import { motion } from 'framer-motion';
import { UtensilsCrossed, Heart, Users } from 'lucide-react';
import { useSiteContent } from '../context/SiteContentContext';

// Define interface for story value item
interface StoryValue {
  icon: string;
  title: string;
  description: string;
}

export default function About() {
  const { story } = useSiteContent();
  return (
    <div className="py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl font-bold mb-4">{story.hero.title}</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {story.hero.description}
          </p>
        </motion.div>

        {/* Image Section */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="relative h-96 mb-16 rounded-xl overflow-hidden"
        >
          <img
            src={story.hero.image}
            alt="Restaurant story"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <h2 className="text-4xl font-bold text-white">{story.hero.title}</h2>
          </div>
        </motion.div>

        {/* Values Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {story.values.map((value: StoryValue, index: number) => {
            // Map icon string to actual icon component
            let IconComponent;
            switch(value.icon) {
              case 'UtensilsCrossed':
                IconComponent = UtensilsCrossed;
                break;
              case 'Heart':
                IconComponent = Heart;
                break;
              case 'Users':
                IconComponent = Users;
                break;
              default:
                IconComponent = UtensilsCrossed; // Default icon
            }
            
            return (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className="text-center p-6"
              >
                <IconComponent className="h-12 w-12 text-red-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Mission Statement */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="bg-red-500 text-white rounded-xl p-12 text-center"
        >
          <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
          <p className="text-xl">
            To create exceptional dining experiences through culinary excellence, warm hospitality, 
            and a commitment to quality in every aspect of our service.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
