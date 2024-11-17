interface SocialMedia {
  facebook?: string;
  twitter?: string;
  instagram?: string;
  linkedin?: string;
}

interface Contact {
  email: string;
  phone: string;
  social: SocialMedia;
}

interface Skill {
  name: string;
  proficiency: number;
}

interface Project {
  title: string;
  role: string;
  technologies: string[];
  completed: boolean;
}

interface WorkExperience {
  company: string;
  position: string;
  years: number;
  projects: Project[];
}

interface Travel {
  country: string;
  visitedCities: string[];
  year: number;
}

interface Music {
  genres: string[];
  instruments: string[];
}

interface Hobbies {
  sports: string[];
  music: Music;
  travel: Travel[];
}

interface Preferences {
  food: string[];
  colors: string[];
  vacationSpots: string[];
}

interface Address {
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

export interface IUser {
  id: number;
  name: string;
  age: number;
  address: Address;
  contact: Contact;
  skills: Skill[];
  workExperience: WorkExperience[];
  hobbies: Hobbies;
  preferences: Preferences;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export const usersArray: IUser[] = [
  {
    id: 1,
    name: "John Doe",
    age: 28,
    address: {
      street: "123 Main St",
      city: "New York",
      state: "NY",
      zip: "10001",
      country: "USA",
    },
    contact: {
      email: "johndoe@example.com",
      phone: "555-1234",
      social: {
        facebook: "john.doe.fb",
        twitter: "@johndoe",
        instagram: "@john_doe",
      },
    },
    skills: [
      { name: "JavaScript", proficiency: 90 },
      { name: "CSS", proficiency: 85 },
      { name: "HTML", proficiency: 95 },
      { name: "React", proficiency: 80 },
    ],
    workExperience: [
      {
        company: "Tech Corp",
        position: "Frontend Developer",
        years: 3,
        projects: [
          {
            title: "Website Redesign",
            role: "Lead Developer",
            technologies: ["HTML", "CSS", "JavaScript"],
            completed: true,
          },
          {
            title: "E-Commerce Platform",
            role: "Frontend Developer",
            technologies: ["React", "Redux"],
            completed: false,
          },
        ],
      },
      {
        company: "Web Solutions",
        position: "Junior Developer",
        years: 2,
        projects: [
          {
            title: "Personal Portfolio",
            role: "Developer",
            technologies: ["HTML", "CSS", "JavaScript"],
            completed: true,
          },
        ],
      },
    ],
    hobbies: {
      sports: ["Basketball", "Soccer", "Tennis"],
      music: {
        genres: ["Rock", "Jazz", "Classical"],
        instruments: ["Guitar", "Piano"],
      },
      travel: [
        {
          country: "Italy",
          visitedCities: ["Rome", "Florence", "Venice"],
          year: 2019,
        },
        {
          country: "Japan",
          visitedCities: ["Tokyo", "Kyoto", "Osaka"],
          year: 2021,
        },
      ],
    },
    preferences: {
      food: ["Pizza", "Sushi", "Pasta"],
      colors: ["Blue", "Black", "Red"],
      vacationSpots: ["Hawaii", "Paris", "Bali"],
    },
    active: true,
    createdAt: "2024-01-15T12:00:00Z",
    updatedAt: "2024-11-01T09:45:00Z",
  },
  {
    id: 2,
    name: "Jane Smith",
    age: 34,
    address: {
      street: "456 Oak St",
      city: "Los Angeles",
      state: "CA",
      zip: "90001",
      country: "USA",
    },
    contact: {
      email: "janesmith@example.com",
      phone: "555-5678",
      social: {
        facebook: "jane.smith.fb",
        twitter: "@janesmith",
        linkedin: "janesmith-profile",
      },
    },
    skills: [
      { name: "Python", proficiency: 95 },
      { name: "Django", proficiency: 90 },
      { name: "SQL", proficiency: 85 },
      { name: "Data Analysis", proficiency: 80 },
    ],
    workExperience: [
      {
        company: "Data Science Inc.",
        position: "Data Scientist",
        years: 4,
        projects: [
          {
            title: "Machine Learning Model",
            role: "Lead Data Scientist",
            technologies: ["Python", "TensorFlow", "Scikit-learn"],
            completed: true,
          },
          {
            title: "Customer Analytics",
            role: "Data Scientist",
            technologies: ["SQL", "Pandas"],
            completed: true,
          },
        ],
      },
      {
        company: "Analytics Co.",
        position: "Junior Data Analyst",
        years: 2,
        projects: [
          {
            title: "Sales Data Analysis",
            role: "Analyst",
            technologies: ["Excel", "Tableau"],
            completed: true,
          },
        ],
      },
    ],
    hobbies: {
      sports: ["Yoga", "Cycling", "Running"],
      music: {
        genres: ["Pop", "R&B", "Hip Hop"],
        instruments: ["Violin", "Flute"],
      },
      travel: [
        {
          country: "Spain",
          visitedCities: ["Barcelona", "Madrid", "Seville"],
          year: 2020,
        },
        {
          country: "Australia",
          visitedCities: ["Sydney", "Melbourne", "Brisbane"],
          year: 2022,
        },
      ],
    },
    preferences: {
      food: ["Tacos", "Burgers", "Pasta"],
      colors: ["Green", "Purple", "Pink"],
      vacationSpots: ["Tokyo", "Sydney", "Barcelona"],
    },
    active: false,
    createdAt: "2023-02-20T08:30:00Z",
    updatedAt: "2024-10-10T14:15:00Z",
  },
];
