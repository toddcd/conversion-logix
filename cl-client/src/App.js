import React, {Fragment, useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import LocationService from "./service/location-service";
import BigmacService from "./service/bigmac-service";
import Typography  from '@material-ui/core/Typography';
import CircularProgress  from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';
import burger from './image/hamburger.svg'

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
          '& > *': {
            margin: theme.spacing(2),
            width: theme.spacing(60),
            height: theme.spacing(20),
        },
    },
    burger :{
        zIndex: -1,
        height: '100%',
        width: '100%',
        position: 'absolute',
        opacity: .115,
        backgroundPosition: 'center center',
        backgroundRepeat: 'no-repeat',
        backgroundImage: `url(${burger})`,
    }
}));

function App() {
    const classes = useStyles();

    const [error, setError] = useState(null);
    const [country, setCountry] = useState(null);
    const [pricing, setPricing] = useState({});
    const [bigmacQuantity, setBigmacQuantity] = useState('0');

    const [randomCountry, setRandomCountry] = useState({});
    const [inputAmount, setInputAmount] = useState('0')

    useEffect( () => {
             LocationService.getCountry()
                .then(result => {
                    setCountry(result)
                }).catch(err =>{
                    setCountry({status: "error", data: 'none'});
                    setError('Error looking up your country location.');
                }
            )
            if (sessionStorage.getItem("pricing")) {
                // If it exists, rehydrate pricing data from session storage
                const pricingData = BigmacService.rehydratePricing();
                setPricingAndRandom(pricingData);

            }else{
                BigmacService.getPricing()
                    .then(pricingData =>{
                        setPricingAndRandom(pricingData);
                        BigmacService.cachePricing(pricingData)
                    }).catch(err =>{
                        setPricing({status: "error", data: 'none'});
                        setError('Error looking up Bigmac pricing.');
                    })
            }

    }, [])

    const setPricingAndRandom = (data) =>{
        const countries = Object.keys(data);
        const name = countries[Math.floor(Math.random() * countries.length)];
        const randoObj = { ...data[name], country_name : name, };
        setRandomCountry(randoObj);
        setPricing(data)
    }

    const handleAmountChanged = (e) =>{
        if(e.target.value){
            let localPrice = Number.parseFloat(pricing[country.country].dollarPrice);
            let dollarAmount = Number.parseFloat(e.target.value);
            setBigmacQuantity(''+(dollarAmount / localPrice).toFixed(2))
            setInputAmount(dollarAmount)
        } else {
            setBigmacQuantity('0')
            setInputAmount('0')
        }
    }

    const calc1 =()=>{
        const localPrice = Number.parseFloat(pricing[country.country].localPrice);
        const dollarPrice = Number.parseFloat(pricing[country.country].dollarPrice);
        const randoDollarPrice = Number.parseFloat(randomCountry.dollarPrice)
        if(inputAmount === '0'){
            return 0
        }
        return ((inputAmount / localPrice)  * (dollarPrice / randoDollarPrice)).toFixed(2)
    }

    const calc2 =()=>{
        const dollarPrice = Number.parseFloat(pricing[country.country].dollarPrice);
        const randoDollarPrice = Number.parseFloat(randomCountry.dollarPrice)
        if(inputAmount === '0'){
            return 0
        }
        return ((inputAmount * dollarPrice)  / randoDollarPrice).toFixed(2)
    }

  return country === null ?
                (<div  className={classes.root}>
                    <Typography variant="h6" >Please wait while we look up your country. Thanks!</Typography>
                    <CircularProgress />
                </div>) :
            error !== null ?
                (<div  className={classes.root}>
                    <Typography variant="h6" >{error}</Typography>
                </div>) :
                ( <Fragment>
                    <div className={classes.burger}></div>
                    <div className={classes.root}>
                        <div >
                            <Typography  variant="body1" >
                                You are in <span style={{fontWeight:'bold'}}>
                                {country.country}</span>.
                                <br/>
                                Please enter an amount of money in your local currency -
                            </Typography>
                            <TextField id="standard-basic"
                                             label="Money Amount"
                                             onChange={handleAmountChanged}/>
                        </div>
                        <div>
                            <Typography variant="body1" >
                                You could buy <span style={{fontWeight:'bold'}}>
                                    {bigmacQuantity}</span> Big Mac(s) in your country.
                                <br/>
                                Your Dollar Purchasing Parity (PPP) is
                                <span style={{fontWeight:'bold'}}>
                                    {pricing[country.country] ? pricing[country.country].dollarPpp : 0}
                                </span>.
                            </Typography>
                        </div>
                        <div>
                            <Typography variant="body1" >
                                Random Country: <span style={{fontWeight:'bold'}}>
                                    {randomCountry.country_name}</span>
                                <br/>
                                You could buy <span style={{fontWeight:'bold'}}>
                                    {calc1()}</span>  Big Mac(s) in <span style={{fontWeight:'bold'}}>
                                        { randomCountry.country_name} </span>
                                 with <span style={{fontWeight:'bold'}}>
                                    {inputAmount}!</span>
                                <br/>
                                Your <span style={{fontWeight:'bold'}}>
                                    {inputAmount} </span>
                                is worth about <span style={{fontWeight:'bold'}}>
                                    {calc2()}</span> in <span style={{fontWeight:'bold'}}>
                                        {randomCountry.country_name}</span>
                            </Typography>
                        </div>
                        </div>
                </Fragment>
                );
}

export default App;
