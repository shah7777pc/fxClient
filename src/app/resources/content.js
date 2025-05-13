import { CustomLogo } from "@/components/CustomLogo";

const person = {
  firstName: "",
  lastName: "Shahryar Yeganeh",
  get name() {
    return `${this.firstName} ${this.lastName}`;
  },
  role: "Design Engineer at Civix Studios",
  avatar: "/images/67b85616-ec50_big.jpg",
  email: "example@gmail.com",
  location: "America/Los_Angeles", // Expecting the IANA time zone identifier, e.g., 'Europe/Vienna'
  languages: ["English"], // optional: Leave the array empty if you don't want to display languages
};

const newsletter = {
  display: true,
  title: <> {person.firstName}'s Newsletter</>,
  description: (
    <>
      I occasionally write about design, technology, and share thoughts on the intersection of
      creativity and engineering.
    </>
  ),
};

const social = [
  // Links are automatically displayed.
  // Import new icons in /once-ui/icons.ts
  {
    name: "GitHub",
    icon: "github",
    link: "",
  },
  {
    name: "LinkedIn",
    icon: "linkedin",
    link: "",
  },
  {
    name: "X",
    icon: "x",
    link: "",
  },
  {
    name: "Email",
    icon: "email",
    link: "",
  },
];

const home = {
  path: "/",
  image: "/images/og/home.jpg",
  label: "Home",
  title: `${person.name}'s Portfolio`,
  description: `Portfolio website showcasing my work as a ${person.role}`,
  headline: <>Highly skilled digital design and UX professional</>,
  featured: {
    display: true,
    title: <>Recent project: <strong className="ml-4">Rod Ui</strong></>,
    href: "/",
  },
  subline: (
    <>
      Design Engineer at Civix Studios with expertise in UX design, frontend development, 
      <br /> and leading interdisciplinary teams focusing on user-centered solutions.
    </>
  ),
};

const about = {
  path: "/about",
  label: "About Shahryar",
  title: `About – ${person.name}`,
  description: `Meet ${person.name}, ${person.role}`,
  tableOfContent: {
    display: true,
    subItems: false,
  },
  avatar: {
    display: true,
  },
  calendar: {
    display: false,
    link: "",
  },
  intro: {
    display: true,
    title: "Introduction",
    description: (
      <>
        Highly skilled digital design and user experience professional with substantial
        expertise in ux design, frontend development, and leading interdisciplinary teams.
        Passionate about advanced user-centered, culturally authentic digital solutions, with
        a robust background in cybersecurity and software development. Demonstrated
        expertise in conceptualizing and executing transformative design initiatives, fostering
        high-performance teams, and delivering intuitive user experiences. Seeking an
        opportunity as a ux Design Manager to leverage advanced design and technical
        proficiencies in enhancing product portfolios within a dynamic, innovation-driven
        environment.
      </>
    ),
  },
  work: {
    display: true, // set to false to hide this section
    title: "Work Experience",
    experiences: [
      {
        company: "Self-Employed",
        timeframe: "January 2024 - Present",
        role: "Frontend Developer (Remote)",
        achievements: [
          <>
            Developed and maintained frontend interfaces for diverse client projects, utilizing advanced frontend technologies to
            ensure seamless user interactions.
          </>,
          <>
            Partnered with clients to gather requirements and translate them into responsive, engaging user interfaces using
            modern frameworks such as React.js.
          </>,
          <>
            Skills: Frontend Development, Client Relationship Management, React.js
          </>
        ],
        images: [],
      }
    ],
  },
  studies: {
    display: true, // set to false to hide this section
    title: "Education",
    institutions: [
      {
        name: "Master of Science in Computer",
        description: <>Arizona State University, 2022-2024. UX Design</>,
      },
      {
        name: "National Organization for Development of Exceptional Talents",
        description: <>2010-2015. UX Design</>,
      },
    ],
  },
  technical: {
    display: true, // set to false to hide this section
    title: "Technical skills",
    skills: [
      {
        title: "Frontend Development",
        description: <>Proficient in building responsive, user-friendly interfaces with modern web technologies.</>,
        images: []
      },
      {
        title: "Client Relationship Management",
        description: <>Skilled at gathering requirements and maintaining strong client relationships throughout project lifecycles.</>,
        images: []
      },
      {
        title: "React.js",
        description: <>Expertise in building interactive applications with React.js and related ecosystem tools.</>,
        images: []
      }
    ],
  },
};

const blog = {
  path: "/blog",
  label: "Blog",
  title: "Writing about design and tech...",
  description: `Read what ${person.name} has been up to recently`,
  // Create new blog posts by adding a new .mdx file to app/blog/posts
  // All posts will be listed on the /blog route
};

const work = {
  path: "/work",
  label: "Work",
  title: `Projects – ${person.name}`,
  description: `Design and dev projects by ${person.name}`,
  // Create new project pages by adding a new .mdx file to app/blog/posts
  // All projects will be listed on the /home and /work routes
};

const gallery = {
  path: "/gallery",
  label: "Gallery",
  title: `Photo gallery – ${person.name}`,
  description: `A photo collection by ${person.name}`,
  // Images by https://lorant.one
  // These are placeholder images, replace with your own
  images: [
    {
      src: "/images/gallery/horizontal-1.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/horizontal-2.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/horizontal-3.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/horizontal-4.jpg",
      alt: "image",
      orientation: "horizontal",
    },
    {
      src: "/images/gallery/vertical-1.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/vertical-2.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/vertical-3.jpg",
      alt: "image",
      orientation: "vertical",
    },
    {
      src: "/images/gallery/vertical-4.jpg",
      alt: "image",
      orientation: "vertical",
    },
  ],
};

const trades = {
  path: "/trades",
  label: "Trades",
  title: `Trading Monitor - ${person.name}`,
  description: `Real-time trade monitoring and MT5 integration system`,
};

export { person, social, newsletter, home, about, blog, work, gallery, trades };