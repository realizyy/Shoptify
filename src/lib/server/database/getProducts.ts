import type { Product } from '$types';
import { pool } from './connection';

export const getProducts = async (): Promise<Product[] | null> => {
    try {
        const result = await pool.query('SELECT * FROM products ORDER BY id ASC');
        return result.rows;
    } catch (error) {
        console.error('Error fetching products', error);
        return null;
    }
};


// import type { Survey } from '$types';
// import { pool } from './connection';

// export const getSurveyList = async (): Promise<Survey[]> => {
//   const { rows: survey } = await pool.query('SELECT id,name,description FROM t_survey;');
//   return survey;
// };
