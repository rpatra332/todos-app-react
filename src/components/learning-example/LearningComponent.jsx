import React from "react";
import FirstComponent from "./FirstComponent";
import SecondComponent from "./SecondComponent";
import ThirdComponent from "./ThirdComponent";
import FourthComponent from "./FourthComponent";

const person = {
  name: "Rohit Patra",
  address: {
    city: "Bhubaneswar",
    country: "India",
  },
  profiles: ["twitter", "linkedin", "instagram"],
  printProfiles: () => {
    person.profiles.map((profile) => console.log(profile));
  },
  printPersonInJSON: () => {
    console.log(person);
  },
};

export default function LearningComponent() {
  return (
    <>
      <FirstComponent />
      <SecondComponent />
      <ThirdComponent />
      <FourthComponent />

      <div>{person.name}</div>
      <div>{person.address.city}</div>
      <div>{person.address.country}</div>
      <div>{person.profiles[0]}</div>
      <div>{person.profiles[1]}</div>
      <button onClick={person.printProfiles}>Print All Profiles</button>
      <div />
      <button onClick={person.printPersonInJSON}>Print Person JSON</button>
    </>
  );
}
