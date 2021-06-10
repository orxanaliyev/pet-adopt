import React, { useState, useEffect, useContext, FunctionComponent } from "react";
import pet, { ANIMALS, Animal } from "@frontendmasters/pet";
import {RouteComponentProps} from "@reach/router";
import useDrop from "./useDrop";
import Results from "./Results";
import ThemeContext from "./ThemeContext";

const SearchParams:FunctionComponent<RouteComponentProps> = () => {
  const [location, setLocation] = useState("Seattle, WA");
  const [breeds, setBreeds] = useState([] as string[]);
  const [pets, setPets] = useState([] as Animal[]);
  const [theme, setTheme] = useContext(ThemeContext);
  
  const [animal, AnimalDropdown] = useDrop("Animal", "dog", ANIMALS);
  const [breed, BreedDropdown, setBreed] = useDrop("Breed", "", breeds);

  console.log(theme);

  async function requestPets() {
    const { animals } = await pet.animals({
      location,
      breed,
      type: animal,
    });

    setPets(animals || []);
    console.log(animals);
    console.log(pets);
  }

  useEffect(() => {
    setBreeds([]);
    setBreed("");

    pet.breeds(animal).then(({ breeds: apiBreeds }) => {
      const breedStr = apiBreeds.map(({ name }) => name);
      setBreeds(breedStr);
    }, console.error);
  }, [animal, setBreed, setBreeds]);

  return (
    <div className="search-params">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          requestPets();
        }}
      >
        <label htmlFor="location">
          Location
          <input
            id="location"
            value={location}
            placeholder="Location"
            onChange={(e) => setLocation(e.target.value)}
          />
        </label>
        <AnimalDropdown />
        <BreedDropdown />
        <label htmlFor="theme">
          Theme:
          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            onBlur={(e) => setTheme(e.target.value)}
          >
            <option value="peru">Peru</option>
            <option value="darkblue">Darkblue</option>
            <option value="mediumorchid">Medium Orchid</option>
            <option value="chartreuse">Chartreuse</option>
          </select>
        </label>
        <button style={{ backgroundColor: theme }}>Submit</button>
      </form>
      <Results pets={pets} />
    </div>
  );
}


export default SearchParams;