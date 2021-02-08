import pg from 'pg';

import { POSTGRES_URI } from '../config';


export const fetchPG = async (database: string, table: string): Promise<string[]> => {
    const result: string[] = [];

    const config = {
        connectionString: POSTGRES_URI?.replace('DATABASE', database)
    };
    
    const client = new pg.Client(config);
    
    client.connect(err => {
        if (err) throw err;
    });
    
    const query = `SELECT * FROM ${table};`;

    await client.query(query)
        .then(res => {
            const rows = res.rows;

            rows.map(row => {
                result.push(JSON.stringify(row));
            });
        })
        .catch(err => {
            console.log(err);
        });

    return result;
};
