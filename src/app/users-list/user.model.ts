import { last } from 'rxjs/operators';

export interface User {
  gender: string,
  name: Name,
  location: Location,
  email: string,
  login: Login,
  dob: string,
  registered: string,
  cell: string,
  id: Id,
  picture: Picture,
  phone: string,
  nat: string
}

interface Name {
  title: string,
  first: string,
  last: string
}

interface Location {
  street: string,
  state: string,
  city: string,
  postcode: string | number
}

interface Login {
  username: string,
  password: string,
  salt: string,
  md5: string,
  sha1: string,
  sha256: string
}

interface Id {
  name: string,
  value: string
}

interface Picture {
  large: string,
  medium: string,
  thumbnail: string
}
