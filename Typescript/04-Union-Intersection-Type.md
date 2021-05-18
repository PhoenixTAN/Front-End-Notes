# Unions and Intersection Types

```ts
// union type
type a = string | number;
```

## Unions with Common Fields
If we have a value that is a union type, we can only access members that are common to all types in the union.
```ts
interface Bird {
  fly(): void;
  layEggs(): void;
}

interface Fish {
  swim(): void;
  layEggs(): void;
}

declare function getSmallPet(): Fish | Bird;

let pet = getSmallPet();
pet.layEggs();

// Only available in one of the two possible types
pet.swim();

Property 'swim' does not exist on type 'Bird | Fish'.
  Property 'swim' does not exist on type 'Bird'.
```

## Intersection Types
Intersection types are closely related to union types, but they are used very differently. **An intersection type combines multiple types into one.** This allows you to add together existing types to get a single type that has all the features you need. For example, `Person & Serializable & Loggable` is a type which is all of `Person` and `Serializable` and `Loggable`. That means an object of this type will have all members of all three types.

```ts
interface ErrorHandling {
  success: boolean;
  error?: { message: string };
}

interface ArtworksData {
  artworks: { title: string }[];
}

interface ArtistsData {
  artists: { name: string }[];
}

// These interfaces are composed to have
// consistent error handling, and their own data.

type ArtworksResponse = ArtworksData & ErrorHandling;
type ArtistsResponse = ArtistsData & ErrorHandling;

const handleArtistsResponse = (response: ArtistsResponse) => {
  if (response.error) {
    console.error(response.error.message);
    return;
  }

  console.log(response.artists);
};
```
