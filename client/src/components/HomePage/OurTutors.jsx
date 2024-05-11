import tutorSani from "../../Assets/Tutors/sani.jpg";
import tutorShefayet from "../../Assets/Tutors/shefayet.jpg";
import tutorTaki from "../../Assets/Tutors/taki.jpeg";
import tutorNiaz from "../../Assets/Tutors/niaz.jpg";
import tutorTaaha from "../../Assets/Tutors/taaha.jpg";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function OurTutors() {
  const members = [
    {
      name: "Ahmed Alfey Sani",
      role: "Chemistry Tutor",
      image: tutorSani,
    },
    {
      name: "Niaz Rahman",
      role: "Math Tutor",
      image: tutorNiaz,
    },
    {
      name: "Shefayet Sham-E Adib",
      role: "Physics Tutor",
      image: tutorShefayet,
    },
    {
      name: "Taki Tajwarruzaman",
      role: "English Tutor",
      image: tutorTaki,
    },
    {
      name: "Tauhid Kadir Taaha",
      role: "Physics Tutor",
      image: tutorTaaha,
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <section className="bg-white">
      <div className="container px-6 py-20 mx-auto">
        <h2 className="text-3xl font-extrabold text-center text-gray-800 capitalize lg:text-4xl py-8">
          Our <span className="border-b-2 border-gray-800">Tutors</span>
        </h2>
        <Slider {...settings}>
          {members.map((member, index) => (
            <div key={index} className="text-center mb-8">
              <img
                className="object-cover object-center w-48 h-48 mx-auto rounded-lg"
                src={member.image}
                alt={member.name}
              />
              <div className="mt-2">
                <h3 className="text-lg font-medium text-gray-800">
                  {member.name}
                </h3>
                <span className="mt-1 font-medium text-gray-600">
                  {member.role}
                </span>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
}
