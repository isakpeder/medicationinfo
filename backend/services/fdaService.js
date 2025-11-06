const axios = require('axios');

const fdaAPI = axios.create({
    baseURL: 'https://api.fda.gov',
    timeout: 10000
})

async function searchDrug(drugName) {
    try {
        const response = await fdaAPI.get('/drug/label.json', {
            params: {
                search: 'openfda.brand_name:"${drugName}"',
                limit: 1
            }
        });

        if (!response.data.results || response.data.results.length === 0) {
            return Null
        }

        const drug = response.data.results[0];

        return {
            brandName: drug.openfda?.brand_name?.[0] || 'Not available.',
            genericName: drug.openfda?.generic_name?.[0] || 'Not available.',
            description: drug.description?.[0] || 'Not available.',
            warnings: drug.warnings?.[0] || 'Not available.',
            adverseReactions: drug.adverse_reactions?.[0] || 'Not available.',
            contraindications: drug.contraindications?.[0] || 'Not available.'
        };

        } catch (error) {
            console.error('Error fetching drug: ', error.message);
            return null;
        }
 }

 module.exports = { searchDrug };