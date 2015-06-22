var config = {};

config.port = process.env.PORT || 3001;
config.database = {
    host: 'mongodb://nick-admin:streamingmovies@ds041032.mongolab.com:41032/streamsidekick'
};
config.apiKey = '7a8c15f4-d9b3-493f-a7f8-171061694ccf%3AeC9xT8B8%2BO%2Bb39PEVhdJxw%2FzeUe6gipFaAME2EqnSbrqRm2x%2FkwsJcrX4pTBj%2FHVz1au312YzrhCH6NbadKHdw%3D%3D';
config.amazonApi = {
    recentlyAdded: 'https://api.import.io/store/data/a2f5cf3a-01d7-48ff-b3cf-cd022facedbb/_query?input/webpage/url=http%3A%2F%2Fwww.amazon.com%2Fs%2Fref%3Datv_sn_piv_cl1_mv_ra%3F_encoding%3DUTF8%26rh%3Dn%253A2858778011%252Cn%253A7613704011%252Cn%253A7812500011%26sort%3Dcsrank&_user=7a8c15f4-d9b3-493f-a7f8-171061694ccf&_apikey=' + config.apiKey,
    movies: {
        movies1: 'https://api.import.io/store/data/b552e74b-01b2-4464-91a2-c695fe73b4b0/_query?input/webpage/url=http%3A%2F%2Fwww.amazon.com%2Fs%2Fref%3Dsr_il_ti_prime-instant-video%3Frh%3Dn%253A2676882011%252Cn%253A7613704011%26sort%3Dcsrank%26ie%3DUTF8%26qid%3D1432979041%26lo%3Dprime-instant-video&_user=7a8c15f4-d9b3-493f-a7f8-171061694ccf&_apikey=' + config.apiKey,
        movies2: 'https://api.import.io/store/data/d2a75880-2903-4c14-8531-f189634d8fa1/_query?input/webpage/url=http%3A%2F%2Fwww.amazon.com%2Fs%2Fref%3Dsr_pg_2%2F192-9198011-8567510%3Frh%3Dn%253A2676882011%252Cn%253A7613704011%26page%3D2%26sort%3Dcsrank%26ie%3DUTF8%26qid%3D1433085018&_user=7a8c15f4-d9b3-493f-a7f8-171061694ccf&_apikey=' + config.apiKey,
        movies3: 'https://api.import.io/store/data/707b2030-f3d5-4a1d-a6be-eedab579ff9b/_query?input/webpage/url=http%3A%2F%2Fwww.amazon.com%2Fs%2Fref%3Dsr_pg_3%3Frh%3Dn%253A2676882011%252Cn%253A7613704011%26page%3D3%26sort%3Dcsrank%26ie%3DUTF8%26qid%3D1433085205&_user=7a8c15f4-d9b3-493f-a7f8-171061694ccf&_apikey=' + config.apiKey,
        movies4: 'https://api.import.io/store/data/b3169a0a-d921-4c25-af4e-d65dfd86dea1/_query?input/webpage/url=http%3A%2F%2Fwww.amazon.com%2Fs%2Fref%3Dsr_pg_4%3Frh%3Dn%253A2676882011%252Cn%253A7613704011%26page%3D4%26sort%3Dcsrank%26ie%3DUTF8%26qid%3D1433085205&_user=7a8c15f4-d9b3-493f-a7f8-171061694ccf&_apikey=' + config.apiKey,
        movies5: 'https://api.import.io/store/data/d21046d0-fb5d-4215-8e7a-60ba3ddbd12f/_query?input/webpage/url=http%3A%2F%2Fwww.amazon.com%2Fs%2Fref%3Dsr_pg_3%3Frh%3Dn%253A2676882011%252Cn%253A7613704011%26page%3D5%26sort%3Dcsrank%26ie%3DUTF8%26qid%3D1433085205&_user=7a8c15f4-d9b3-493f-a7f8-171061694ccf&_apikey=' + config.apiKey,
        movies6: 'https://api.import.io/store/data/cf8f6216-494a-46cb-9026-1e07c084829a/_query?input/webpage/url=http%3A%2F%2Fwww.amazon.com%2Fs%2Fref%3Dsr_pg_6%3Frh%3Dn%253A2676882011%252Cn%253A7613704011%26page%3D6%26sort%3Dcsrank%26ie%3DUTF8%26qid%3D1433085205&_user=7a8c15f4-d9b3-493f-a7f8-171061694ccf&_apikey=' + config.apiKey,
        movies7: 'https://api.import.io/store/data/6216a838-5c02-4957-b661-83296437959e/_query?input/webpage/url=http%3A%2F%2Fwww.amazon.com%2Fs%2Fref%3Dsr_pg_7%3Frh%3Dn%253A2676882011%252Cn%253A7613704011%26page%3D7%26sort%3Dcsrank%26ie%3DUTF8%26qid%3D1433085205&_user=7a8c15f4-d9b3-493f-a7f8-171061694ccf&_apikey=' + config.apiKey,
        movies8: 'https://api.import.io/store/data/b885bf78-088e-4e72-9a8e-b9fcbd3a3626/_query?input/webpage/url=http%3A%2F%2Fwww.amazon.com%2Fs%2Fref%3Dsr_pg_3%3Frh%3Dn%253A2676882011%252Cn%253A7613704011%26page%3D8%26sort%3Dcsrank%26ie%3DUTF8%26qid%3D1433085205&_user=7a8c15f4-d9b3-493f-a7f8-171061694ccf&_apikey=' + config.apiKey,
        movies9: 'https://api.import.io/store/data/c64ae6ef-cb32-4640-af6e-b1c63935e1cf/_query?input/webpage/url=http%3A%2F%2Fwww.amazon.com%2Fs%2Fref%3Dsr_pg_3%3Frh%3Dn%253A2676882011%252Cn%253A7613704011%26page%3D9%26sort%3Dcsrank%26ie%3DUTF8%26qid%3D1433085205&_user=7a8c15f4-d9b3-493f-a7f8-171061694ccf&_apikey=' + config.apiKey,
        movies10: 'https://api.import.io/store/data/365d7f25-eeb2-4fe5-aa41-162c8bceb7b6/_query?input/webpage/url=http%3A%2F%2Fwww.amazon.com%2Fs%2Fref%3Dsr_pg_10%3Frh%3Dn%253A2676882011%252Cn%253A7613704011%26page%3D10%26sort%3Dcsrank%26ie%3DUTF8%26qid%3D1433085205&_user=7a8c15f4-d9b3-493f-a7f8-171061694ccf&_apikey=' + config.apiKey
    }
};
config.omdbApi = {
    movieByTitleYear: 'http://www.omdbapi.com/?tomatoes=true&plot=short&r=json&t='
};

module.exports = config;
