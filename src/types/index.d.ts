export type Feature = {
  button: button;
  image: string;
  bulletpoints: string[];
  content: string;
  title: string;
};

export type Question = {
  question: string;
  answer: string;
};

export type Button = {
  enable: boolean;
  label: string;
  link: string;
};
