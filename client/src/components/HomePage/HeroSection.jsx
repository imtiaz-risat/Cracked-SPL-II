import physicsIcon from "../../Assets/physics-icon.png";
import chemistryIcon from "../../Assets/chemistry-icon.png";
import mathIcon from "../../Assets/math-icon.png";
import englishIcon from "../../Assets/english-icon.png";

export default function HeroSection() {
  return (
    <section class="bg-white">
      <div class="grid max-w-screen-xl px-4 py-24 mx-auto my-4 lg:gap-8 xl:gap-0 lg:py-26 lg:grid-cols-12">
        <div class="mr-auto place-self-center lg:col-span-7">
          {/* Main Text */}
          <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl">
            Prepare yourself for <span className="text-red-500"><a href="https://www.iutoic-dhaka.edu/" className="text-red-500">IUT </a></span>
            Admission
          </h1>

          {/* Subject Cards */}
          <div class="grid grid-cols-2 sm:grid-cols-4 gap-4 py-6">
            <div class="bg-white rounded-lg shadow-lg p-4 text-center">
              <div class="flex justify-center">
                <img
                  src={physicsIcon}
                  alt="physicsIcon"
                  class="w-24 h-24 rounded-lg mb-4"
                />
              </div>
              <p class="text-gray-800 font-bold">Physics</p>
            </div>

            <div class="bg-white rounded-lg shadow-lg p-4 text-center">
              <div class="flex justify-center">
                <img
                  src={chemistryIcon}
                  alt="chemistryIcon"
                  class="w-24 h-24 rounded-lg mb-4"
                />
              </div>
              <p class="text-gray-800 font-bold">Chemistry</p>
            </div>

            <div class="bg-white rounded-lg shadow-lg p-4 text-center">
              <div class="flex justify-center">
                <img
                  src={mathIcon}
                  alt="mathIcon"
                  class="w-24 h-24 rounded-lg mb-4"
                />
              </div>
              <p class="text-gray-800 font-bold">Math</p>
            </div>

            <div class="bg-white rounded-lg shadow-lg p-4 text-center">
              <div class="flex justify-center">
                <img
                  src={englishIcon}
                  alt="englishIcon"
                  class="w-24 h-24 rounded-lg mb-4"
                />
              </div>
              <p class="text-gray-800 font-bold">English</p>
            </div>
          </div>
        </div>

        <div class="hidden lg:mt-0 lg:col-span-5 lg:flex">
          <img
            src="https://rootsedulive.com/static/media/pana.c2b1088a.svg"
            alt="mockup"
          />
        </div>
      </div>
    </section>
  );
}
