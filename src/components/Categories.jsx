import React from "react";
import { useEffect } from "react";
import "./categories.css"; // Custom CSS for perspective and 3D flip

const categories = [
  { name: "Fiction", image: "https://images.unsplash.com/photo-1512820790803-83ca734da794", description: "Explore fictional worlds and stories." },
  { name: "Non-Fiction", image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c", description: "Learn about real-world topics and ideas." },
  { name: "Academic", image: "https://freebookbrowser.com/images/cool-icon/textbooks.jpg", description: "Textbooks and resources for students." },
  { name: "Comics", image: "https://t3.ftcdn.net/jpg/03/88/27/80/240_F_388278080_JAsjDSlouLpJgnVJMMEzjWvBs2QebQyk.jpg", description: "Dive into colorful and creative comics." },
  { name: "Mystery", image: "https://t3.ftcdn.net/jpg/09/81/10/60/240_F_981106007_pJ5c1t2XbImUfFFdzZNDnTcpZRtl6lO6.jpg", description: "Solve intriguing mysteries and thrillers." },
  { name: "Biographies", image: "https://lh3.googleusercontent.com/b8zxs8X2mcj2r7shj1ZpYaCSSwgHTqPxEQ6nIY5RjoMQFAd04V1nn2axjVKRWKfMQv8=h315", description: "Learn about inspiring lives and stories." },
  { name: "Children's Books", image: "https://t3.ftcdn.net/jpg/07/56/38/12/240_F_756381268_sf9rCDhnKkCY23xLKd4BwDK9Y3w9PUKN.jpg", description: "Books for kids filled with fun and learning." },
  { name: "Science Fiction", image: "https://t3.ftcdn.net/jpg/08/79/51/50/240_F_879515003_ukQ11qgvmN14F4inTjPYQvt36miz8GdM.jpg", description: "Journey into futuristic and imaginative worlds." },
];

const Categories = () => {
  useEffect(() => {
      const slides = document.querySelectorAll('.zoomin');
      if (slides.length === 0) return;
  
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('zoom');
          } else {
            entry.target.classList.remove('zoom');
          }
        });
      });
  
      slides.forEach((el) => observer.observe(el));
  
      return () => {
        slides.forEach((el) => observer.unobserve(el));
      };
    }, []);
  return (
    <section className="py-12 bg-gray-100">
      <div className="container mx-auto px-6 text-center">
        <div className="text-3xl font-bold mb-8 text-gray-800">Explore Categories</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <div key={index} className="zoomin card-container">
              <div className="card">
                {/* Front Side */}
                <div className="card-front">
                  <img
                    src={category.image}
                    alt={category.name}
                    loading="lazy"
                    className="w-full h-40 object-cover rounded-t-lg"
                  />
                  <div className="p-4">
                    <div className="text-lg font-semibold text-gray-700">{category.name}</div>
                  </div>
                </div>

                {/* Back Side */}
                <div className="card-back">
                  <div className="flex items-center justify-center h-full p-4">
                    <p className="text-white text-sm">{category.description}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
