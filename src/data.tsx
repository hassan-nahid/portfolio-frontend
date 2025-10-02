import { AiFillLinkedin } from "react-icons/ai";
import { MdOutlineEmail } from "react-icons/md";
import { RiMessengerLine } from "react-icons/ri";
import { BsWhatsapp } from "react-icons/bs";
import { FaFacebook } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";
import { FaGithub } from "react-icons/fa";
import { BsInstagram } from "react-icons/bs";




// import {
//   project1,
//   project2,
//   project4,
//   project5,
//   project6,
//   profile3,
//   profile4,
//   profile5,
//   profile6,
//   figma,
//   css,
//   html,
//   javascript,
//   tailwind,
//   // bootstrap,
//   react,
//   firebase,
//   expressjs,
//   nodejs,
//   mongoose,
//   mongodb,
//   postgres,
//   python,
//   java,
//   git,
//   github,
//   nextjs,
//   stripe,
//   jwt,
//   typescript,
//   restfulapi,
//   // socket_io,
//   cloudinary,
//   emailicon,
//   messengericon,
//   whatsappicon,
//   redux,
//   vercel,
//   netlify,
//   communication,
//   teamwork,
//   timemanagement,
//   adaptability,
//   responsibility,
//   problemsolving,
//   dbms,
// } from "./assets";

export const menu = [
  { name: "About" },
  { name: "Skills" },
  { name: "Projects" },
  { name: "Testimonials" },
  { name: "Contact" },
];


// export const projects = [
//   {
//     id: 1,
//     title: "WalletX (Digital Wallet System)",
//     image: project4,
//     category: "Web",
//     description: `WalletX is a full-featured and secure digital wallet system built to replicate real-world mobile financial services like bKash and Nagad. It provides a role-based access control system (admin, agent, user) to ensure security and proper transaction management. Users can perform money transfers, cash-in, and cash-out via agents, and maintain a complete transaction history with detailed tracking. The backend includes strong authentication using JWT and password hashing, while MongoDB and Mongoose ensure reliable data storage. Wallet management, account blocking/unblocking, and transaction validation logic make it a production-ready wallet platform suitable for large-scale financial use cases.`,
//     demoLink: "https://digital-wallet-frontend-one.vercel.app",
//     githubFrontend: "https://github.com/hassan-nahid/digital-wallet-frontend",
//     githubBackend: "https://github.com/hassan-nahid/digital-wallet-backend",
//     stacks: [
//       { name: "TypeScript", logo: typescript },
//       { name: "ReactJs", logo: react },
//       { name: "Tailwind", logo: tailwind },
//       { name: "Redux", logo: redux },
//       { name: "Express.js", logo: expressjs },
//       { name: "MongoDB", logo: mongodb },
//       { name: "Mongoose", logo: mongoose },
//       { name: "JWT", logo: jwt },
//     ],
//   },
//   {
//     id: 2,
//     title: "Forever (E-commerce App)",
//     image: project1,
//     category: "Web",
//     description: `Forever is a modern e-commerce application that offers a complete shopping experience for customers. It features product listing pages with detailed information, advanced search, and filtering options. Users can add products to a shopping cart, manage quantities, and securely proceed through the checkout process. Authentication and authorization ensure only registered users can make purchases. The app is integrated with Stripe for secure payment handling, while Cloudinary is used to store and manage product images efficiently. On the backend, Express.js and MongoDB provide robust data handling for orders, products, and users. The application is built to handle real-world e-commerce challenges such as order tracking, user profiles, and secure JWT-based login sessions.`,
//     demoLink: "https://forever-frontend-puce-five.vercel.app/",
//     githubFullstack: "https://github.com/hassan-nahid/e_commerce",
//     stacks: [
//       { name: "ReactJs", logo: react },
//       { name: "Tailwind", logo: tailwind },
//       { name: "Express.js", logo: expressjs },
//       { name: "MongoDB", logo: mongodb },
//       { name: "Mongoose", logo: mongoose },
//       { name: "JWT", logo: jwt },
//       { name: "Stripe", logo: stripe },
//       { name: "Cloudinary", logo: cloudinary },
//     ],
//   },
//   {
//     id: 3,
//     title: "AirCNC (Room Booking App)",
//     image: project2,
//     category: "Web",
//     description: `AirCNC is a room booking platform inspired by Airbnb, where users can act as either guests or hosts. Guests can browse available rooms, check details, and complete online booking registrations. Hosts can list properties with descriptions, pricing, and availability calendars. The system includes dashboards for both guests and hosts to manage bookings, payments, and communication. Real-time data integration ensures availability is updated instantly when a booking is made. The app supports authentication with JWT, online payments through Stripe, and leverages Firebase for secure hosting and authentication flows. AirCNC focuses on user experience, scalability, and seamless integration between frontend and backend for a production-level room booking experience.`,
//     demoLink: "https://airanc-b21dc.web.app/",
//     githubFullstack: "https://github.com/hassan-nahid/aircnc_project",
//     stacks: [
//       { name: "ReactJs", logo: react },
//       { name: "Tailwind", logo: tailwind },
//       { name: "Express.js", logo: expressjs },
//       { name: "MongoDB", logo: mongodb },
//       { name: "JWT", logo: jwt },
//       { name: "Stripe", logo: stripe },
//       { name: "Firebase", logo: firebase },
//     ],
//   },
//   {
//     id: 4,
//     title: "NexSchola (School Management System)",
//     image: project5,
//     category: "Web",
//     description: `NexSchola is a comprehensive school management system designed to streamline the administration of students, teachers, and school staff. It provides features such as student enrollment, class management, attendance tracking, grade submission, and performance reporting. Teachers can manage assignments, while administrators can track staff activities and communicate with students and parents in real time. The system integrates role-based access so that different users (students, teachers, admin) have appropriate permissions. NexSchola is built using React for the frontend and Express.js with MongoDB for the backend, with secure JWT-based authentication. With Firebase integration, it also supports real-time updates and notifications, making it an all-in-one digital solution for modern schools.`,
//     demoLink: "https://nexschola.vercel.app",
//     githubFullstack: "https://github.com/hassan-nahid/student-management-system",
//     stacks: [
//       { name: "ReactJs", logo: react },
//       { name: "Tailwind", logo: tailwind },
//       { name: "Firebase", logo: firebase },
//       { name: "Express.js", logo: expressjs },
//       { name: "MongoDB", logo: mongodb },
//       { name: "JWT", logo: jwt },
//     ],
//   },
//   {
//     id: 5,
//     title: "VisuNexa (AI Image SaaS Platform)",
//     image: project6,
//     category: "Web",
//     description: `VisuNexa is an advanced AI-powered SaaS platform for image generation and processing. Users can upload images or provide prompts to generate AI-enhanced visuals. The platform supports multiple AI capabilities, including image editing, transformation, and upscaling, making it versatile for creative professionals. It includes a secure subscription-based payment system integrated with Stripe, ensuring smooth transactions for premium users. Cloudinary is used for efficient storage and retrieval of high-quality images. The system leverages Next.js for fast rendering, TypeScript for type safety, and MongoDB for robust data storage. VisuNexa is designed as a scalable SaaS product that combines AI power with a clean and intuitive user interface, making complex AI image tools accessible to everyone.`,
//     demoLink: "https://visu-nexa.vercel.app/",
//     githubFullstack: "https://github.com/hassan-nahid/visu-nexa",
//     stacks: [
//       { name: "Next.js", logo: nextjs },
//       { name: "JavaScript", logo: javascript },
//       { name: "MongoDB", logo: mongodb },
//       { name: "Tailwind CSS", logo: tailwind },
//       { name: "TypeScript", logo: typescript },
//       { name: "Stripe", logo: stripe },
//       { name: "Cloudinary", logo: cloudinary },
//     ],
//   },
// ];





// export const skills = [
//   {
//     title: "Frontend Development",
//     data: [
//       {
//         skill: "HTML",
//         level: "Experienced",
//         logo: html,
//       },
//       {
//         skill: "CSS",
//         level: "Experienced",
//         logo: css,
//       },
//       {
//         skill: "JavaScript",
//         level: "Experienced",
//         logo: javascript,
//       },
//       {
//         skill: "Tailwind CSS",
//         level: "Experienced",
//         logo: tailwind,
//       },
//       {
//         skill: "TypeScript",
//         level: "Experienced",
//         logo: typescript,
//       },
//       {
//         skill: "React",
//         level: "Experienced",
//         logo: react,
//       },
//       {
//         skill: "Redux",
//         level: "Intermediate",
//         logo: redux,
//       },
//       {
//         skill: "Firebase",
//         level: "Experienced",
//         logo: firebase
//       },

//     ],
//   },
//   {
//     title: "Backend Development",
//     data: [
//       {
//         skill: "NodeJs",
//         level: "Experienced",
//         logo: nodejs,
//       },
//       {
//         skill: "ExpressJs",
//         level: "Experienced",
//         logo: expressjs,
//       },

//       {
//         skill: "MongoDB",
//         level: "Experienced",
//         logo: mongodb,
//       },
//       {
//         skill: "Mongoose",
//         level: "Experienced",
//         logo: mongoose,
//       },
//       {
//         skill: "RESTful APIs",
//         level: "Experienced",
//         logo: restfulapi,
//       },
//       {
//         skill: "JWT",
//         level: "Experienced",
//         logo: jwt,
//       },
//       {
//         skill: "PostgreSQL",
//         level: "Intermediate",
//         logo: postgres,
//       },
//       {
//         skill: "DBMS",
//         level: "Experienced",
//         logo: dbms,
//       },

//     ],
//   },
//   {
//     title: "Additional Skills",
//     data: [
//       {
//         skill: "Git",
//         level: "Experienced",
//         logo: git,
//       },
//       {
//         skill: "github",
//         level: "Experienced",
//         logo: github,
//       },
//       {
//         skill: "Stripe",
//         level: "Experienced",
//         logo: stripe
//       },
//       {
//         skill: "Figma",
//         level: "Experienced",
//         logo: figma,
//       },
//       {
//         skill: "Vercel",
//         level: "Experienced",
//         logo: vercel,
//       },
//       {
//         skill: "Netlify",
//         level: "Experienced",
//         logo: netlify,
//       },

//     ],
//   },
//   {
//     title: "Soft Skills",
//     data: [
//       {
//         skill: "Communication",
//         level: "Strong",
//         logo: communication,
//       },
//       {
//         skill: "Teamwork",
//         level: "Strong",
//         logo: teamwork,
//       },
//       {
//         skill: "Problem-Solving",
//         level: "Excellent",
//         logo: problemsolving,
//       },
//       {
//         skill: "Time Management",
//         level: "Good",
//         logo: timemanagement,
//       },
//       {
//         skill: "Adaptability",
//         level: "Good",
//         logo: adaptability,
//       },
//       {
//         skill: "Responsibility",
//         level: "Strong",
//         logo: responsibility,
//       },
//     ],
//   },
//   {
//     title: "Familiar With",
//     data: [
//       {
//         skill: "NextJs",
//         level: "Intermediate",
//         logo: nextjs,
//       },
//       {
//         skill: "Python",
//         level: "Intermediate",
//         logo: python,
//       },
//       {
//         skill: "Java",
//         level: "Intermediate",
//         logo: java,
//       },

//     ],
//   },
// ];
// export const contactInfo = [
//   {
//     name: "Email",
//     value: "hassan.nahid.dev@gmail.com",
//     link: "mailto:hassan.nahid.dev@gmail.com",
//     icon: emailicon,
//     btnIcon: <MdOutlineEmail />,
//     color: "rgb(56,115,205)",
//   },
//   {
//     name: "Messenger",
//     value: "Hassan Nahid",
//     link: "http://m.me/HassanNahid10",
//     icon: messengericon,
//     btnIcon: <RiMessengerLine />,
//     color: "rgb(139,74,251)",
//   },
//   {
//     name: "WhatsApp",
//     value: "+8801780365440",
//     link: "https://api.whatsapp.com/send?phone=+8801780365440",
//     icon: whatsappicon,
//     btnIcon: <BsWhatsapp />,
//     color: "rgb(38,234,112)",
//   },
// ];
export const socialHandles = [
  {
    name: "Github",
    icon: <FaGithub />,
    link: "https://github.com/hassan-nahid",
  },
  {
    name: "LinkedIn",
    icon: <AiFillLinkedin />,
    link: "https://www.linkedin.com/in/hassan-nahid",
  },
  {
    name: "Instagram",
    icon: <BsInstagram />,
    link: "https://www.instagram.com/HassanNahid10",
  },
  {
    name: "Facebook",
    icon: <FaFacebook />,
    link: "https://www.facebook.com/HassanNahid10",
  },
  {
    name: "X",
    icon: <FaSquareXTwitter />,
    link: "https://x.com/HassanNahid100",
  },
];

// export const testimonials = [
//   {
//     avatar: profile3,
//     name: "Ayman Rahman",
//     review: `Hassan's expertise in full-stack development is truly impressive. His ability to create efficient and user-friendly applications sets him apart. Highly recommended!`,
//   },
//   {
//     avatar: profile4,
//     name: "Nadia Akter",
//     review: `Working with Hassan was a great experience. His problem-solving skills and attention to detail made our project a success. Looking forward to future collaborations!`,
//   },
//   {
//     avatar: profile5,
//     name: "Tanvir Hasan",
//     review: `A highly skilled developer who brings innovative solutions to the table. Hassan’s work is clean, well-structured, and delivered on time.`,
//   },
//   {
//     avatar: profile6,
//     name: "Farzana Ahmed",
//     review: `Hassan's ability to understand complex requirements and turn them into functional web applications is remarkable. A true professional!`,
//   },
// ];