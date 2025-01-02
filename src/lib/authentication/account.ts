import { faker } from '$lib/utils';
import { pool } from '$server/database/connection';
import type { User } from '$types';
import bcrypt from 'bcrypt';

// export const create = (): User => {
//   const firstName = faker.person.firstName();
//   const lastName = faker.person.lastName();

//   return {
//     username: faker.internet.username({ firstName, lastName }),
//     fullname: faker.person.fullName({ firstName, lastName })
//   };
// };
// create a new user and post it to the database


export const create = async (username: string, password: string): Promise<User | undefined> => {
  console.log('creating user .. ');
  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const fullname = faker.person.fullName({ firstName, lastName });
  const role = 'user';
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log('username: ', username, 'password: ', password, '-', hashedPassword, 'fullname: ', fullname);
  try {
    const { rows } = await pool.query(
      `
      INSERT INTO users (username, password, fullname, role)
      VALUES ($1, $2, $3, 'user')
      RETURNING *
      `,
      [username, hashedPassword, fullname, role]
    );
    const { id } = rows[0];
    console.log('user created');
    return { id, username, fullname, role };
  } catch {
    console.log('failed to create user');
  }
}

export const getUser = async (username: string, password: string): Promise<User | undefined> => {
  try {
    const { rows } = await pool.query(
      `
      SELECT * FROM users WHERE username = $1
      `,
      [username]
    );
    if (rows.length === 0) return undefined;
    const user = rows[0];
    const match = await bcrypt.compare(password, user.password);
    if (match) return { id: user.id, username: user.username, fullname: user.fullname, role: user.role };
    return undefined;
  } catch {
    return undefined;
  }
}
