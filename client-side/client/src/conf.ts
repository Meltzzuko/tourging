const isProd = import.meta.env.PROD;

const conf = {
    isProd,
    apiPrefix: isProd? 'https://s02x.coe.psu.ac.th' : 'http://localhost:1337' 
}

export default conf;
