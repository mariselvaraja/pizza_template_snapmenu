import { motion } from 'framer-motion';
import { Award, Users, Rocket } from 'lucide-react';

export default function About() {
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
          <h1 className="text-4xl font-bold mb-4">Our Story</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Since 1995, Pizza Planet has been serving out-of-this-world pizza to earthlings and aliens alike.
            Our commitment to quality ingredients and exceptional service has made us the galaxy's favorite pizza destination.
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
            src="https://images.unsplash.com/photo-1579751626657-72bc17010498?ixlib=rb-1.2.1&auto=format&fit=crop&w=2000&q=80"
            alt="Pizza making"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <h2 className="text-4xl font-bold text-white">Crafting Perfect Pizzas Since 1995</h2>
          </div>
        </motion.div>

        {/* Values Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {[
            {
              icon: Award,
              title: "Quality First",
              description: "We use only the finest ingredients, sourced from trusted suppliers across the galaxy."
            },
            {
              icon: Users,
              title: "Community Focus",
              description: "Our restaurants are more than just pizzerias - they're gathering places for friends and families."
            },
            {
              icon: Rocket,
              title: "Innovation",
              description: "We're constantly exploring new flavors and techniques to bring you the best pizza experience."
            }
          ].map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="text-center p-6"
            >
              <value.icon className="h-12 w-12 text-red-500 mx-auto mb-4" />
              <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
              <p className="text-gray-600">{value.description}</p>
            </motion.div>
          ))}
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
            To serve the most delicious and innovative pizzas while creating memorable experiences for our customers,
            one slice at a time.
          </p>
        </motion.div>
      </div>
    </div>
  );
}