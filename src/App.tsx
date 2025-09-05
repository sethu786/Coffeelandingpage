import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Menu, X, Coffee, MapPin, Phone, Mail, Star, Clock, Wifi, Users } from 'lucide-react';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { href: '#home', label: 'Home' },
    { href: '#about', label: 'About' },
    { href: '#menu', label: 'Menu' },
    { href: '#testimonials', label: 'Reviews' },
    { href: '#contact', label: 'Contact' },
  ];

  const menuItems = [
    {
      category: 'Espresso Drinks',
      items: [
        { name: 'Espresso', price: '$3.50', description: 'Rich, bold shot of pure coffee bliss' },
        { name: 'Cappuccino', price: '$4.75', description: 'Perfect balance of espresso, steamed milk, and foam' },
        { name: 'Latte', price: '$5.25', description: 'Smooth espresso with steamed milk and light foam' },
        { name: 'Americano', price: '$4.00', description: 'Espresso shots with hot water for a clean taste' },
      ]
    },
    {
      category: 'Specialty Drinks',
      items: [
        { name: 'Caramel Macchiato', price: '$5.75', description: 'Vanilla syrup, steamed milk, espresso, and caramel drizzle' },
        { name: 'Mocha', price: '$5.50', description: 'Rich chocolate and espresso topped with whipped cream' },
        { name: 'Cold Brew', price: '$4.25', description: 'Smooth, naturally sweet coffee brewed cold for 12 hours' },
        { name: 'Flat White', price: '$5.00', description: 'Double shot espresso with microfoam milk' },
      ]
    },
    {
      category: 'Pastries & Snacks',
      items: [
        { name: 'Croissant', price: '$3.25', description: 'Buttery, flaky French pastry baked fresh daily' },
        { name: 'Blueberry Muffin', price: '$3.75', description: 'Moist muffin packed with fresh blueberries' },
        { name: 'Avocado Toast', price: '$7.50', description: 'Smashed avocado on artisan bread with sea salt' },
        { name: 'Bagel & Cream Cheese', price: '$4.50', description: 'Fresh bagel with house-made cream cheese' },
      ]
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      rating: 5,
      text: 'The best coffee in town! Their latte art is incredible and the atmosphere is so cozy.',
      role: 'Coffee Enthusiast'
    },
    {
      name: 'Mike Chen',
      rating: 5,
      text: 'I come here every morning before work. The baristas know my order by heart and the wifi is great.',
      role: 'Regular Customer'
    },
    {
      name: 'Emily Davis',
      rating: 5,
      text: 'Perfect spot for meetings or studying. Great coffee, comfortable seating, and friendly staff.',
      role: 'Freelancer'
    }
  ];

  const features = [
    { icon: Wifi, title: 'Free WiFi', description: 'High-speed internet for work or study' },
    { icon: Users, title: 'Community Space', description: 'Perfect for meetings and socializing' },
    { icon: Clock, title: 'Extended Hours', description: 'Open early to late for your convenience' },
    { icon: Coffee, title: 'Premium Beans', description: 'Ethically sourced from around the world' }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrollY > 50 ? 'bg-white shadow-lg' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.div 
              className="flex items-center space-x-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Coffee className={`h-8 w-8 ${scrollY > 50 ? 'text-amber-600' : 'text-white'}`} />
              <span className={`text-xl font-bold ${scrollY > 50 ? 'text-gray-900' : 'text-white'}`}>
                BrewCraft Café
              </span>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {navItems.map((item, index) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  className={`hover:text-amber-500 transition-colors ${
                    scrollY > 50 ? 'text-gray-700' : 'text-white'
                  }`}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  {item.label}
                </motion.a>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`p-2 rounded-md ${scrollY > 50 ? 'text-gray-700' : 'text-white'}`}
              >
                {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white shadow-lg"
          >
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="block px-3 py-2 text-gray-700 hover:text-amber-500"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative h-screen flex items-center justify-center bg-gradient-to-br from-amber-900 via-amber-800 to-amber-700">
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80")'
          }}
        ></div>
        
        <div className="relative z-10 text-center text-white px-4 sm:px-6 lg:px-8">
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Welcome to <span className="text-amber-300">BrewCraft Café</span>
          </motion.h1>
          
          <motion.p
            className="text-xl sm:text-2xl mb-8 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Where every cup tells a story of passion, quality, and community
          </motion.p>
          
          <motion.div
            className="space-y-4 sm:space-y-0 sm:space-x-4 sm:flex sm:justify-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <a
              href="#menu"
              className="inline-block bg-amber-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-amber-600 transition-colors shadow-lg"
            >
              View Our Menu
            </a>
            <a
              href="#about"
              className="inline-block border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-amber-900 transition-colors"
            >
              Learn Our Story
            </a>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                Our Coffee Story
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Since 2015, BrewCraft Café has been more than just a coffee shop – we're a community hub 
                where friends meet, ideas brew, and exceptional coffee experiences come to life.
              </p>
              <p className="text-lg text-gray-600 mb-8">
                We source our beans directly from sustainable farms around the world, roast them in small 
                batches, and craft each cup with passion and precision.
              </p>
              
              <div className="grid grid-cols-2 gap-6">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    className="text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <feature.icon className="h-8 w-8 text-amber-600 mx-auto mb-2" />
                    <h3 className="font-semibold text-gray-900">{feature.title}</h3>
                    <p className="text-sm text-gray-600">{feature.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <img
                src="https://images.unsplash.com/photo-1554118811-1e0d58224f24?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                alt="Coffee brewing process"
                className="rounded-lg shadow-2xl"
              />
              <div className="absolute -bottom-6 -right-6 bg-amber-500 text-white p-6 rounded-lg shadow-lg">
                <p className="text-2xl font-bold">8+</p>
                <p className="text-sm">Years of Excellence</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Menu Section */}
      <section id="menu" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Our Signature Menu
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Carefully crafted beverages and fresh pastries made with love and the finest ingredients
            </p>
          </motion.div>

          <div className="space-y-12">
            {menuItems.map((category, categoryIndex) => (
              <motion.div
                key={category.category}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: categoryIndex * 0.2 }}
                viewport={{ once: true }}
              >
                <h3 className="text-2xl font-bold text-amber-600 mb-6 text-center">
                  {category.category}
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {category.items.map((item, itemIndex) => (
                    <motion.div
                      key={item.name}
                      className="bg-gray-50 rounded-lg p-6 hover:shadow-lg transition-shadow"
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: itemIndex * 0.1 }}
                      viewport={{ once: true }}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="text-lg font-semibold text-gray-900">{item.name}</h4>
                        <span className="text-lg font-bold text-amber-600">{item.price}</span>
                      </div>
                      <p className="text-gray-600">{item.description}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-20 bg-amber-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              What Our Customers Say
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Don't just take our word for it – hear from our amazing community
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-lg p-6 shadow-lg"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-500 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4 italic">"{testimonial.text}"</p>
                <div>
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Visit Us Today</h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Come experience the perfect cup and warm atmosphere at BrewCraft Café
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold mb-6">Get in Touch</h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <MapPin className="h-6 w-6 text-amber-500 mr-3" />
                  <div>
                    <p className="font-semibold">123 Coffee Street</p>
                    <p className="text-gray-300">Downtown, City 12345</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Phone className="h-6 w-6 text-amber-500 mr-3" />
                  <p>(555) 123-BREW</p>
                </div>
                <div className="flex items-center">
                  <Mail className="h-6 w-6 text-amber-500 mr-3" />
                  <p>hello@brewcraftcafe.com</p>
                </div>
                <div className="flex items-center">
                  <Clock className="h-6 w-6 text-amber-500 mr-3" />
                  <div>
                    <p className="font-semibold">Hours:</p>
                    <p className="text-gray-300">Mon-Fri: 6AM-8PM</p>
                    <p className="text-gray-300">Sat-Sun: 7AM-9PM</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-gray-800 rounded-lg p-8"
            >
              <h3 className="text-2xl font-bold mb-6">Send us a Message</h3>
              <form className="space-y-4">
                <div>
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full px-4 py-3 bg-gray-700 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Your Email"
                    className="w-full px-4 py-3 bg-gray-700 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  />
                </div>
                <div>
                  <textarea
                    placeholder="Your Message"
                    rows={4}
                    className="w-full px-4 py-3 bg-gray-700 rounded-lg focus:ring-2 focus:ring-amber-500 focus:outline-none resize-none"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="w-full bg-amber-500 text-white py-3 rounded-lg font-semibold hover:bg-amber-600 transition-colors"
                >
                  Send Message
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Coffee className="h-8 w-8 text-amber-500" />
              <span className="text-xl font-bold">BrewCraft Café</span>
            </div>
            <p className="text-gray-400 text-center md:text-right">
              © 2025 BrewCraft Café. Crafted with ❤️ and ☕
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
