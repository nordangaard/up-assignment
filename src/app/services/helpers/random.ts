import { User } from '../../types/user';
import { CITIES, USERS } from './random-users';

export function randomRange(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function randomUser(): User {
  const user = USERS[randomRange(0, USERS.length - 1)];
  const [firstName, lastName] = user.split(' ');
  const city = CITIES[randomRange(0, CITIES.length - 1)];
  return {
    id: randomRange(0, 9999),
    firstName,
    lastName,
    email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}@example.org`,
    city,
  };
}
