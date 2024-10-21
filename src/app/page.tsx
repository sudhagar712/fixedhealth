
"use client"; 

import { useState, useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
interface Doctor {
  name: string;
  expertise: string;
  city: string;
}

interface FormData {
  name: string;
  phone: string;
  age: number;
  city: string;
  occupation: string;
  company?: string;
  chiefComplaints: string;
  previousPhysiotherapy?: boolean;
}

const testimonials = [
  {
    name: "Dr. John Doe",
    testimonial: "Great service! I always feel better after my sessions.",
    imageUrl: "https://www.fixhealth.com/_next/image?url=https%3A%2F%2Fimages.ctfassets.net%2Fa0u75w265gnx%2F2hP7fHvSeCitzEButfLfyI%2F1548854cd0ebf2cdb0e1c24590113208%2FBlue_and_Black_Colorful_Merry_Christmas_Instagram_Post__6__1.png%3Ff%3Dface&w=640&q=75",
  },
  {
    name: "Dr. Jane Smith",
    testimonial: "Helped me recover fast! Highly recommend their services.",
    imageUrl: "https://wp.globaluniversitysystems.com/mua/wp-content/uploads/sites/10/2023/03/board-certified-doctor-meaning.webp",
  },
  {
    name: "Dr. Alice Johnson",
    testimonial: "Fantastic experience. The staff is very professional!",
    imageUrl: "https://content.jdmagicbox.com/comp/ahmedabad/s5/079pxx79.xx79.220310224506.q4s5/catalogue/spiral-ent-care-ahmedabad-audiologist-doctors-kodtz188k2.jpg",
  },
  {
    name: "Dr. Bob Brown",
    testimonial: "Very knowledgeable and attentive. Will come back again!",
    imageUrl: "https://kdahweb-static.kokilabenhospital.com/kdah-2019/shop/package/images/16225531190.jpg",
  },
];

export default function Home() {
  const { register, handleSubmit, control } = useForm<FormData>();
  const [theme, setTheme] = useState<string>("light");
  const [step, setStep] = useState<number>(1);
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [cityFromUrl, setCityFromUrl] = useState<string | null>(null);

  useEffect(() => {
    const city = new URLSearchParams(window.location.search).get("city");
    setCityFromUrl(city);
  }, []);

  useEffect(() => {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark");
    }
  }, []);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const onSubmit = async (data: FormData) => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      try {
        const res = await fetch(`/Api/api?city=${data.city}`);
        if (!res.ok) {
          throw new Error(`Error fetching doctors: ${res.statusText}`);
        }
        const filteredDoctors = await res.json();
        setDoctors(filteredDoctors);
      } catch (error) {
        console.error(error);
        // alert("An error occurred while fetching doctors. Please try again.");
        console.log("An error occurred while fetching doctors. Please try again.")
      }
    }
  };

  const age = useWatch({ control, name: "age" });
  const occupation = useWatch({ control, name: "occupation" });

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-black">
      <div className="p-4 flex bg-white shadow-lg dark:bg-gray-800 justify-between items-center">
        <div className="text-2xl font-extrabold text-black dark:text-white">Fix Health</div>
        <button
          onClick={toggleTheme}
          className="p-2 border rounded-md bg-gray-200 dark:bg-gray-700"
        >
          {theme === "dark" ? "Light Mode" : "Dark Mode"}
        </button>
      </div>

    
      <div className="flex flex-col md:flex-row items-center justify-between min-h-screen p-10">
        <div className="flex flex-col justify-center w-full md:w-1/2">
          <h1 className="text-4xl md:text-6xl font-bold text-black mb-4 dark:text-white">Welcome to Fix Health</h1>
          <p className="text-base md:text-sm text-black mb-6 dark:text-gray-300">
            Your health is our priority. Experience the best care from our professionals.
          </p>
          <button className="bg-red-600 text-white py-2 px-4 rounded-lg shadow">Book a Consultation</button>
        </div>

        <div className="w-full md:w-1/2 flex justify-center mt-4 md:mt-0">
          <img
            src="https://www.inhousemedicare.com/wp-content/uploads/2022/06/Doctor-consultation.png"
            alt="Hero Image"
            className="w-3/4 h-auto rounded-lg shadow-lg"
          />
        </div>
      </div>

     
      <section className="p-10 bg-gray-200 dark:bg-gray-800">
        <h2 className="text-2xl font-bold mb-4">Testimonials</h2>
        <div className="flex space-x-4 overflow-x-auto">
          {testimonials.map((testimonial) => (
            <div key={testimonial.name} className="bg-white dark:bg-gray-900 p-5 rounded-lg shadow-lg flex flex-col items-center">
              <img
                src={testimonial.imageUrl}
                alt={testimonial.name}
                className="w-32 h-32 rounded-full mb-4"
              />
              <h3 className="font-bold text-lg">{testimonial.name}</h3>
              <p className="text-gray-800 dark:text-gray-300 italic mt-2 text-center">
                {testimonial.testimonial}
              </p>
            </div>
          ))}
        </div>
      </section>

 
      <section className="p-10">
        <h2 className="text-2xl font-bold mb-4">Book a Consultation</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          {step === 1 && (
            <>
              <input
                {...register("name", { required: true })}
                placeholder="Name"
                className="block p-2 border mb-2 w-full"
              />
              <input
                {...register("phone", { required: true })}
                placeholder="Phone number"
                className="block p-2 border mb-2 w-full"
              />
            </>
          )}

          {step === 2 && (
            <>
              <input
                {...register("age", { required: true, valueAsNumber: true })}
                type="number"
                placeholder="Age"
                className="block p-2 border mb-2 w-full"
              />
              <input
                {...register("city", { required: true })}
                defaultValue={cityFromUrl || ""}
                placeholder="City"
                className="block p-2 border mb-2 w-full"
              />
              <input
                {...register("occupation", { required: true })}
                placeholder="Occupation"
                className="block p-2 border mb-2 w-full"
              />
            </>
          )}

          {step === 3 && (
            <>
              <input
                {...register("chiefComplaints", { required: true })}
                placeholder="Chief Complaints"
                className="block p-2 border mb-2 w-full"
              />
              <label className="flex items-center">
                <input
                  {...register("previousPhysiotherapy")}
                  type="checkbox"
                  className="mr-2"
                />
                Previous Physiotherapy?
              </label>
            </>
          )}

          <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded-lg">
            {step < 4 ? "Next" : "Submit"}
          </button>
        </form>

        {doctors.length > 0 && (
          <div className="mt-4">
            <h3 className="text-lg font-bold">Available Doctors:</h3>
            <ul>
              {doctors.map((doctor) => (
                <li key={doctor.name} className="border-b py-2">
                  <strong>{doctor.name}</strong> - {doctor.expertise} ({doctor.city})
                </li>
              ))}
            </ul>
          </div>
        )}
      </section>
    </div>
  );
}
